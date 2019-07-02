/* tslint:disable:no-console */
import React from 'react';

const url = process.env.NODE_ENV === 'production' ?
    process.env.INTERN_DECORATOR : 'http://localhost:63342/internarbeidsflatedecorator/build/js/head.min.js';

// TODO fylle inn flere opsjoner i config.
const config = {
    config: {
        applicationName: 'Tiltaksgjennomføring',
        toggles: {}
    }
};

class InternDekorator extends React.Component{

    componentDidMount(): void {

        if(process.env.INTERNFLATE === 'true') {
            const script = document.createElement('script');
            script.setAttribute('id', 'internHeader');

            if (url) {
                script.onload = () => {
                    const newScript = document.createElement('script');
                    newScript.defer = true;
                    const inlineScript = document.createTextNode(`window.renderDecoratorHead( 
               ${JSON.stringify(config)}, 'Tiltak')`);

                    newScript.setAttribute('id', 'intern-renderHead');
                    newScript.appendChild(inlineScript);
                    document.getElementsByTagName('body')[0].appendChild(newScript);
                };
                script.src = url;
                script.defer = true;
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        }
    }

    render =() => {
        return (
            <div />
        );
    }
}

export default InternDekorator;
