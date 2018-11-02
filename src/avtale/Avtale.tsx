import KnappBase from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import PanelBase from 'nav-frontend-paneler';
import * as React from 'react';
import Stegvelger from '../Stegvelger';
import Arbeidsgiver from './Arbeidsgiver';
import AvtaleModell from './AvtaleModell';
import Bekreftelse from './Bekreftelse';
import Malsetning from './Malsetning';
import Person from './Person';

interface Props {
    firebase: any;
    avtaleId: string;
}

class Avtale extends React.Component<Props, { avtale: AvtaleModell }> {
    constructor(props: Props) {
        super(props);
        this.state = {
            avtale: {
                id: props.avtaleId,
            },
        };
        this.hent();
        this.handleChange = this.handleChange.bind(this);
        this.lagre = this.lagre.bind(this);
    }

    public render() {
        return (
            <>
                <Stegvelger>
                    <Person
                        label={'Person'}
                        handleChange={this.handleChange}
                        form={this.state.avtale}
                    />
                    <Arbeidsgiver
                        label={'Arbeidsgiver'}
                        handleChange={this.handleChange}
                        form={this.state.avtale}
                    />
                    <Malsetning
                        label={'Målsetninger'}
                        handleChange={this.handleChange}
                        form={this.state.avtale}
                    />
                    <Bekreftelse
                        label={'Bekreftelse'}
                        handleChange={this.handleChange}
                        form={this.state.avtale}
                    />
                </Stegvelger>
                <PanelBase>
                    <Lenke href={'/'}>Til oversiktssiden</Lenke>
                    &nbsp; &nbsp;
                    <KnappBase
                        type="hoved"
                        disabled={false}
                        onClick={this.lagre}
                    >
                        Lagre
                    </KnappBase>
                </PanelBase>
            </>
        );
    }

    private hent() {
        const self = this;
        this.avtaleRef()
            .once('value')
            .then((snapshot: any) => {
                self.setState({ avtale: snapshot.val() });
            });
    }

    private handleChange(event: any) {
        const avtale = this.state.avtale;
        avtale[event.target.id] = event.target.value;
        this.setState({ avtale });
    }

    private lagre() {
        this.avtaleRef()
            .set(this.state.avtale)
            .then((param: any) => {
                console.log(param); // tslint:disable-line no-console
            });
    }

    private avtaleRef() {
        return this.props.firebase
            .database()
            .ref('avtale/' + this.props.avtaleId);
    }
}

export default Avtale;
