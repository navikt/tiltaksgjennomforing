import * as React from 'react';
import { useState } from 'react';
import BEMHelper from '@/utils/bem';
import { AltAvtaleinnhold, Avtale } from '@/types/avtale';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import classNames from 'classnames';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import './Versjoner.less';
import Systemtittel from 'nav-frontend-typografi/lib/systemtittel';
import moment from 'moment';
import VersjonModal from '@/komponenter/modal/VersjonModal';

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
                    >
                        <div
                            className={classNames(cls.element('rad'), {
                                uthevet: false,
                            })}
                        >
                            <div className="typo-undertittel">Versjon {avtaleVerjon.versjon}</div>
                            <div className={cls.element('dato')}>
                                {moment(avtaleVerjon.godkjentAvVeileder as moment.MomentInput).format('DD.MM.YYYY')}
                            </div>
                        </div>
                    </LenkepanelBase>
                    <VersjonModal
                        isOpen={isOpen}
                        lukkModal={() => setOpen(false)}
                        avtaleInnhold={props.versjoner[currentVersjon - 1]}
                    />
                </div>
            );
        })
        .reverse();
    const avtaletabell = <div className="avtaleoversikt__avtaleliste typo-normal">{versjonLenker}</div>;

    return (
        <Innholdsboks>
            <Systemtittel>Tidliger versjoner</Systemtittel>
            {avtaletabell}
        </Innholdsboks>
    );
};
export default Versjoner;
