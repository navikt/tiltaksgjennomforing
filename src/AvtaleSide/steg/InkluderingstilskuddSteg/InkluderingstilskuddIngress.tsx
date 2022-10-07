import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';

const InkluderingstilskuddIngress: FunctionComponent = () => {
    return (
        <>
            <Normaltekst>
                Tilskuddet skal dekke tilleggskostnader som arbeidsgiveren har i forbindelse med tilrettelegging. Det
                dekker dokumenterte utgifter opp til en
                <Lenke href="https://www.nav.no/inkluderingstilskudd#hvor-mye" target="_blank">
                    {' '}
                    maksimal sats.
                </Lenke>{' '}
            </Normaltekst>
            <VerticalSpacer rem={1} />
            <Normaltekst>
                Utgifter som virksomheten normalt vil ha ved ansettelser, dekkes ikke av ordningen. Inkluderingstilskudd
                gis heller ikke når de samme utgiftene dekkes på andre måter. Avtalen må godkjennes av NAV før det
                planlagte innkjøpet blir gjennomført. NAV utbetaler tilskuddet etterskuddsvis.
            </Normaltekst>
        </>
    );
};

export default InkluderingstilskuddIngress;
