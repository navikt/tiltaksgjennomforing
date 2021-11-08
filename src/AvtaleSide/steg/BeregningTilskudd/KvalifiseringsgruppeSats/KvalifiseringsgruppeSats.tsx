import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import React, { FunctionComponent, useContext } from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Beregningsgrunnlag } from '@/types/avtale';
import ProsentInput from '@/komponenter/form/ProsentInput';

interface Props {
    settLonnstilskuddProsent: (lonnstilskuddProsent: Beregningsgrunnlag['lonnstilskuddProsent']) => void;
}

const KvalifiseringsgruppeSats: FunctionComponent<Props> = ({ settLonnstilskuddProsent }) => {
    const { avtale } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);

    console.log('tiltakstype', avtale.tiltakstype);
    console.log('kvalifiseringsgruppe', avtale.kvalifiseringsgruppe);

    return (
        <>
            <Undertittel>Tilskuddsprosent</Undertittel>
            {innloggetBruker.erNavAnsatt ? (
                <>
                    {(avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' || avtale.tiltakstype === 'SOMMERJOBB') && (
                        <>
                            <Normaltekst>{avtale.lonnstilskuddProsent}</Normaltekst>
                        </>
                    )}
                    {avtale.tiltakstype === 'VARIG_LONNSTILSKUDD' && (
                        <>
                            <ProsentInput
                                name="lonnstilskuddProsent"
                                bredde="S"
                                label=""
                                value={avtale.lonnstilskuddProsent}
                                onChange={(event: any) => {
                                    settLonnstilskuddProsent(parseInt(event.target.value));
                                }}
                                min={0}
                                max={75}
                            />
                        </>
                    )}
                </>
            ) : (
                <>
                    <Normaltekst>
                        {avtale.lonnstilskuddProsent ? (
                            avtale.lonnstilskuddProsent + ' %'
                        ) : (
                            <>
                                {avtale.tiltakstype === 'VARIG_LONNSTILSKUDD' && 'Her kan NAV sette en sats.'}
                                {avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' &&
                                    'Her kan NAV sette en sats på 40% eller 60%'}
                                {avtale.tiltakstype === 'SOMMERJOBB' && 'Her kan NAV sette en sats på 50% eller 75%'}
                            </>
                        )}
                    </Normaltekst>
                </>
            )}
        </>
    );
};
export default KvalifiseringsgruppeSats;
