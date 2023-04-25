import { AvtaleContext } from '@/AvtaleProvider';
import StillingsTittelVelger, { StillingOptions } from '@/AvtaleSide/steg/StillingSteg/StillingsTittelVelger';
import useStilling from '@/AvtaleSide/steg/StillingSteg/useStilling';
import StillingsprosentInput from '@/AvtaleSide/steg/VarighetSteg/StillingsprosentInput/StillingsprosentInput';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { EndreStilling, oppdatereStillingbeskrivelse } from '@/services/rest-service';
import BEMHelper from '@/utils/bem';
import { DialogDots } from '@navikt/ds-icons/cjs';
import { Link } from '@navikt/ds-react';
import React, { FunctionComponent, useContext, useState } from 'react';
import './EndreStillingbeskrivelse.less';

const EndreStillingbeskrivelse: FunctionComponent = () => {
    const cls = BEMHelper('endreStillingbeskrivelse');
    const [modalApen, setModalApen] = useState(false);

    const avtaleContext = useContext(AvtaleContext);

    const { valgtStilling, setValgtStilling } = useStilling(avtaleContext.avtale.gjeldendeInnhold);
    const [arbeidsoppgaver, setArbeidsoppgaver] = useState(avtaleContext.avtale.gjeldendeInnhold.arbeidsoppgaver);
    const [stillingsprosent, setStillingsprosent] = useState(avtaleContext.avtale.gjeldendeInnhold.stillingprosent);
    const [antallDagerPerUke, setAntallDagerPerUke] = useState(avtaleContext.avtale.gjeldendeInnhold.antallDagerPerUke);

    const endreStilling = async (): Promise<void> => {
        const stillingInfo: EndreStilling = {
            stillingstittel: valgtStilling?.value,
            stillingKonseptId: valgtStilling?.konseptId,
            stillingStyrk08: valgtStilling?.styrk08,
            arbeidsoppgaver: arbeidsoppgaver,
            stillingprosent: stillingsprosent,
            antallDagerPerUke: antallDagerPerUke,
        };
        await oppdatereStillingbeskrivelse(avtaleContext.avtale, stillingInfo);
        await avtaleContext.hentAvtale();
        setModalApen(false);
    };


    const lukkModal = () => {
        const values: StillingOptions = {
            konseptId: avtaleContext.avtale.gjeldendeInnhold.stillingKonseptId || 0,
            label: avtaleContext.avtale.gjeldendeInnhold.stillingstittel || '',
            styrk08: avtaleContext.avtale.gjeldendeInnhold.stillingStyrk08 || 0,
            value: avtaleContext.avtale.gjeldendeInnhold.stillingstittel || '',
        };
        setValgtStilling(values);
        setArbeidsoppgaver(avtaleContext.avtale.gjeldendeInnhold.arbeidsoppgaver);
        setModalApen(false);
    };

    return (
        <>
            <Link
                onClick={(event) => {
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
            </Link>
            <BekreftelseModal
                style={{ minWidth: '35rem' }}
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Endre"
                oversiktTekst="Endre stillingsbeskrivelse"
                modalIsOpen={modalApen}
                bekreftOnClick={endreStilling}
                lukkModal={lukkModal}
            >
                <div className={cls.element('innhold')}>
                    <div className={cls.element('stillingstittel-wrapper')}>
                        <label htmlFor="stillinginput">Stilling/yrke (kun ett yrke kan legges inn)</label>
                        <StillingsTittelVelger
                            id="stillinginput"
                            valgtStilling={valgtStilling}
                            setValgtStilling={setValgtStilling}
                        />
                    </div>
                    <div className={cls.element('stilling-beskrivelse')}>
                        <PakrevdTextarea
                            label="Beskriv arbeidsoppgavene som inngår i stillingen"
                            verdi={arbeidsoppgaver}
                            settVerdi={(verdi) => setArbeidsoppgaver(verdi)}
                            maxLengde={500}
                            feilmelding="arbeidsoppgave er påkrevd"
                        />
                    </div>
                    <div className={cls.element('stilling-input-wrapper')}>
                        <StillingsprosentInput
                            label="Stillingsprosent"
                            verdi={stillingsprosent}
                            settVerdi={(verdi) => setStillingsprosent(verdi)}
                        />
                        <PakrevdInput
                            size="small"
                            label="Antall dager per uke"
                            type="number"
                            max={7}
                            verdi={antallDagerPerUke}
                            settVerdi={(eventVerdi) => {
                                const verdi = parseInt(eventVerdi, 10);
                                if (verdi > 0 && verdi < 8) {
                                    setAntallDagerPerUke(verdi);
                                } else {
                                    setAntallDagerPerUke(undefined);
                                }
                            }}
                        />
                    </div>
                </div>
            </BekreftelseModal>
        </>
    );
};
export default EndreStillingbeskrivelse;
