import PanelBase from 'nav-frontend-paneler';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import * as React from 'react';
import AvtaleStegProps from './AvtaleStegProps';

const Arbeidsgiver = (props: AvtaleStegProps) => (
    <PanelBase>
        <SkjemaGruppe title={'Opplysninger om arbeidsgiver'}>
            <Input
                label={'Organisasjonsnummer'}
                id={'orgnr'}
                bredde={'M'}
                defaultValue={props.form.orgnr}
                onChange={props.handleChange}
            />
            <Input
                label={'Bedriftens navn'}
                id={'bedriftsnavn'}
                bredde={'XL'}
                defaultValue={props.form.bedriftsnavn}
                onChange={props.handleChange}
            />
            <Input
                label={'Kontaktperson'}
                id={'kontaktperson'}
                bredde={'XL'}
                defaultValue={props.form.kontaktperson}
                onChange={props.handleChange}
            />
            <Input
                label={'Telefon'}
                id={'bedriftstlf'}
                bredde={'M'}
                type={'tel'}
                defaultValue={props.form.bedriftstlf}
                onChange={props.handleChange}
            />
        </SkjemaGruppe>
    </PanelBase>
);

export default Arbeidsgiver;
