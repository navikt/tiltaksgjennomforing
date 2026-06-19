import React, { useContext } from 'react';
import { Box, Alert } from '@navikt/ds-react';
import ValutaInput from '@/komponenter/form/ValutaInput';
import { BEMWrapper } from '@/utils/bem';
import { AvtaleContext } from '@/AvtaleProvider';

interface Props {
    cls: BEMWrapper;
}

const Manedslonn: React.FC<Props> = ({ cls }: Props) => {
    const { avtale, settAvtaleInnholdVerdier, settOgKalkulerBeregningsverdier } = useContext(AvtaleContext);
    const erHøyManedslønn =
        avtale.gjeldendeInnhold.manedslonn !== undefined && avtale.gjeldendeInnhold.manedslonn > 99999;

    return (
        <Box className={cls.element('rad', 'input')}>
            <Box className={cls.element('valuta-input')}>
                <ValutaInput
                    className="input"
                    name="manedslonn"
                    size="medium"
                    label="Månedslønn før skatt"
                    autoComplete={'off'}
                    value={avtale.gjeldendeInnhold.manedslonn}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        settAvtaleInnholdVerdier({ manedslonn: parseFloat(event.target.value) });
                    }}
                    onBlur={(event) => settOgKalkulerBeregningsverdier({ manedslonn: parseFloat(event.target.value) })}
                    min={0}
                />
                {erHøyManedslønn && (
                    <Alert variant="warning" className={cls.element('alert')}>
                        Er du sikker på at dette er riktig månedslønn?
                    </Alert>
                )}
            </Box>
        </Box>
    );
};
export default Manedslonn;
