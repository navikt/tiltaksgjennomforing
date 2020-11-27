import * as Sentry from '@sentry/react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import VerticalSpacer from './layout/VerticalSpacer';

const ErrorBoundary: FunctionComponent = props => {
    return (
        <Sentry.ErrorBoundary
            fallback={({ error, componentStack, resetError }) => (
                <>
                    <AlertStripeAdvarsel>
                        <Undertittel>Det har oppstått en uventet feil. Forsøk å laste siden på nytt.</Undertittel>
                        <VerticalSpacer rem={0.5} />
                        <Normaltekst>
                            Teknisk feilkode: <i>{error.toString()}</i>
                        </Normaltekst>
                    </AlertStripeAdvarsel>
                </>
            )}
        >
            {props.children}
        </Sentry.ErrorBoundary>
    );
};

export default ErrorBoundary;
