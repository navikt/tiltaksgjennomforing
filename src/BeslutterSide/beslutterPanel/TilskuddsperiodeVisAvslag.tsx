import React, { FunctionComponent, useContext, useState } from 'react';
import { BodyShort } from '@navikt/ds-react';
import { CheckboxGroup, Checkbox } from '@navikt/ds-react';
import { tilskuddsperiodeReturÅrsakTekst } from '@/messages';
import { Returårsaker, TiltaksType } from '@/types/avtale';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import BEMHelper from '@/utils/bem';
import { AvtaleContext, Context } from '@/AvtaleProvider';
import { Periode, TilskuddsperiodeContext } from '@/BeslutterSide/BeslutterSide';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';

const TilskuddsperiodeReturModal: FunctionComponent<{ tiltakstype: TiltaksType }> = ({ tiltakstype }) => {
    const cls = BEMHelper('beslutter-panel');
    const [returforklaring, setReturforklaring] = useState('');
    const [returårsaker, setReturårsaker] = useState([] as Returårsaker[]);

    const { returnerTilskuddsperiode } = useContext<Context>(AvtaleContext);
    const { visReturModal: visReturModal, setVisReturModal: setVisReturModal } =
        useContext<Periode>(TilskuddsperiodeContext);

    if (!visReturModal) return null;

    return (
        <BekreftelseModal
            bekreftOnClick={async () => {
                await returnerTilskuddsperiode(new Set<Returårsaker>(returårsaker), returforklaring);
                setVisReturModal(false);
            }}
            modalIsOpen={visReturModal}
            oversiktTekst="Send i retur til veileder"
            bekreftelseTekst="Send i retur"
            avbrytelseTekst="Avbryt"
            lukkModal={() => setVisReturModal(false)}
        >
            <BodyShort size="small" className={cls.element('returtekst-subingress')}>
                Veileder vil få en varsling i avtaleløsningen med årsak til retur og forklaring.
            </BodyShort>
            <div className={cls.element('returboks')}>
                <CheckboxGroup
                    value={[...returårsaker]}
                    onChange={(årsaker) => setReturårsaker(årsaker)}
                    legend="Årsak for retur av tilskuddsperiode"
                >
                    {Object.entries(tilskuddsperiodeReturÅrsakTekst)
                        .filter(([kode]) => {
                            if (tiltakstype === 'VTAO') {
                                return kode !== 'FEIL_I_PROSENTSATS';
                            }
                            return true;
                        })
                        .map(([kode, tekst]) => (
                            <Checkbox key={kode} value={kode}>
                                {tekst}
                            </Checkbox>
                        ))}
                </CheckboxGroup>
                <PakrevdTextarea
                    className={cls.element('returforklaring')}
                    label="Forklaring"
                    maxLengde={1000}
                    verdi={returforklaring}
                    settVerdi={(verdi) => setReturforklaring(verdi)}
                />
            </div>
        </BekreftelseModal>
    );
};
export default TilskuddsperiodeReturModal;
