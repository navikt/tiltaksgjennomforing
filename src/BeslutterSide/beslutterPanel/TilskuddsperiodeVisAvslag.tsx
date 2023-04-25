import React, { FunctionComponent, useContext, useState } from 'react';
import { Label, BodyShort } from '@navikt/ds-react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { CheckboxGroup, Checkbox } from '@navikt/ds-react';
import { tilskuddsperiodeAvslagTekst } from '@/messages';
import { Avslagsårsaker } from '@/types/avtale';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import BEMHelper from '@/utils/bem';
import { AvtaleContext, Context } from '@/AvtaleProvider';
import { Periode, TilskuddsperiodeContext } from '@/BeslutterSide/BeslutterSide';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';

const TilskuddsperiodeVisAvslag: FunctionComponent = () => {
    const cls = BEMHelper('beslutter-panel');
    const [avslagsforklaring, setAvslagsforklaring] = useState('');
    const [avslagsårsaker, setAvslagsårsaker] = useState(new Set<Avslagsårsaker>());

    const { avslåTilskudd } = useContext<Context>(AvtaleContext);
    const { visAvslag, setVisAvslag } = useContext<Periode>(TilskuddsperiodeContext);

    if (!visAvslag) return null;

    return (
        <>
            <BekreftelseModal
                bekreftOnClick={async () => {
                    await avslåTilskudd(avslagsårsaker, avslagsforklaring);
                    setVisAvslag(false);
                }}
                modalIsOpen={visAvslag}
                oversiktTekst="Send avslag til veileder"
                bekreftelseTekst="Send avslag"
                avbrytelseTekst="Avbryt"
                lukkModal={() => setVisAvslag(false)}
            >
                <BodyShort size="small" className={cls.element('avslagtext-subingress')}>
                    Veileder vil få en varsling i avtaleløsningen med årsak til retur og forklaring.
                </BodyShort>
                <div className={cls.element('avslag-boks')}>
                    <div className={cls.element('avslag-input')}>
                        <div>
                            <Label>Årsak til avslag</Label>
                            <VerticalSpacer rem={1} />
                            <CheckboxGroup legend="Årsak for avslag av tilskuddsperiode">
                                {Object.entries(tilskuddsperiodeAvslagTekst).map(([kode, tekst]) => {
                                    const avslagskode = kode as Avslagsårsaker;
                                    return (
                                        <Checkbox
                                            key={kode}
                                            value={avslagsårsaker.has(avslagskode)}
                                            onChange={(event) => {
                                                const årsaker = new Set<Avslagsårsaker>(avslagsårsaker);
                                                if (event.currentTarget.checked) {
                                                    årsaker.add(avslagskode);
                                                } else {
                                                    årsaker.delete(avslagskode);
                                                }
                                                setAvslagsårsaker(årsaker);
                                            }}
                                        >
                                            {tekst}
                                        </Checkbox>
                                    );
                                })}
                            </CheckboxGroup>
                        </div>
                        <div className={cls.element('avslagsforklaring-wrapper')}>
                            <PakrevdTextarea
                                className={cls.element('avslagsforklaring')}
                                label="Forklaring"
                                maxLengde={1000}
                                verdi={avslagsforklaring}
                                settVerdi={(verdi) => setAvslagsforklaring(verdi)}
                            />
                        </div>
                    </div>
                    <VerticalSpacer rem={1} />
                </div>
            </BekreftelseModal>
        </>
    );
};
export default TilskuddsperiodeVisAvslag;
