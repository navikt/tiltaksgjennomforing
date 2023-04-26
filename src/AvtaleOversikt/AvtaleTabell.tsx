import AvtaleTabellRadHeader from '@/AvtaleOversikt/AvtaleTabellRadHeader';
import StatusIkon from '@/komponenter/StatusIkon/StatusIkon';
import { avtaleStatusTekst } from '@/messages';
import { pathTilAvtaleNy } from '@/paths';
import { Avtale } from '@/types/avtale';
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

export interface AntallKlarTilgodkjenning {
    id: string;
    antallKlarTilgodkjenning: number;
}

const hentAvtaleStatus = (avtale: Avtale) => {
    const erGjeldendeTilskuddsperiodeAvslått = avtale.gjeldendeTilskuddsperiode?.status === 'AVSLÅTT';
    return (
        <>
            <div className={cls.element('statusikon')}>
                <StatusIkon status={avtale.statusSomEnum} />
            </div>
            <BodyShort className={cls.element('status')}>
                {erGjeldendeTilskuddsperiodeAvslått
                    ? 'Tilskuddsperiode avslått'
                    : avtaleStatusTekst[avtale.statusSomEnum]}
            </BodyShort>
        </>
    );
};

const AvtaleTabell: FunctionComponent<{
    avtaler: Avtale[];
    varsler: Varsel[];
    innloggetBruker: InnloggetBruker;
}> = ({ avtaler, varsler, innloggetBruker }) => {
    const navigate = useNavigate();

    const [visTaushetserklæringForAvtaleId, setVisTaushetserklæringForAvtaleId] = useState<string>('');

    return (
        <div className={cls.className}>
            <AvtaleTabellRadHeader className={cls.className} erBeslutter={false} innloggetBruker={innloggetBruker} />
            <div role="list">
                {avtaler.map((avtale: Avtale, index: number) => {
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
                                            <div className={cls.element('deltakerOgBedrift')}>
                                                <BodyShort size="small">
                                                    {avtale.gjeldendeInnhold.bedriftNavn}
                                                </BodyShort>
                                            </div>
                                            <div className={cls.element('deltakerOgBedrift')}>
                                                <BodyShort size="small">
                                                    {avtale.gjeldendeInnhold.deltakerFornavn || ''}&nbsp;
                                                    {avtale.gjeldendeInnhold.deltakerEtternavn || ''}
                                                </BodyShort>
                                            </div>
                                            {innloggetBruker.erNavAnsatt && (
                                                <div className={cls.element('veileder')}>
                                                    <BodyShort size="small">
                                                        {avtale.veilederNavIdent || 'Ufordelt'}
                                                    </BodyShort>
                                                </div>
                                            )}
                                            <MediaQuery minWidth={576}>
                                                <div className={cls.element('dato')}>
                                                    <BodyShort size="small">
                                                        {avtale.gjeldendeInnhold.startDato &&
                                                            moment(avtale.gjeldendeInnhold.startDato).format(
                                                                'DD.MM.YYYY'
                                                            )}
                                                    </BodyShort>
                                                </div>
                                                <div className={cls.element('dato')}>
                                                    <BodyShort size="small">
                                                        {avtale.gjeldendeInnhold.sluttDato &&
                                                            moment(avtale.gjeldendeInnhold.sluttDato).format(
                                                                'DD.MM.YYYY'
                                                            )}
                                                    </BodyShort>
                                                </div>
                                            </MediaQuery>
                                            {hentAvtaleStatus(avtale)}
                                        </div>
                                    </div>
                                </LinkPanel.Title>
                            </LinkPanel>
                            <TaushetserklæringModal
                                open={visTaushetserklæringForAvtaleId === avtale.id}
                                togglesetTaushetserklæringForMentorAvtale={setVisTaushetserklæringForAvtaleId}
                                avtale={avtale}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default AvtaleTabell;
