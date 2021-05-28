import SkjemaUndertittel from '@/komponenter/form/SkjemaUndertittel';
import VersjonModal from '@/komponenter/modal/VersjonModal';
import { innholdTypeTekst } from '@/messages';
import { Versjonering } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import moment from 'moment';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import { Element } from 'nav-frontend-typografi';
import React, { useState } from 'react';
import './TidligereVersjoner.less';

const cls = BEMHelper('tidligereVersjoner');

const TidligereVersjoner: React.FunctionComponent<Versjonering> = props => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [currentVersjon, setCurrentVersjon] = useState<number>(0);

    const versjonLenker = props.versjoner.reverse().map(avtaleVersjon => {
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
                    <Element>
                        Versjon {avtaleVersjon.versjon}
                        {avtaleVersjon.innholdType && <> - {innholdTypeTekst(avtaleVersjon)}</>}
                    </Element>
                    <div className={cls.element('dato')}>
                        {avtaleVersjon.ikrafttredelsestidspunkt &&
                            moment(avtaleVersjon.ikrafttredelsestidspunkt as moment.MomentInput).format('DD.MM.YYYY')}
                    </div>
                </div>
            </LenkepanelBase>
        );
    });
    return (
        <>
            {versjonLenker.length > 0 && (
                <>
                    <SkjemaUndertittel>Alle versjoner av avtalen</SkjemaUndertittel>
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
