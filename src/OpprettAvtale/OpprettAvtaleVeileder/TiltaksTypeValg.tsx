import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { tiltakstypeTekst } from '@/messages';
import { TiltaksType } from '@/types/avtale';
import { Feilmeldinger } from '@/types/feilkode';
import { storForbokstav } from '@/utils/stringUtils';
import { BodyLong, ErrorMessage, Heading, Select } from '@navikt/ds-react';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { useFeatureToggles, useMigreringSkrivebeskyttet } from '@/FeatureToggles';
import { tiltakToggleFilter } from '@/utils/firearigltToggleFilter';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { tiltaksTypeValg } from './TiltaksTypeValg.module.less';

interface Props {
    className: string;
    valgtTiltaksType: TiltaksType | undefined;
    setTiltaksType: Dispatch<SetStateAction<TiltaksType | undefined>>;
    ugyldigAvtaletype: boolean;
    setUgyldigAvtaletype: Dispatch<SetStateAction<boolean>>;
}

const TiltaksTypeValg: FunctionComponent<Props> = ({
    valgtTiltaksType,
    setTiltaksType,
    ugyldigAvtaletype,
    setUgyldigAvtaletype,
    className,
}) => {
    const erSkrivebeskyttet = useMigreringSkrivebeskyttet();
    const { firearigLonnstilskudd } = useFeatureToggles();

    return (
        <Innholdsboks className={className}>
            <Heading level="2" size="medium">
                Velg type avtale
            </Heading>
            <VerticalSpacer rem={0.5} />
            <BodyLong size="small">
                Ønsker du å vite mer om de ulike støtteordningene finner du informasjon på NAV sine sider{' '}
                <EksternLenke href="https://www.nav.no/arbeidsgiver/inkludere">
                    hvordan kan NAV hjelpe med inkludering
                </EksternLenke>
            </BodyLong>
            <VerticalSpacer rem={0.5} />
            <Select
                className={tiltaksTypeValg}
                label="Velg type avtale"
                hideLabel
                value={valgtTiltaksType}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    setTiltaksType(event.target.value as TiltaksType);
                    setUgyldigAvtaletype(false);
                }}
            >
                <option value="">- Velg type avtale -</option>
                {tiltakToggleFilter(firearigLonnstilskudd).map((tiltakstype: TiltaksType) => (
                    <option key={tiltakstype} value={tiltakstype} disabled={erSkrivebeskyttet(tiltakstype)}>
                        {storForbokstav(tiltakstypeTekst[tiltakstype])}
                    </option>
                ))}
            </Select>
            {ugyldigAvtaletype && <ErrorMessage>{Feilmeldinger.UGYLDIG_AVTALETYPE}</ErrorMessage>}
        </Innholdsboks>
    );
};
export default TiltaksTypeValg;
