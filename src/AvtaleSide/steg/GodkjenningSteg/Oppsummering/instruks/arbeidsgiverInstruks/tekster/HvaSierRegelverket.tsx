import { FunctionComponent, PropsWithChildren } from 'react';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import { GavelSoundBlockIcon } from '@navikt/aksel-icons';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import BEMHelper from '@/utils/bem';
import { TiltaksType } from '@/types/avtale';

interface Props {
    tiltakstype: TiltaksType;
}

const oppfolgingLenker: { [key in TiltaksType]: string } = {
    MIDLERTIDIG_LONNSTILSKUDD: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_9',
    VARIG_LONNSTILSKUDD: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_10',
    SOMMERJOBB: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_8',
    INKLUDERINGSTILSKUDD: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_11',
    ARBEIDSTRENING: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598/kap3#kap3',
    MENTOR: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598/kap3#kap5',
    VTAO: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598/KAPITTEL_14#KAPITTEL_14',
    FIREARIG_LONNSTILSKUDD: 'https://lovdata.no/dokument/LTI/forskrift/2026-02-04-163',
};
const rundSkrivLenker: { [key in TiltaksType]: string } = {
    ARBEIDSTRENING: 'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_4',
    MENTOR: 'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_6',
    SOMMERJOBB: 'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_9',
    MIDLERTIDIG_LONNSTILSKUDD: 'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_10',
    VARIG_LONNSTILSKUDD: 'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_11',
    INKLUDERINGSTILSKUDD: 'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_12',
    VTAO: 'https://lovdata.no/nav/rundskriv/r76-12-01#KAPITTEL_15',
    FIREARIG_LONNSTILSKUDD: 'https://lovdata.no/dokument/LTI/forskrift/2026-02-04-163',
};

const HvaSierRegelverket: FunctionComponent<PropsWithChildren<Props>> = ({ tiltakstype }) => {
    const cls = BEMHelper('instruks');

    return (
        <IkonTekstRad
            svgIkon={<GavelSoundBlockIcon title="Hva sier regelverket?" />}
            headerTekst={{ tekst: 'Hva sier regelverket?', headingType: 'small' }}
        >
            <div className={cls.element('kravomrefusjonlinker')}>
                <EksternLenke href={oppfolgingLenker[tiltakstype]}>
                    Forskrift om arbeidsmarkedstiltak (tiltaksforskriften)
                </EksternLenke>
                <EksternLenke href={rundSkrivLenker[tiltakstype]}>Utfyllende regler til forskriften</EksternLenke>
            </div>
        </IkonTekstRad>
    );
};
export default HvaSierRegelverket;
