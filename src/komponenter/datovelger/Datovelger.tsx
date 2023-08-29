import { AvtaleContext } from '@/AvtaleProvider';
import { AvtaleMinMaxDato } from '@/AvtaleSide/steg/VarighetSteg/AvtaleMinMaxDato/AvtaleMinMaxDato';
import { Avtaleinnhold } from '@/types/avtale';
import { formatterDatoHvisDefinert } from '@/utils/datoUtils';
import { DateValidationT, UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react';
import { FunctionComponent, PropsWithChildren, useContext, useState } from 'react';

interface Props {
    datoFelt: keyof Pick<Avtaleinnhold, 'startDato' | 'sluttDato'>;
    label: string;
}

const Datovelger: FunctionComponent<Props> = ({ label, datoFelt }: PropsWithChildren<Props>) => {
    const { avtale, settAvtaleInnholdVerdier } = useContext(AvtaleContext);

    const fjernTid = (timestamp: string) => timestamp.split('T')[0];
    const erStartdato = datoFelt === 'startDato';

    const { datepickerProps, inputProps } = UNSAFE_useDatepicker({
        fromDate: new Date(fjernTid(AvtaleMinMaxDato(erStartdato).minDate || '')),
        toDate: new Date(fjernTid(AvtaleMinMaxDato(erStartdato).maxDate || '')),
        onValidate: (val) => {
            feilmelding(val);
          },
        inputFormat: 'dd.MM.yyyy',
        defaultSelected: avtale.gjeldendeInnhold[datoFelt] ? new Date(avtale.gjeldendeInnhold[datoFelt]!) : undefined,

        onDateChange: (dato) => {
            settAvtaleInnholdVerdier({
                [datoFelt]: formatterDatoHvisDefinert(dato?.toDateString(), 'YYYY-MM-DD'),
            });
        },
    });

    const [feil, setFeil] = useState<string | null>(null)

    const feilmelding = (val: DateValidationT) => {
        console.log(val);
        
        if (!erStartdato) {
            if (val.isAfter) {
                const grense = formatterDatoHvisDefinert(datepickerProps.toDate?.toDateString());
                setFeil('Sluttdato kan ikke være etter ' + grense);
                console.log('Sluttdato kan ikke være etter ' + grense);
            } else {
                setFeil(null);
            }
        }
    }

    return (
        <div>
            <label className="skjemaelement__label">{label}</label>
            <UNSAFE_DatePicker {...datepickerProps}>
                <UNSAFE_DatePicker.Input {...inputProps} placeholder="dd.mm.åååå" label="" error={feil} />
            </UNSAFE_DatePicker>
        </div>
    );
};

export default Datovelger;
