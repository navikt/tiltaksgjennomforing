import React, { FunctionComponent, PropsWithChildren } from 'react';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import { GavelSoundBlockIcon } from '@navikt/aksel-icons';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import BEMHelper from '@/utils/bem';
import { TiltaksType } from '@/types/avtale';

interface Props {
    tiltakstype: TiltaksType;
    href: string;
}

const HvaSierRegelverket: FunctionComponent<PropsWithChildren<Props>> = ({ tiltakstype, href }) => {
    const cls = BEMHelper('instruks');
    return (
        <IkonTekstRad
            svgIkon={<GavelSoundBlockIcon title="Hva sier regelverket?" />}
            headerTekst={{ tekst: 'Hva sier regelverket?', headingType: 'small' }}
        >
            <div className={cls.element('kravomrefusjonlinker')}>
                {tiltakstype === 'MENTOR' && (
                    <EksternLenke
                        href={
                            'https://www.nav.no/nav.no-ressurser/filer/person/arbeid/diverse/krav-vilkar-og-informasjon-til-tiltaksarrangor-mentor-bm.pdf'
                        }
                    >
                        Krav, vilkår og informasjon
                    </EksternLenke>
                )}
                <EksternLenke href={href}>Forskrift om arbeidsmarkedstiltak (tiltaksforskriften)</EksternLenke>
                {tiltakstype !== 'MENTOR' && tiltakstype !== 'INKLUDERINGSTILSKUDD' && (
                    <EksternLenke href={'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_10'}>
                        Utfyllende regler til forskriften
                    </EksternLenke>
                )}
                {tiltakstype === 'INKLUDERINGSTILSKUDD' && (
                    <>
                        <EksternLenke href={'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_12'}>
                            Utfyllende regler til forskriften
                        </EksternLenke>
                        <EksternLenke href="https://www.nav.no/nav.no-ressurser/filer/person/arbeid/diverse/krav-vilkar-og-informasjon-til-tiltaksarrangor-inkluderingstilskudd.pdf">
                            Krav og vilkår til inkluderingstilskudd
                        </EksternLenke>
                    </>
                )}
                {tiltakstype === 'MENTOR' && (
                    <EksternLenke href={'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_6'}>
                        Utfyllende regler til Arbeids- og velferdsetatens anvendelse av forskrift om
                        arbeidsmarkedstiltak
                    </EksternLenke>
                )}
                {tiltakstype === 'SOMMERJOBB' && (
                    <EksternLenke
                        href={
                            'https://www.nav.no/no/person/arbeid/tilskudd-til-sommerjobb#kort-om-tilskudd-til-sommerjobb'
                        }
                    >
                        Krav og vilkår til sommerjobb
                    </EksternLenke>
                )}
            </div>
        </IkonTekstRad>
    );
};
export default HvaSierRegelverket;
