import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { RadioPanel, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import amplitude from '@/utils/amplitude';
import { Feilmeldinger } from '@/types/feilkode';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';

interface Props {
    className: string;
    valgtTiltaksType: TiltaksType | undefined;
    setTiltaksType: Dispatch<SetStateAction<TiltaksType | undefined>>;
    ugyldigAvtaletype: boolean;
    setUgyldigAvtaletype: Dispatch<SetStateAction<boolean>>;
}

const TiltaksTypeRadioPanel: FunctionComponent<Props> = ({
    valgtTiltaksType,
    setTiltaksType,
    ugyldigAvtaletype,
    setUgyldigAvtaletype,
    className,
}) => {
    const cls = BEMHelper(className);
    return (
        <Innholdsboks className={cls.element('valg-tiltakstype-container')}>
            <Systemtittel>Velg type avtale</Systemtittel>
            <Normaltekst>
                Ønsker du å vite mer om de ulike støtteordningene finner du informasjon på NAV sine sider{' '}
                <EksternLenke
                    onClick={() => amplitude.logEvent('#tiltak-veileder-hvordan-kan-nav-hjelpe-med-inkludering-apnet')}
                    href="https://arbeidsgiver.nav.no/veiviserarbeidsgiver/tema/hvordan-kan-nav-hjelpe-med-inkludering"
                >
                    hvordan kan NAV hjelpe med inkludering
                </EksternLenke>
            </Normaltekst>
            <div className={cls.element('tiltakstype-wrapper')}>
                <RadioPanel
                    name="tiltakstype"
                    label="Arbeidstrening"
                    value="ARBEIDSTRENING"
                    checked={valgtTiltaksType === 'ARBEIDSTRENING'}
                    onChange={() => {
                        setTiltaksType('ARBEIDSTRENING');
                        setUgyldigAvtaletype(false);
                    }}
                />
                <RadioPanel
                    name="tiltakstype"
                    label="Midlertidig lønnstilskudd"
                    value="MIDLERTIDIG_LONNSTILSKUDD"
                    checked={valgtTiltaksType === 'MIDLERTIDIG_LONNSTILSKUDD'}
                    onChange={() => {
                        setTiltaksType('MIDLERTIDIG_LONNSTILSKUDD');
                        setUgyldigAvtaletype(false);
                    }}
                />
                <RadioPanel
                    name="tiltakstype"
                    label="Varig lønnstilskudd"
                    value="VARIG_LONNSTILSKUDD"
                    checked={valgtTiltaksType === 'VARIG_LONNSTILSKUDD'}
                    onChange={() => {
                        setTiltaksType('VARIG_LONNSTILSKUDD');
                        setUgyldigAvtaletype(false);
                    }}
                />

                <RadioPanel
                    name="tiltakstype"
                    label="Mentor"
                    value="MENTOR"
                    checked={valgtTiltaksType === 'MENTOR'}
                    onChange={() => {
                        setTiltaksType('MENTOR');
                        setUgyldigAvtaletype(false);
                    }}
                />

                <RadioPanel
                    name="tiltakstype"
                    label="Inkluderingstilskudd"
                    value="INKLUDERINGSTILSKUDD"
                    checked={valgtTiltaksType === 'INKLUDERINGSTILSKUDD'}
                    onChange={() => {
                        setTiltaksType('INKLUDERINGSTILSKUDD');
                        setUgyldigAvtaletype(false);
                    }}
                />

                <RadioPanel
                    name="tiltakstype"
                    label="Sommerjobb"
                    value="SOMMERJOBB"
                    checked={valgtTiltaksType === 'SOMMERJOBB'}
                    onChange={() => {
                        setTiltaksType('SOMMERJOBB');
                        setUgyldigAvtaletype(false);
                    }}
                />
            </div>
            {ugyldigAvtaletype && (
                <SkjemaelementFeilmelding>{Feilmeldinger.UGYLDIG_AVTALETYPE}</SkjemaelementFeilmelding>
            )}
        </Innholdsboks>
    );
};
export default TiltaksTypeRadioPanel;
