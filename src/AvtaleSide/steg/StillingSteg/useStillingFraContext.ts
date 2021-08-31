import { AvtaleContext } from '@/AvtaleProvider';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import { StillingOptions } from '@/AvtaleSide/steg/StillingSteg/StillingsTittelVelger';
import { Stilling } from '@/types/avtale';
import { useContext } from 'react';
import { ValueType } from 'react-select';

const useStillingFraContext = () => {
    const avtaleContext: InputStegProps<Stilling> = useContext(AvtaleContext);

    const setValgtStilling = (val: ValueType<StillingOptions, boolean>) => {
        const values = val as StillingOptions;
        avtaleContext.settAvtaleVerdier({
            stillingstittel: values?.label,
            stillingStyrk08: values?.styrk08,
            stillingKonseptId: values?.konseptId,
        });
    };

    const valgtStilling: StillingOptions | null = avtaleContext.avtale.stillingstittel
        ? {
            label: avtaleContext.avtale.stillingstittel || '',
            konseptId: avtaleContext.avtale.stillingKonseptId || 0,
            styrk08: avtaleContext.avtale.stillingStyrk08 || 0,
            value: avtaleContext.avtale.stillingstittel || '',
        }
        : null;

    return { valgtStilling, setValgtStilling };
};
export default useStillingFraContext;