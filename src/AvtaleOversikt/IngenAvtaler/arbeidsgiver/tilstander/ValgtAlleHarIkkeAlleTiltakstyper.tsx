import * as React from 'react';
import { FunctionComponent } from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { ReactComponent as InfoIkon } from '@/assets/ikoner/info.svg';
import { Innholdstittel, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { tiltakstypeTekst } from '@/messages';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import useBeOmRettighetUrler from '@/AvtaleOversikt/IngenAvtaler/arbeidsgiver/useBeOmRettigheter';

const cls = BEMHelper('ingenAvtalerArbeidsgiver');

type Props = {
    tilgangerJegHar: TiltaksType[];
    tilgangerJegIkkeHar: TiltaksType[];
    bedriftNavn: string;
    bedriftNr: string;
};

const ValgtAlleHarIkkeAlleTiltakstyper: FunctionComponent<Props> = props => {
    const { lagBeOmRettighetUrl } = useBeOmRettighetUrler(props.bedriftNr);

    return (
        <Innholdsboks>
            <div className={cls.element('headerContainer')}>
                <InfoIkon className={cls.element('headerIkon')} />
                <Innholdstittel>Ingen avtaler du har tilgang på</Innholdstittel>
            </div>
            <Normaltekst tag="div">
                Du har ingen avtaler her enda. Du har rettigheter i bedriften til
                <ul>
                    {props.tilgangerJegHar.map(tiltakstype => (
                        <li key={tiltakstype}>{tiltakstypeTekst[tiltakstype]}</li>
                    ))}
                </ul>
                <VerticalSpacer twentyPx={true} />
            </Normaltekst>
            <VerticalSpacer thirtyTwoPx={true} />
            <Systemtittel>Hvordan får jeg tilgang på andre tiltak?</Systemtittel>
            <VerticalSpacer sixteenPx={true} />
            <Normaltekst tag="div">
                Hvis du er ute etter en avtale om et annet tiltak, må du i Altinn ha korrekt tilgang:
                <ul>
                    {props.tilgangerJegIkkeHar.map(tiltakstype => (
                        <li key={tiltakstype}>
                            {tiltakstypeTekst[tiltakstype]} (
                            <EksternLenke href={lagBeOmRettighetUrl(tiltakstype)}>Be om tilgang i Altinn</EksternLenke>)
                        </li>
                    ))}
                </ul>
                <EksternLenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                    Les mer om roller og rettigheter på Altinn.no
                </EksternLenke>
            </Normaltekst>
        </Innholdsboks>
    );
};

export default ValgtAlleHarIkkeAlleTiltakstyper;
