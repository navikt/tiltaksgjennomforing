import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import React, { FunctionComponent, useContext } from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import ProsentInput from '@/komponenter/form/ProsentInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

const KvalifiseringsgruppeSats: FunctionComponent = () => {
    const { avtale, settOgKalkulerBeregningsverdier } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);

    return innloggetBruker.erNavAnsatt ? (
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
    );
};
export default KvalifiseringsgruppeSats;
