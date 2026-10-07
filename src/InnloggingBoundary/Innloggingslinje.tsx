import NavIkon from '@/assets/ikoner/navikon.svg?react';
import LoggUtKnapp from '@/InnloggingBoundary/LoggUtKnapp';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import { Box, Detail, HStack, Link } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import styles from './Innloggingslinje.module.less';

type Props = {
    innloggetBruker: InnloggetBruker;
};

const Innloggingslinje: FunctionComponent<Props> = (props) => (
    <Box background="default" className={styles.innloggingslinje}>
        <HStack
            justify="space-between"
            align="center"
            paddingBlock="space-8"
            paddingInline="space-8 space-16"
            className={styles.innhold}
        >
            <Link href="/tiltaksgjennomforing" aria-label="Gå til forsiden">
                <NavIkon />
            </Link>
            <HStack align="center" gap="space-16">
                <Detail>{props.innloggetBruker.identifikator}</Detail>
                <LoggUtKnapp />
            </HStack>
        </HStack>
    </Box>
);

export default Innloggingslinje;
