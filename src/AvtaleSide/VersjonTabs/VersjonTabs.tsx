import * as React from 'react';
import { useEffect, useState } from 'react';
import BEMHelper from '@/utils/bem';
import { Avtale, AvtalelisteRessurs } from '@/types/avtale';
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

interface MatchProps {
    avtaleId: string;
    stegPath: string;
}

type Props = RouteComponentProps<MatchProps> & Context;

const cls = BEMHelper('versjonTabs');

const VersjonTabs: React.FunctionComponent<Props> = props => {
    const [index, setIndex] = useState(0);
    const [kanLaasesOpp, setKanLaasesOpp] = useState();
    const [avtaler, setAvtaler] = useState<Avtale[] | null>(null);
    const [avtalelisteRessurs, setAvtalelistRessurs] = useState<AvtalelisteRessurs>({
        status: Status.IkkeLastet,
    });
    const [varsler, setVarsler] = useState<Varsel[]>([]);
    const opprettNyAvtaleGodkjentVersjonklikk = async () => {
        const nyAvtaleGodkjentVersjon = await RestService.låsOppAvtale(props.avtale.id);
        //  props.history.push(pathTilOpprettAvtaleFullfort(nyAvtaleGodkjentVersjon.id));
        // this.setState({nyAvtaleGodkjentVersjon});
        if (nyAvtaleGodkjentVersjon != null) {
            /*console.log(
                nyAvtaleGodkjentVersjon.id + ', new godkjentVersjon: ' + nyAvtaleGodkjentVersjon.godkjentVersjon
            );*/
            props.history.push(pathTilKontaktinformasjonSteg(props.avtale.id));
            window.location.replace(pathTilKontaktinformasjonSteg(props.avtale.id));
        }
    };
    useEffect(() => {
        RestService.hentAlleAvtaleVersjoner(
            props.avtale.id
            /*props.avtale.id != null ? props.avtale.baseAvtaleId : props.avtale.id*/
        ).then(setAvtaler);
    });
    const alleAvtaleVersjoner = async () => {
        /*const avtaler = await RestService.hentAlleAvtaleVersjoner(
            props.avtale.baseAvtaleId != null
                ? props.avtale.baseAvtaleId
                : props.avtale.id
        )
            .then()
            .catch();
*/
        if (avtaler === null) {
            return null;
        }
        /* console.log('props.avtale.id' + props.avtale.id);
        console.log('avtale.id' + avtaler[0].id);
        // console.log(avtale[Symbol.toStringTag].trim());
        console.log(JSON.stringify(avtaler));*/
        /*  Avtale a= (avtale as Avtale).id;
        const a=JSON.parse(JSON. avtale,("id",avtaleId)=>{return avtaleId;});
*/
        /*
        if (avtale.id === props.avtale.id) {
            return true;
        } else {
            return false;
        }*/
        return avtaler;
    };
    if (avtaler === null) {
        return null;
    }
    const avtaleLenker = avtaler.map((avtale: Avtale) => {
        const ulestVarsel = varsler.find(value => value.avtaleId === avtale.id);
        return (
            <LenkepanelBase
                key={avtale.id}
                href={pathTilKontaktinformasjonSteg(avtale.id)}
                linkCreator={(props: any) => <Link to={props.href} {...props} />}
            >
                {ulestVarsel && <span className="ulest-varsel-ikon" />}
                <div
                    className={classNames(cls.element('rad'), {
                        uthevet: ulestVarsel,
                    })}
                >
                    <div className={cls.element('deltakerOgBedrift')}>{avtale.bedriftNavn}</div>
                    <div className={cls.element('deltakerOgBedrift')}>
                        {avtale.deltakerFornavn || ''}&nbsp;
                        {avtale.deltakerEtternavn || ''}
                    </div>
                    <MediaQuery minWidth={576}>
                        <div className={cls.element('opprettet')}>
                            {moment(avtale.opprettetTidspunkt).format('DD.MM.YYYY')}
                        </div>
                    </MediaQuery>
                    <div className={cls.element('statusikon')}>
                        <StatusIkon status={avtale.status} />
                    </div>
                    <div className={cls.element('status')}>{avtale.status}</div>
                </div>
            </LenkepanelBase>
        );
    });
    const avtaletabell = avtaleLenker.length > 0 && (
        <div className="avtaleoversikt__avtaleliste typo-normal">
            {/*{opprettAvtaleKnapp}*/}
            <div className={classNames(cls.element('header'), cls.element('rad'))}>
                <div className={cls.element('deltakerOgBedrift')}>Bedrift</div>
                <div className={cls.element('deltakerOgBedrift')}>Deltaker</div>
                <MediaQuery minWidth={576}>
                    <div className={cls.element('opprettet')}>Opprettet</div>
                </MediaQuery>
                <div className={cls.element('status')}>Status</div>
                <div className={cls.element('statusikon')}>&nbsp;</div>
            </div>
            {avtaleLenker}
        </div>
    );

    return (
        <div className={cls.className}>
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
                        {props.rolle === 'VEILEDER' && (
                            <LagreKnapp
                                className="versjonTabs__knapp                       "
                                label={'Lås opp avtalen/ lag ny godkjentVersjon'}
                                lagre={opprettNyAvtaleGodkjentVersjonklikk}
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
        </div>
    );
};
export default VersjonTabs;
