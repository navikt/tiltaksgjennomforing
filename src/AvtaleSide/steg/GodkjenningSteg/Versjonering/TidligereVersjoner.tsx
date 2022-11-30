import React, { useState } from 'react';
import SkjemaUndertittel from '@/komponenter/form/SkjemaUndertittel';
import VersjonModal from '@/komponenter/modal/VersjonModal';
import { innholdTypeTekst } from '@/messages';
import { AvtaleVersjon, TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import moment from 'moment';
import { BodyShort, Label, LinkPanel } from '@navikt/ds-react';
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
                        <Label>
                            Versjon {avtaleVersjon.versjon}
                            {avtaleVersjon.innholdType && <> - {innholdTypeTekst(avtaleVersjon)}</>}
                        </Label>
                        <BodyShort size="small">
                            {avtaleVersjon.ikrafttredelsestidspunkt &&
                                moment(avtaleVersjon.ikrafttredelsestidspunkt).format('DD.MM.YYYY')}
                        </BodyShort>
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
