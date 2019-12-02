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

const cls = BEMHelper('versjoner');

const Versjoner: React.FunctionComponent<Avtale> = props => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [currentVersjon, setCurrentVersjon] = useState<number>(0);
    const versjonLenker = props.versjoner
        .filter(andreVersjoner => andreVersjoner.versjon !== props.versjon)
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
                        avtaleInnhold={props.versjoner[currentVersjon > 0 ? currentVersjon - 1 : 0]}
                    />
                </div>
            );
        })
        .reverse();
    const avtaletabell = <div className="versjoner__liste">{versjonLenker}</div>;

    return (
        <Innholdsboks>
            <Systemtittel>Tidligere versjoner</Systemtittel>
            {avtaletabell}
        </Innholdsboks>
    );
};
export default Versjoner;
