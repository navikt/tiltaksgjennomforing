import { ComponentProps, FunctionComponent, useState } from 'react';
import { generatePath, Link } from 'react-router';
import { BodyShort, LinkCard, Tag, VStack } from '@navikt/ds-react';

import styles from './AvtalekortMobil.module.less';
import TaushetserklæringModal from '@/AvtaleOversikt/Taushetserklæring/Taushetserklæring';
import { AvtaleMinimalListeVisning, AvtaleStatus } from '@/types/avtale';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import { Path } from '@/Router';
import { Varsel } from '@/types/varsel';
import { avtaleStatusTekst, tiltakstypeTekstKort } from '@/messages';
import { formaterDatoHvisDefinert } from '@/utils/datoUtils';
import { kunStorForbokstav } from '@/utils/stringUtils';
import NavnMedDiskresjonskode from '@/AvtaleOversikt/NavnMedDiskresjonskode';

const statusfarge: { [key in AvtaleStatus]: ComponentProps<typeof Tag>['data-color'] } = {
    PÅBEGYNT: 'info',
    MANGLER_SIGNATUR: 'warning',
    MANGLER_GODKJENNING: 'warning',
    OPPFØLGING_KREVES: 'warning',
    KLAR_FOR_OPPSTART: 'success',
    GJENNOMFØRES: 'success',
    AVSLUTTET: 'meta-purple',
    ANNULLERT: 'neutral',
};

const AvtalekortMobil: FunctionComponent<{
    avtaler: AvtaleMinimalListeVisning[];
    varsler: Varsel[];
    innloggetBruker: InnloggetBruker;
}> = ({ avtaler, varsler, innloggetBruker }) => {
    const [taushetserklæringFor, setTaushetserklæringFor] = useState<AvtaleMinimalListeVisning>();

    return (
        <>
            <VStack as="ul" gap="space-8" className={styles.avtalekortMobil}>
                {avtaler.map((avtale: AvtaleMinimalListeVisning) => {
                    const ulestVarsel = varsler.find((value) => value.avtaleId === avtale.id);
                    const startdato = formaterDatoHvisDefinert(avtale.startDato);
                    const sluttdato = formaterDatoHvisDefinert(avtale.sluttDato);
                    return (
                        <li key={avtale.id}>
                            <LinkCard>
                                {ulestVarsel && (
                                    <span role="img" aria-label="Ulest varsel" className={styles.ulestVarselIkon} />
                                )}
                                <LinkCard.Title>
                                    <LinkCard.Anchor asChild>
                                        <Link
                                            to={{
                                                pathname: generatePath(Path.AVTALE, { avtaleId: avtale.id }),
                                                search: window.location.search,
                                            }}
                                            onClick={(e) => {
                                                if (
                                                    innloggetBruker.rolle === 'MENTOR' &&
                                                    avtale.tiltakstype === 'MENTOR' &&
                                                    !avtale.erGodkjentTaushetserklæringAvMentor
                                                ) {
                                                    e.preventDefault();
                                                    setTaushetserklæringFor(avtale);
                                                }
                                            }}
                                        >
                                            <NavnMedDiskresjonskode
                                                fornavn={avtale.deltakerFornavn}
                                                etternavn={avtale.deltakerEtternavn}
                                                diskresjonskode={avtale.diskresjonskode}
                                            />
                                        </Link>
                                    </LinkCard.Anchor>
                                </LinkCard.Title>
                                <LinkCard.Description>
                                    <VStack gap="space-12">
                                        <BodyShort size="small">
                                            {kunStorForbokstav(tiltakstypeTekstKort[avtale.tiltakstype])}
                                        </BodyShort>
                                        <div>
                                            <BodyShort>{avtale.bedriftNavn}</BodyShort>
                                            {startdato && sluttdato && (
                                                <BodyShort size="small">
                                                    {startdato} - {sluttdato}
                                                </BodyShort>
                                            )}
                                        </div>
                                    </VStack>
                                </LinkCard.Description>
                                <LinkCard.Footer>
                                    <Tag size="small" data-color={statusfarge[avtale.status]}>
                                        {avtaleStatusTekst[avtale.status]}
                                    </Tag>
                                </LinkCard.Footer>
                            </LinkCard>
                        </li>
                    );
                })}
            </VStack>
            {taushetserklæringFor && (
                <TaushetserklæringModal
                    open
                    avtaleId={taushetserklæringFor.id}
                    sistEndret={taushetserklæringFor.sistEndret}
                    togglesetTaushetserklæringForMentorAvtale={() => setTaushetserklæringFor(undefined)}
                />
            )}
        </>
    );
};

export default AvtalekortMobil;
