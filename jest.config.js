const { createJestConfig } = require('@craco/craco');
const cracoConfig = require('./craco.config.js');
const jestConfig = createJestConfig(cracoConfig);
jestConfig.moduleFileExtensions.push('svg');
module.exports = jestConfig;
