import { ReactComponent as KalkulatorIkon } from '@/assets/ikoner/kalkulator.svg';
import EnTilskuddsutgiftOppsummering from '@/AvtaleSide/steg/InkluderingstilskuddSteg/EnTilskuddsutgiftOppsummering';
import '@/AvtaleSide/steg/InkluderingstilskuddSteg/inkluderingstilskuddSteg.less';
import TilskuddsutgiftTabell from '@/AvtaleSide/steg/InkluderingstilskuddSteg/TilskuddsutgiftTabell';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { InkluderingsInnhold } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { formatterPenger } from '@/utils/PengeUtils';
import { FunctionComponent } from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import { Tag, Label } from '@navikt/ds-react';
import VisueltDisabledInputFelt from '@/komponenter/VisueltDisabledInputFelt/VisueltDisabledInputFelt';

const InkluderingstilskuddOppsummering: FunctionComponent<InkluderingsInnhold> = (props) => {
    const cls = BEMHelper('inkluderingstilskudd');

    return (
        <Stegoppsummering tittel="Inkluderingstilskudd" ikon={<KalkulatorIkon height={40} />}>
            <Label>Hvorfor er det behov for inkluderingstilskudd?</Label>
            <SjekkOmVerdiEksisterer verdi={props.inkluderingstilskuddBegrunnelse} />
            <VerticalSpacer rem={1} />
            <Label>Utgifter</Label>
            <VerticalSpacer rem={2} />
            {props.inkluderingstilskuddsutgift.length > 0 ? (
                <div>
                    <TilskuddsutgiftTabell redigerbar={false}>
                        {props.inkluderingstilskuddsutgift.map((tilskuddsutgift, index) => (
                            <EnTilskuddsutgiftOppsummering tilskuddsutgift={tilskuddsutgift} key={index} />
                        ))}
                    </TilskuddsutgiftTabell>
                    <div className={cls.element('kostnadsoverslag-container')}>
                        <VisueltDisabledInputFelt
                            label="Totalt kostnadsoverslag"
                            tekst={formatterPenger(props.inkluderingstilskuddTotalBeløp)}
                        />
                    </div>
                </div>
            ) : (
                <Tag variant="warning">Ikke fylt ut</Tag>
            )}
        </Stegoppsummering>
    );
};

export default InkluderingstilskuddOppsummering;
