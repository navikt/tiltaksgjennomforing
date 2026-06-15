import StillingIkon from '@/assets/ikoner/toolbox.svg?react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { lonnstilskuddFormaal as lonnstilskuddFormaalMsg, stillingstype as stillingtypeMsg } from '@/messages';
import { Stilling, TiltaksType, VersjonInnhold } from '@/types/avtale';
import { Label } from '@navikt/ds-react';
import React from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import { erNil } from '@/utils/predicates';

interface Props extends Stilling {
    tiltakstype: TiltaksType;
    versjonInnhold: VersjonInnhold;
}

const StillingsOppsummeringLonnstilskudd = (props: Props) => {
    const { tiltakstype, stillingstittel, arbeidsoppgaver, stillingstype, lonnstilskuddFormaal, versjonInnhold } =
        props;

    const erIkkeSommerjobb = tiltakstype !== 'SOMMERJOBB';

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
            {versjonInnhold === 'LONNSTILSKUDD_FORMAAL' && erIkkeSommerjobb && (
                <>
                    <Label>Formålet med avtalen</Label>
                    <SjekkOmVerdiEksisterer
                        verdi={lonnstilskuddFormaal}
                        formatertVerdi={lonnstilskuddFormaalMsg[lonnstilskuddFormaal!]}
                    />
                </>
            )}
        </Stegoppsummering>
    );
};

export default StillingsOppsummeringLonnstilskudd;
