import StillingIkon from '@/assets/ikoner/toolbox.svg?react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { arbeidstilknytning as arbeidstilknytningMsg, stillingstype as stillingtypeMsg } from '@/messages';
import { Stilling, TiltaksType } from '@/types/avtale';
import { Label } from '@navikt/ds-react';
import React from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import { erNil } from '@/utils/predicates';

interface Props extends Stilling {
    tiltakstype: TiltaksType;
    erAvtaleInngaatt: boolean;
}

const StillingsOppsummeringLonnstilskudd = (props: Props) => {
    const { tiltakstype, stillingstittel, arbeidsoppgaver, stillingstype, arbeidstilknytning, erAvtaleInngaatt } =
        props;

    const erVarigLts = 'VARIG_LONNSTILSKUDD' === tiltakstype;
    const visArbeidstilknytningForNyeAvtaler = !erAvtaleInngaatt || !erNil(arbeidstilknytning);

    return (
        <Stegoppsummering tittel="Stilling" ikon={<StillingIkon />}>
            <Label>Stillingstittel</Label>
            <SjekkOmVerdiEksisterer verdi={stillingstittel} />
            <VerticalSpacer rem={2} />
            <Label>Arbeidsoppgaver</Label>
            <SjekkOmVerdiEksisterer verdi={arbeidsoppgaver} />
            <VerticalSpacer rem={2} />
            <Label>Stillingstype</Label>
            <SjekkOmVerdiEksisterer verdi={stillingstype} formatertVerdi={stillingtypeMsg[stillingstype!]} />
            <VerticalSpacer rem={2} />
            {erVarigLts && visArbeidstilknytningForNyeAvtaler && (
                <>
                    <Label>Arbeidstilknytning ved avtaleinngåelse</Label>
                    <SjekkOmVerdiEksisterer
                        verdi={arbeidstilknytning}
                        formatertVerdi={arbeidstilknytningMsg[arbeidstilknytning!]}
                    />
                </>
            )}
        </Stegoppsummering>
    );
};

export default StillingsOppsummeringLonnstilskudd;
