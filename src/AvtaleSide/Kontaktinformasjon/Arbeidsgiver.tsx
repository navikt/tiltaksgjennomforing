import PanelBase from 'nav-frontend-paneler';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import * as React from 'react';
import AvtaleStegProps from '../AvtaleStegProps';

const Arbeidsgiver = (props: AvtaleStegProps) => (
    <PanelBase>
        <SkjemaGruppe title={'Opplysninger om arbeidsgiver'}>
            <Input
                label={'Organisasjonsnummer'}
                bredde={'M'}
                id={'arbeidsgiverorgnr'}
                defaultValue={props.form.arbeidsgiverorgnr}
                onChange={props.oppdaterAvtale}
            />
            <Input
                label={'Bedriftens navn'}
                bredde={'XL'}
                id={'arbeidsgivernavn'}
                defaultValue={props.form.arbeidsgivernavn}
                onChange={props.oppdaterAvtale}
            />
            <Input
                label={'Kontaktperson'}
                bredde={'XL'}
                id={'arbeidsgiverkontaktperson'}
                defaultValue={props.form.arbeidsgiverkontaktperson}
                onChange={props.oppdaterAvtale}
            />
            <Input
                label={'Telefon'}
                bredde={'M'}
                type={'tel'}
                id={'arbeidsgivertlf'}
                defaultValue={props.form.arbeidsgivertlf}
                onChange={props.oppdaterAvtale}
            />
        </SkjemaGruppe>
    </PanelBase>
);

export default Arbeidsgiver;
