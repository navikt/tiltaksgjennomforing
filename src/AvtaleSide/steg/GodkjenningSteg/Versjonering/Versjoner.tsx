import * as React from 'react';
import { useState } from 'react';
import BEMHelper from '@/utils/bem';
import { AltAvtaleinnhold, Avtale } from '@/types/avtale';
import classNames from 'classnames';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import './Versjoner.less';
import Systemtittel from 'nav-frontend-typografi/lib/systemtittel';
import moment from 'moment';
import VersjonModal from '@/komponenter/modal/VersjonModal';
import { Element } from 'nav-frontend-typografi';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import RestService from '@/services/rest-service';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import { Rolle } from '@/AvtaleContext';
import { RouteComponentProps } from 'react-router';

const cls = BEMHelper('versjoner');
interface Props {
    rolle: Rolle;
    avtale: Avtale;
    laasOpp?: () => Promise<any>;
}

const Versjoner: React.FunctionComponent<Props> = props => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [currentVersjon, setCurrentVersjon] = useState<number>(0);
    const låsOppAvtaleklikk = async () => {
        if (
            window.confirm(
                'Er du sikker på at du vil låse opp avtalen og opprette en ny versjon?\nDu og arbeidsgiver kan endre innhold i avtalen og alle må godjhenne på nytt.'
            )
        ) {
            const nyAvtaleGodkjentVersjon = await RestService.låsOppAvtale(props.avtale.id);
            //  props.history.push(pathTilOpprettAvtaleFullfort(nyAvtaleGodkjentVersjon.id));
            // this.setState({nyAvtaleGodkjentVersjon});
            if (nyAvtaleGodkjentVersjon != null) {
                //
            }
        }
        /*console.log(
            nyAvtaleGodkjentVersjon.id + ', new godkjentVersjon: ' + nyAvtaleGodkjentVersjon.godkjentVersjon
        );*/
        // props.history.push(pathTilKontaktinformasjonSteg(props.avtale.id));
        // window.location.replace(pathTilKontaktinformasjonSteg(props.avtale.id));
    };
    const versjonLenker = props.avtale.versjoner
        .filter(andreVersjoner => andreVersjoner.versjon !== props.avtale.versjon)
        .map((avtaleVerjon: AltAvtaleinnhold) => {
            return (
                <div key={avtaleVerjon.versjon}>
                    <LenkepanelBase
                        key={avtaleVerjon.versjon}
                        href={'#'}
                        onClick={() => {
                            setCurrentVersjon(avtaleVerjon.versjon);
                            setOpen(true);
                        }}
                        border={true}
                    >
                        <div
                            className={classNames(cls.element('rad'), {
                                uthevet: false,
                            })}
                        >
                            {/*<div className="typo-undertittel">Versjon {avtaleVerjon.versjon}</div>*/}
                            <Element>Versjon {avtaleVerjon.versjon}</Element>
                            <div className={cls.element('dato')}>
                                {moment(avtaleVerjon.godkjentAvVeileder as moment.MomentInput).format('DD.MM.YYYY')}
                            </div>
                        </div>
                    </LenkepanelBase>
                    <VersjonModal
                        isOpen={isOpen}
                        lukkModal={() => setOpen(false)}
                        avtaleInnhold={props.avtale.versjoner[currentVersjon > 0 ? currentVersjon - 1 : 0]}
                    />
                </div>
            );
        })
        .reverse();
    const avtaletabell = <div className="versjoner__liste">{versjonLenker}</div>;

    return (
        <>
            {props.rolle === 'VEILEDER' && props.avtale.kanLåsesOpp && (
                <Innholdsboks>
                    {' '}
                    <LagreKnapp className="versjoner__laasoppknapp" label={'Lag ny versjon'} lagre={låsOppAvtaleklikk}>
                        {' '}
                        Lås opp avtalen
                    </LagreKnapp>
                </Innholdsboks>
            )}
            {props.avtale.versjoner.length > 1 && (
                <Innholdsboks>
                    <Systemtittel>Tidligere versjoner</Systemtittel>
                    {avtaletabell}
                </Innholdsboks>
            )}
        </>
    );
};
export default Versjoner;
