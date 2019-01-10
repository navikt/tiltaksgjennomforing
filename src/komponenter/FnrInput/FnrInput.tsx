import * as React from 'react';
import { Input } from 'nav-frontend-skjema';
import { erGyldigFnr, midlertidigGyldigFnr } from '../../utils/fnrUtils';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';

interface Props {
    className?: string;
    label: React.ReactNode;
    verdi: string;
    feilmelding: string;
    onChange: (fnr: string) => void;
}

interface State {
    inputFeil?: SkjemaelementFeil;
}

class FnrInput extends React.Component<Props, State> {
    state: State = {
        inputFeil: undefined,
    };

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fnr = event.target.value;
        if (midlertidigGyldigFnr(fnr)) {
            this.props.onChange(fnr);
        }
    };

    onKlikkUtAvInput = () => {
        if (erGyldigFnr(this.props.verdi)) {
            this.setState({
                inputFeil: undefined,
            });
        } else {
            this.setState({
                inputFeil: { feilmelding: this.props.feilmelding },
            });
        }
    };

    render() {
        return (
            <Input
                className={this.props.className}
                label={this.props.label}
                value={this.props.verdi}
                onChange={this.onChange}
                feil={this.state.inputFeil}
                onBlur={this.onKlikkUtAvInput}
            />
        );
    }
}

export default FnrInput;
