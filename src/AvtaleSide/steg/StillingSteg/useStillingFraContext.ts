import { AvtaleContext } from '@/AvtaleProvider';
import { StillingOptions } from '@/AvtaleSide/steg/StillingSteg/StillingsTittelVelger';
import { useContext } from 'react';
//import { ValueType } from 'react-select';

const useStillingFraContext = () => {
    const avtaleContext = useContext(AvtaleContext);

    const setValgtStilling = (val: StillingOptions) => {
        const values = val as StillingOptions;
        avtaleContext.settAvtaleInnholdVerdier({
            stillingstittel: values?.label,
            stillingStyrk08: values?.styrk08,
            stillingKonseptId: values?.konseptId,
        });
    };

    const valgtStilling: StillingOptions | null = avtaleContext.avtale.gjeldendeInnhold.stillingstittel
        ? {
              label: avtaleContext.avtale.gjeldendeInnhold.stillingstittel || '',
              konseptId: avtaleContext.avtale.gjeldendeInnhold.stillingKonseptId || 0,
              styrk08: avtaleContext.avtale.gjeldendeInnhold.stillingStyrk08 || 0,
              value: avtaleContext.avtale.gjeldendeInnhold.stillingstittel || '',
          }
        : null;

    return { valgtStilling, setValgtStilling };
};
export default useStillingFraContext;
