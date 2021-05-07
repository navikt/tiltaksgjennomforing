import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import BEMHelper from '@/utils/bem';
import { DialogDots } from '@navikt/ds-icons/cjs';
import Lenke from 'nav-frontend-lenker';
import React, { FunctionComponent, useContext, useState } from 'react';
import { Stilling } from '@/types/avtale';

import './EndreStillingbeskrivelse.less';
import { AvtaleContext } from '@/AvtaleProvider';
import { oppdatereStillingbeskrivelse } from '@/services/rest-service';

const EndreStillingbeskrivelse: FunctionComponent = () => {
    const cls = BEMHelper('endreStillingbeskrivelse');
    const [modalApen, setModalApen] = useState(false);

    const context = useContext(AvtaleContext);
    const { stillingstittel, arbeidsoppgaver } = context.avtale;

    const [stillingInfo, setStillingInfo] = useState<Stilling>({
        stillingstittel: stillingstittel,
        arbeidsoppgaver: arbeidsoppgaver,
    });

    const endreStilling = async (): Promise<void> => {
        try {
            await oppdatereStillingbeskrivelse(context.avtale, stillingInfo);
        } catch (err) {
            console.warn('feilet med å lagre oppdaterte beregninger: ', err);
        }
        setModalApen(false);
        await context.hentAvtale(context.avtale.id);
    };

    const settNyStillingInformasjon = async <K extends keyof Stilling, V extends Stilling>(key: K, verdi: V[K]) => {
        await setStillingInfo(prevState => ({
            ...prevState,
            [key]: verdi,
        }));
    };

    const endreStillingInnhold = (
        <div className={cls.className}>
            <div className={cls.element('inputfelt')}>
                <PakrevdInput
                    label="Stilling/yrkestype (kun ett yrke kan legges inn)"
                    verdi={stillingInfo.stillingstittel}
                    settVerdi={verdi => settNyStillingInformasjon('stillingstittel', verdi)}
                />
            </div>
            <div className={cls.element('textareafelt')}>
                <PakrevdTextarea
                    label="Beskriv arbeidsoppgavene som inngår i stillingen"
                    verdi={stillingInfo.arbeidsoppgaver}
                    placeholder="Begrunnelse (påkrevd)"
                    settVerdi={verdi => settNyStillingInformasjon('arbeidsoppgaver', verdi)}
                    maxLengde={500}
                    feilmelding="Begrunnelse er påkrevd"
                />
            </div>
        </div>
    );

    return (
        <>
            <Lenke
                onClick={event => {
                    event.stopPropagation();
                    setModalApen(true);
                }}
                href="#"
                role="menuitem"
                className={cls.element('lenke')}
            >
                <div aria-hidden={true}>
                    <DialogDots className={cls.element('ikon')} />
                </div>
                Endre Stillingsbeskrivelse
            </Lenke>
            <BekreftelseModal
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Endre"
                oversiktTekst="Endre Stilling"
                modalIsOpen={modalApen}
                bekreftOnClick={endreStilling}
                lukkModal={() => setModalApen(false)}
                varselTekst={endreStillingInnhold}
            />
        </>
    );
};
export default EndreStillingbeskrivelse;
