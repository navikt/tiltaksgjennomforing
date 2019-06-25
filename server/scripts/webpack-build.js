const webpack = require('webpack');
const buildConfig = require('../webpack/webpack.config.prod');

webpack(buildConfig, (err, stats) =>{
    if (err || (stats.compilation.errors && stats.compilation.errors.length > 0)) {
        let error = err || stats.compilation.errors;
       console.error(error);
       process.exit(1);
    }
});
