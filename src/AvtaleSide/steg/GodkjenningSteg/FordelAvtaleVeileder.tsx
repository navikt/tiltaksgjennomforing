import { ReactComponent as GodkjentIkon } from '@/assets/ikoner/check.svg';
import { ReactComponent as PabegyntIkon } from '@/assets/ikoner/pabegynt.svg';
import { AvtaleContext } from '@/AvtaleProvider';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { BodyShort, Heading } from '@navikt/ds-react';
import React, { FunctionComponent, useContext } from 'react';

export const FordelAvtaleVeileder: FunctionComponent = () => {
    const { overtaAvtale, avtale } = useContext(AvtaleContext);
    return (
        <Innholdsboks>
            <div style={{ textAlign: 'center' }}>
                <VerticalSpacer rem={1} />
                <Heading size="medium">Avtalen er ufordelt</Heading>
                <VerticalSpacer rem={1} />
                <BodyShort size="small">
                    Avtalen er opprettet av arbeidsgiver. Den er ikke tildelt en veileder ennå.
                </BodyShort>
                <VerticalSpacer rem={1.5} />
                <LagreKnapp lagre={() => overtaAvtale()} label="Overta avtale" suksessmelding="Avtale tildelt" />
                <VerticalSpacer rem={1.5} />

                <div style={{ borderBottom: '1px solid #c6c2bf' }} />
                <VerticalSpacer rem={1} />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex' }}>
                        {avtale.godkjentAvArbeidsgiver ? (
                            <>
                                <GodkjentIkon style={{ marginRight: '0.5rem' }} />
                                <BodyShort size="small">Arbeidsgiver har godkjent</BodyShort>
                            </>
                        ) : (
                            <>
                                <PabegyntIkon style={{ marginRight: '0.5rem' }} />
                                <BodyShort size="small">Arbeidsgiver har ikke godkjent</BodyShort>
                            </>
                        )}
                    </div>
                    <div style={{ display: 'flex' }}>
                        {avtale.godkjentAvDeltaker ? (
                            <>
                                <GodkjentIkon style={{ marginRight: '0.5rem' }} />
                                <BodyShort size="small">Deltaker har godkjent</BodyShort>
                            </>
                        ) : (
                            <>
                                <PabegyntIkon style={{ marginRight: '0.5rem' }} />
                                <BodyShort size="small">Deltaker har ikke godkjent</BodyShort>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Innholdsboks>
    );
};
