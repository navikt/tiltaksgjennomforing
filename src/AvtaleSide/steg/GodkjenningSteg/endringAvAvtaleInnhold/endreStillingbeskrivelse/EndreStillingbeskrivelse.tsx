import { useAvtale } from '@/AvtaleProvider';
import StillingsTittelVelger, { StillingOptions } from '@/AvtaleSide/steg/StillingSteg/StillingsTittelVelger';
import useStilling from '@/AvtaleSide/steg/StillingSteg/useStilling';
import StillingsprosentInput from '@/AvtaleSide/steg/VarighetSteg/StillingsprosentInput/StillingsprosentInput';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { EndreStilling, oppdatereStillingbeskrivelse } from '@/services/rest-service';
import { Label, Link } from '@navikt/ds-react';
import { useState } from 'react';
import type { FunctionComponent } from 'react';
import AntallDagerInput from '@/AvtaleSide/steg/VarighetSteg/AntallDagerInput';
import { TiltaksType } from '@/types';
import { ChatElipsisIcon } from '@navikt/aksel-icons';
import styles from './EndreStillingbeskrivelse.module.less';
import LonnstilskuddFormaal from '@/AvtaleSide/steg/StillingSteg/LonnstilskuddFormaal';
import Stillingstype from '@/AvtaleSide/steg/StillingSteg/Stillingstype';

const LTS_UTEN_SOMMERJOBB = [
    'MIDLERTIDIG_LONNSTILSKUDD',
    'VARIG_LONNSTILSKUDD',
    'FIREARIG_LONNSTILSKUDD',
] as Partial<TiltaksType>[];

const VARIG_ELLER_MIDLERTIDIG_LTS = ['MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD'] as Partial<TiltaksType>[];

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

    const erLtsUtenSommerjobb = LTS_UTEN_SOMMERJOBB.includes(avtale.tiltakstype);
    const erVarigEllerMidlertidigLts = VARIG_ELLER_MIDLERTIDIG_LTS.includes(avtale.tiltakstype);
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
                    <ChatElipsisIcon className={styles.ikon} />
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
                            settVerdi={(verdi) => setStillingstype(verdi)}
                        />
                    )}
                    {erVarigEllerMidlertidigLts && (
                        <LonnstilskuddFormaal
                            tiltakstype={avtale.tiltakstype}
                            className={styles.lonnstilskuddFormaal}
                            verdi={lonnstilskuddFormaal}
                            settVerdi={(verdi) => setLonnstilskuddFormaal(verdi)}
                        />
                    )}
                </div>
            </BekreftelseModal>
        </>
    );
};
export default EndreStillingbeskrivelse;
