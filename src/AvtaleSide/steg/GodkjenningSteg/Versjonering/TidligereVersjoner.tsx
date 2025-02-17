import React, { useMemo, useState } from 'react';
import VersjonModal from '@/komponenter/modal/VersjonModal';
import { innholdTypeTekst } from '@/messages';
import { AvtaleVersjon, TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { BodyShort, Label, LinkPanel, Heading } from '@navikt/ds-react';
import './TidligereVersjoner.less';
import { formaterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';

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

    return (
        <>
            <Heading size="small" className={cls.element('alle_versjoner_tittel')}>
                Alle versjoner av avtalen
            </Heading>
            <div>
                {sorterteVersjoner.map((avtaleVersjon: AvtaleVersjon, index: number) => {
                    return (
                        <LinkPanel
                            className={cls.className}
                            key={index}
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
                avtaleInnhold={sorterteVersjoner[currentVersjon > 0 ? currentVersjon - 1 : 0]}
                tiltakstype={props.tiltakstype}
            />
        </>
    );
};
export default TidligereVersjoner;
