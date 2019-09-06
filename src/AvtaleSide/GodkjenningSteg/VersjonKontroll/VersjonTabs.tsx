import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import BEMHelper from '../../../utils/bem';
import { Avtale } from '../../avtale';
import Tabs from 'nav-frontend-tabs';
import Stegoppsummering from '../Oppsummering/Stegoppsummering/Stegoppsummering';
import OppfølgingIkon from '../Oppsummering/oppfølging/OppfølgingIkon';
import PanelBase, { Panel } from 'nav-frontend-paneler';
import { Hovedknapp } from 'nav-frontend-knapper';

const cls = BEMHelper('oppfolging');

const VersjonTabs: React.FunctionComponent<Avtale> = props => {
    const [index, setIndex] = useState(0);
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
                    <Hovedknapp> Lås opp avtalen</Hovedknapp>
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
