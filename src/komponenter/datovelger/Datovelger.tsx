import { AvtaleContext } from '@/AvtaleProvider';
import { Avtaleinnhold } from '@/types/avtale';
import { UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react';
import { FunctionComponent, PropsWithChildren, useContext } from 'react';
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

    const { datepickerProps, inputProps } = UNSAFE_useDatepicker({
        fromDate: new Date(fjernTid(AvtaleMinMaxDato(erStartdato).minDate || '')),
        toDate: new Date(fjernTid(AvtaleMinMaxDato(erStartdato).maxDate || '')),
        inputFormat: 'dd.MM.yyyy',
        defaultSelected: avtale.gjeldendeInnhold[datoFelt] ? new Date(avtale.gjeldendeInnhold[datoFelt]!) : undefined,

        onDateChange: (dato) => {
            settAvtaleInnholdVerdier({
                [datoFelt]: formatterDatoHvisDefinert(dato?.toDateString(), 'YYYY-MM-DD'),
            });
        },
    });

    return (
        <div>
            <label className="skjemaelement__label">{label}</label>
            <UNSAFE_DatePicker {...datepickerProps}>
                <UNSAFE_DatePicker.Input {...inputProps} placeholder="dd.mm.åååå" label="" />
            </UNSAFE_DatePicker>
        </div>
    );
};

export default Datovelger;
