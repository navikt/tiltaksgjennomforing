import * as React from "react";
import Arbeidsgiver from "./Arbeidsgiver";
import AvtaleModell, { tomAvtale } from "./AvtaleModell";
import Bekreftelse from "./Bekreftelse";
import KnappBase from "nav-frontend-knapper";
import Lenke from "nav-frontend-lenker";
import Malsetning from "./Malsetning";
import PanelBase from "nav-frontend-paneler";
import Person from "./Person";
import Stegvelger from "../Stegvelger";
import { RouteComponentProps } from "react-router";
import firebase from "../firebase";

interface MatchProps {
    avtaleId: string;
}

class Avtale extends React.Component<
    RouteComponentProps<MatchProps>,
    AvtaleModell
> {
    state = {
        ...tomAvtale,
        id: this.props.match.params.avtaleId,
    };

    componentDidMount() {
        this.hent();
    }

    hent = () => {
        this.avtaleRef()
            .once('value')
            .then((snapshot: any) => {
                this.setState(snapshot.val());
            });
    };

    handleChange = (event: any) => {
        const avtale = this.state;
        avtale[event.target.id] = event.target.value;
        this.setState(avtale);
    };

    lagre = () => {
        this.avtaleRef()
            .set(this.state)
            .then((param: any) => {
                console.log(param); // tslint:disable-line no-console
            });
    };

    avtaleRef = () => {
        return firebase
            .database()
            .ref('avtale/' + this.props.match.params.avtaleId);
    };

    render() {
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
}

export default Avtale;
