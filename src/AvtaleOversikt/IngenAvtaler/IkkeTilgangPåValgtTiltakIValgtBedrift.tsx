import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import Innholdsboks from "@/komponenter/Innholdsboks/Innholdsboks";
import { ReactComponent as InfoIkon } from "@/assets/ikoner/info.svg";
import { Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import VerticalSpacer from "@/komponenter/layout/VerticalSpacer";
import EksternLenke from "@/komponenter/navigation/EksternLenke";
import BEMHelper from "@/utils/bem";
import { BeOmRettigheterUrl, hentBeOmRettighetUrler } from "@/services/rest-service";
import { TiltaksType } from "@/types/avtale";

const cls = BEMHelper('ingenAvtalerArbeidsgiver');

type Props = {
    tiltakNavn: string; bedriftNavn: string; bedriftNr: string; tiltakstype: TiltaksType;
};

export const IkkeTilgangPåValgtTiltakIValgtBedrift: FunctionComponent<Props> = props => {
    const [beOmRettighetUrler, setBeOmRettighetUrler] = useState<BeOmRettigheterUrl[]>([]);
    useEffect(() => {
        if (props.bedriftNr) {
            hentBeOmRettighetUrler(props.bedriftNr).then(setBeOmRettighetUrler);
        }
    }, [props.bedriftNr]);

    return (
        <Innholdsboks>
            <div className={cls.element('headerContainer')}>
                <InfoIkon className={cls.element('headerIkon')} />
                <Innholdstittel>Du mangler tilgang</Innholdstittel>
            </div>
            <Normaltekst>
                Du har dessverre ikke tilgang på <b>{props.tiltakNavn}</b> i {props.bedriftNavn}.
            </Normaltekst>
            <VerticalSpacer rem={1} />
            <EksternLenke
                href={
                    beOmRettighetUrler.find(
                        ({ tiltakstype }) => tiltakstype === props.tiltakstype
                    )?.url ?? ''
                }
            >
                Be om tilgang i Altinn her
            </EksternLenke>
        </Innholdsboks>
    );
};