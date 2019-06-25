const CracoLessPlugin = require('craco-less');
const mustacheExpress = require('mustache-express');
const getDecorator = require('./server/decorator');
const path = require('path');
const { whenDev } = require('@craco/craco');
const NpmImportPlugin = require('less-plugin-npm-import');
//const webpack = require('webpack');

//require('dotenv').config();

const noHeaderAndFooterInject = {
    NAV_SCRIPTS: '',
    NAV_STYLES: '',
    NAV_HEADING: '',
    NAV_FOOTER: '',
    NAV_MENU_RESOURCES: ''
};

module.exports = () => {
    return {
        webpack: {
            configure: {
                target: "web",
                mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
                entry:
                    path.join(__dirname, 'src/index.tsx'),

                output: {
                    path: path.resolve(__dirname, './build'),
                    filename: 'bundle.js',
                    publicPath: '/',
                }
            }
        },
        devServer: {

            before: app => {
                app.engine('html', mustacheExpress());
                app.set('views', `${__dirname}/public`);
                app.set('view engine', 'mustache');
                app.get(['/', '/tiltaksgjennomforing'], (req, res) => {

                    process.env.DECORATOR === 'true' ? (
                    getDecorator().then(decoratorData => {
                        res.render('index.html', Object.assign(decoratorData));
                    })): (
                        res.render('index.html', Object.assign(noHeaderAndFooterInject))
                    )
                });
            },

            hot: true,
           // contentBase: './public/',
            publicPath: '/',
            watchContentBase: true,
            quiet: false,
            noInfo: false,

            stats: {
                failed: true,
                publicPath: true,
                colors: true,
                chunks: true,
            },

        },
        plugins: [
            {
                plugin: CracoLessPlugin,
                options: {

                    lessLoaderOptions: {
                        loader: new NpmImportPlugin({ prefix: '~' }),
                    },
                },
                ...whenDev(
                    () => [
                    //    new webpack.HotModuleReplacementPlugin()
                    ],
                    []
                ),
            },
        ],
    }
};

