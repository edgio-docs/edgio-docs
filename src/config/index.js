function getBaseConfig() {
  return require('./base.config.js');
}

function getVersionedConfig(version) {
  const base = getBaseConfig();
  const versioned = require(`./${version}.config.js`);

  return {...base, ...versioned};
}

module.exports = {
  getBaseConfig,
  getVersionedConfig,
};
