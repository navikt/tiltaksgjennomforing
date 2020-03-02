import React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

const AdvarselBannerHeroku = () => {
    return (
        <>
            {process.env.REACT_APP_ON_HEROKU === 'true' && (
                <AlertStripeAdvarsel>
                    <b>Dette er en testversjon</b>
                </AlertStripeAdvarsel>
            )}
        </>
    );
};

export default AdvarselBannerHeroku;
