import {readFileSync} from 'fs';
import {join} from 'path';

import {isProductionBuild} from '@edgio/core/environment';
import {encode} from 'html-entities';

import {logDev} from './logging';
import {StringMap} from './Types';

const variableRe = /{{\s*(\w+)\s*}}/gi;
const fileRe = /{{\s*(\w+(?:\.md))\s*}}/gi;
const templatePath = join(process.cwd(), 'src', 'templates');
const templatesRead: StringMap = {};

function readTemplateFile(filePath: string, depth: number): string | undefined {
  const templateReadDepth = templatesRead[filePath];

  if (typeof templateReadDepth !== 'number') {
    templatesRead[filePath] = depth;
  } else if (templateReadDepth < depth) {
    const msg = `Circular reference detected in template file '${filePath}'`;
    // possible circular reference
    logDev(msg);
    if (isProductionBuild()) {
      throw new Error(msg);
    }
    return;
  }

  try {
    return readFileSync(filePath, 'utf-8');
  } catch (e) {
    logDev(`Unable to read file '${filePath}' for template replacement.`);
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
  let template = readTemplateFile(file, 0);

  if (!template) {
    const msg = `No template file found for '${file}'`;
    logDev(msg);
    if (isProductionBuild()) {
      throw new Error(msg);
    }
    return;
  }

  // look through the template to see if there are references to template files that need
  // updated first
  template = replaceTemplateReferences(template);

  return template.replaceAll(variableRe, (match, key) => {
    const defValue = encode(match);
    const msg = `No constant found for template variable '${match}' in '${file}'. This will render as ${defValue}.\n`;
    let value = data[key];

    if (!value) {
      console.warn(msg);
    }

    return value || defValue;
  });
}
