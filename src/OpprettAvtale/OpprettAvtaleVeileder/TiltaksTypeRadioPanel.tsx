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
import { useFeatureToggles, useMigreringSkrivebeskyttet } from '@/FeatureToggles';
import { tiltakToggleFilter } from '@/utils/firearigltToggleFilter';

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
    const erSkrivebeskyttet = useMigreringSkrivebeskyttet();
    const cls = BEMHelper(className);
    const { firearigLonnstilskudd } = useFeatureToggles();

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
                    {tiltakToggleFilter(firearigLonnstilskudd).map((tiltakstype: TiltaksType, index: number) => (
                        <RadioPanel
                            key={tiltakstype}
                            name="tiltakstype"
                            value={tiltakstype}
                            checked={valgtTiltaksType === tiltakstype}
                            disabled={erSkrivebeskyttet(tiltakstype)}
                            onChange={() => {
                                setTiltaksType(tiltakstype);
                                setUgyldigAvtaletype(false);
                            }}
                        >
                            {storForbokstav(tiltakstypeTekst[tiltakstype])}
                        </RadioPanel>
                    ))}
                </RadioGroup>
            </div>
            {ugyldigAvtaletype && <ErrorMessage>{Feilmeldinger.UGYLDIG_AVTALETYPE}</ErrorMessage>}
        </Innholdsboks>
    );
};
export default TiltaksTypeRadioPanel;
