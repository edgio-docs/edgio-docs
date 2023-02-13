import {StringMap} from './Types';

const re = /{{\s*(\w+)\s*}}/gi;

export default function templateReplace(template: string, data: StringMap) {
  return template.replaceAll(re, (match, key) => {
    return data[key] || match;
  });
}
