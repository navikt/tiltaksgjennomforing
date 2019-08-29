const CracoLessPlugin = require('craco-less');
const mustacheExpress = require('mustache-express');
const getDecorator = require('./server/decorator');
const path = require('path');
const { whenDev } = require('@craco/craco');
const NpmImportPlugin = require('less-plugin-npm-import');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const noHeaderAndFooterInject = {
    NAV_SCRIPTS: '',
    NAV_STYLES: '',
    NAV_HEADING: '',
    NAV_FOOTER: '',
    NAV_MENU_RESOURCES: '',
};

//Da deployer vi til preprod :D

tiltakWebpackDevConfig = () => {
    const tilTakCOnfig = {
        webpack: {
            configure: {
                target: 'web',
                mode: process.env.NODE_ENV || 'development',
                entry: path.join(__dirname, 'src/index.tsx'),

                output: {
                    path: path.resolve(__dirname, './build'),
                    filename: 'bundle.js',
                    publicPath:
                        process.env.NODE_ENV === 'development'
                            ? '/'
                            : '/tiltaksgjennomforing',
                },
            },
            plugins: [],
        },
        devServer: {
            before: app => {
                app.engine('html', mustacheExpress());
                app.set('views', `${__dirname}/public/dev`);
                app.set('view engine', 'mustache');
                app.get(
                    [
                        '/',
                        '/tiltaksgjennomforing',
                        '/tiltaksgjennomforing/*',
                        '/informasjonsside/*',
                    ],
                    (req, res) => {
                        process.env.DECORATOR === 'true'
                            ? getDecorator().then(decoratorData => {
                                  res.render(
                                      'index.html',
                                      Object.assign(decoratorData)
                                  );
                              })
                            : res.render(
                                  'index.html',
                                  Object.assign(noHeaderAndFooterInject)
                              );
                    }
                );
                app.get(
                    '/internarbeidsflatedecorator/head.min.js',
                    (req, res) => {
                        res.sendFile(
                            path.resolve(__dirname, './server/head.min.js')
                        );
                    }
                );
            },
            hot: false,
            publicPath: '/',
            watchContentBase: true,
            quiet: false,
            noInfo: false,

            stats: {
                failed: true,
                publicPath: true,
                colors: true,
                chunks: true,
                dept: true,
                outputPath: true,
                index: true,
                children: true,
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
            },
        ],
    };

    if (process.env.NODE_ENV === 'development') {
        tilTakCOnfig.webpack.plugins.push(
            ...whenDev(
                () => [
                    new HtmlWebpackPlugin({
                        template: 'public/index.html',
                        inject: 'body',
                        alwaysWriteToDisk: true,
                    }),

                    new HtmlWebpackHarddiskPlugin({
                        outputPath: path.resolve(__dirname, './public/dev'),
                    }),
                ],
                []
            )
        );
    }
    return tilTakCOnfig;
};

module.exports = tiltakWebpackDevConfig;
