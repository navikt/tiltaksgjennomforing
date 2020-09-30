import { ReactComponent as InfoIkon } from '@/assets/ikoner/info.svg';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { tiltakstypeTekst } from '@/messages';
import { TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import useBeOmRettigheter from '../useBeOmRettigheter';

const cls = BEMHelper('ingenAvtalerArbeidsgiver');

type Props = {
    bedriftNavn: string;
    bedriftNr: string;
    tiltakstype: TiltaksType;
};

const IkkeTilgangPåValgtTiltakIValgtBedrift: FunctionComponent<Props> = props => {
    const { lagBeOmRettighetUrl } = useBeOmRettigheter(props.bedriftNr);

    return (
        <Innholdsboks>
            <div className={cls.element('headerContainer')}>
                <InfoIkon className={cls.element('headerIkon')} />
                <Innholdstittel>Du mangler tilgang</Innholdstittel>
            </div>
            <Normaltekst>
                Du har dessverre ikke tilgang på <b>{tiltakstypeTekst[props.tiltakstype]}</b> i {props.bedriftNavn}.
            </Normaltekst>
            <VerticalSpacer rem={1} />
            <EksternLenke href={lagBeOmRettighetUrl(props.tiltakstype)}>Be om tilgang i Altinn her</EksternLenke>
        </Innholdsboks>
    );
};

export default IkkeTilgangPåValgtTiltakIValgtBedrift;
