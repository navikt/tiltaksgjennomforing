import type { FunctionComponent } from 'react';
import { useContext } from 'react';
import { AvtaleContext } from '@/AvtaleProvider';
import TilskuddsperiodeBehandlingsTittel from '@/BeslutterSide/beslutterPanel/TilskuddsperiodeBehandlingsTittel';
import styles from './beslutterPanel.module.less';
import InfoRadBesluttervisning from './InfoRadBesluttervisning';
import NavnMedDiskresjonskode from '@/AvtaleOversikt/NavnMedDiskresjonskode';
import { formaterPeriode } from '@/utils/datoUtils';
import HentNavEnhetFraContext from '@/utils/HentNavEnhetFraContext';
import TilskuddsperiodeEndreKostnadssted from './TilskuddsperiodeEndreKostnadssted';
import { Box, Label } from '@navikt/ds-react';
import { useAvtaleKreverAktsomhet } from '@/services/use-rest';
import Row from '@/komponenter/NavGrid/Row';

const BeslutterPanel: FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);
    const gjeldendeTilskuddsperiode = avtale.gjeldendeTilskuddsperiode;
    const { data: aktsomhet } = useAvtaleKreverAktsomhet(avtale.id);

    if (!gjeldendeTilskuddsperiode) {
        return <div>Ingen tilskuddsperioder</div>;
    }

    return (
        <div className={styles.beslutterPanel}>
            <TilskuddsperiodeBehandlingsTittel />
            <InfoRadBesluttervisning feltnavn="Avtalenummer" verdi={avtale.avtaleNr} className={styles.avtalenummer} />
            <InfoRadBesluttervisning
                feltnavn="Deltaker"
                verdi={
                    <NavnMedDiskresjonskode
                        diskresjonskode={aktsomhet?.diskresjonskode}
                        fornavn={avtale.gjeldendeInnhold.deltakerFornavn}
                        etternavn={avtale.gjeldendeInnhold.deltakerEtternavn}
                        inline
                    />
                }
            />
            <InfoRadBesluttervisning feltnavn="Arbeidsgiver" verdi={avtale.gjeldendeInnhold.bedriftNavn} />
            <InfoRadBesluttervisning
                feltnavn="Periode"
                verdi={formaterPeriode(gjeldendeTilskuddsperiode.startDato, gjeldendeTilskuddsperiode.sluttDato)}
            />
            <InfoRadBesluttervisning
                feltnavn="Geografisk enhet"
                verdi={
                    <HentNavEnhetFraContext
                        className={'enhet-geo'}
                        enhetsnr="enhetGeografisk"
                        enhetsNavn="enhetsnavnGeografisk"
                    />
                }
            />
            <InfoRadBesluttervisning
                feltnavn="Oppfølgingsenhet"
                verdi={
                    <HentNavEnhetFraContext
                        className={'enhet-oppfolging'}
                        enhetsnr="enhetOppfolging"
                        enhetsNavn="enhetsnavnOppfolging"
                    />
                }
            />
            <TilskuddsperiodeEndreKostnadssted />
        </div>
    );
};
export default BeslutterPanel;
