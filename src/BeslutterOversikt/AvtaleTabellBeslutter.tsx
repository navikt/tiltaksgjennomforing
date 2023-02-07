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
import { useHistory } from 'react-router-dom';
import '../AvtaleOversikt/AvtaleTabell.less';

const cls = BEMHelper('avtaletabell');

export interface AntallKlarTilgodkjenning {
    id: string;
    antallKlarTilgodkjenning: number;
}

// const hentAvtaleStatus = (
//     // avtale: Avtale,
//     // rolle: Rolle,
//     // skalViseAntallUbehandlet: boolean,
//     // ubehandletPerioder?: AntallKlarTilgodkjenning
// ) => {

//     return (
//         <EtikettStatus
//         tilskuddsperiodestatus={'UBEHANDLET'}
//        // refusjonStatus={avtale.gjeldendeTilskuddsperiode?.refusjonStatus}
//         antallKlarTilgodkjenning={1337}
//     />
//     )
//     // if (rolle === 'BESLUTTER') {
//     //     return (
//     //         <div className={cls.element('beslutterStatus')}>
//     //             {avtale.gjeldendeTilskuddsperiode && (
//     //                 <EtikettStatus
//     //                     tilskuddsperiodestatus={avtale.gjeldendeTilskuddsperiode?.status}
//     //                     refusjonStatus={avtale.gjeldendeTilskuddsperiode?.refusjonStatus}
//     //                     antallKlarTilgodkjenning={
//     //                         skalViseAntallUbehandlet && ubehandletPerioder
//     //                             ? ubehandletPerioder.antallKlarTilgodkjenning
//     //                             : undefined
//     //                     }
//     //                 />
//     //             )}
//     //         </div>
//     //     );
//     // }
//     // return (
//     //     <>
//     //         <div className={cls.element('statusikon')}>
//     //             <StatusIkon status={avtale.statusSomEnum} />
//     //         </div>
//     //         <div className={cls.element('status')}>{avtaleStatusTekst[avtale.statusSomEnum]}</div>
//     //     </>
//     // );
// };

const AvtaleTabellBeslutter: FunctionComponent<{
    avtaler: AvtaleMinimalForBeslutter[];
    varsler: Varsel[];
    innloggetBruker: InnloggetBruker;
}> = ({ avtaler, varsler, innloggetBruker }) => {
//    const { filtre } = useFilter();
    const history = useHistory();

    const erBeslutter: boolean = true; //innloggetBruker.rolle === 'BESLUTTER';
//    const skalViseAntallUbehandlet = erBeslutter && (filtre?.tilskuddPeriodeStatus === undefined || filtre?.tilskuddPeriodeStatus === 'UBEHANDLET');
//    const [antallKlar, setAntallKlar] = useState<AntallKlarTilgodkjenning[] | undefined>(undefined);
//    const [visTaushetserklæringForAvtaleId, setVisTaushetserklæringForAvtaleId] = useState<string>('');

    // useEffect(() => {
    //     skalViseAntallUbehandlet
    //         ? setAntallKlar(
    //               avtaler.map((a) => ({
    //                   id: a.id,
    //                   antallKlarTilgodkjenning: a.tilskuddPeriode.filter(
    //                       (t) =>
    //                           (new Date(t.kanBesluttesFom) <= new Date() || t.kanBesluttesFom === '-999999999-01-01') &&
    //                           t.status === 'UBEHANDLET'
    //                   )?.length,
    //               }))
    //           )
    //         : setAntallKlar(undefined);
    // }, [avtaler, erBeslutter, filtre?.tilskuddPeriodeStatus, skalViseAntallUbehandlet]);

    return (
        <div className={cls.className}>
            <div className={classNames(cls.element('rad'), cls.element('header'))}>
                <div className={cls.element('deltakerOgBedrift')}>Bedrift</div>
                <div className={cls.element('deltakerOgBedrift')}>Deltaker</div>
                {innloggetBruker.erNavAnsatt && <div className={cls.element('veileder')}>Veileder</div>}
                <MediaQuery minWidth={576}>
                    <div className={cls.element('dato')}>
                        {erBeslutter ? (
                            <div className={cls.element('besluterdato')}>
                                <div>Startdato</div>
                                <div>periode</div>
                            </div>
                        ) : (
                            'Startdato'
                        )}
                    </div>
                    {!erBeslutter && <div className={cls.element('dato')}>Sluttdato</div>}
                </MediaQuery>
                <div className={cls.element('statusikon')}>&nbsp;</div>
                {erBeslutter ? (
                    <div className={cls.element('headerstatus')}>Status</div>
                ) : (
                    <div className={cls.element('status')}>Status</div>
                )}
            </div>
            <div role="list">
                {avtaler.map((avtale: AvtaleMinimalForBeslutter, index: number) => {
                    const ulestVarsel = varsler.find((value) => value.avtaleId === avtale.id);
                    // const periodeStartDato = avtale.gjeldendeTilskuddsperiode?.startDato || null;
                    // const startDato = avtale.gjeldendeInnhold.startDato || null;
                    // const sluttDato = avtale.gjeldendeInnhold.sluttDato || null;
                    return (
                        <div key={avtale.id} className={cls.element('linkpanel')}>
                            <LinkPanel
                                border={false}
                                id={avtale.id}
                                key={avtale.id}
                                role="listitem"
                                aria-labelledby={avtale.id}
                                onClick={(e) => {
                                    history.push({
                                        pathname: pathTilAvtaleNy(avtale.id, innloggetBruker.rolle),
                                        search: window.location.search,
                                    });
                                }}
                            >
                                <LinkPanel.Title>
                                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                        {ulestVarsel && (
                                            <span aria-hidden={!ulestVarsel} className="ulest-varsel-ikon" />
                                        )}
                                        <BodyShort size="small">
                                            {' '}
                                            <div
                                                className={classNames(cls.element('rad'), {
                                                    uthevet: ulestVarsel,
                                                })}
                                            >
                                                <div className={cls.element('deltakerOgBedrift')}>{avtale.bedriftNavn}</div>
                                                <div className={cls.element('deltakerOgBedrift')}>
                                                    {avtale.deltakerFornavn || ''}&nbsp;
                                                    {avtale.deltakerEtternavn || ''}
                                                </div>
                                                {innloggetBruker.erNavAnsatt && (
                                                    <div className={cls.element('veileder')}>
                                                        {avtale.veilederNavIdent || 'Ufordelt'}
                                                    </div>
                                                )}
                                                <MediaQuery minWidth={576}>
                                                    {erBeslutter && (
                                                        <div
                                                            style={{minWidth: '10rem'}}
                                                            className={
                                                                (cls.element('dato'), cls.element('besluterdato'))
                                                            }
                                                        >
                                                            {' - '}
                                                        </div>
                                                    )}
                                                </MediaQuery>
                                                <EtikettStatus
                                                    tilskuddsperiodestatus={avtale.tilskuddsperiodestatus}
                                                    // refusjonStatus={avtale.gjeldendeTilskuddsperiode?.refusjonStatus}
                                                    antallKlarTilgodkjenning={Number(avtale.antallUbehandlet)}
                                                />
                                            </div>
                                        </BodyShort>
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
