import { AvtaleContext } from '@/AvtaleProvider';
import StillingsprosentInput from '@/AvtaleSide/steg/VarighetSteg/StillingsprosentInput/StillingsprosentInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { EndreStilling, oppdatereStillingbeskrivelse } from '@/services/rest-service';
import BEMHelper from '@/utils/bem';
import { DialogDots } from '@navikt/ds-icons/cjs';
import Lenke from 'nav-frontend-lenker';
import React, { FunctionComponent, useContext, useState } from 'react';
import './EndreStillingbeskrivelse.less';

const EndreStillingbeskrivelse: FunctionComponent = () => {
    const cls = BEMHelper('endreStillingbeskrivelse');
    const [modalApen, setModalApen] = useState(false);

    const avtaleContext = useContext(AvtaleContext);

    // const { valgtStilling, setValgtStilling } = useStilling(avtaleContext.avtale);
    const [stillingstittel, setStillingstittel] = useState(avtaleContext.avtale.arbeidsoppgaver);
    const [arbeidsoppgaver, setArbeidsoppgaver] = useState(avtaleContext.avtale.arbeidsoppgaver);
    const [stillingsprosent, setStillingsprosent] = useState(avtaleContext.avtale.stillingprosent);
    const [antallDagerPerUke, setAntallDagerPerUke] = useState(avtaleContext.avtale.antallDagerPerUke);

    const endreStilling = async (): Promise<void> => {
        const stillingInfo: EndreStilling = {
            stillingstittel: stillingstittel,
            arbeidsoppgaver: arbeidsoppgaver,
            stillingprosent: stillingsprosent,
            antallDagerPerUke: antallDagerPerUke,
        };
        await oppdatereStillingbeskrivelse(avtaleContext.avtale, stillingInfo);
        await avtaleContext.hentAvtale();
        setModalApen(false);
    };

    const endreStillingInnhold = (
        <div>
            <VerticalSpacer rem={2} />
            <div>
                <PakrevdInput
                    label={'Stilling/yrke (kun ett yrke kan legges inn)'}
                    verdi={stillingstittel}
                    settVerdi={setStillingstittel}
                />
            </div>
            <VerticalSpacer rem={2} />
            <div>
                <PakrevdTextarea
                    label="Beskriv arbeidsoppgavene som inngår i stillingen"
                    verdi={arbeidsoppgaver}
                    settVerdi={verdi => setArbeidsoppgaver(verdi)}
                    maxLengde={500}
                    feilmelding="arbeidsoppgave er påkrevd"
                />
            </div>
            <VerticalSpacer rem={2} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <StillingsprosentInput
                    label="Stillingsprosent"
                    verdi={stillingsprosent}
                    settVerdi={verdi => setStillingsprosent(verdi)}
                />
                <PakrevdInput
                    bredde="S"
                    label="Antall dager per uke"
                    type="number"
                    max={7}
                    verdi={antallDagerPerUke}
                    settVerdi={eventVerdi => {
                        const verdi = parseInt(eventVerdi);
                        if (verdi > 0 && verdi < 8) {
                            setAntallDagerPerUke(verdi);
                        } else {
                            setAntallDagerPerUke(undefined);
                        }
                    }}
                />
            </div>
        </div>
    );

    const lukkModal = () => {
        // const values: StillingOptions = {
        //     konseptId: avtaleContext.avtale.stillingKonseptId || 0,
        //     label: avtaleContext.avtale.stillingstittel || '',
        //     styrk08: avtaleContext.avtale.stillingStyrk08 || 0,
        //     value: avtaleContext.avtale.stillingstittel || '',
        // };
        setStillingstittel(avtaleContext.avtale.stillingstittel);
        setArbeidsoppgaver(avtaleContext.avtale.arbeidsoppgaver);
        setModalApen(false);
    };

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
                lukkModal={lukkModal}
                varselTekst={endreStillingInnhold}
            />
        </>
    );
};
export default EndreStillingbeskrivelse;
