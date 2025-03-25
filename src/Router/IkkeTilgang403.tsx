import { Link } from 'react-router-dom';
import { Button, BodyShort, Box, Heading, List, Page, VStack } from '@navikt/ds-react';

import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Rolle } from '@/types/innlogget-bruker';

import { Path } from './Router';

interface Props {
    rolle?: Rolle;
    enkelVisning?: boolean;
}

function IkkeTilgang403(props: Props) {
    const { rolle = 'INGEN_ROLLE', enkelVisning = false } = props;

    if (enkelVisning) {
        return (
            <Innholdsboks>
                <VStack gap="12" align="start">
                    <div>
                        <Heading level="1" size="large" spacing>
                            Ikke tilgang
                        </Heading>
                        <BodyShort>
                            Du har ikke tilgang til denne ressursen. Vennligst sjekk tilgangene dine. Eller logg inn som
                            en annen bruker eller avtalepart.
                        </BodyShort>
                    </div>
                </VStack>
            </Innholdsboks>
        );
    }

    return (
        <Page.Block as="main" width="xl" gutters>
            <Box paddingBlock="20 16">
                <Innholdsboks>
                    <VStack gap="12" align="start">
                        <div>
                            <Heading level="1" size="large" spacing>
                                Ikke tilgang
                            </Heading>
                            <BodyShort>
                                Du har ikke tilgang til denne ressursen. Vennligst sjekk tilgangene dine. Eller logg inn
                                som en annen bruker eller avtalepart.
                            </BodyShort>
                            <List>
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

export default IkkeTilgang403;
