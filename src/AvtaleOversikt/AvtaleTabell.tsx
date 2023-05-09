import AvtaleTabellRadHeader from '@/AvtaleOversikt/AvtaleTabellRadHeader';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import { avtaleStatusTekst } from '@/messages';
import { pathTilAvtaleNy } from '@/paths';
import { AvtaleMinimalListeVisning } from '@/types/avtale';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import { BodyShort, LinkPanel } from '@navikt/ds-react';
import classNames from 'classnames';
import moment from 'moment';
import { FunctionComponent, useState } from 'react';
import MediaQuery from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import './AvtaleTabell.less';
import TaushetserklæringModal from './Taushetserklæring/Taushetserklæring';

const cls = BEMHelper('avtaletabell');

const hentAvtaleStatus = (avtale: AvtaleMinimalListeVisning, erNavAnsatt: boolean): JSX.Element => {
    const erGjeldendeTilskuddsperiodeAvslått = avtale.gjeldendeTilskuddsperiodeStatus === 'AVSLÅTT';
    return (
        <>
            <div className={cls.element('veileder-statusikon')}>
                <StatusIkon status={avtale.status} />
            </div>
            <BodyShort className={cls.element('veileder-status')}>
                {erGjeldendeTilskuddsperiodeAvslått && erNavAnsatt
                    ? 'Tilskuddsperiode avslått'
                    : avtaleStatusTekst[avtale.status]}
            </BodyShort>
        </>
    );
};

const AvtaleTabell: FunctionComponent<{
    avtaler: AvtaleMinimalListeVisning[];
    varsler: Varsel[];
    innloggetBruker: InnloggetBruker;
}> = ({ avtaler, varsler, innloggetBruker }) => {
    const navigate = useNavigate();

    const [visTaushetserklæringForAvtaleId, setVisTaushetserklæringForAvtaleId] = useState<string>('');

    return (
        <div className={cls.className}>
            <AvtaleTabellRadHeader
                className={cls.className}
                erBeslutter={false}
                erNavAnsatt={innloggetBruker.erNavAnsatt}
            />
            <div role="list">
                {avtaler.map((avtale: AvtaleMinimalListeVisning, index: number) => {
                    const ulestVarsel = varsler.find((value) => value.avtaleId === avtale.id);
                    return (
                        <div key={avtale.id} className={cls.element('linkpanel')}>
                            <LinkPanel
                                border={false}
                                id={avtale.id}
                                key={avtale.id}
                                className={
                                    avtale.tiltakstype === 'MENTOR' && !avtale.erGodkjentTaushetserklæringAvMentor
                                        ? 'skjulIndikator'
                                        : ''
                                }
                                role="listitem"
                                aria-labelledby={avtale.id}
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
                                            pathname: pathTilAvtaleNy(avtale.id, innloggetBruker.rolle),
                                            search: window.location.search,
                                        });
                                    }
                                }}
                            >
                                <LinkPanel.Title>
                                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                        {ulestVarsel && (
                                            <span aria-hidden={!ulestVarsel} className="ulest-varsel-ikon" />
                                        )}{' '}
                                        <div
                                            className={classNames(cls.element('rad'), {
                                                uthevet: ulestVarsel,
                                            })}
                                        >
                                            <div className={cls.element('veileder-deltakerOgBedrift')}>
                                                <BodyShort size="small">{avtale?.bedriftNavn || '-'}</BodyShort>
                                            </div>
                                            <div className={cls.element('veileder-deltakerOgBedrift')}>
                                                <BodyShort size="small">
                                                    {avtale?.deltakerFornavn && avtale?.deltakerEtternavn
                                                        ? avtale?.deltakerFornavn
                                                        : '-'}
                                                    &nbsp;
                                                    {avtale?.deltakerEtternavn ?? ''}
                                                </BodyShort>
                                            </div>
                                            {innloggetBruker.erNavAnsatt && (
                                                <div className={cls.element('veileder-veileder')}>
                                                    <BodyShort size="small">
                                                        {avtale.veilederNavIdent ?? 'Ufordelt'}
                                                    </BodyShort>
                                                </div>
                                            )}
                                            <MediaQuery minWidth={576}>
                                                <div className={cls.element('veileder-dato')}>
                                                    <BodyShort size="small">
                                                        {avtale.startDato
                                                            ? new Date(avtale.startDato).toLocaleDateString('no-NB', {
                                                                  day: 'numeric',
                                                                  month: 'short',
                                                                  year: '2-digit',
                                                              })
                                                            : '-'}
                                                    </BodyShort>
                                                </div>
                                                <div className={cls.element('veileder-dato')}>
                                                    <BodyShort size="small">
                                                        {avtale.sluttDato
                                                            ? new Date(avtale.sluttDato).toLocaleDateString('no-NB', {
                                                                  day: 'numeric',
                                                                  month: 'short',
                                                                  year: '2-digit',
                                                              })
                                                            : '-'}
                                                    </BodyShort>
                                                </div>
                                            </MediaQuery>
                                            {hentAvtaleStatus(avtale, innloggetBruker.erNavAnsatt)}
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
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default AvtaleTabell;
