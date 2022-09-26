import SkjemaUndertittel from '@/komponenter/form/SkjemaUndertittel';
import VersjonModal from '@/komponenter/modal/VersjonModal';
import { innholdTypeTekst } from '@/messages';
import { AvtaleVersjon, TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import moment from 'moment';
import { LinkPanel } from '@navikt/ds-react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { useState } from 'react';
import './TidligereVersjoner.less';

const cls = BEMHelper('tidligereVersjoner');

const TidligereVersjoner: React.FunctionComponent<{ versjoner: AvtaleVersjon[]; tiltakstype: TiltaksType }> = (
    props
) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [currentVersjon, setCurrentVersjon] = useState<number>(0);

    const sorterteVersjoner = Array.from(props.versjoner);
    sorterteVersjoner.sort((a, b) => a.versjon - b.versjon);
    const versjonLenker = sorterteVersjoner.map((avtaleVersjon) => {
        return (
            <LinkPanel
                className={cls.className}
                key={avtaleVersjon.id}
                href={'#'}
                onClick={() => {
                    setCurrentVersjon(avtaleVersjon.versjon);
                    setOpen(true);
                }}
                border={true}
            >
                <LinkPanel.Title className={cls.element('linke-container')}>
                    <div className={cls.element('rad')}>
                        <Element>
                            Versjon {avtaleVersjon.versjon}
                            {avtaleVersjon.innholdType && <> - {innholdTypeTekst(avtaleVersjon)}</>}
                        </Element>
                        <Normaltekst>
                            {avtaleVersjon.ikrafttredelsestidspunkt &&
                                moment(avtaleVersjon.ikrafttredelsestidspunkt).format('DD.MM.YYYY')}
                        </Normaltekst>
                    </div>
                </LinkPanel.Title>
            </LinkPanel>
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
                        avtaleInnhold={sorterteVersjoner[currentVersjon > 0 ? currentVersjon - 1 : 0]}
                        tiltakstype={props.tiltakstype}
                    />
                </>
            )}
        </>
    );
};
export default TidligereVersjoner;
