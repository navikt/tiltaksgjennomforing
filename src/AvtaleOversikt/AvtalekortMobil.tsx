import TaushetserklæringModal from '@/AvtaleOversikt/Taushetserklæring/Taushetserklæring';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import { avtaleStatusTekst } from '@/messages';
import { pathTilAvtaleNy } from '@/paths';
import { AvtaleMinimalListeVisning } from '@/types/avtale';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import { LinkPanel, Heading, Ingress, BodyShort } from '@navikt/ds-react';
import moment from 'moment';
import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AvtalekortMobil.less';

const cls = BEMHelper('avtalekortMobil');

const AvtalekortMobil: FunctionComponent<{
    avtaler: AvtaleMinimalListeVisning[];
    varsler: Varsel[];
    innloggetBruker: InnloggetBruker;
}> = ({ avtaler, varsler, innloggetBruker }) => {
    const [visTaushetserklæringForAvtaleId, setVisTaushetserklæringForAvtaleId] = useState<string>('');
    const navigate = useNavigate();

    return (
        <>
            {avtaler.map((avtale: AvtaleMinimalListeVisning) => {
                const ulestVarsel = varsler.find((value) => value.avtaleId === avtale.id);
                return (
                    <>
                        <LinkPanel
                            border={false}
                            key={avtale.id}
                            className={cls.className}
                            onClick={(e) => {
                                if (
                                    innloggetBruker.rolle === 'MENTOR' &&
                                    avtale.tiltakstype === 'MENTOR' &&
                                    !avtale.erGodkjentTaushetserklæringAvMentor
                                ) {
                                    setVisTaushetserklæringForAvtaleId(avtale.id);
                                    e.preventDefault();
                                } else {
                                    navigate({
                                        pathname: pathTilAvtaleNy(avtale.id),
                                        search: window.location.search,
                                    });
                                }
                            }}
                        >
                            <LinkPanel.Title>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    {ulestVarsel && (
                                        <span aria-hidden={!ulestVarsel} className={cls.element('ulest-varsel-ikon')} />
                                    )}
                                    <div>
                                        <Heading size="small">
                                            {avtale.deltakerFornavn || ''}&nbsp;
                                            {avtale.deltakerEtternavn || ''}
                                        </Heading>
                                        <VerticalSpacer rem={0.5} />
                                        <Ingress>{avtale.bedriftNavn}</Ingress>
                                        <VerticalSpacer rem={0.5} />
                                        <BodyShort size="small">
                                            Opprettet {moment(avtale.opprettetTidspunkt).format('DD.MM.YYYY')}
                                        </BodyShort>
                                        <div className={cls.element('status')}>
                                            <StatusIkon status={avtale.status} />
                                            <BodyShort size="small">
                                                <div className={cls.element('statustekst')}>
                                                    {avtaleStatusTekst[avtale.status]}
                                                </div>
                                            </BodyShort>
                                        </div>
                                    </div>
                                </div>
                            </LinkPanel.Title>
                        </LinkPanel>
                        <TaushetserklæringModal
                            open={visTaushetserklæringForAvtaleId === avtale.id}
                            sistEndret={avtale.sistEndret}
                            togglesetTaushetserklæringForMentorAvtale={setVisTaushetserklæringForAvtaleId}
                            avtaleId={avtale.id}
                        />
                    </>
                );
            })}
        </>
    );
};

export default AvtalekortMobil;
