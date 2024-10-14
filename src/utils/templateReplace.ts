import {readFileSync} from 'fs';
import {join} from 'path';

import {isProductionBuild} from '@edgio/core/environment';
import {encode} from 'html-entities';

import logger from './logging';
import {StringMap} from './Types';

const variableRe = /{{\s*(\w+)(\(([^)]*)\))?\s*}}/gi;
const fileRe = /{{\s*(\w+(?:\.md))\s*}}/gi;
const templatePath = join(process.cwd(), 'src', 'templates');
let templatesRead: StringMap;

const missingTemplateVariables = new Set<string>();

function readTemplateFile(filePath: string, depth: number): string | undefined {
  const templateReadDepth = templatesRead[filePath];

  if (typeof templateReadDepth !== 'number') {
    templatesRead[filePath] = depth;
  } else if (templateReadDepth < depth) {
    const msg = `
      Circular reference detected to template file '${filePath}'.
      Check that two or more templates do not reference each other.`;
    // possible circular reference
    logger.exception(msg);
    return;
  }

  try {
    return readFileSync(filePath, 'utf-8');
  } catch (e) {
    logger.warn(`Unable to read file '${filePath}' for template replacement.`);
  }

  return;
}

function replaceTemplateReferences(template: string, depth = 0): string {
  return template.replace(fileRe, (match, key) => {
    // `key` (name of the template file) can be any case in the,
    // but we expect the files to be all lowercase
    const filePath = join(templatePath, key.toLowerCase());
    let fileContents = readTemplateFile(filePath, depth);

    // templates can reference other templates, so we need to recursively replace
    if (fileContents && fileContents.match(fileRe)) {
      fileContents = replaceTemplateReferences(fileContents, depth + 1);
    }

    return fileContents || `[ ${key} ]`;
  });
}

export default function templateReplace(file: string, data: StringMap) {
  templatesRead = {};
  let template = readTemplateFile(file, 0);

  if (typeof template === 'undefined') {
    const msg = `Unable to load file for template replacement: '${file}'`;
    logger.exception(msg);
    return;
  }

  if (!template.length) {
    logger.warn(`Template file '${file}' is empty.`);
  }

  // look through the template to see if there are references to template files that need
  // updated first
  template = replaceTemplateReferences(template);

  return template.replaceAll(variableRe, (match, key, ...args) => {
    const defValue = encode(match, {mode: 'extensive'});
    const msg = `No constant found for template variable '${match}' in '${file}'. This will render as '${defValue}'.\n`;
    let value = data[key];

    if (typeof value === 'function') {
      value = value(args[1]);
    }

    if (!value) {
      logger.warn(msg);
      missingTemplateVariables.add(msg);
      return defValue;
    }

    return value || match;
  });
}
