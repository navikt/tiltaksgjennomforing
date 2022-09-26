import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import { avtaleStatusTekst } from '@/messages';
import { pathTilAvtaleNy } from '@/paths';
import { Avtale } from '@/types/avtale';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import moment from 'moment';
import { LinkPanel } from '@navikt/ds-react';
import { Ingress, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';
import './AvtalekortMobil.less';
import TaushetserklæringModal from '@/AvtaleOversikt/Taushetserklæring/Taushetserklæring';

const cls = BEMHelper('avtalekortMobil');

const AvtalekortMobil: FunctionComponent<{
    avtaler: Avtale[];
    varsler: Varsel[];
    innloggetBruker: InnloggetBruker;
}> = ({ avtaler, varsler, innloggetBruker }) => {
    const [visTaushetserklæringForAvtaleId, setVisTaushetserklæringForAvtaleId] = useState<string>('');

    return (
        <>
            {avtaler.map((avtale: Avtale) => {
                const ulestVarsel = varsler.find((value) => value.avtaleId === avtale.id);
                return (
                    <>
                        <LinkPanel
                            key={avtale.id}
                            className={cls.className}
                            href={pathTilAvtaleNy(avtale.id)}
                            onClick={(e) => {
                                if (
                                    innloggetBruker.rolle === 'MENTOR' &&
                                    avtale.tiltakstype === 'MENTOR' &&
                                    !avtale.erGodkjentTaushetserklæringAvMentor
                                ) {
                                    setVisTaushetserklæringForAvtaleId(avtale.id);
                                    e.preventDefault();
                                }
                            }}
                        >
                            <LinkPanel.Title>
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

                                        <div className={cls.element('statustekst')}>
                                            {avtaleStatusTekst[avtale.statusSomEnum]}
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
