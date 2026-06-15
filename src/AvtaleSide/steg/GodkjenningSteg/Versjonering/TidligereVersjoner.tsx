import React, { useMemo, useState } from 'react';
import VersjonModal from '@/komponenter/modal/VersjonModal';
import { innholdTypeTekst } from '@/messages';
import { AvtaleVersjon, TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { BodyShort, Label, LinkPanel, Heading } from '@navikt/ds-react';
import './TidligereVersjoner.less';
import { formaterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import HorizontalSpacer from '@/komponenter/layout/HorizontalSpacer';

const cls = BEMHelper('tidligereVersjoner');

interface Props {
    versjoner: AvtaleVersjon[];
    tiltakstype: TiltaksType;
}

const TidligereVersjoner = (props: Props) => {
    const { versjoner } = props;
    const [isOpen, setOpen] = useState<boolean>(false);
    const [currentVersjon, setCurrentVersjon] = useState<number>(0);

    const sorterteVersjoner = useMemo(() => Array.from(versjoner).sort((a, b) => a.versjon - b.versjon), [versjoner]);
    const avtaleInnhold = sorterteVersjoner[currentVersjon > 0 ? currentVersjon - 1 : 0];

    return (
        <>
            <Heading size="small" className={cls.element('alle_versjoner_tittel')}>
                Alle versjoner av avtalen
            </Heading>
            <div>
                {sorterteVersjoner.map((avtaleVersjon: AvtaleVersjon) => {
                    return (
                        <LinkPanel
                            className={cls.className}
                            key={avtaleVersjon.versjon}
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
                                    <HorizontalSpacer rem={0.5} />
                                    <BodyShort size="small">
                                        {avtaleVersjon.ikrafttredelsestidspunkt &&
                                            formaterDato(avtaleVersjon.ikrafttredelsestidspunkt, NORSK_DATO_FORMAT)}
                                    </BodyShort>
                                </div>
                            </LinkPanel.Title>
                        </LinkPanel>
                    );
                })}
            </div>
            <VersjonModal
                isOpen={isOpen}
                lukkModal={() => setOpen(false)}
                avtaleInnhold={avtaleInnhold}
                tiltakstype={props.tiltakstype}
            />
        </>
    );
};
export default TidligereVersjoner;
