export function logDev(...args: any[]) {
  log('development', ...args);
}

export function logProd(...args: any[]) {
  log('production', ...args);
}

function log(env: string, ...args: any[]) {
  if (process.env.NODE_ENV === env) {
    console.log(...args);
  }
}
