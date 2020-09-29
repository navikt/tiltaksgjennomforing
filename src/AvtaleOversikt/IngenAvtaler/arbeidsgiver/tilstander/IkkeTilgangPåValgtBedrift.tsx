import * as React from 'react';
import { FunctionComponent } from 'react';
import { TiltaksType } from '@/types/avtale';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import useBeOmRettigheter from '@/AvtaleOversikt/IngenAvtaler/arbeidsgiver/useBeOmRettigheter';
import BEMHelper from '@/utils/bem';
import { ReactComponent as InfoIkon } from '@/assets/ikoner/info.svg';
import { tiltakstypeTekst } from '@/messages';
import EksternLenke from '@/komponenter/navigation/EksternLenke';

const cls = BEMHelper('ingenAvtalerArbeidsgiver');

type Props = {
    bedriftNavn: string;
    tilgangerJegIkkeHar: TiltaksType[];
    bedriftNr: string;
};

const IkkeTilgangPåValgtBedrift: FunctionComponent<Props> = props => {
    const { beOmRettighetUrler } = useBeOmRettigheter(props.bedriftNr);

    return (
        <Innholdsboks>
            <div className={cls.element('headerContainer')}>
                <InfoIkon className={cls.element('headerIkon')} />
                <Innholdstittel>Du mangler tilgang</Innholdstittel>
            </div>
            <Normaltekst style={{ textAlign: 'center' }}>
                Du har valgt en virksomhet som ikke har tilgang til noen av tiltakstypene
            </Normaltekst>
            <VerticalSpacer rem={2} />
            <div style={{ maxWidth: '45rem', margin: '0 auto' }}>
                <Undertittel>Be om tilgang i Altinn</Undertittel>
                <VerticalSpacer rem={1} />
                {beOmRettighetUrler.map(({ tiltakstype, url }) => (
                    <div
                        key={tiltakstype}
                        style={{
                            borderBottom: '1px solid #E7E9E9',
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '0.5rem 0',
                        }}
                    >
                        <Normaltekst>{tiltakstypeTekst[tiltakstype]}</Normaltekst>
                        <EksternLenke href={url}>Be om tilgang i Altinn her</EksternLenke>
                    </div>
                ))}
            </div>
        </Innholdsboks>
    );
};

export default IkkeTilgangPåValgtBedrift;