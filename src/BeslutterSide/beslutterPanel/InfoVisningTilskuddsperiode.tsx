import React, { FunctionComponent, useContext } from 'react';
import { formaterPeriode } from '@/utils/datoUtils';
import HentNavEnhetFraContext from '@/utils/HentNavEnhetFraContext';
import { Label } from '@navikt/ds-react';
import BEMHelper from '@/utils/bem';
import InfoRadBesluttervisning from '@/BeslutterSide/beslutterPanel/InfoRadBesluttervisning';
import TilskuddsperiodeEndreKostnadssted from '@/BeslutterSide/beslutterPanel/TilskuddsperiodeEndreKostnadssted';
import { AvtaleContext } from '@/AvtaleProvider';
import NavnMedDiskresjonskode from '@/AvtaleOversikt/NavnMedDiskresjonskode';
import { useAvtaleKreverAktsomhet } from '@/services/use-rest';

const InfoVisningTilskuddsperiode: FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);
    const { gjeldendeTilskuddsperiode } = avtale;
    const { data: aktsomhet } = useAvtaleKreverAktsomhet(avtale.id);
    const cls = BEMHelper('beslutter-panel');

    if (!gjeldendeTilskuddsperiode) {
        return null;
    }

    return (
        <>
            <InfoRadBesluttervisning metadata="Avtalenummer" info={avtale.avtaleNr} />
            <div className={cls.element('grid-container')}>
                <div className={cls.element('infovisning-gruppe')}>
                    <InfoRadBesluttervisning
                        metadata="Deltaker"
                        info={
                            <NavnMedDiskresjonskode
                                diskresjonskode={aktsomhet?.diskresjonskode}
                                fornavn={avtale.gjeldendeInnhold.deltakerFornavn}
                                etternavn={avtale.gjeldendeInnhold.deltakerEtternavn}
                                inline
                            />
                        }
                    />
                    <InfoRadBesluttervisning metadata="Arbeidsgiver" info={avtale.gjeldendeInnhold.bedriftNavn} />
                    <InfoRadBesluttervisning
                        metadata="Periode"
                        info={formaterPeriode(gjeldendeTilskuddsperiode.startDato, gjeldendeTilskuddsperiode.sluttDato)}
                        style={{ minHeight: '2rem' }}
                    />
                </div>
                <div className={cls.element('infovisning-gruppe')}>
                    <InfoRadBesluttervisning
                        metadata="Geografisk enhet"
                        info={
                            <HentNavEnhetFraContext
                                className={cls.className}
                                enhetsnr="enhetGeografisk"
                                enhetsNavn="enhetsnavnGeografisk"
                            />
                        }
                    />
                    <InfoRadBesluttervisning
                        metadata="Oppfølgingsenhet"
                        info={
                            <HentNavEnhetFraContext
                                className={cls.className}
                                enhetsnr="enhetOppfolging"
                                enhetsNavn="enhetsnavnOppfolging"
                            />
                        }
                    />
                    <div className={cls.element('infovisning-rad', 'input')}>
                        <Label>Endre kostnadssted</Label>
                        <TilskuddsperiodeEndreKostnadssted />
                    </div>
                </div>
            </div>
        </>
    );
};
export default InfoVisningTilskuddsperiode;
