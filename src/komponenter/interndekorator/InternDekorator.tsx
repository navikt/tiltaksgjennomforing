import React from 'react';
import RestService from '../../services/rest-service';

const erDevelopmentModus = process.env.NODE_ENV === 'development';

const config = {
    config: {
        applicationName: 'Tiltaksgjennomføring',
        toggles: {},
    },
};

class InternDekorator extends React.Component {
    async componentDidMount() {
        await RestService.erInternFlate().then(condition => {
            this.getUrl(condition);
        });
    }

    getUrl = (input: string) => {
        if (input === 'true') {
            if (erDevelopmentModus) {
                return this.injectScript(
                    '/internarbeidsflatedecorator/head.min.js'
                );
            }
            RestService.hentInternFlateUri().then(uri => {
                if (uri && uri !== undefined) {
                    return this.injectScript(uri);
                }
            });
        }
    };

    injectScript = (uri: string) => {
        const script = document.createElement('script');
        script.setAttribute('id', 'internHeader');
        if (uri) {
            script.onload = () => {
                const newScript = document.createElement('script');
                newScript.defer = true;
                const inlineScript = document.createTextNode(`window.renderDecoratorHead( 
               ${JSON.stringify(config)}, 'Tiltak')`);

                newScript.setAttribute('id', 'intern-renderHead');
                newScript.appendChild(inlineScript);
                document.getElementsByTagName('body')[0].appendChild(newScript);
            };
            script.src = uri;
            script.defer = true;
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    };

    render = () => {
        return <div id="Tiltak" />;
    };
}

export default InternDekorator;
