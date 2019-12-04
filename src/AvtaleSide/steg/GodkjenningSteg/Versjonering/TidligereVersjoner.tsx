import * as React from 'react';
import { useState } from 'react';
import BEMHelper from '@/utils/bem';
import { AltAvtaleinnhold, Avtale } from '@/types/avtale';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import './TidligereVersjoner.less';
import moment from 'moment';
import VersjonModal from '@/komponenter/modal/VersjonModal';
import { Element } from 'nav-frontend-typografi';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';

const cls = BEMHelper('tidligereVersjoner');

const TidligereVersjoner: React.FunctionComponent<Avtale> = props => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [currentVersjon, setCurrentVersjon] = useState<number>(0);

    const versjonLenker = props.versjoner
        .filter(andreVersjoner => andreVersjoner.versjon !== props.versjon)
        .sort((a, b) => b.versjon - a.versjon)
        .map((avtaleVerjon: AltAvtaleinnhold) => {
            return (
                <LenkepanelBase
                    key={avtaleVerjon.versjon}
                    href={'#'}
                    onClick={() => {
                        setCurrentVersjon(avtaleVerjon.versjon);
                        setOpen(true);
                    }}
                    border={true}
                >
                    <div className={cls.element('rad')}>
                        <Element>Versjon {avtaleVerjon.versjon}</Element>
                        <div className={cls.element('dato')}>
                            {moment(avtaleVerjon.godkjentAvVeileder as moment.MomentInput).format('DD.MM.YYYY')}
                        </div>
                    </div>
                </LenkepanelBase>
            );
        });
    return (
        <>
            {versjonLenker.length > 0 && (
                <Innholdsboks>
                    <SkjemaTittel>Tidligere versjoner</SkjemaTittel>
                    <div>{versjonLenker}</div>
                    <VersjonModal
                        isOpen={isOpen}
                        lukkModal={() => setOpen(false)}
                        avtaleInnhold={props.versjoner[currentVersjon > 0 ? currentVersjon - 1 : 0]}
                    />
                </Innholdsboks>
            )}
        </>
    );
};
export default TidligereVersjoner;
