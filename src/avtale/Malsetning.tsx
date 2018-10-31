import PanelBase from 'nav-frontend-paneler';
import { TextareaControlled } from 'nav-frontend-skjema';
import * as React from 'react';
import AvtaleStegProps from './AvtaleStegProps';

const Malsetning = (props: AvtaleStegProps) => (
    <PanelBase>
        <TextareaControlled
            label={'Målsetninger for arbeidstreningen'}
            id={'maal'}
            defaultValue={props.form.maal || ''}
            onChange={props.handleChange}
        />
    </PanelBase>
);

export default Malsetning;
