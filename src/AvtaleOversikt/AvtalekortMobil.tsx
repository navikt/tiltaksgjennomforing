import TaushetserklæringModal from '@/AvtaleOversikt/Taushetserklæring/Taushetserklæring';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import { avtaleStatusTekst } from '@/messages';
import { pathTilAvtaleNy } from '@/paths';
import { Avtale } from '@/types/avtale';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import { BodyShort, Heading, Ingress, LinkPanel } from '@navikt/ds-react';
import moment from 'moment';
import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router';
import './AvtalekortMobil.less';

const cls = BEMHelper('avtalekortMobil');

const AvtalekortMobil: FunctionComponent<{
    avtaler: Avtale[];
    varsler: Varsel[];
    innloggetBruker: InnloggetBruker;
}> = ({ avtaler, varsler, innloggetBruker }) => {
    const [visTaushetserklæringForAvtaleId, setVisTaushetserklæringForAvtaleId] = useState<string>('');
    const navigate = useNavigate();

    return (
        <>
            {avtaler.map((avtale: Avtale) => {
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
                                            {avtale.gjeldendeInnhold.deltakerFornavn || ''}&nbsp;
                                            {avtale.gjeldendeInnhold.deltakerEtternavn || ''}
                                        </Heading>
                                        <VerticalSpacer rem={0.5} />
                                        <Ingress>{avtale.gjeldendeInnhold.bedriftNavn}</Ingress>
                                        <VerticalSpacer rem={0.5} />
                                        <BodyShort size="small">
                                            Opprettet {moment(avtale.opprettetTidspunkt).format('DD.MM.YYYY')}
                                        </BodyShort>
                                        <div className={cls.element('status')}>
                                            <StatusIkon status={avtale.statusSomEnum} />
                                            <BodyShort size="small">
                                                <div className={cls.element('statustekst')}>
                                                    {avtaleStatusTekst[avtale.statusSomEnum]}
                                                </div>
                                            </BodyShort>
                                        </div>
                                    </div>
                                </div>
                            </LinkPanel.Title>
                        </LinkPanel>
                        <TaushetserklæringModal
                            open={visTaushetserklæringForAvtaleId === avtale.id}
                            togglesetTaushetserklæringForMentorAvtale={setVisTaushetserklæringForAvtaleId}
                            avtale={avtale}
                        />
                    </>
                );
            })}
        </>
    );
};

export default AvtalekortMobil;
