import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import RadioPanel from '@/komponenter/radiopanel/RadioPanel';
import { tiltakstypeTekst } from '@/messages';
import { TiltaksType } from '@/types/avtale';
import { Feilmeldinger } from '@/types/feilkode';
import BEMHelper from '@/utils/bem';
import { storForbokstav } from '@/utils/stringUtils';
import { BodyLong, ErrorMessage, Heading, RadioGroup } from '@navikt/ds-react';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { useFeatureToggles } from '@/FeatureToggleProvider';
import { vtaoToggleFilter } from '@/utils/vtaoToggleFilter';

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

    const { vtaoTiltakToggle } = useFeatureToggles();

    return (
        <Innholdsboks className={cls.element('valg-tiltakstype-container')}>
            <Heading level="2" size="medium">
                Velg type avtale
            </Heading>
            <BodyLong size="small" className={cls.element('valg-tiltakstype-tekst')}>
                Ønsker du å vite mer om de ulike støtteordningene finner du informasjon på NAV sine sider{' '}
                <EksternLenke href="https://www.nav.no/arbeidsgiver/inkludere">
                    hvordan kan NAV hjelpe med inkludering
                </EksternLenke>
            </BodyLong>

            <div className={cls.element('tiltakstype-container')}>
                <RadioGroup legend="" className={cls.element('tiltakstype-wrapper')} size="medium">
                    {vtaoToggleFilter(vtaoTiltakToggle).map((valg: TiltaksType, index: number) => (
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
