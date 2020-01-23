import { Context, medContext } from '@/AvtaleContext';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { Maal } from '@/types/avtale';
import { ApiError } from '@/types/errors';
import * as React from 'react';
import { finnLedigeMaalkategorier } from './maal-utils';
import MaalKort from './MaalKort/MaalKort';
import OpprettMaal from './OpprettMaal/OpprettMaal';

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
        try {
            await this.props.slettMaal(this.state.maalRad);
            this.lukkModal();
        } catch (error) {
            if (error instanceof ApiError) {
                this.props.visFeilmelding(error.message);
            } else {
                throw error;
            }
        }
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
                ledigeMaalkategorier={finnLedigeMaalkategorier(this.valgteMaalkategorier())}
                lagreMaal={this.props.lagreMaal}
                mellomLagretMaal={this.props.mellomLagring}
                setMellomLagring={this.props.mellomLagreMaal}
                fjernMellomLagring={this.props.setMellomLagreMaalTom}
            />
            {this.props.avtale.maal.map(maal => (
                <MaalKort
                    ledigeMaalkategorier={finnLedigeMaalkategorier(this.valgteMaalkategorier())}
                    maal={maal}
                    key={maal.id}
                    lagreMaal={this.props.lagreMaal}
                    slettMaal={this.bekrefelsePaSlettRad}
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

export default medContext(MaalSteg);
