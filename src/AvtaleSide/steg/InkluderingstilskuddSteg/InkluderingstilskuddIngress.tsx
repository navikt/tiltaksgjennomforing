import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { BodyShort, Link } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';

const InkluderingstilskuddIngress: FunctionComponent = () => {
    return (
        <>
            <BodyShort size="small">
                Tilskuddet skal dekke tilleggskostnader som arbeidsgiveren har i forbindelse med tilrettelegging. Det
                dekker dokumenterte utgifter opp til en
                <Link href="https://www.nav.no/inkluderingstilskudd#hvor-mye" target="_blank">
                    {' '}
                    maksimal sats.
                </Link>{' '}
            </BodyShort>
            <VerticalSpacer rem={1} />
            <BodyShort size="small">
                Utgifter som virksomheten normalt vil ha ved ansettelser, dekkes ikke av ordningen. Inkluderingstilskudd
                gis heller ikke når de samme utgiftene dekkes på andre måter. Avtalen må godkjennes av NAV før det
                planlagte innkjøpet blir gjennomført. NAV utbetaler tilskuddet etterskuddsvis.
            </BodyShort>
        </>
    );
};

export default InkluderingstilskuddIngress;
