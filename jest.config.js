const { createJestConfig } = require('@craco/craco');

const cracoConfig = require('./craco.config.js');
const jestConfig = createJestConfig(cracoConfig, (context = {}), (options = { verbose: true }));

jestConfig.moduleFileExtensions.push('svg');
module.exports = jestConfig;
