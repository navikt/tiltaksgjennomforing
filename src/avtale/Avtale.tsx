/*
import KnappBase from 'nav-frontend-knapper';
import PanelBase from 'nav-frontend-paneler';
*/
import * as React from 'react';
import Stegvelger from '../Stegvelger';
import Arbeidsgiver from './Arbeidsgiver';
import AvtaleForm from './AvtaleForm';
import Bekreftelse from './Bekreftelse';
import Malsetning from './Malsetning';
import Person from './Person';

class Avtale extends React.Component<{}, AvtaleForm> {
    constructor(props: {}) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.lagreForm = this.lagreForm.bind(this);
    }

    public render() {
        return (
            <>
                <Stegvelger>
                    <Person
                        label={'Person'}
                        handleChange={this.handleChange}
                        form={this.state}
                    />
                    <Arbeidsgiver
                        label={'Arbeidsgiver'}
                        handleChange={this.handleChange}
                        form={this.state}
                    />
                    <Malsetning
                        label={'Målsetninger'}
                        handleChange={this.handleChange}
                        form={this.state}
                    />
                    <Bekreftelse
                        label={'Bekreftelse'}
                        handleChange={this.handleChange}
                        form={this.state}
                    />
                </Stegvelger>
                {/*<PanelBase>
                    <KnappBase type="standard" disabled={false} onSubmit={this.lagreForm}>
                        Lagre
                    </KnappBase>
                </PanelBase>*/}
            </>
        );
    }

    private handleChange(event: any) {
        this.setState({ [event.target.id]: event.target.value });
    }

    private lagreForm() {
        // todo
    }
}

export default Avtale;
