import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import BEMHelper from '../../../utils/bem';
import { Avtale } from '../../avtale';
import Tabs from 'nav-frontend-tabs';
import Stegoppsummering from '../Oppsummering/Stegoppsummering/Stegoppsummering';
import OppfølgingIkon from '../Oppsummering/oppfølging/OppfølgingIkon';
import PanelBase, { Panel } from 'nav-frontend-paneler';
import { Hovedknapp } from 'nav-frontend-knapper';
import RestService from '../../../services/rest-service';
import { RouteComponentProps, RouterProps, withRouter } from 'react-router';
import { pathTilOpprettAvtaleFullfort } from '../../../paths';
import LagreKnapp from '../../../komponenter/LagreKnapp/LagreKnapp';

const cls = BEMHelper('oppfolging');

const VersjonTabs: React.FunctionComponent<Avtale> = props => {
    const [index, setIndex] = useState(0);
    const opprettNyAvtaleRevisjonklikk = async () => {
        const nyAvtaleRevisjon = await RestService.opprettNyAvtaleRevisjon(
            props
        );
        //  props.history.push(pathTilOpprettAvtaleFullfort(nyAvtaleRevisjon.id));
        // this.setState({nyAvtaleRevisjon});
        if (nyAvtaleRevisjon != null) {
            console.log(
                nyAvtaleRevisjon.id + 'new revisjon' + nyAvtaleRevisjon.revisjon
            );
            /* props.history.push(
                pathTilOpprettAvtaleFullfort(nyAvtaleRevisjon.id)
            );*/
            window.location.replace(
                pathTilOpprettAvtaleFullfort(nyAvtaleRevisjon.id)
            );
        }
    };
    return (
        <Stegoppsummering ikon={<OppfølgingIkon />} tittel="Oppfølging">
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
                    <LagreKnapp
                        label={'Lås opp avtalen/ lag ny revisjon'}
                        lagre={opprettNyAvtaleRevisjonklikk}
                    >
                        {' '}
                        Lås opp avtalen
                    </LagreKnapp>
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
    );
};
export default VersjonTabs;
