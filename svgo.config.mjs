export default {
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {
                    removeViewBox: false,
                    removeUnknownsAndDefaults: false,
                },
            },
        },
        'prefixIds',
    ],
};
