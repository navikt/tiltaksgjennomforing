import PanelBase from 'nav-frontend-paneler';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import * as React from 'react';
import StegProps from '../StegProps';
import { EndreAvtale } from '../EndreAvtale';

const PersonSteg = (props: EndreAvtale & StegProps) => (
    <PanelBase>
        <SkjemaGruppe title={'Opplysninger om person'}>
            <Input
                label={'Fødselsnummer'}
                bredde={'M'}
                onChange={(event: any) =>
                    props.endreVerdi('personfnr', event.target.value)
                }
            />
            <Input
                label={'Navn'}
                bredde={'XL'}
                onChange={(event: any) =>
                    props.endreVerdi('personnavn', event.target.value)
                }
            />
            <Input
                label={'Telefon'}
                bredde={'M'}
                type={'tel'}
                onChange={(event: any) =>
                    props.endreVerdi('persontlf', event.target.value)
                }
            />
        </SkjemaGruppe>
    </PanelBase>
);

export default PersonSteg;
