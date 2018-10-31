import PanelBase from 'nav-frontend-paneler';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import * as React from 'react';
import AvtaleStegProps from './AvtaleStegProps';

const Person = (props: AvtaleStegProps) => (
    <PanelBase>
        <SkjemaGruppe title={'Opplysninger om person'}>
            <Input
                label={'Fødselsnummer'}
                id={'fnr'}
                bredde={'M'}
                defaultValue={props.form.fnr}
                onChange={props.handleChange}
            />
            <Input
                label={'Navn'}
                id={'personnavn'}
                bredde={'XL'}
                defaultValue={props.form.personnavn}
                onChange={props.handleChange}
            />
            <Input
                label={'Telefon'}
                id={'persontlf'}
                bredde={'M'}
                type={'tel'}
                defaultValue={props.form.persontlf}
                onChange={props.handleChange}
            />
        </SkjemaGruppe>
    </PanelBase>
);

export default Person;
