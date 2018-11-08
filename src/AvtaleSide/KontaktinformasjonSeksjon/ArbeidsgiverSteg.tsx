import PanelBase from 'nav-frontend-paneler';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import * as React from 'react';
import AvtaleProps from '../AvtaleProps';
import StegProps from '../StegProps';

const ArbeidsgiverSteg = (props: AvtaleProps & StegProps) => (
    <PanelBase>
        <SkjemaGruppe title={'Opplysninger om arbeidsgiver'}>
            <Input
                label={'Organisasjonsnummer'}
                bredde={'M'}
                defaultValue={props.form.arbeidsgiverorgnr}
                onChange={(event: any) =>
                    props.endreVerdi('arbeidsgiverorgnr', event.target.value)
                }
            />
            <Input
                label={'Bedriftens navn'}
                bredde={'XL'}
                defaultValue={props.form.arbeidsgivernavn}
                onChange={(event: any) =>
                    props.endreVerdi('arbeidsgivernavn', event.target.value)
                }
            />
            <Input
                label={'Kontaktperson'}
                bredde={'XL'}
                defaultValue={props.form.arbeidsgiverkontaktperson}
                onChange={(event: any) =>
                    props.endreVerdi(
                        'arbeidsgiverkontaktperson',
                        event.target.value
                    )
                }
            />
            <Input
                label={'Telefon'}
                bredde={'M'}
                type={'tel'}
                defaultValue={props.form.arbeidsgivertlf}
                onChange={(event: any) =>
                    props.endreVerdi('arbeidsgivertlf', event.target.value)
                }
            />
        </SkjemaGruppe>
    </PanelBase>
);

export default ArbeidsgiverSteg;
