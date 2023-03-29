import { Alert, Loader } from '@navikt/ds-react';
import * as Sentry from '@sentry/react';
import { BodyShort, Heading } from '@navikt/ds-react';
import React, { FunctionComponent, PropsWithChildren, Suspense } from 'react';
import VerticalSpacer from './layout/VerticalSpacer';
import {IntlProvider} from "react-intl";

const ErrorBoundary: FunctionComponent<PropsWithChildren> = (props) => {
    return (
        <Sentry.ErrorBoundary fallback={({ error, componentStack, resetError }) => (
                <>
                    <Alert variant="warning">
                        <Heading size="small">Det har oppstått en uventet feil. Forsøk å laste siden på nytt.</Heading>
                        <VerticalSpacer rem={0.5} />
                        <BodyShort size="small">
                            Teknisk feilkode: <i>{error.toString()}</i>
                        </BodyShort>
                    </Alert>
                </>
            )}
        >
            <Suspense
                fallback={
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Loader variant="neutral" size="xlarge" />
                    </div>
                }
            >
                {props.children}
            </Suspense>
        </Sentry.ErrorBoundary>
    );
};

export default ErrorBoundary;
