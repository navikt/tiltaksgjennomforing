import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import ProsentInput from '@/komponenter/form/ProsentInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { BodyShort, Heading } from '@navikt/ds-react';
import React, { FunctionComponent, useContext } from 'react';

const KvalifiseringsgruppeSats: FunctionComponent = () => {
    const { avtale, settOgKalkulerBeregningsverdier } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const settTekstTilLonntilskuddProsent = () => {
        switch (avtale.tiltakstype) {
            case 'VARIG_LONNSTILSKUDD':
                return <p>Her kan NAV sette en sats.</p>;
            case 'MIDLERTIDIG_LONNSTILSKUDD':
                return <p>Her kan NAV sette en sats på 40% eller 60%</p>;
            case 'SOMMERJOBB':
                return <p>Her kan NAV sette en sats på 50% eller 75%</p>;
            default:
                return null;
        }
    };

    const settLonnstilskuddsprosent = () => {
        return avtale.gjeldendeInnhold.lonnstilskuddProsent
            ? (avtale.gjeldendeInnhold.lonnstilskuddProsent ?? '0').toString() + ' %'
            : settTekstTilLonntilskuddProsent();
    };

    return innloggetBruker.erNavAnsatt ? (
        <>
            {avtale.tiltakstype === 'VARIG_LONNSTILSKUDD' ? (
                <>
                    <Heading size="small">Tilskuddsprosent</Heading>
                    <VerticalSpacer rem={1.25} />
                    <ProsentInput
                        name="lonnstilskuddProsent"
                        bredde="S"
                        label=""
                        value={avtale.gjeldendeInnhold.lonnstilskuddProsent}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            settOgKalkulerBeregningsverdier({
                                lonnstilskuddProsent: parseInt(event.target.value, 10),
                            });
                        }}
                        min={0}
                        max={75}
                    />
                    <VerticalSpacer rem={1} />
                </>
            ) : (
                <>
                    <Heading size="small">Tilskuddsprosent</Heading>
                    <BodyShort size="small">{settLonnstilskuddsprosent()}</BodyShort>
                    <VerticalSpacer rem={1} />
                </>
            )}
        </>
    ) : (
        <>
            <Heading size="small">Tilskuddsprosent</Heading>
            <BodyShort size="small">{settLonnstilskuddsprosent()}</BodyShort>
            <VerticalSpacer rem={1} />
        </>
    );
};
export default KvalifiseringsgruppeSats;
