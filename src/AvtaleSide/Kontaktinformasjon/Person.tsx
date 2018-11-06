import PanelBase from 'nav-frontend-paneler';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import * as React from 'react';
import AvtaleStegProps from '../AvtaleStegProps';

const Person = (props: AvtaleStegProps) => (
    <PanelBase>
        <SkjemaGruppe title={'Opplysninger om person'}>
            <Input
                label={'Fødselsnummer'}
                id={'personfnr'}
                bredde={'M'}
                defaultValue={props.form.personfnr}
                onChange={props.oppdaterAvtale}
            />
            <Input
                label={'Navn'}
                id={'personnavn'}
                bredde={'XL'}
                defaultValue={props.form.personnavn}
                onChange={props.oppdaterAvtale}
            />
            <Input
                label={'Telefon'}
                id={'persontlf'}
                bredde={'M'}
                type={'tel'}
                defaultValue={props.form.persontlf}
                onChange={props.oppdaterAvtale}
            />
        </SkjemaGruppe>
    </PanelBase>
);

export default Person;
