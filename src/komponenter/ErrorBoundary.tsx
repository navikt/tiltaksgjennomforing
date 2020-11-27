import amplitude from '@/utils/amplitude';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';

// Denne er kopiert fra: https://reactjs.org/docs/error-boundaries.html
class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };
    static getDerivedStateFromError(error: any) {
        return {
            hasError: true,
            error: error,
        };
    }

    getErrorString = (error: Error | null) => `${error && error.toString()}`;

    render() {
        if (this.state.hasError) {
            amplitude.logEvent('#tiltak-errorboundary', { feil: this.getErrorString(this.state.error) });
            return (
                <AlertStripeAdvarsel>
                    <Normaltekst>Det har skjedd en uventet feil. Forsøk å laste siden på nytt.</Normaltekst>
                    <Normaltekst>
                        Teknisk feilkode: <i>{this.getErrorString(this.state.error)}</i>
                    </Normaltekst>
                </AlertStripeAdvarsel>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
