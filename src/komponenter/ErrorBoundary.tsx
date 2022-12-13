import { Alert, BodyShort, Heading, Loader } from '@navikt/ds-react';
import * as Sentry from '@sentry/react';
import { FunctionComponent, PropsWithChildren, Suspense } from 'react';
import VerticalSpacer from './layout/VerticalSpacer';

const ErrorBoundary: FunctionComponent = (props: PropsWithChildren<{}>) => {
    return (
        <Sentry.ErrorBoundary
            fallback={({ error, componentStack, resetError }) => (
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
                        <Loader variant="neutral" size="xlarge" onResize={undefined} onResizeCapture={undefined} />
                    </div>
                }
            >
                {props.children}
            </Suspense>
        </Sentry.ErrorBoundary>
    );
};

export default ErrorBoundary;
