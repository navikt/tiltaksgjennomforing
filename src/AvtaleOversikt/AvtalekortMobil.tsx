import TaushetserklæringModal from '@/AvtaleOversikt/Taushetserklæring/Taushetserklæring';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import { avtaleStatusTekst } from '@/messages';
import { pathTilAvtaleNy } from '@/paths';
import { Avtale } from '@/types/avtale';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import { LinkPanel } from '@navikt/ds-react';
import moment from 'moment';
import { Ingress, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AvtalekortMobil.less';

const cls = BEMHelper('avtalekortMobil');

const AvtalekortMobil: FunctionComponent<{
    avtaler: Avtale[];
    varsler: Varsel[];
    innloggetBruker: InnloggetBruker;
}> = ({ avtaler, varsler, innloggetBruker }) => {
    const [visTaushetserklæringForAvtaleId, setVisTaushetserklæringForAvtaleId] = useState<string>('');
    const history = useHistory();

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
                                    history.push({pathname: pathTilAvtaleNy(avtale.id), search: window.location.search})
                                }
                            }}
                        >
                            <LinkPanel.Title>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    {ulestVarsel && (
                                        <span aria-hidden={!ulestVarsel} className={cls.element('ulest-varsel-ikon')} />
                                    )}
                                    <div>
                                        <Undertittel>
                                            {avtale.gjeldendeInnhold.deltakerFornavn || ''}&nbsp;
                                            {avtale.gjeldendeInnhold.deltakerEtternavn || ''}
                                        </Undertittel>
                                        <VerticalSpacer rem={0.5} />
                                        <Ingress>{avtale.gjeldendeInnhold.bedriftNavn}</Ingress>
                                        <VerticalSpacer rem={0.5} />
                                        <Normaltekst>
                                            Opprettet {moment(avtale.opprettetTidspunkt).format('DD.MM.YYYY')}
                                        </Normaltekst>
                                        <div className={cls.element('status')}>
                                            <StatusIkon status={avtale.statusSomEnum} />
                                            <Normaltekst>
                                                <div className={cls.element('statustekst')}>
                                                    {avtaleStatusTekst[avtale.statusSomEnum]}
                                                </div>
                                            </Normaltekst>
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
