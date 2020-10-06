import { ReactComponent as PenFillIkon } from '@/assets/ikoner/pencil-fill.svg';
import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LesMerPanel from '@/komponenter/LesMerPanel/LesMerPanel';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import BEMHelper from '@/utils/bem';
import { Column, Row } from 'nav-frontend-grid';
import Popover from 'nav-frontend-popover';
import { RadioPanel } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useState } from 'react';
import './Relasjoner.less';

const cls = BEMHelper('relasjoner');

const relasjonHjelpetekst = (
    <div className={cls.element('relasjon-hjelpetekst')}>
        Du kan ikke få tilskudd til arbeidsmarkedstiltak for egne familiemedlemmer eller andre du har et nært forhold
        til, med mindre særlige grunner foreligger.
        <VerticalSpacer eightPx={true} />
        Er det en nær relasjon mellom deg eller noen i virksomheten og arbeidstakeren skal du huke av for dette i boksen
        under.
        <VerticalSpacer eightPx={true} />
        Du kan søke om oppstart av lønnstilskudd selv om du har en nær relasjon til arbeidstakeren, men du må oppgi at
        det er en nær relasjon og utdype tilknytningen. NAV vil deretter vurdere om det foreligger særlige grunner for
        likevel å innvilge tiltaket.
        {
            <ul>
                <li>Den som fyller ut skjemaet og den meldingen gjelder er</li>
                <li>Samme person</li>
                <li>Ektefelle/partner/samboer/forlovet</li>
                <li>Tidligere ektefelle/partner/samboer</li>
                <li>Søsken/halvsøsken</li>
                <li>Barn/barnebarn</li>
                <li>Foreldre</li>
                <li>Besteforeldre</li>
                <li>Svogerskap</li>
                <li>Annen nær personlig tilknytning</li>
            </ul>
        }
    </div>
);

const Relasjoner: FunctionComponent = () => {
    const { avtale, settAvtaleVerdi } = useContext(AvtaleContext);
    const { rolle } = useContext(InnloggetBrukerContext);
    const [popoverAnker, setPopoverAnker] = useState<HTMLElement | undefined>();
    return (
        <Row className="">
            <Column md="12">
                <Undertittel>Relasjoner</Undertittel>
                <VerticalSpacer rem={1} />
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PenFillIkon />
                    <Normaltekst style={{ marginLeft: '1rem' }}>Fylles ut av arbeidsgiver</Normaltekst>
                </div>
                <VerticalSpacer rem={1} />

                <Normaltekst>
                    Er det familiære eller økonomiske relasjoner mellom arbeidsgiveren og deltakeren?
                </Normaltekst>
                <LesMerPanel åpneLabel="Hva menes med dette?" lukkLabel="Lukk">
                    {relasjonHjelpetekst}
                </LesMerPanel>
                <VerticalSpacer eightPx={true} />
            </Column>
            <Column md="12">
                <div
                    onMouseOver={e => setPopoverAnker(e.currentTarget)}
                    onMouseLeave={() => setPopoverAnker(undefined)}
                    className={cls.element('familietilknytning-valg')}
                    id="familevalg"
                >
                    <RadioPanel
                        disabled={rolle === 'VEILEDER'}
                        label="Ja"
                        name="familievalg"
                        checked={avtale.harFamilietilknytning === true}
                        value="ja"
                        onChange={() => settAvtaleVerdi('harFamilietilknytning', true)}
                    />
                    <RadioPanel
                        disabled={rolle === 'VEILEDER'}
                        label="Nei"
                        name="familievalg"
                        checked={avtale.harFamilietilknytning === false}
                        value="nei"
                        onChange={() => {
                            settAvtaleVerdi('harFamilietilknytning', false);
                            settAvtaleVerdi('familietilknytningForklaring', null);
                        }}
                    />
                </div>
            </Column>
            {avtale.harFamilietilknytning && (
                <Column md="12">
                    <VerticalSpacer sixteenPx={true} />
                    <PakrevdTextarea
                        disabled={rolle === 'VEILEDER'}
                        label="Vennligst utdyp denne relasjonen"
                        maxLengde={500}
                        verdi={avtale.familietilknytningForklaring || ''}
                        settVerdi={verdi => settAvtaleVerdi('familietilknytningForklaring', verdi)}
                    />
                </Column>
            )}
            {rolle === 'VEILEDER' && (
                <Popover avstandTilAnker={16} onRequestClose={() => setPopoverAnker(undefined)} ankerEl={popoverAnker}>
                    <div style={{ padding: '1rem' }}>Dette fylles ut av arbeidsgiver.</div>
                </Popover>
            )}
        </Row>
    );
};

export default Relasjoner;
