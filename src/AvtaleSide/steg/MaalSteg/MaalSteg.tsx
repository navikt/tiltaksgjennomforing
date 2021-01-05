import { AvtaleContext } from '@/AvtaleProvider';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { Maal } from '@/types/avtale';
import * as React from 'react';
import { finnLedigeMaalkategorier } from './maal-utils';
import MaalKort from './MaalKort/MaalKort';
import OpprettMaal from './OpprettMaal/OpprettMaal';
import { FunctionComponent, useContext, useState } from 'react';

const MaalSteg: FunctionComponent = () => {
    const context = useContext(AvtaleContext);

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [maalRad, setMaalRad] = useState<Maal>(context.avtale.maal[0]);

    const bekrefelsePaSlettRad = (maal: Maal) => {
        setMaalRad(maal);
        setModalIsOpen(true);
    };

    const slettMaal = async () => {
        await context.slettMaal(maalRad);
        setModalIsOpen(false);
    };

    return (
        <div role="main">
            <OpprettMaal />
            {context.avtale.maal.map((maal, index) => (
                <React.Fragment key={index}>
                    <MaalKort
                        ledigeMaalkategorier={finnLedigeMaalkategorier(context.avtale.maal)}
                        maal={maal}
                        key={maal.id}
                        lagreMaal={context.lagreMaal}
                        slettMaal={bekrefelsePaSlettRad}
                        utforHandlingHvisRedigerbar={context.utforHandlingHvisRedigerbar}
                    />
                </React.Fragment>
            ))}
            <BekreftelseModal
                modalIsOpen={modalIsOpen}
                bekreftOnClick={slettMaal}
                lukkModal={() => setModalIsOpen(false)}
                varselTekst="Du er i ferd med å slette et mål. Hvis du gjør det vil alt innholdet i målet forsvinne. Er du sikker?"
                oversiktTekst="Slette mål"
                bekreftelseTekst="Ja, slett mål"
                avbrytelseTekst="avbryt"
            />
        </div>
    );
};

export default MaalSteg;
