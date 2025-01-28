import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import RadioPanel from '@/komponenter/radiopanel/RadioPanel';
import { tiltakstypeTekst } from '@/messages';
import { TiltaksType } from '@/types/avtale';
import { Feilmeldinger } from '@/types/feilkode';
import amplitude from '@/utils/amplitude';
import BEMHelper from '@/utils/bem';
import { storForbokstav } from '@/utils/stringUtils';
import { BodyLong, ErrorMessage, Heading, RadioGroup } from '@navikt/ds-react';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';

import { useFeatureToggles } from '@/FeatureToggleProvider';

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
    | 'SOMMERJOBB'
    | 'VTAO';

const TiltaksTypeRadioPanel: FunctionComponent<Props> = ({
    valgtTiltaksType,
    setTiltaksType,
    ugyldigAvtaletype,
    setUgyldigAvtaletype,
    className,
}) => {
    const cls = BEMHelper(className);

    const { vtaoTiltakToggle } = useFeatureToggles();

    const tiltakvalg: Tiltaksvalg[] = [
        'ARBEIDSTRENING',
        'MIDLERTIDIG_LONNSTILSKUDD',
        'VARIG_LONNSTILSKUDD',
        'MENTOR',
        'INKLUDERINGSTILSKUDD',
        'SOMMERJOBB',
        'VTAO',
    ].filter((tiltak) => {
        if (tiltak === 'VTAO') {
            return vtaoTiltakToggle;
        }
        return true;
    }) as Tiltaksvalg[];

    return (
        <Innholdsboks className={cls.element('valg-tiltakstype-container')}>
            <Heading level="2" size="medium">
                Velg type avtale
            </Heading>
            <BodyLong size="small" className={cls.element('valg-tiltakstype-tekst')}>
                Ønsker du å vite mer om de ulike støtteordningene finner du informasjon på NAV sine sider{' '}
                <EksternLenke
                    onClick={() => amplitude.logEvent('#tiltak-veileder-hvordan-kan-nav-hjelpe-med-inkludering-apnet')}
                    href="https://www.nav.no/arbeidsgiver/inkludere"
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
                            {storForbokstav(tiltakstypeTekst[valg])}
                        </RadioPanel>
                    ))}
                </RadioGroup>
            </div>
            {ugyldigAvtaletype && <ErrorMessage>{Feilmeldinger.UGYLDIG_AVTALETYPE}</ErrorMessage>}
        </Innholdsboks>
    );
};
export default TiltaksTypeRadioPanel;
