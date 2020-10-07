import VersjonModal from '@/komponenter/modal/VersjonModal';
import { Versjonering } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import moment from 'moment';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import { useState } from 'react';
import './TidligereVersjoner.less';

const cls = BEMHelper('tidligereVersjoner');

const TidligereVersjoner: React.FunctionComponent<Versjonering> = props => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [currentVersjon, setCurrentVersjon] = useState<number>(0);

    const versjonLenker = props.versjoner
        .slice(0, -1)
        .reverse()
        .map(avtaleVersjon => {
            return (
                <LenkepanelBase
                    key={avtaleVersjon.versjon}
                    href={'#'}
                    onClick={() => {
                        setCurrentVersjon(avtaleVersjon.versjon);
                        setOpen(true);
                    }}
                    border={true}
                >
                    <div className={cls.element('rad')}>
                        <Element>Versjon {avtaleVersjon.versjon}</Element>
                        <div className={cls.element('dato')}>
                            {moment(avtaleVersjon.godkjentAvVeileder as moment.MomentInput).format('DD.MM.YYYY')}
                        </div>
                    </div>
                </LenkepanelBase>
            );
        });
    return (
        <>
            {versjonLenker.length > 0 && (
                <>
                    <div>{versjonLenker}</div>
                    <VersjonModal
                        isOpen={isOpen}
                        lukkModal={() => setOpen(false)}
                        avtaleInnhold={props.versjoner[currentVersjon > 0 ? currentVersjon - 1 : 0]}
                        tiltakstype={props.tiltakstype}
                    />
                </>
            )}
        </>
    );
};
export default TidligereVersjoner;
