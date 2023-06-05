import React, { FunctionComponent, useContext } from 'react';
import { AvtaleContext } from '@/AvtaleProvider';
import { AvtaleinfoFeltSjekk } from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/AvtaleinfoFeltSjekk/AvtaleinfoFeltSjekk';

const KontaktpersonRefusjonOppsumering: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const gjeldendeInnhold = avtaleContext.avtale.gjeldendeInnhold;

    const erLåst = Boolean(avtaleContext.avtale.godkjentAvVeileder);

    return (
        <div>
            {gjeldendeInnhold.refusjonKontaktperson && (
                <AvtaleinfoFeltSjekk
                    navnFelter={[
                        {
                            felt: 'fornavn',
                            verdi: gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonFornavn,
                        },
                        {
                            felt: 'etternavn',
                            verdi: gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonEtternavn,
                        },
                    ]}
                    tilleggFelter={[
                        { felt: 'telefon', verdi: gjeldendeInnhold.refusjonKontaktperson?.refusjonKontaktpersonTlf },
                    ]}
                    overskrift={'Kontaktperson hos arbeidsgiver for refusjon'}
                    borderFarge="farge-graa"
                    skjulHvaMangler={erLåst}
                />
            )}
        </div>
    );
};
export default KontaktpersonRefusjonOppsumering;
