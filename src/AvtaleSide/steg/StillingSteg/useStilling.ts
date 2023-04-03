import { StillingOptions } from '@/AvtaleSide/steg/StillingSteg/StillingsTittelVelger';
import { Stilling } from '@/types/avtale';
import { useState } from 'react';
import { OnChangeValue } from 'react-select';

const useStilling = (defaultVerdier: Stilling) => {
    const [stilling, setStilling] = useState<Stilling>(defaultVerdier);

    const setValgtStilling = (val: OnChangeValue<StillingOptions, boolean>) => {
        const values = val as StillingOptions;
        setStilling({
            stillingstittel: values?.label,
            stillingStyrk08: values?.styrk08,
            stillingKonseptId: values?.konseptId,
        });
    };

    const valgtStilling: StillingOptions | null = stilling?.stillingstittel
        ? {
              label: stilling.stillingstittel || '',
              konseptId: stilling.stillingKonseptId || 0,
              styrk08: stilling.stillingStyrk08 || 0,
              value: stilling.stillingstittel || '',
          }
        : null;

    return { valgtStilling, setValgtStilling };
};

export default useStilling;
