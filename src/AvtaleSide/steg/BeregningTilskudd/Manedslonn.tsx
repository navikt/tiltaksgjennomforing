import React, { useContext } from 'react';
import { Box, Alert } from '@navikt/ds-react';
import { BEMWrapper } from '@/utils/bem';
import { AvtaleContext } from '@/AvtaleProvider';
import KronerInput from '@/komponenter/form/KronerInput';
import { parsePenger } from '@/utils';

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
                <KronerInput
                    className="input"
                    name="manedslonn"
                    size="medium"
                    label="Månedslønn før skatt"
                    verdi={avtale.gjeldendeInnhold.manedslonn}
                    settVerdi={(manedslonn?: number) => {
                        settAvtaleInnholdVerdier({ manedslonn: manedslonn });
                    }}
                    onBlur={(event) => settOgKalkulerBeregningsverdier({ manedslonn: parsePenger(event.target.value) })}
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
