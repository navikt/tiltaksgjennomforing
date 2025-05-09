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
    const rundSkrivLenker: { [key in TiltaksType]: string } = {
        ARBEIDSTRENING: 'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_4',
        MENTOR: 'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_6',
        SOMMERJOBB: 'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_9',
        MIDLERTIDIG_LONNSTILSKUDD: 'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_10',
        VARIG_LONNSTILSKUDD: 'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_11',
        INKLUDERINGSTILSKUDD: 'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_12',
        VTAO: 'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_15',
    };
    return (
        <IkonTekstRad
            svgIkon={<GavelSoundBlockIcon title="Hva sier regelverket?" />}
            headerTekst={{ tekst: 'Hva sier regelverket?', headingType: 'small' }}
        >
            <div className={cls.element('kravomrefusjonlinker')}>
                <EksternLenke href={href}>Forskrift om arbeidsmarkedstiltak (tiltaksforskriften)</EksternLenke>
                <EksternLenke href={rundSkrivLenker[tiltakstype]}>Utfyllende regler til forskriften</EksternLenke>
            </div>
        </IkonTekstRad>
    );
};
export default HvaSierRegelverket;
