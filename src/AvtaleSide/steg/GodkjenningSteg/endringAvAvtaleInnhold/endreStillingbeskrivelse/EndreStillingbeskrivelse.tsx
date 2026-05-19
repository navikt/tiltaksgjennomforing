import { useAvtale } from '@/AvtaleProvider';
import StillingsTittelVelger, { StillingOptions } from '@/AvtaleSide/steg/StillingSteg/StillingsTittelVelger';
import useStilling from '@/AvtaleSide/steg/StillingSteg/useStilling';
import StillingsprosentInput from '@/AvtaleSide/steg/VarighetSteg/StillingsprosentInput/StillingsprosentInput';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { EndreStilling, oppdatereStillingbeskrivelse } from '@/services/rest-service';
import { DialogDots } from '@navikt/ds-icons/cjs';
import { Label, Link, RadioGroup } from '@navikt/ds-react';
import React, { FunctionComponent, useState } from 'react';
import AntallDagerInput from '@/AvtaleSide/steg/VarighetSteg/AntallDagerInput';
import { LonnstilskuddFormaal, TiltaksType } from '@/types';
import RadioPanel from '@/komponenter/radiopanel/RadioPanel';
import { lonnstilskuddFormaal as lonnstilskuddFormaalMsg } from '@/messages';

import styles from './EndreStillingbeskrivelse.module.less';
import Stillingstype from '@/AvtaleSide/steg/StillingSteg/Stillingstype';

const LTS_UTEN_SOMMERJOBB = [
    'MIDLERTIDIG_LONNSTILSKUDD',
    'VARIG_LONNSTILSKUDD',
    'FIREARIG_LONNSTILSKUDD',
] as Partial<TiltaksType>[];

const EndreStillingbeskrivelse: FunctionComponent = () => {
    const [modalApen, setModalApen] = useState(false);

    const { avtale, hentAvtale } = useAvtale();

    const { valgtStilling, setValgtStilling } = useStilling(avtale.gjeldendeInnhold);
    const [arbeidsoppgaver, setArbeidsoppgaver] = useState(avtale.gjeldendeInnhold.arbeidsoppgaver);
    const [stillingprosent, setStillingprosent] = useState(avtale.gjeldendeInnhold.stillingprosent);
    const [antallDagerPerUke, setAntallDagerPerUke] = useState(avtale.gjeldendeInnhold.antallDagerPerUke);
    const [lonnstilskuddFormaal, setLonnstilskuddFormaal] = useState(avtale.gjeldendeInnhold.lonnstilskuddFormaal);
    const [stillingstype, setStillingstype] = useState(avtale.gjeldendeInnhold.stillingstype);

    const endreStilling = async (): Promise<void> => {
        const stillingInfo: EndreStilling = {
            stillingstittel: valgtStilling?.value,
            stillingKonseptId: valgtStilling?.konseptId,
            stillingStyrk08: valgtStilling?.styrk08,
            arbeidsoppgaver,
            stillingprosent,
            antallDagerPerUke,
            lonnstilskuddFormaal,
            stillingstype,
        };
        await oppdatereStillingbeskrivelse(avtale, stillingInfo);
        await hentAvtale();
        setModalApen(false);
    };

    const lukkModal = () => {
        const values: StillingOptions = {
            konseptId: avtale.gjeldendeInnhold.stillingKonseptId || 0,
            label: avtale.gjeldendeInnhold.stillingstittel || '',
            styrk08: avtale.gjeldendeInnhold.stillingStyrk08 || 0,
            value: avtale.gjeldendeInnhold.stillingstittel || '',
        };
        setValgtStilling(values);
        setArbeidsoppgaver(avtale.gjeldendeInnhold.arbeidsoppgaver);
        setLonnstilskuddFormaal(avtale.gjeldendeInnhold.lonnstilskuddFormaal);
        setStillingstype(avtale.gjeldendeInnhold.stillingstype);
        setModalApen(false);
    };

    const erAvtaleInngatt = !!avtale.avtaleInngått;
    const erLtsUtenSommerjobb = LTS_UTEN_SOMMERJOBB.includes(avtale.tiltakstype);
    const erVtao = 'VTAO' === avtale.tiltakstype;

    return (
        <>
            <Link
                onClick={(event) => {
                    event.stopPropagation();
                    setModalApen(true);
                }}
                href="#"
                role="menuitem"
                className={styles.lenke}
            >
                <div aria-hidden={true}>
                    <DialogDots className={styles.ikon} />
                </div>
                Endre stillingsbeskrivelse
            </Link>
            <BekreftelseModal
                className={styles.modal}
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Endre"
                oversiktTekst="Endre stillingsbeskrivelse"
                modalIsOpen={modalApen}
                bekreftOnClick={endreStilling}
                lukkModal={lukkModal}
            >
                <div>
                    <div className={styles.stillingstittel}>
                        <Label className={styles.label} htmlFor="stillinginput">
                            Stilling/yrke (kun ett yrke kan legges inn)
                        </Label>
                        <StillingsTittelVelger
                            id="stillinginput"
                            valgtStilling={valgtStilling}
                            setValgtStilling={setValgtStilling}
                        />
                    </div>
                    <div className={styles.stillingBeskrivelse}>
                        <PakrevdTextarea
                            label="Beskriv arbeidsoppgavene som inngår i stillingen"
                            verdi={arbeidsoppgaver}
                            settVerdi={(verdi) => setArbeidsoppgaver(verdi)}
                            maxLengde={500}
                            feilmelding="arbeidsoppgave er påkrevd"
                        />
                    </div>
                    <div className={styles.stillingInput}>
                        <StillingsprosentInput
                            label="Stillingsprosent"
                            verdi={stillingprosent}
                            settVerdi={(verdi) => setStillingprosent(verdi)}
                        />
                        <AntallDagerInput
                            label="Antall dager per uke"
                            verdi={antallDagerPerUke}
                            settVerdi={(verdi) => setAntallDagerPerUke(verdi)}
                        />
                    </div>
                    {(erLtsUtenSommerjobb || erVtao) && (
                        <Stillingstype
                            avtaleInnhold={avtale.gjeldendeInnhold}
                            tiltakstype={avtale.tiltakstype}
                            className={styles.stillingstype}
                            settVerdi={(verdi) => setStillingstype(verdi)}
                        />
                    )}
                    {erLtsUtenSommerjobb && !erAvtaleInngatt && (
                        <RadioGroup
                            legend="Hva er formålet med avtalen?"
                            className={styles.lonnstilskuddFormaal}
                            value={lonnstilskuddFormaal ?? ''}
                        >
                            {(['SKAFFE_ARBEID', 'BEHOLDE_ARBEID'] as LonnstilskuddFormaal[]).map((formaal) => {
                                return (
                                    <RadioPanel
                                        key={formaal}
                                        onChange={() => setLonnstilskuddFormaal(formaal)}
                                        checked={formaal === lonnstilskuddFormaal}
                                        name="lonnstilskuddFormaal"
                                        value={formaal}
                                    >
                                        {lonnstilskuddFormaalMsg[formaal]}
                                    </RadioPanel>
                                );
                            })}
                        </RadioGroup>
                    )}
                </div>
            </BekreftelseModal>
        </>
    );
};
export default EndreStillingbeskrivelse;
