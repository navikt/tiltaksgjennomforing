import { AvtaleContext } from '@/AvtaleProvider';
import { Avtaleinnhold } from '@/types/avtale';
import { DateValidationT, DatePicker, useDatepicker } from '@navikt/ds-react';
import { FunctionComponent, PropsWithChildren, useContext, useState, useEffect } from 'react';
import { formatterDatoHvisDefinert } from '@/utils/datoUtils';
import { AvtaleMinMaxDato } from '@/AvtaleSide/steg/VarighetSteg/AvtaleMinMaxDato/AvtaleMinMaxDato';

interface Props {
    datoFelt: keyof Pick<Avtaleinnhold, 'startDato' | 'sluttDato'>;
    label: string;
}

const Datovelger: FunctionComponent<Props> = ({ label, datoFelt }: PropsWithChildren<Props>) => {
    const { avtale, settAvtaleInnholdVerdier } = useContext(AvtaleContext);

    const fjernTid = (timestamp: string) => timestamp.split('T')[0];
    const erStartdato = datoFelt === 'startDato';
    const [hasError, setHasError] = useState<boolean>(false);

    const [feilmeldingTekst, setFeilmeldingTekst] = useState<string>();
    const [selectedDate, setSelectedDate] = useState<any>();

    console.log('selectedDate', selectedDate);

    const feilmelding = (val: DateValidationT | undefined, nedreGrensese: string, øvreGrense: string, valgtStartDato: any) => {
        let startDato = selectedDate; 
        console.log('startDato', startDato);
        if(val){
            if (!val.isValidDate) {
                console.log('valgtStartDato', valgtStartDato);
                if (erStartdato) {
                    if (val.isBefore) {
                        setFeilmeldingTekst('Startdato kan ikke være tidligere enn ' + nedreGrensese);
                        setHasError(val.isBefore);
                    } else if (val.isAfter) {
                        setFeilmeldingTekst('Startdato kan ikke være senere enn ' + øvreGrense);
                        setHasError(val.isAfter);
                    } else {
                        setFeilmeldingTekst('Startdato er ikke gyldig dato');
                        setHasError(!val.isValidDate);
                    }
                } else {
                    if (val.isBefore) {
                        setFeilmeldingTekst('Sluttdato kan ikke være tidligere enn ' + nedreGrensese);
                        setHasError(val.isBefore);
                    } else if (val.isAfter) {
                        setFeilmeldingTekst('Sluttdato kan ikke være senere enn ' + øvreGrense);
                        setHasError(val.isAfter);
                    } else {
                        setFeilmeldingTekst('sluttdato er ikke gyldig dato');
                        setHasError(!val.isValidDate);
                    }
                }
            }
            else{
                setHasError(val.isValidDate);
            }
        } 
    };

    useEffect (() => {
        console.log('dsfgsdfgdfsgfds')
    }, [selectedDate])

    const { datepickerProps, inputProps } = useDatepicker({
        fromDate: new Date(fjernTid(AvtaleMinMaxDato(erStartdato).minDate || '')),
        toDate: new Date(fjernTid(AvtaleMinMaxDato(erStartdato).maxDate || '')),
        inputFormat: 'dd.MM.yyyy',
        defaultSelected: avtale.gjeldendeInnhold[datoFelt] ? new Date(avtale.gjeldendeInnhold[datoFelt]!) : undefined,

        

        onDateChange: (dato) => {
            if (erStartdato) {
                console.log('onDateChange', formatterDatoHvisDefinert(dato?.toDateString()));
                /*
                feilmelding(undefined,   formatterDatoHvisDefinert(datepickerProps.fromDate?.toDateString()),
                formatterDatoHvisDefinert(datepickerProps.toDate?.toDateString()),dato )
                */
                setSelectedDate(formatterDatoHvisDefinert(dato?.toDateString()));
            }
            settAvtaleInnholdVerdier({
                [datoFelt]: formatterDatoHvisDefinert(dato?.toDateString(), 'YYYY-MM-DD'),
            });
        },


        onValidate: (val) => {
            //console.log("VAL", val)
            //console.log('onValidate selected', formatterDatoHvisDefinert(datepickerProps.onSelect() => val ));
            feilmelding(
                val,
                formatterDatoHvisDefinert(datepickerProps.fromDate?.toDateString()),
                formatterDatoHvisDefinert(datepickerProps.toDate?.toDateString()),
                selectedDate
            );
        },
        
    });

    return (
        <div>
            <label className="skjemaelement__label">{label}</label>
            <DatePicker   {...datepickerProps}>
                <DatePicker.Input
                    {...inputProps}
                    placeholder="dd.mm.åååå"
                    error={hasError && feilmeldingTekst}
                    label=""
                />
            </DatePicker>
        </div>
    );
};

export default Datovelger;
