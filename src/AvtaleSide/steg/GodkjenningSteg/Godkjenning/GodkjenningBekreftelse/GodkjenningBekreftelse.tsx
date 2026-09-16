import React from 'react';
import { Button, LocalAlert } from '@navikt/ds-react';
import { ArrowUpIcon } from '@navikt/aksel-icons';

import { Avtale, Rolle } from '@/types';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import styles from './GodkjenningBekreftelse.module.less';

interface Props {
    avtale: Avtale;
    rolle: Rolle;
}

function GodkjenningBekreftelse(props: Props) {
    const { avtale, rolle } = props;

    return (
        <LocalAlert className={styles.fadeIn} status="success">
            <LocalAlert.Header>
                <LocalAlert.Title>
                    {'MANGLER_GODKJENNING' === avtale.status ? 'Du har godkjent avtalen' : 'Avtalen er godkjent'}
                </LocalAlert.Title>
            </LocalAlert.Header>
            {'MANGLER_GODKJENNING' === avtale.status && (
                <LocalAlert.Content>
                    {rolle === 'ARBEIDSGIVER' &&
                        `Venter på godkjenning av avtalen fra ${!avtale.godkjentAvDeltaker ? 'deltaker og Nav' : 'Nav'}`}
                    {rolle === 'DELTAKER' &&
                        `Venter på godkjenning av avtalen fra ${!avtale.godkjentAvArbeidsgiver ? 'arbeidsgiver og Nav' : 'Nav'}`}
                    {rolle === 'MENTOR' && 'Venter på godkjenning av avtalen fra de andre partene'}
                    {rolle === 'VEILEDER' && 'Venter på godkjenning av tilskuddsperioder fra beslutter'}
                    <VerticalSpacer rem={1} />
                    <Button
                        className={styles.scrollKnapp}
                        variant="tertiary"
                        size="xsmall"
                        icon={<ArrowUpIcon aria-hidden />}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        Til toppen
                    </Button>
                </LocalAlert.Content>
            )}
        </LocalAlert>
    );
}

export default GodkjenningBekreftelse;
