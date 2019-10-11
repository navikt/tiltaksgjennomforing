import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import BEMHelper from '../../../utils/bem';
import { Avtale } from '@/types/avtale';
import Tabs from 'nav-frontend-tabs';
import Stegoppsummering from '../Oppsummering/Stegoppsummering/Stegoppsummering';
import OppfølgingIkon from '../Oppsummering/oppfølging/OppfolgingIkon';
import PanelBase, { Panel } from 'nav-frontend-paneler';
import { Hovedknapp } from 'nav-frontend-knapper';
import RestService from '../../../services/rest-service';
import './VersjonTabs.less';
import { RouteComponentProps, RouterProps, withRouter } from 'react-router';
import {
    pathTilKontaktinformasjonSteg,
    pathTilOpprettAvtaleFullfort,
} from '../../../paths';
import LagreKnapp from '../../../komponenter/LagreKnapp/LagreKnapp';
import { string } from 'prop-types';
import { Context, Rolle } from '../../../AvtaleContext';

interface MatchProps {
    avtaleId: string;
    stegPath: string;
}

type Props = RouteComponentProps<MatchProps> & Context;

const cls = BEMHelper('versjonTabs');

const VersjonTabs: React.FunctionComponent<Props> = props => {
    const [index, setIndex] = useState(0);
    const opprettNyAvtaleGodkjentVersjonklikk = async () => {
        const nyAvtaleGodkjentVersjon = await RestService.opprettNyAvtaleGodkjentVersjon(
            props.avtale
        );
        //  props.history.push(pathTilOpprettAvtaleFullfort(nyAvtaleGodkjentVersjon.id));
        // this.setState({nyAvtaleGodkjentVersjon});
        if (nyAvtaleGodkjentVersjon != null) {
            console.log(
                nyAvtaleGodkjentVersjon.id +
                    ', new godkjentVersjon: ' +
                    nyAvtaleGodkjentVersjon.godkjentVersjon
            );
            props.history.push(
                pathTilKontaktinformasjonSteg(nyAvtaleGodkjentVersjon.id)
            );
            window.location.replace(
                pathTilKontaktinformasjonSteg(nyAvtaleGodkjentVersjon.id)
            );
        }
    };
    const kanLaasesOpp = async () => {
        const avtale = await RestService.kanLaasesOpp(props.avtale.id)
            .then()
            .catch();

        console.log('props.avtale.id' + props.avtale.id);
        console.log('avtale.id' + avtale.id);
        // console.log(avtale[Symbol.toStringTag].trim());
        console.log(JSON.stringify(avtale));
        /*  Avtale a= (avtale as Avtale).id;
        const a=JSON.parse(JSON. avtale,("id",avtaleId)=>{return avtaleId;});
*/
        /*
        if (avtale.id === props.avtale.id) {
            return true;
        } else {
            return false;
        }*/
        return avtale;
    };
    return (
        <div className={cls.className}>
            {' '}
            <Stegoppsummering
                ikon={<OppfølgingIkon />}
                tittel="GodkjentVersjon kontrollering"
            >
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
                        {console.log(kanLaasesOpp())}
                        {kanLaasesOpp() && props.rolle === 'VEILEDER' && (
                            <LagreKnapp
                                label={
                                    'Lås opp avtalen/ lag ny godkjentVersjon'
                                }
                                lagre={opprettNyAvtaleGodkjentVersjonklikk}
                            >
                                {' '}
                                Lås opp avtalen
                            </LagreKnapp>
                        )}
                    </Panel>
                ) : null}
                {index === 1 ? (
                    <Panel id="andre">
                        Her skal det være tidligere versjoner, hvis det blir.{' '}
                    </Panel>
                ) : null}
                {index === 2 ? (
                    <Panel id="tredje">
                        <Hovedknapp>Las ned avtalen </Hovedknapp>
                    </Panel>
                ) : null}
                {/* <div className={cls.className}>

            {id}
            {versjon}
        </div>*/}
            </Stegoppsummering>
        </div>
    );
};
export default VersjonTabs;
