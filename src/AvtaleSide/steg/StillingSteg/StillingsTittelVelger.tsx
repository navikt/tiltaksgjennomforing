import { hentStillinger } from '@/services/rest-service';
import debounce from 'lodash.debounce';
import React, { FunctionComponent, useState } from 'react';
import Select, { FormatOptionLabelMeta } from 'react-select';
import useStillingFraContext from '@/AvtaleSide/steg/StillingSteg/useStillingFraContext';

export type StillingOptions = {
    label: string;
    value: string;
    konseptId: number;
    styrk08: number;
};

const StillingsTittelVelger: FunctionComponent = () => {
    const [stillinger, setStillinger] = useState<StillingOptions[]>();

    const { valgtStilling, setValgtStilling } = useStillingFraContext();

    const hentOgSettStillinger = (sok: string) => {
        hentStillinger(sok).then(data => {
            const options: StillingOptions[] = data.map(opt => ({
                label: opt.label,
                value: opt.label,
                konseptId: opt.konseptId,
                styrk08: opt.styrk08,
            }));
            setStillinger(options);
        });
    };

    const ANTALL_MILLISEKUNDER = 200;
    const delayHentStilling = debounce(hentOgSettStillinger, ANTALL_MILLISEKUNDER);

    const visSokeMelding = (inputValue: string) => {
        if (inputValue.length > 0) {
            return 'Finner ingen stillinger';
        }
        return null;
    };

    const highlightPattern = (text: string, pattern: string) => {
        const txtfragments = text.split(new RegExp(pattern, 'gi'));
        if (txtfragments.length <= 1) {
            return text;
        }

        const matches = text.match(new RegExp(pattern, 'gi'));

        return txtfragments.reduce(
            (arr: any, element: any, index: number) =>
                matches && matches[index] ? [...arr, element, <b key={index}>{matches[index]}</b>] : [...arr, element],
            []
        );
    };

    const formatOptionLabel = (option: StillingOptions, labelMeta: FormatOptionLabelMeta<StillingOptions>) => {
        return highlightPattern(option.label, labelMeta.inputValue);
    };

    return (
        <Select
            components={{ DropdownIndicator: null }}
            placeholder="Skriv inn. For eksempel rørlegger"
            noOptionsMessage={({ inputValue }) => visSokeMelding(inputValue)}
            isClearable={true}
            value={valgtStilling}
            onChange={value => setValgtStilling(value)}
            onInputChange={value => delayHentStilling(value)}
            options={stillinger}
            formatOptionLabel={formatOptionLabel}
            theme={theme => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    neutral20: '#78706A',
                    primary: '#254b6d',
                    neutral80: 'black',
                },
            })}
        />
    );
};

export default StillingsTittelVelger;
