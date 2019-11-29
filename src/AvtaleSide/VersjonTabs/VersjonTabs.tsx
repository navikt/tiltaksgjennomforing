import * as React from 'react';
import { useEffect, useState } from 'react';
import BEMHelper from '@/utils/bem';
import { AltAvtaleinnhold, Avtale, AvtalelisteRessurs } from '@/types/avtale';
import Tabs from 'nav-frontend-tabs';
import Stegoppsummering from '../steg/GodkjenningSteg/Oppsummering/Stegoppsummering/Stegoppsummering';
import OppfølgingIkon from '../steg/GodkjenningSteg/Oppsummering/oppfølging/OppfolgingIkon';
import { Panel } from 'nav-frontend-paneler';
import { Hovedknapp } from 'nav-frontend-knapper';
import RestService from '@/services/rest-service';
import './VersjonTabs.less';
import { RouteComponentProps } from 'react-router';
import { pathTilKontaktinformasjonSteg } from '@/paths';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import { Context } from '../../AvtaleContext';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import MediaQuery from 'react-responsive';
// import moment from '@/AvtaleSide/AvtaleOversikt';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import Varsel from '@/types/varsel';
import moment from 'moment';
import { Status } from '@/types/nettressurs';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import OppsummeringArbeidstrening from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringArbeidstrening/OppsummeringArbeidstrening';
import MaalOppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/maalOppsummering/MaalOppsummering';
import OppgaverOppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/oppgaveOppsummering/OppgaverOppsummering';
import VarighetOppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/varighet/VarighetOppsummering';
import { StegId } from '@/AvtaleSide/AvtaleSide';
import { switchCase } from '@babel/types';
import Avtaleparter from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Avtaleparter/Avtaleparter';

interface MatchProps {
    avtaleId: string;
    stegPath: string;
}

type Props = RouteComponentProps<MatchProps> & Context;

const cls = BEMHelper('versjonTabs');

const VersjonTabs: React.FunctionComponent<Props> = props => {
    const [index, setIndex] = useState(0);

    const låsOppAvtaleklikk = async () => {
        const nyAvtaleGodkjentVersjon = await RestService.låsOppAvtale(props.avtale.id);
        //  props.history.push(pathTilOpprettAvtaleFullfort(nyAvtaleGodkjentVersjon.id));
        // this.setState({nyAvtaleGodkjentVersjon});
        if (nyAvtaleGodkjentVersjon != null) {
        }
        /*console.log(
            nyAvtaleGodkjentVersjon.id + ', new godkjentVersjon: ' + nyAvtaleGodkjentVersjon.godkjentVersjon
        );*/
        props.history.push(pathTilKontaktinformasjonSteg(props.avtale.id));
        window.location.replace(pathTilKontaktinformasjonSteg(props.avtale.id));
    };

    // if (avtaleVersjoner === null) {
    //     return null;
    // }
    // const harStegEndret = (versjonNummer: number, steg: StegId) => {
    //     switch (steg) {
    //         case 'kontaktinformasjon': {
    //             console.log(
    //                 'v' +
    //                     versjonNummer +
    //                     props.avtale.arbeidsgiverFornavn +
    //                     avtaleVersjoner[versjonNummer].arbeidsgiverFornavn
    //             );
    //             if (
    //                 avtaleVersjoner[versjonNummer].arbeidsgiverFornavn ===
    //                 avtaleVersjoner[versjonNummer - 1 >= 0 ? versjonNummer - 1 : 0].arbeidsgiverFornavn
    //             ) {
    //                 return true;
    //             } else {
    //                 return false;
    //             }
    //         }
    //         case 'maal': {
    //             const result = [];
    //             avtaleVersjoner[versjonNummer].maal.forEach(m1 =>
    //                 avtaleVersjoner[versjonNummer - 1 >= 0 ? versjonNummer - 1 : 0].maal.forEach(m2 => {
    //                     if (m1.kategori !== m2.kategori || m1.beskrivelse !== m2.beskrivelse) {
    //                         result.push(m1);
    //                     }
    //                 })
    //             );
    //             return result.length > 0;
    //         }
    //     }
    // };
    const versjonLenker = props.avtale.versjoner
        .filter(andreVersjoner => andreVersjoner.versjon !== props.avtale.versjon)
        .map((avtaleVerjon: AltAvtaleinnhold) => {
            // const ulestVarsel = varsler.find(value => value.avtaleId === avtaleVerjon.id);
            return (
                <div key={avtaleVerjon.versjon}>
                    <div> Versjon {avtaleVerjon.versjon}</div>
                    {/*<div>*/}
                    {/*    {' '}*/}
                    {/*    {harStegEndret(avtaleVerjon.versjon - 1, 'kontaktinformasjon') &&*/}
                    {/*        avtaleVerjon.arbeidsgiverFornavn}*/}
                    {/*</div>*/}
                    <OppsummeringArbeidstrening avtaleinnhold={avtaleVerjon} />
                    {/*<MaalOppsummering maal={avtaleVerjon.maal} />
                    <OppgaverOppsummering oppgaver={avtaleVerjon.oppgaver} />
                    <VarighetOppsummering
                        startDato={avtaleVerjon.startDato}
                        sluttDato={avtaleVerjon.sluttDato}
                        stillingprosent={avtaleVerjon.stillingprosent}
                    />*/}
                </div>
            );
        })
        .reverse();
    const avtaletabell = versjonLenker.length > 0 && (
        <div className="avtaleoversikt__avtaleliste typo-normal">
            {/*{opprettAvtaleKnapp}*/}
            {/* <div className={classNames(cls.element('header'), cls.element('rad'))}>
                <div className={cls.element('deltakerOgBedrift')}>Bedrift</div>
                <div className={cls.element('deltakerOgBedrift')}>Deltaker</div>
                <MediaQuery minWidth={576}>
                    <div className={cls.element('opprettet')}>Opprettet</div>
                </MediaQuery>
                <div className={cls.element('status')}>Status</div>
                <div className={cls.element('statusikon')}>&nbsp;</div>
            </div>*/}
            {versjonLenker}
        </div>
    );

    return (
        <Innholdsboks>
            <Stegoppsummering ikon={<OppfølgingIkon />} tittel="Versjon kontrollering">
                <Tabs
                    tabs={[
                        { label: 'Endre avtale' },
                        { label: 'Se tidligere versjoner' },
                        { label: 'Last ned avtalen' },
                    ]}
                    /*  onChange={e => {
                    console.log(e.currentTarget);
                    console.log(typeof e);
                    console.log(e.eventPhase);
                    /!**!/
                }}*/
                    onChange={(e, i) => {
                        setIndex(i);
                    }}
                    /*onChange((e) => {setIndex(e)})*/
                />
                {index === 0 ? (
                    <Panel id="først">
                        {props.rolle === 'VEILEDER' && props.avtale.kanLåsesOpp && (
                            <LagreKnapp
                                className="versjonTabs__knapp                       "
                                label={'Lås opp avtalen/ lag ny godkjentVersjon'}
                                lagre={låsOppAvtaleklikk}
                            >
                                {' '}
                                Lås opp avtalen
                            </LagreKnapp>
                        )}
                        {/* {console.log(kanLaasesOpp + ' etter')}*/}
                    </Panel>
                ) : null}
                {index === 1 ? (
                    <Panel id="andre">
                        {avtaletabell}|| Her skal det være tidligere versjoner, hvis det blir.{' '}
                        {/*console.log(alleAvtaleVersjoner())*/}
                    </Panel>
                ) : null}
                {index === 2 ? (
                    <Panel id="tredje">
                        <Hovedknapp>Last ned avtalen </Hovedknapp>
                    </Panel>
                ) : null}
                {/* <div className={cls.className}>

            {id}
            {versjon}
        </div>*/}
            </Stegoppsummering>
        </Innholdsboks>
    );
};
export default VersjonTabs;
{
    /*
<LenkepanelBase
    key={avtaleVerjon.versjon}
    href={pathTilKontaktinformasjonSteg(props.avtale.id)}
    linkCreator={(props: any) => <Link to={props.href} {...props} />}
>
    <div
        className={classNames(cls.element('rad'), {
            uthevet: false,
        })}
    >
        <div className={cls.element('deltakerOgBedrift')}>Versjon {avtaleVerjon.versjon}</div>
        <div className={cls.element('deltakerOgBedrift')}>
            {mestViktigEndring(avtaleVerjon.versjon - 1)}
        </div>
        <MaalOppsummering maal={avtaleVerjon.maal} />

        <div className={cls.element('statusikon')}>
            <StatusIkon status={avtaleVerjon.status} />
        </div>
        <div className={cls.element('status')}>{avtaleVerjon.status}</div>
    </div>
</LenkepanelBase>*/
}
