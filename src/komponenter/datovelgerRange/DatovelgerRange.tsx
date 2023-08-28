import { AvtaleMinMaxDato } from '@/AvtaleSide/steg/VarighetSteg/AvtaleMinMaxDato/AvtaleMinMaxDato';
import { DatePicker, useRangeDatepicker } from '@navikt/ds-react';
import format from 'date-fns/format';
import nbLocale from 'date-fns/locale/nb';
import { useState } from 'react';
import Nytt from '../NyttIAppen/Nytt';

const DatovelgerRange = () => {
    const fjernTid = (timestamp: string) => timestamp.split('T')[0];

    const [hasError, setHasError] = useState<boolean>(false);

    const [nyTilDato, setNyTilDato] = useState<Date | undefined>(new Date(fjernTid(AvtaleMinMaxDato(true).minDate || '')));
    const [nyFraDato, setNyFraDato] = useState<Date | undefined>(new Date(fjernTid(AvtaleMinMaxDato(true).maxDate || '')));

    //new Date( fjernTid(AvtaleMinMaxDato(true).minDate ||

    const { datepickerProps, toInputProps, fromInputProps, selectedRange } = useRangeDatepicker({
        fromDate: nyTilDato,
        
        onValidate: (val) => {
            if(!val.to.isValidDate)

            return setHasError(true);
        },
        onRangeChange : (rangeval) => {
            if(rangeval && (rangeval.to && rangeval.from != null)){
                if(rangeval?.from?.getTime() - new Date(rangeval.to).getTime()){
                    console.log("tesrt  tesr ")
                }
            }
        }

        //var time = new Date().getTime() - new Date("2013-02-20T12:01:04.753Z").getTime();        
        
    });


    return (
        <>
            <DatePicker {...datepickerProps}>
                <DatePicker.Input
                    {...fromInputProps}
                    placeholder="dd.mm.åååå"
                    //error={hasError && feilmeldingTekst}
                    label="Fra"
                    error={hasError && 'Feil fra'}
                />
                <DatePicker.Input
                    {...toInputProps}
                    placeholder="dd.mm.åååå"
                    //error={hasError && feilmeldingTekst}
                    label="Til"
                    error={hasError && 'Feil til'}
                />
            </DatePicker>
            {selectedRange && (
                <div className="pt-4">
                    <div>{selectedRange?.from && format(selectedRange.from, 'dd.MM.yyyy', { locale: nbLocale })}</div>
                    <div>{selectedRange?.to && format(selectedRange.to, 'dd.MM.yyyy', { locale: nbLocale })}</div>
                </div>
            )}
        </>
    );
};
export default DatovelgerRange;
