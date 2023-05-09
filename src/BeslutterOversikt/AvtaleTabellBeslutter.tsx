import EtikettStatus from '@/BeslutterSide/EtikettStatus';
import { pathTilAvtaleNy } from '@/paths';
import { AvtaleMinimalForBeslutter } from '@/types/avtale';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import { BodyShort, LinkPanel } from '@navikt/ds-react';
import classNames from 'classnames';
import { FunctionComponent } from 'react';
import MediaQuery from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import '../AvtaleOversikt/AvtaleTabell.less';
import AvtaleTabellRadHeader from '@/AvtaleOversikt/AvtaleTabellRadHeader';

const cls = BEMHelper('avtaletabell');

const AvtaleTabellBeslutter: FunctionComponent<{
    avtaler: AvtaleMinimalForBeslutter[];
    varsler: Varsel[];
    innloggetBruker: InnloggetBruker;
}> = ({ avtaler, varsler, innloggetBruker }) => {
    const navigate = useNavigate();

    const erBeslutter: boolean = true;

    return (
        <div className={cls.className}>
            <AvtaleTabellRadHeader
                className={cls.className}
                erBeslutter={erBeslutter}
                erNavAnsatt={innloggetBruker.erNavAnsatt}
            />
            <div role="list">
                {avtaler.map((avtale: AvtaleMinimalForBeslutter, index: number) => {
                    const ulestVarsel = varsler.find((value) => value.avtaleId === avtale.id);
                    return (
                        <div key={avtale.id + index} className={cls.element('linkpanel')}>
                            <LinkPanel
                                border={false}
                                id={avtale.id}
                                key={avtale.id}
                                role="listitem"
                                aria-labelledby={avtale.id}
                                onClick={(e) => {
                                    navigate({
                                        pathname: pathTilAvtaleNy(avtale.id, innloggetBruker.rolle),
                                        search: window.location.search,
                                    });
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
                                                <BodyShort size="small">{avtale.bedriftNavn}</BodyShort>
                                            </div>
                                            <div className={cls.element('deltakerOgBedrift')}>
                                                <BodyShort size="small">
                                                    {avtale.deltakerFornavn || ''}&nbsp;
                                                    {avtale.deltakerEtternavn || ''}
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
                                                {erBeslutter && (
                                                    <div className={(cls.element('dato'), cls.element('besluterdato'))}>
                                                        <BodyShort size="small">
                                                            {new Date(avtale.startDato).toLocaleDateString('no-NB', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: '2-digit',
                                                            })}
                                                        </BodyShort>
                                                    </div>
                                                )}
                                            </MediaQuery>
                                            <EtikettStatus
                                                tilskuddsperiodestatus={avtale.status}
                                                antallKlarTilgodkjenning={Number(avtale.antallUbehandlet)}
                                            />
                                        </div>
                                    </div>
                                </LinkPanel.Title>
                            </LinkPanel>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default AvtaleTabellBeslutter;
