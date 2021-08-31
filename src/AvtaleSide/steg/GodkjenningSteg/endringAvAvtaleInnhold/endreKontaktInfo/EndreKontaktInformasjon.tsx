import { AvtaleContext } from '@/AvtaleProvider';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import { oppdatereKontaktInformasjon } from '@/services/rest-service';
import { EndreKontaktInfo } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Neutral } from '@navikt/ds-icons/cjs';
import Lenke from 'nav-frontend-lenker';
import { Undertittel } from 'nav-frontend-typografi';
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
    } = context.avtale;
    const [modalApen, setModalApen] = useState(false);

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
        await setKontaktInfo((prevState) => ({
            ...prevState,
            [key]: verdi,
        }));
    };

    const endreKontaktInformasjonInnhold = (
        <div className={cls.className}>
            <div className={cls.element('tittel')}>
                <Undertittel>Informasjon om deltaker</Undertittel>
                <div className={cls.element('inputfelter')}>
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
                    <PakrevdInput
                        label="Telefonnummer "
                        verdi={kontaktInfo.deltakerTlf}
                        settVerdi={(verdi) => settNyKontaktInformasjon('deltakerTlf', verdi)}
                    />
                </div>
            </div>
            <div className={cls.element('tittel')}>
                <Undertittel>Informasjon om veileder</Undertittel>
                <div className={cls.element('inputfelter')}>
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
                    <PakrevdInput
                        label="Telefonnummer "
                        verdi={kontaktInfo.veilederTlf}
                        settVerdi={(verdi) => settNyKontaktInformasjon('veilederTlf', verdi)}
                    />
                </div>
            </div>
            <div className={cls.element('tittel')}>
                <Undertittel>Kontaktperson for avtalen i bedriften</Undertittel>
                <div className={cls.element('inputfelter')}>
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
                    <PakrevdInput
                        label="Telefonnummer"
                        verdi={kontaktInfo.arbeidsgiverTlf}
                        settVerdi={(verdi) => settNyKontaktInformasjon('arbeidsgiverTlf', verdi)}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Lenke
                onClick={(event) => {
                    event.stopPropagation();
                    setModalApen(true);
                }}
                href="#"
                role="menuitem"
                className={cls.element('lenke')}
            >
                <div aria-hidden={true}>
                    <Neutral className={cls.element('ikon')} />
                </div>
                Endre kontaktinformasjon
            </Lenke>
            <BekreftelseModal
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Endre"
                oversiktTekst="Endre kontaktinformasjon"
                modalIsOpen={modalApen}
                bekreftOnClick={endreKontaktInformasjon}
                lukkModal={() => setModalApen(false)}
                varselTekst={endreKontaktInformasjonInnhold}
            />
        </>
    );
};

export default EndreKontaktInformasjon;
