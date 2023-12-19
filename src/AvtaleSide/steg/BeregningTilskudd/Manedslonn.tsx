import React, { useContext } from 'react';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import ValutaInput from '@/komponenter/form/ValutaInput';
import { BEMWrapper } from '@/utils/bem';
import { AvtaleContext } from '@/AvtaleProvider';
import { Alert } from '@navikt/ds-react';

interface Props {
    cls: BEMWrapper;
}

const Manedslonn: React.FC<Props> = ({ cls }: Props) => {
    const { avtale, settAvtaleInnholdVerdier, settOgKalkulerBeregningsverdier } = useContext(AvtaleContext);
    const erHøyManedslønn = (avtale.gjeldendeInnhold.manedslonn !== undefined && avtale.gjeldendeInnhold.manedslonn > 99999);

    return (
        <Row className={cls.element('rad', 'input')}>
            <Column md="6" className={cls.element('valuta-input')}>
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
                {erHøyManedslønn &&
                    <Alert variant="warning" className={cls.element('alert')}>
                        Er du sikker på at dette er riktig månedslønn?
                    </Alert>
                }
            </Column>
        </Row>
    );
};
export default Manedslonn;
