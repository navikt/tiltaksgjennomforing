import { AvtaleContext } from '@/AvtaleProvider';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import { oppdatereKontaktInformasjon } from '@/services/rest-service';
import { EndreKontaktInfo, TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Neutral } from '@navikt/ds-icons/cjs';
import { Checkbox, Heading, Link } from '@navikt/ds-react';
import React, { FunctionComponent, useContext, useState } from 'react';
import './EndreKontaktInformasjon.less';

const EndreKontaktInformasjon: FunctionComponent = () => {
    const cls = BEMHelper('endreKontaktInformasjon');
    const context = useContext(AvtaleContext);
    const {
        deltakerFornavn,
        deltakerEtternavn,
        deltakerTlf,
        veilederFornavn,
        veilederEtternavn,
        veilederTlf,
        arbeidsgiverFornavn,
        arbeidsgiverEtternavn,
        arbeidsgiverTlf,
        refusjonKontaktperson,
    } = context.avtale.gjeldendeInnhold;
    const [modalApen, setModalApen] = useState(false);

    const type: TiltaksType = context.avtale.tiltakstype;
    const endreRefusjonInfo: boolean =
        type === 'MIDLERTIDIG_LONNSTILSKUDD' || type === 'VARIG_LONNSTILSKUDD' || type === 'SOMMERJOBB';

    const [kontaktInfo, setKontaktInfo] = useState<EndreKontaktInfo>({
        deltakerFornavn: deltakerFornavn,
        deltakerEtternavn: deltakerEtternavn,
        deltakerTlf: deltakerTlf,
        veilederFornavn: veilederFornavn,
        veilederEtternavn: veilederEtternavn,
        veilederTlf: veilederTlf,
        arbeidsgiverFornavn: arbeidsgiverFornavn,
        arbeidsgiverEtternavn: arbeidsgiverEtternavn,
        arbeidsgiverTlf: arbeidsgiverTlf,
        refusjonKontaktperson: {
            refusjonKontaktpersonFornavn: refusjonKontaktperson?.refusjonKontaktpersonFornavn,
            refusjonKontaktpersonEtternavn: refusjonKontaktperson?.refusjonKontaktpersonEtternavn,
            refusjonKontaktpersonTlf: refusjonKontaktperson?.refusjonKontaktpersonTlf,
            ønskerVarslingOmRefusjon: refusjonKontaktperson?.ønskerVarslingOmRefusjon
        },
    });

    const endreKontaktInformasjon = async (): Promise<void> => {
        await oppdatereKontaktInformasjon(context.avtale, kontaktInfo);
        setModalApen(false);
        await context.hentAvtale(context.avtale.id);
    };

    const settNyKontaktInformasjon = async <K extends keyof EndreKontaktInfo, V extends EndreKontaktInfo>(
        key: K,
        verdi: V[K]
    ) => {
        setKontaktInfo((prevState) => ({
            ...prevState,
            [key]: verdi,
        }));
    };

    const settØnskerVarsling = () => {
        if(kontaktInfo.refusjonKontaktperson.ønskerVarslingOmRefusjon === true) {
            setKontaktInfo((prevState) => ({...prevState, refusjonKontaktperson: {...prevState.refusjonKontaktperson, ønskerVarslingOmRefusjon: false}}));
        } else {
            setKontaktInfo((prevState) => ({...prevState, refusjonKontaktperson: {...prevState.refusjonKontaktperson, ønskerVarslingOmRefusjon: true}}));
        }
    }

    return (
        <>
            <Link
                onClick={(event) => {
                    event.stopPropagation();
                    setModalApen(true);
                }}
                href="#"
                role="menuitem"
                className={cls.element('link')}
            >
                <div aria-hidden={true}>
                    <Neutral className={cls.element('ikon')} />
                </div>
                Endre kontaktinformasjon
            </Link>
            <BekreftelseModal
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Endre"
                oversiktTekst="Endre kontaktinformasjon"
                modalIsOpen={modalApen}
                bekreftOnClick={endreKontaktInformasjon}
                lukkModal={() => setModalApen(false)}
            >
                
                <Heading size="small" className={cls.element('tittel')}>
                    Informasjon om deltaker
                </Heading>
                <div className={cls.element('rad')}>
                    <PakrevdInput
                        label="Fornavn"
                        verdi={kontaktInfo.deltakerFornavn}
                        settVerdi={(verdi) => settNyKontaktInformasjon('deltakerFornavn', verdi)}
                    />
                    <PakrevdInput
                        label="Etternavn"
                        verdi={kontaktInfo.deltakerEtternavn}
                        settVerdi={(verdi) => settNyKontaktInformasjon('deltakerEtternavn', verdi)}
                    />
                </div>
                <div className={cls.element('rad')}>
                    <TelefonnummerInput
                        label="Mobilnummer "
                        verdi={kontaktInfo.deltakerTlf}
                        settVerdi={(verdi) => settNyKontaktInformasjon('deltakerTlf', verdi)}
                    />
                </div>     
                <Heading size="small" className={cls.element('tittel')}>
                    Informasjon om veileder
                </Heading>
                <div className={cls.element('rad')}>
                    <PakrevdInput
                        label="Fornavn"
                        verdi={kontaktInfo.veilederFornavn}
                        settVerdi={(verdi) => settNyKontaktInformasjon('veilederFornavn', verdi)}
                    />
                    <PakrevdInput
                        label="Etternavn"
                        verdi={kontaktInfo.veilederEtternavn}
                        settVerdi={(verdi) => settNyKontaktInformasjon('veilederEtternavn', verdi)}
                    />
                </div>
                <div className={cls.element('rad')}>
                        <TelefonnummerInput
                            label="Mobilnummer"
                            verdi={kontaktInfo.veilederTlf}
                            settVerdi={(verdi) => settNyKontaktInformasjon('veilederTlf', verdi)}
                        />
                </div>
                <Heading size="small" className={cls.element('tittel')}>
                    Kontaktperson for avtalen i bedriften
                </Heading>
                <div className={cls.element('rad')}>
                    <PakrevdInput
                        label="Fornavn"
                        verdi={kontaktInfo.arbeidsgiverFornavn}
                        settVerdi={(verdi) => settNyKontaktInformasjon('arbeidsgiverFornavn', verdi)}
                    />
                    <PakrevdInput
                        label="Etternavn"
                        verdi={kontaktInfo.arbeidsgiverEtternavn}
                        settVerdi={(verdi) => settNyKontaktInformasjon('arbeidsgiverEtternavn', verdi)}
                    />
                    </div>
                    <div className={cls.element('rad')}>
                    <TelefonnummerInput
                        label="Mobilnummer"
                        verdi={kontaktInfo.arbeidsgiverTlf}
                        settVerdi={(verdi) => settNyKontaktInformasjon('arbeidsgiverTlf', verdi)}
                    />
                </div>
                
                {endreRefusjonInfo && (
                    <div className={cls.element('avsnitt')}>
                        <Heading size="small" className={cls.element('tittel')}>
                            Kontaktperson for refusjon i bedriften
                        </Heading>
                        <div className={cls.element('rad')}>
                            <PakrevdInput
                                label="Fornavn"
                                verdi={kontaktInfo.refusjonKontaktperson.refusjonKontaktpersonFornavn}
                                settVerdi={(verdi) =>
                                    settNyKontaktInformasjon('refusjonKontaktperson', {
                                        ...kontaktInfo.refusjonKontaktperson,
                                        refusjonKontaktpersonFornavn: verdi,
                                    })
                                }
                            />
                            <PakrevdInput
                                label="Etternavn"
                                verdi={kontaktInfo.refusjonKontaktperson.refusjonKontaktpersonEtternavn}
                                settVerdi={(verdi) =>
                                    settNyKontaktInformasjon('refusjonKontaktperson', {
                                        ...kontaktInfo.refusjonKontaktperson,
                                        refusjonKontaktpersonEtternavn: verdi,
                                    })
                                }
                            />
                        </div>
                        <div className={cls.element('rad')}>
                            <TelefonnummerInput
                                label="Mobilnummer"
                                verdi={kontaktInfo.refusjonKontaktperson.refusjonKontaktpersonTlf}
                                settVerdi={(verdi) =>
                                    settNyKontaktInformasjon('refusjonKontaktperson', {
                                        ...kontaktInfo.refusjonKontaktperson,
                                        refusjonKontaktpersonTlf: verdi,
                                    })
                                }
                            />
                        </div>
                            <Checkbox
                                checked={kontaktInfo.refusjonKontaktperson.ønskerVarslingOmRefusjon}
                                onChange={() => settØnskerVarsling()}
                            >
                                Arbeidsgiver for avtalen ønsker også å motta varslinger om
                                refusjon
                            </Checkbox>
                    </div>
                )}
            </BekreftelseModal>
        </>
    );
};

export default EndreKontaktInformasjon;
