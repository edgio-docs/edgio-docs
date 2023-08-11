// @ts-ignore
import levenshtein from 'fast-levenshtein';

export default function textCompare(
  str1: string,
  str2: string,
  similarityThreshold = 70
) {
  const distance = levenshtein.get(str1, str2);
  const similarity = (1 - distance / Math.max(str1.length, str2.length)) * 100;
  return similarity >= similarityThreshold;
}
