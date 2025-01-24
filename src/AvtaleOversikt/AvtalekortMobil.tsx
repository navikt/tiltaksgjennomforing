import { Fragment, FunctionComponent, useState } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';
import { LinkPanel, Heading, Ingress, BodyShort } from '@navikt/ds-react';

import './AvtalekortMobil.less';
import BEMHelper from '@/utils/bem';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import TaushetserklæringModal from '@/AvtaleOversikt/Taushetserklæring/Taushetserklæring';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { AvtaleMinimalListeVisning } from '@/types/avtale';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import { Path } from '@/Router';
import { Varsel } from '@/types/varsel';
import { avtaleStatusTekst } from '@/messages';
import { formaterDatoHvisDefinert } from '@/utils/datoUtils';

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
            {avtaler.map((avtale: AvtaleMinimalListeVisning, index: number) => {
                const ulestVarsel = varsler.find((value) => value.avtaleId === avtale.id);
                return (
                    <Fragment key={index}>
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
                                        pathname: generatePath(Path.AVTALE, { avtaleId: avtale.id }),
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
                                            Startdato {formaterDatoHvisDefinert(avtale.startDato) || '-'}, sluttdato{' '}
                                            {formaterDatoHvisDefinert(avtale.sluttDato) || '-'}
                                        </BodyShort>
                                        <div className={cls.element('status')}>
                                            <StatusIkon status={avtale.status} />
                                            <BodyShort className={cls.element('statustekst')} size="small">
                                                {avtaleStatusTekst[avtale.status]}
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
                    </Fragment>
                );
            })}
        </>
    );
};

export default AvtalekortMobil;
