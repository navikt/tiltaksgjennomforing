import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Avtale } from '@/types/avtale';
import { Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import GodkjenningRad from './GodkjenningRad/GodkjenningRad';
import './GodkjenningStatus.less';

interface Props {
    avtale: Avtale;
}

const GodkjenningStatus: React.FunctionComponent<Props> = (props) => {
    return (
        <div className="godkjenningstatus">
            <Undertittel>Hvem har godkjent?</Undertittel>
            <VerticalSpacer rem={0.5} />
            <div className="godkjenningstatus__rader">
                <GodkjenningRad
                    godkjentAvtale={props.avtale.godkjentAvDeltaker}
                    navn={`${props.avtale.gjeldendeInnhold.deltakerFornavn} ${props.avtale.gjeldendeInnhold.deltakerEtternavn}`}
                />
                {props.avtale.tiltakstype === 'MENTOR' && (
                    <GodkjenningRad
                        godkjentAvtale={props.avtale.erGodkjentTaushetserklæringAvMentor + ''}
                        navn={`${props.avtale.gjeldendeInnhold.mentorFornavn} ${props.avtale.gjeldendeInnhold.mentorEtternavn}`}
                    />
                )}

                <GodkjenningRad
                    godkjentAvtale={props.avtale.godkjentAvArbeidsgiver}
                    navn={props.avtale.gjeldendeInnhold.bedriftNavn}
                />
                <GodkjenningRad godkjentAvtale={props.avtale.avtaleInngått} navn="NAV" />
            </div>
        </div>
    );
};

export default GodkjenningStatus;
