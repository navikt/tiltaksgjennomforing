import React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

const TestAdvarsel = () => {
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

export default TestAdvarsel;
