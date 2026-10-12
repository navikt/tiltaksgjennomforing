import { ComponentProps, FunctionComponent, useState } from 'react';
import { generatePath, Link } from 'react-router';
import { BodyLong, BodyShort, LinkCard, Tag, VStack } from '@navikt/ds-react';

import './AvtalekortMobil.less';
import BEMHelper from '@/utils/bem';
import TaushetserklæringModal from '@/AvtaleOversikt/Taushetserklæring/Taushetserklæring';
import { AvtaleMinimalListeVisning, AvtaleStatus } from '@/types/avtale';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import { Path } from '@/Router';
import { Varsel } from '@/types/varsel';
import { avtaleStatusTekst } from '@/messages';
import { formaterDatoHvisDefinert } from '@/utils/datoUtils';
import NavnMedDiskresjonskode from '@/AvtaleOversikt/NavnMedDiskresjonskode';

const cls = BEMHelper('avtalekortMobil');

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
    const [visTaushetserklæringForAvtaleId, setVisTaushetserklæringForAvtaleId] = useState<string>('');

    return (
        <VStack as="ul" gap="space-8" className={cls.className}>
            {avtaler.map((avtale: AvtaleMinimalListeVisning) => {
                const ulestVarsel = varsler.find((value) => value.avtaleId === avtale.id);
                const startdato = formaterDatoHvisDefinert(avtale.startDato) ?? 'Startdato';
                const sluttdato = formaterDatoHvisDefinert(avtale.sluttDato) ?? 'sluttdato';
                return (
                    <li key={avtale.id}>
                        <LinkCard>
                            {ulestVarsel && <span aria-hidden className={cls.element('ulest-varsel-ikon')} />}
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
                                                setVisTaushetserklæringForAvtaleId(avtale.id);
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
                                <VStack gap="space-4">
                                    {avtale.bedriftNavn && <BodyLong>{avtale.bedriftNavn}</BodyLong>}
                                    <BodyShort size="small">
                                        {startdato} - {sluttdato}
                                    </BodyShort>
                                </VStack>
                            </LinkCard.Description>
                            <LinkCard.Footer>
                                <Tag size="small" data-color={statusfarge[avtale.status]}>
                                    {avtaleStatusTekst[avtale.status]}
                                </Tag>
                            </LinkCard.Footer>
                        </LinkCard>
                        <TaushetserklæringModal
                            open={visTaushetserklæringForAvtaleId === avtale.id}
                            sistEndret={avtale.sistEndret}
                            togglesetTaushetserklæringForMentorAvtale={setVisTaushetserklæringForAvtaleId}
                            avtaleId={avtale.id}
                        />
                    </li>
                );
            })}
        </VStack>
    );
};

export default AvtalekortMobil;
