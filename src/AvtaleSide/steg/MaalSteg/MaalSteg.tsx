import { AvtaleContext, Context } from '@/AvtaleProvider';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { Maal } from '@/types/avtale';
import * as React from 'react';
import { finnLedigeMaalkategorier } from './maal-utils';
import MaalKort from './MaalKort/MaalKort';
import OpprettMaal from './OpprettMaal/OpprettMaal';

const medAvtaleContext = (Component: React.ComponentType<any>) => {
    return (props: any) => (
        <AvtaleContext.Consumer>
            {(context: any) => {
                return <Component {...props} {...context} />;
            }}
        </AvtaleContext.Consumer>
    );
};

class MaalSteg extends React.Component<Context> {
    state: {
        modalIsOpen: boolean;
        maalRad: Maal;
    };

    constructor(props: Context) {
        super(props);

        this.state = {
            modalIsOpen: false,
            maalRad: this.props.avtale.maal[0],
        };
    }

    // sikre at mål blir satt først, derfor setState på modal i callback
    bekrefelsePaSlettRad = (maal: Maal) => {
        this.setState({ maalRad: maal }, () => this.setState({ modalIsOpen: true }));
    };

    slettMaal = async () => {
        await this.props.slettMaal(this.state.maalRad);
        this.lukkModal();
    };

    valgteMaalkategorier = (): any => {
        return this.props.avtale.maal.map(maal => maal.kategori);
    };

    lukkModal = () => {
        this.setState({ modalIsOpen: false });
    };

    render = () => (
        <>
            <OpprettMaal
                {...this.props.avtale}
                utforHandlingHvisRedigerbar={this.props.utforHandlingHvisRedigerbar}
                ledigeMaalkategorier={finnLedigeMaalkategorier(this.valgteMaalkategorier())}
                lagreMaal={this.props.lagreMaal}
                mellomLagretMaal={this.props.mellomLagring}
                setMellomLagring={this.props.setMellomLagring}
                fjernMellomLagring={() => this.props.setMellomLagring(undefined)}
            />
            {this.props.avtale.maal.map(maal => (
                <MaalKort
                    ledigeMaalkategorier={finnLedigeMaalkategorier(this.valgteMaalkategorier())}
                    maal={maal}
                    key={maal.id}
                    lagreMaal={this.props.lagreMaal}
                    slettMaal={this.bekrefelsePaSlettRad}
                    utforHandlingHvisRedigerbar={this.props.utforHandlingHvisRedigerbar}
                />
            ))}
            <BekreftelseModal
                modalIsOpen={this.state.modalIsOpen}
                bekreftOnClick={this.slettMaal}
                lukkModal={this.lukkModal}
                varselTekst="Du er i ferd med å slette et mål. Hvis du gjør det vil alt innholdet i målet forsvinne. Er du sikker?"
                oversiktTekst="Slette mål"
                bekreftelseTekst="Ja, slett mål"
                avbrytelseTekst="avbryt"
            />
        </>
    );
}

export default medAvtaleContext(MaalSteg);
