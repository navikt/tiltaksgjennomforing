import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import React, { FunctionComponent, useContext } from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Beregningsgrunnlag } from '@/types/avtale';
import ProsentInput from '@/komponenter/form/ProsentInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

interface Props {
    settLonnstilskuddProsent: (lonnstilskuddProsent: Beregningsgrunnlag['lonnstilskuddProsent']) => void;
}

const KvalifiseringsgruppeSats: FunctionComponent<Props> = ({ settLonnstilskuddProsent }) => {
    const { avtale } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);

    return (
        <>
            {innloggetBruker.erNavAnsatt ? (
                <>
                    {avtale.tiltakstype === 'VARIG_LONNSTILSKUDD' && (
                        <>
                            <Undertittel>Tilskuddsprosent</Undertittel>
                            <VerticalSpacer rem={1.25} />
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
                            <VerticalSpacer rem={1} />
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
                    <VerticalSpacer rem={1} />
                </>
            )}
        </>
    );
};
export default KvalifiseringsgruppeSats;
