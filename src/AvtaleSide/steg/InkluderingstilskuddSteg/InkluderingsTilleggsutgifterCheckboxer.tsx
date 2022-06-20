import { AvtaleContext } from '@/AvtaleProvider';
import CheckboxMedInput from '@/AvtaleSide/steg/InkluderingstilskuddSteg/CheckboxMedInput';
import { inkluderingstilskuddForklaringTekst } from '@/messages';
import { InkluderingsRad, Inkluderingstilskuddtyper } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import './InkluderingsTilleggsutgifterCheckboxer.less';

const cls = BEMHelper('inkluderingsTilleggsutgifterCheckboxer');

interface Props {
    feilmeldingGrunn: string | undefined;
}

export type Inkluderingsrad = Pick<InkluderingsRad, 'beløp' | 'type'>;

const InkluderingsTilleggutgifterCheckboxer: FunctionComponent<Props> = (props) => {
    const { avtale, settAvtaleInnholdVerdi } = useContext(AvtaleContext);
    const [tilskuddsrad, setTilskuddsrad] = useState<Inkluderingsrad[] | undefined>();

    const settTilskuddsrad = ({ beløp, type }: Inkluderingsrad): void => {
        const rader = Object.assign([], tilskuddsrad, {
            [type]: { beløp: beløp, type: type },
        });
        // setTilskuddsrad(
        //     Object.assign([], tilskuddsrad, {
        //         [type]: { beløp: beløp, type: type },
        //     })
        // );
        settAvtaleInnholdVerdi("inkluderingstilskudd", rader);
    };
    const map = new Map<Inkluderingstilskuddtyper, Inkluderingsrad>();
    debugger;
 
    const finnRad = (type: Inkluderingstilskuddtyper) => avtale.gjeldendeInnhold.inkluderingstilskudd?.find((rad) => rad.type === type);

    useEffect(() => {
        console.log('tilskuddsrad ', tilskuddsrad);
        console.log("avtaleInnhold:", avtale.gjeldendeInnhold.inkluderingstilskudd);
        
    }, [tilskuddsrad]);

    const inkluderingstyper: Inkluderingstilskuddtyper[] = ['ARBEIDSHJELPEMIDLER', 'OPPLÆRING', 'PROGRAMVARE', 'TILRETTELEGGINGSBEHOV', 'TILTAKSPLASS', 'UTSTYR'];

    return (
        <SkjemaGruppe feil={props.feilmeldingGrunn}>
            <Element className={cls.element('overskrift')}>
                Huk av for hva tilskuddet skal dekke tilleggsutgifter knyttet til:
            </Element>

            {inkluderingstyper.map((type) => (
                <CheckboxMedInput
                    inputLabel={'Kostnadsoverslag'}
                    checkboxLabel={inkluderingstilskuddForklaringTekst[type]}
                    verdi={finnRad(type)?.beløp}
                    settVerdi={(verdi) => settTilskuddsrad({ beløp: verdi, type })}
                />
            ))}

            {/* <CheckboxMedInput
                inputLabel={'Kostnadsoverslag'}
                settTilskuddsrad={settTilskuddsrad}
                checkboxLabel="nødvendig vurdering av personens funksjonsevne eller tilretteleggingsbehov på den konkrete arbeidsplassen"
                ledigIndex={tilskuddsrad?.length}
                typeTilskudd="TILRETTELEGGINGSBEHOV"
                verdi={finnRad('TILRETTELEGGINGSBEHOV')}
            />
            <CheckboxMedInput
                inputLabel={'Kostnadsoverslag'}
                settTilskuddsrad={settTilskuddsrad}
                checkboxLabel="opprettelse av ekstra tiltaksplass, for eksempel kontormøbler"
                ledigIndex={tilskuddsrad?.length}
                typeTilskudd="TILTAKSPLASS"
                verdi={finnRad('TILTAKSPLASS')}
            />
            <CheckboxMedInput
                inputLabel={'Kostnadsoverslag'}
                settTilskuddsrad={settTilskuddsrad}
                checkboxLabel={'personlig utstyr som arbeidstøy, vernesko, databriller o.l. knyttet til arbeidet'}
                ledigIndex={tilskuddsrad?.length}
                typeTilskudd="UTSTYR"
                verdi={finnRad('UTSTYR')}
            />
            <CheckboxMedInput
                inputLabel={'Kostnadsoverslag'}
                settTilskuddsrad={settTilskuddsrad}
                checkboxLabel={
                    'merkostnader til å kjøpe og installere programvare som skal brukes av personen, herunder teknologisk utstyr eller teknologiske hjelpemidler'
                }
                ledigIndex={tilskuddsrad?.length}
                typeTilskudd="PROGRAMVARE"
                verdi={finnRad('PROGRAMVARE')}
            />
            <CheckboxMedInput
                inputLabel={'Kostnadsoverslag'}
                settTilskuddsrad={settTilskuddsrad}
                checkboxLabel={
                    'nødvendige gjenstander og arbeidshjelpemidler personen trenger for å utføre arbeidet og tilpasninger som ikke kan dekkes etter folketrygdlovens § 10-5'
                }
                ledigIndex={tilskuddsrad?.length}
                typeTilskudd="ARBEIDSHJELPEMIDLER"
                verdi={finnRad('ARBEIDSHJELPEMIDLER')}
            />
            <CheckboxMedInput
                inputLabel={'Kostnadsoverslag'}
                settTilskuddsrad={settTilskuddsrad}
                checkboxLabel={
                    'nødvendige merutgifter til forsikring, lisenser, sertifisering o.l. knyttet til arbeidet, og ekstern opplæring for å kunne utføre arbeidet i virksomheten'
                }
                ledigIndex={tilskuddsrad?.length}
                typeTilskudd="OPPLÆRING"
                verdi={finnRad('OPPLÆRING')}
            /> */}
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
