import * as Sentry from '@sentry/react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, PropsWithChildren, Suspense } from 'react';
import VerticalSpacer from './layout/VerticalSpacer';
import NavFrontendSpinner from 'nav-frontend-spinner';

const ErrorBoundary: FunctionComponent = (props: PropsWithChildren<{}>) => {
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
            <Suspense
                fallback={
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <NavFrontendSpinner type="XL" />
                    </div>
                }
            >
                {props.children}
            </Suspense>
        </Sentry.ErrorBoundary>
    );
};

export default ErrorBoundary;
