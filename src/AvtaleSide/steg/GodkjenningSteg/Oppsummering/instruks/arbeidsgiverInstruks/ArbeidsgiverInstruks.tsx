import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import VeilederpanelMedUtklippstavle from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { BodyShort, Label } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import '../instruks.less';
import OppfolgingOgVarighet from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/arbeidsgiverInstruks/tekster/OppfølgingOgVarighet';
import ArbeidsmiljLoven from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/arbeidsgiverInstruks/tekster/Arbeidsmiljøloven';
import YrkesskadeforsikringOgSkadeerstatning from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/arbeidsgiverInstruks/tekster/YrkesskadeforsikringOgSkadeerstatning';
import FolketrygdlovenEgenmeldingOgSykmelding from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/arbeidsgiverInstruks/tekster/FolketrygdlovenEgenmeldingOgSykmelding';
import BehandlingAvPersonopplysninger from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/arbeidsgiverInstruks/tekster/BehandlingAvPersonopplysninger';
import TilskuddsperiodeOgRefusjon from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/arbeidsgiverInstruks/tekster/TilskuddsperiodeOgRefusjon';
import Refusjon from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/arbeidsgiverInstruks/tekster/Refusjon';
import HvaSierRegelverket from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/arbeidsgiverInstruks/tekster/HvaSierRegelverket';
import Taushetsplikt from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/arbeidsgiverInstruks/tekster/Taushetsplikt';

const cls = BEMHelper('instruks');
interface Props {
    erLaast: boolean;
    tiltakstype: TiltaksType;
}
const ArbeidsgiverInstruks: FunctionComponent<Props> = (props) => {
    const { erLaast, tiltakstype } = props;
    const oppfolgingLenker: { [key in TiltaksType]: string } = {
        MIDLERTIDIG_LONNSTILSKUDD: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_9',
        VARIG_LONNSTILSKUDD: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_10',
        SOMMERJOBB: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_8',
        INKLUDERINGSTILSKUDD: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598#KAPITTEL_11',
        ARBEIDSTRENING: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598/kap3#kap3',
        MENTOR: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598/kap3#kap5',
        VTAO: 'https://lovdata.no/dokument/SF/forskrift/2015-12-11-1598/KAPITTEL_14#KAPITTEL_14',
    };
    return (
        <>
            {!erLaast && (
                <BodyShort size="small">
                    Når dere godkjenner denne avtalen, samtykker dere samtidig følgende forpliktelser overfor NAV.
                </BodyShort>
            )}
            <VeilederpanelMedUtklippstavle>
                <div className={cls.element('container')}>
                    <div className={cls.element('subheader')}>
                        <Label>Som arbeidsgiver må dere:</Label>
                    </div>

                    <VerticalSpacer rem={2} />
                    <ArbeidsmiljLoven tiltakstype={tiltakstype} />
                    <OppfolgingOgVarighet
                        tiltakstype={tiltakstype}
                        eksternLenke={oppfolgingLenker[props.tiltakstype]}
                    />
                    <YrkesskadeforsikringOgSkadeerstatning tiltakstype={tiltakstype} />
                    <FolketrygdlovenEgenmeldingOgSykmelding tiltakstype={tiltakstype} />
                    <TilskuddsperiodeOgRefusjon tiltakstype={tiltakstype} />
                    <Refusjon tiltakstype={tiltakstype} />
                    <BehandlingAvPersonopplysninger />
                    <Taushetsplikt />
                    <HvaSierRegelverket tiltakstype={tiltakstype} href={oppfolgingLenker[props.tiltakstype]} />
                </div>
            </VeilederpanelMedUtklippstavle>
        </>
    );
};

export default ArbeidsgiverInstruks;
