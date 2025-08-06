import { Money } from '@navikt/ds-icons';
import { Alert, Link } from '@navikt/ds-react';
import React, { FunctionComponent, useState } from 'react';

import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { KidOgKontonummer } from '@/komponenter/form/kid-og-kontonummer';
import { endreKidOgKontonummer } from '@/services/rest-service';
import { useAvtale } from '@/AvtaleProvider';

import styles from './EndreKidOgKontonummer.module.less';

interface State {
    kid?: string;
    kontonummer?: string;
}

const EndreKidOgKontonummer: FunctionComponent = () => {
    const { avtale, hentAvtale } = useAvtale();
    const [modalApen, setModalApen] = useState(false);

    const [state, setState] = useState<State>({
        kid: avtale.gjeldendeInnhold.arbeidsgiverKid,
        kontonummer: avtale.gjeldendeInnhold.arbeidsgiverKontonummer,
    });

    const bekreftOnClick = async () => {
        await endreKidOgKontonummer(avtale, state.kid, state.kontonummer);
        await hentAvtale();
        setModalApen(false);
    };

    return (
        <>
            <Link
                onClick={() => {
                    setModalApen(true);
                }}
                href="#"
                role="menuitem"
                className={styles.lenke}
            >
                <div aria-hidden={true}>
                    <Money className={styles.ikon} />
                </div>
                Endre KID og kontonummer
            </Link>
            <BekreftelseModal
                style={{ minWidth: '35rem' }}
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Endre"
                oversiktTekst="Endre KID og kontonummer"
                modalIsOpen={modalApen}
                bekreftOnClick={bekreftOnClick}
                lukkModal={() => {
                    setModalApen(false);
                }}
            >
                <Alert variant="info">
                    Endringer vil tre i kraft fra og med neste tilskuddsperiode som godkjennes. For tilskudd som
                    allerede er godkjent må KID-nummer endres for hver enkelt refusjon i refusjonsløsningen.
                </Alert>
                <KidOgKontonummer
                    avtaleId={avtale.id}
                    kid={state.kid}
                    kontonummer={state.kontonummer}
                    onChange={(value) => {
                        setState(value);
                    }}
                />
            </BekreftelseModal>
        </>
    );
};
export default EndreKidOgKontonummer;
