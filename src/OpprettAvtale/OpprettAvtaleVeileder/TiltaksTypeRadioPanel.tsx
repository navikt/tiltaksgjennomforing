import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import BEMHelper from '@/utils/bem';
import amplitude from '@/utils/amplitude';
import { TiltaksType } from '@/types/avtale';
import { Feilmeldinger } from '@/types/feilkode';
import { BodyLong, Heading, RadioGroup, ErrorMessage } from '@navikt/ds-react';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import RadioPanel from '@/komponenter/radiopanel/RadioPanel';

interface Props {
    className: string;
    valgtTiltaksType: TiltaksType | undefined;
    setTiltaksType: Dispatch<SetStateAction<TiltaksType | undefined>>;
    ugyldigAvtaletype: boolean;
    setUgyldigAvtaletype: Dispatch<SetStateAction<boolean>>;
}

type Tiltaksvalg =
    | 'ARBEIDSTRENING'
    | 'MIDLERTIDIG_LONNSTILSKUDD'
    | 'VARIG_LONNSTILSKUDD'
    | 'MENTOR'
    | 'INKLUDERINGSTILSKUDD'
    | 'SOMMERJOBB';

const TiltaksTypeRadioPanel: FunctionComponent<Props> = ({
    valgtTiltaksType,
    setTiltaksType,
    ugyldigAvtaletype,
    setUgyldigAvtaletype,
    className,
}) => {
    const cls = BEMHelper(className);
    const tiltakvalg: Tiltaksvalg[] = [
        'ARBEIDSTRENING',
        'MIDLERTIDIG_LONNSTILSKUDD',
        'VARIG_LONNSTILSKUDD',
        'MENTOR',
        'INKLUDERINGSTILSKUDD',
        'SOMMERJOBB',
    ];
    return (
        <Innholdsboks className={cls.element('valg-tiltakstype-container')}>
            <Heading size="medium">Velg type avtale</Heading>
            <BodyLong size="small" className={cls.element('valg-tiltakstype-tekst')}>
                Ønsker du å vite mer om de ulike støtteordningene finner du informasjon på NAV sine sider{' '}
                <EksternLenke
                    onClick={() => amplitude.logEvent('#tiltak-veileder-hvordan-kan-nav-hjelpe-med-inkludering-apnet')}
                    href="https://arbeidsgiver.nav.no/veiviserarbeidsgiver/tema/hvordan-kan-nav-hjelpe-med-inkludering"
                >
                    hvordan kan NAV hjelpe med inkludering
                </EksternLenke>
            </BodyLong>

            <div className={cls.element('tiltakstype-container')}>
                <RadioGroup legend="" className={cls.element('tiltakstype-wrapper')} size="medium">
                    {tiltakvalg.map((valg: Tiltaksvalg, index: number) => (
                        <RadioPanel
                            key={index}
                            name="tiltakstype"
                            value={valg}
                            checked={valgtTiltaksType === valg}
                            onChange={() => {
                                setTiltaksType(valg);
                                setUgyldigAvtaletype(false);
                            }}
                        >
                            {valg.replace('_', ' ').toLowerCase()}
                        </RadioPanel>
                    ))}
                </RadioGroup>
            </div>
            {ugyldigAvtaletype && (
                <ErrorMessage>{Feilmeldinger.UGYLDIG_AVTALETYPE}</ErrorMessage>
            )}
        </Innholdsboks>
    );
};
export default TiltaksTypeRadioPanel;
