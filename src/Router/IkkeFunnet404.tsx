import { Link } from 'react-router-dom';
import { Button, BodyShort, Box, Heading, List, Page, VStack } from '@navikt/ds-react';

import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Path } from '@/Router';
import { Rolle } from '@/types/innlogget-bruker';

interface Props {
    rolle?: Rolle;
}

function IkkeFunnet404(props: Props) {
    const { rolle = 'INGEN_ROLLE' } = props;

    return (
        <Page.Block as="main" width="xl" gutters>
            <Box paddingBlock="20 16" data-aksel-template="404-v2">
                <Innholdsboks>
                    <VStack gap="12" align="start">
                        <div>
                            <Heading level="1" size="large" spacing>
                                Beklager, vi fant ikke siden
                            </Heading>
                            <BodyShort>
                                Denne siden kan være slettet eller flyttet, eller det er en feil i lenken.
                            </BodyShort>
                            <List>
                                <List.Item>Bruk gjerne søket eller menyen</List.Item>
                                <List.Item>
                                    <Link to={Path.OVERSIKT}>Gå til forsiden</Link>
                                </List.Item>
                            </List>
                        </div>
                        {rolle === 'DELTAKER' && (
                            <Button as="a" href="https://www.nav.no/minside">
                                Gå til Min side
                            </Button>
                        )}
                        {rolle === 'ARBEIDSGIVER' && (
                            <Button as="a" href="https://arbeidsgiver.nav.no/min-side-arbeidsgiver">
                                Gå til Min side
                            </Button>
                        )}
                    </VStack>
                </Innholdsboks>
            </Box>
        </Page.Block>
    );
}

export default IkkeFunnet404;
