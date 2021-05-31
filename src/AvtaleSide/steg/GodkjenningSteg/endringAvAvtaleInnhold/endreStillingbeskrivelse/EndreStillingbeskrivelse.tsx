import { AvtaleContext } from '@/AvtaleProvider';
import StillingsTittelVelger from '@/AvtaleSide/steg/StillingSteg/StillingsTittelVelger';
import useStilling from '@/AvtaleSide/steg/StillingSteg/useStilling';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { oppdatereStillingbeskrivelse } from '@/services/rest-service';
import { Stilling } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { DialogDots } from '@navikt/ds-icons/cjs';
import Lenke from 'nav-frontend-lenker';
import React, { FunctionComponent, useContext, useState } from 'react';
import './EndreStillingbeskrivelse.less';

const EndreStillingbeskrivelse: FunctionComponent = () => {
    const cls = BEMHelper('endreStillingbeskrivelse');
    const [modalApen, setModalApen] = useState(false);

    const avtaleContext = useContext(AvtaleContext);

    const { valgtStilling, setValgtStilling } = useStilling(avtaleContext.avtale);
    const [arbeidsoppgaver, setArbeidsoppgaver] = useState(avtaleContext.avtale.arbeidsoppgaver);

    const endreStilling = async (): Promise<void> => {
        const stillingInfo: Stilling = {
            stillingstittel: valgtStilling?.value,
            stillingKonseptId: valgtStilling?.konseptId,
            stillingStyrk08: valgtStilling?.styrk08,
            arbeidsoppgaver: arbeidsoppgaver,
        };
        await oppdatereStillingbeskrivelse(avtaleContext.avtale, stillingInfo);
        await avtaleContext.hentAvtale(avtaleContext.avtale.id);
        setModalApen(false);
    };

    const endreStillingInnhold = (
        <div className={cls.className}>
            <div className={cls.element('inputfelt')}>
                <label htmlFor="stillinginput">Stilling/yrke (kun ett yrke kan legges inn)</label>
                <VerticalSpacer rem={0.5} />
                <StillingsTittelVelger
                    id="stillinginput"
                    valgtStilling={valgtStilling}
                    setValgtStilling={setValgtStilling}
                />
            </div>
            <div className={cls.element('textareafelt')}>
                <PakrevdTextarea
                    label="Beskriv arbeidsoppgavene som inngår i stillingen"
                    verdi={arbeidsoppgaver}
                    settVerdi={verdi => setArbeidsoppgaver(verdi)}
                    maxLengde={500}
                    feilmelding="arbeidsoppgave er påkrevd"
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
                Endre stillingsbeskrivelse
            </Lenke>
            <BekreftelseModal
                style={{ minWidth: '35rem' }}
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Endre"
                oversiktTekst="Endre stilling"
                modalIsOpen={modalApen}
                bekreftOnClick={endreStilling}
                lukkModal={() => setModalApen(false)}
                varselTekst={endreStillingInnhold}
            />
        </>
    );
};
export default EndreStillingbeskrivelse;
