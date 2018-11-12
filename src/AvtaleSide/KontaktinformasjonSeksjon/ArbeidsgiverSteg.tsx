import PanelBase from 'nav-frontend-paneler';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import * as React from 'react';
import { EndreAvtale } from '../EndreAvtale';
import { Arbeidsgiverinfo } from '../Avtale';
import StegProps from '../StegProps';

const ArbeidsgiverSteg = (
    props: Arbeidsgiverinfo & EndreAvtale & StegProps
) => (
    <PanelBase>
        <SkjemaGruppe title={'Opplysninger om arbeidsgiver'}>
            <Input
                label={'Organisasjonsnummer'}
                bredde={'M'}
                defaultValue={props.arbeidsgiverorgnr}
                onChange={(event: any) =>
                    props.endreVerdi('arbeidsgiverorgnr', event.target.value)
                }
            />
            <Input
                label={'Bedriftens navn'}
                bredde={'XL'}
                defaultValue={props.arbeidsgivernavn}
                onChange={(event: any) =>
                    props.endreVerdi('arbeidsgivernavn', event.target.value)
                }
            />
            <Input
                label={'Kontaktperson'}
                bredde={'XL'}
                defaultValue={props.arbeidsgiverkontaktperson}
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
                defaultValue={props.arbeidsgivertlf}
                onChange={(event: any) =>
                    props.endreVerdi('arbeidsgivertlf', event.target.value)
                }
            />
        </SkjemaGruppe>
    </PanelBase>
);

export default ArbeidsgiverSteg;
