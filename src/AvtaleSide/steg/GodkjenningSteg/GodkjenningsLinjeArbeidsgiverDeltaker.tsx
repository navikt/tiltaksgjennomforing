import { ReactComponent as GodkjentIkon } from '@/assets/ikoner/check.svg';
import { ReactComponent as PabegyntIkon } from '@/assets/ikoner/pabegynt.svg';
import { AvtaleContext } from '@/AvtaleContext';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext } from 'react';

const GodkjenningsLinjeArbeidsgiverDeltaker: FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);

    return (
        <>
            <div style={{ borderBottom: '1px solid #c6c2bf' }} />
            <VerticalSpacer rem={1} />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>
                    <>
                        {avtale.godkjentAvDeltaker ? (
                            <>
                                <GodkjentIkon style={{ marginRight: '0.5rem' }} />
                                <Normaltekst>Deltaker har godkjent</Normaltekst>
                            </>
                        ) : (
                            <>
                                <PabegyntIkon style={{ marginRight: '0.5rem' }} />
                                <Normaltekst>Deltaker har ikke godkjent</Normaltekst>
                            </>
                        )}
                    </>
                </div>
                <div style={{ display: 'flex' }}>
                    <>
                        {avtale.godkjentAvArbeidsgiver ? (
                            <>
                                <GodkjentIkon style={{ marginRight: '0.5rem' }} />
                                <Normaltekst>Arbeidsgiver har godkjent</Normaltekst>
                            </>
                        ) : (
                            <>
                                <PabegyntIkon style={{ marginRight: '0.5rem' }} />
                                <Normaltekst>Arbeidsgiver har ikke godkjent</Normaltekst>
                            </>
                        )}
                    </>
                </div>
            </div>
        </>
    );
};

export default GodkjenningsLinjeArbeidsgiverDeltaker;
