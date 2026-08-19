import { Alert, Loader } from '@navikt/ds-react';
import { BodyShort, Heading } from '@navikt/ds-react';
import React, { FunctionComponent, PropsWithChildren, Suspense } from 'react';
import VerticalSpacer from './layout/VerticalSpacer';

interface ErrorBoundaryState {
    error: unknown | null;
}

class ReactErrorBoundary extends React.Component<PropsWithChildren, ErrorBoundaryState> {
    constructor(props: PropsWithChildren) {
        super(props);
        this.state = { error: null };
    }

    static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
        return { error };
    }

    render() {
        if (this.state.error) {
            return (
                <Alert variant="warning">
                    <Heading size="small">Det har oppstått en uventet feil. Forsøk å laste siden på nytt.</Heading>
                    <VerticalSpacer rem={0.5} />
                    <BodyShort size="small">
                        Teknisk feilkode:{' '}
                        <i>{this.state.error instanceof Error ? this.state.error.message : String(this.state.error)}</i>
                    </BodyShort>
                </Alert>
            );
        }
        return this.props.children;
    }
}

const ErrorBoundary: FunctionComponent<PropsWithChildren> = (props) => {
    return (
        <ReactErrorBoundary>
            <Suspense
                fallback={
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Loader variant="neutral" size="xlarge" />
                    </div>
                }
            >
                {props.children}
            </Suspense>
        </ReactErrorBoundary>
    );
};

export default ErrorBoundary;
