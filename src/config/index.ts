export async function getBaseConfig() {
  return (await import('./base.config.js')).default;
}

export async function getVersionedConfig(version: string) {
  const base = await getBaseConfig();
  const versioned = (await import(`./v${version}.config.js`)).default;

  return {...base, ...versioned};
}
