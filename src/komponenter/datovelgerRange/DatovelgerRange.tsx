import { AvtaleMinMaxDato } from '@/AvtaleSide/steg/VarighetSteg/AvtaleMinMaxDato/AvtaleMinMaxDato';
import {DatePicker, useDatepicker, useRangeDatepicker} from '@navikt/ds-react';
import format from 'date-fns/format';
import nbLocale from 'date-fns/locale/nb';
import {ChangeEvent, ChangeEventHandler, useState} from 'react';
import Nytt from '../NyttIAppen/Nytt';
import {formatterDatoHvisDefinert} from "@/utils/datoUtils";

const DatovelgerRange = () => {
    const fjernTid = (timestamp: string) => timestamp.split('T')[0];

    const [hasError, setHasError] = useState<boolean>(false);

    const [fraDato, setFraDato] = useState<Date | undefined>(new Date(fjernTid(AvtaleMinMaxDato(true).minDate || '')));
    const [tilDato, setTilDato] = useState<Date | undefined>(new Date(fjernTid(AvtaleMinMaxDato(true).maxDate || '')));



    const { datepickerProps, inputProps } = useDatepicker({
        fromDate: fraDato,
        toDate: tilDato,
        inputFormat: 'dd.MM.yyyy',



        onDateChange: (dato) => {
            console.log(dato, inputProps)
        },

    });

    return (
        <>
            <DatePicker {...datepickerProps} id={"FRA"} className={"FRA"}  >
                <DatePicker.Input
                    placeholder="dd.mm.åååå"
                    label="Fra"
                    error={hasError && 'Feil fra'}
                />
            </DatePicker>
            <DatePicker {...datepickerProps} id={"TO"} className={"TO"} >

                <DatePicker.Input
                    placeholder="dd.mm.åååå"
                    label="Til"
                    error={hasError && 'Feil til'}
                />
            </DatePicker>

        </>
    );
};
export default DatovelgerRange;
