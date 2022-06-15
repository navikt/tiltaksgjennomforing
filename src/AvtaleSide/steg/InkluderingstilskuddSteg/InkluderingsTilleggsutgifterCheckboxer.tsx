import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import CheckboxMedInput from '@/AvtaleSide/steg/InkluderingstilskuddSteg/CheckboxMedInput';
import { Element } from 'nav-frontend-typografi';
import BEMHelper from '@/utils/bem';
import './InkluderingsTilleggsutgifterCheckboxer.less';
import { InkluderingsRad, Inkluderingstilskuddtyper } from '@/types/avtale';
import { AvtaleContext } from '@/AvtaleProvider';

const cls = BEMHelper('inkluderingsTilleggsutgifterCheckboxer');

interface Props {
    feilmeldingGrunn: string | undefined;
}

export type Inkluderingsrad = Pick<InkluderingsRad, 'beløp' | 'type'>;

const InkluderingsTilleggutgifterCheckboxer: FunctionComponent<Props> = (props) => {
    const { avtale } = useContext(AvtaleContext);
    const [tilskuddsrad, setTilskuddsrad] = useState<Inkluderingsrad[] | undefined>();

    const settTilskuddsrad = ({ beløp, type }: Inkluderingsrad): void => {
        setTilskuddsrad(
            Object.assign([], tilskuddsrad, {
                [type]: { beløp: beløp, type: type },
            })
        );
    };

    const finBeløpForTilskuddstype = (type: Inkluderingstilskuddtyper): number | undefined =>
        avtale.inkluderingsrader?.find((rad) => rad.type === type)?.beløp;

    useEffect(() => {
        console.log('tilskuddsrad ', tilskuddsrad);
    }, [tilskuddsrad]);

    return (
        <SkjemaGruppe feil={props.feilmeldingGrunn}>
            <Element className={cls.element('overskrift')}>
                Huk av for hva tilskuddet skal dekke tilleggsutgifter knyttet til:
            </Element>

            <CheckboxMedInput
                inputLabel={'Kostnadsoverslag'}
                settTilskuddsrad={settTilskuddsrad}
                checkboxLabel="nødvendig vurdering av personens funksjonsevne eller tilretteleggingsbehov på den konkrete arbeidsplassen"
                ledigIndex={tilskuddsrad?.length}
                typeTilskudd="TILRETTELEGGINGSBEHOV"
                verdi={finBeløpForTilskuddstype('TILRETTELEGGINGSBEHOV')}
            />
            <CheckboxMedInput
                inputLabel={'Kostnadsoverslag'}
                settTilskuddsrad={settTilskuddsrad}
                checkboxLabel="opprettelse av ekstra tiltaksplass, for eksempel kontormøbler"
                ledigIndex={tilskuddsrad?.length}
                typeTilskudd="TILTAKSPLASS"
                verdi={finBeløpForTilskuddstype('TILTAKSPLASS')}
            />
            <CheckboxMedInput
                inputLabel={'Kostnadsoverslag'}
                settTilskuddsrad={settTilskuddsrad}
                checkboxLabel={'personlig utstyr som arbeidstøy, vernesko, databriller o.l. knyttet til arbeidet'}
                ledigIndex={tilskuddsrad?.length}
                typeTilskudd="UTSTYR"
                verdi={finBeløpForTilskuddstype('UTSTYR')}
            />
            <CheckboxMedInput
                inputLabel={'Kostnadsoverslag'}
                settTilskuddsrad={settTilskuddsrad}
                checkboxLabel={
                    'merkostnader til å kjøpe og installere programvare som skal brukes av personen, herunder teknologisk utstyr eller teknologiske hjelpemidler'
                }
                ledigIndex={tilskuddsrad?.length}
                typeTilskudd="PROGRAMVARE"
                verdi={finBeløpForTilskuddstype('PROGRAMVARE')}
            />
            <CheckboxMedInput
                inputLabel={'Kostnadsoverslag'}
                settTilskuddsrad={settTilskuddsrad}
                checkboxLabel={
                    'nødvendige gjenstander og arbeidshjelpemidler personen trenger for å utføre arbeidet og tilpasninger som ikke kan dekkes etter folketrygdlovens § 10-5'
                }
                ledigIndex={tilskuddsrad?.length}
                typeTilskudd="ARBEIDSHJELPEMIDLER"
                verdi={finBeløpForTilskuddstype('ARBEIDSHJELPEMIDLER')}
            />
            <CheckboxMedInput
                inputLabel={'Kostnadsoverslag'}
                settTilskuddsrad={settTilskuddsrad}
                checkboxLabel={
                    'nødvendige merutgifter til forsikring, lisenser, sertifisering o.l. knyttet til arbeidet, og ekstern opplæring for å kunne utføre arbeidet i virksomheten'
                }
                ledigIndex={tilskuddsrad?.length}
                typeTilskudd="OPPLÆRING"
                verdi={finBeløpForTilskuddstype('OPPLÆRING')}
            />
            <Input
                className={cls.element('totalBeløp')}
                label={'Totalt kostnadsoverslag'}
                value={0}
                disabled={false}
                feil={undefined}
            />
        </SkjemaGruppe>
    );
};

export default InkluderingsTilleggutgifterCheckboxer;
