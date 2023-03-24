import { ReactComponent as PenFillIkon } from '@/assets/ikoner/pencil-fill.svg';
import { AvtaleContext } from '@/AvtaleProvider';
import RelasjonHjelpetekst from '@/AvtaleSide/steg/KontaktInformasjonSteg/ArbeidsgiverinfoDel/RelasjonHjelpetekst';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LesMerPanel from '@/komponenter/LesMerPanel/LesMerPanel';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import BEMHelper from '@/utils/bem';
import { Tag } from '@navikt/ds-react';
import Popover from 'nav-frontend-popover';
import { RadioPanel } from 'nav-frontend-skjema';
import { BodyShort, Heading, Label } from '@navikt/ds-react';
import React, { FunctionComponent, useContext, useState } from 'react';
import './Relasjoner.less';

const cls = BEMHelper('relasjoner');

const Relasjoner: FunctionComponent = () => {
    const { avtale, settAvtaleInnholdVerdier: settAvtaleVerdier } = useContext(AvtaleContext);

    const harFamilietilknytningSomJaNeiSvar = (harFamilietilknytning: boolean | undefined): JSX.Element => {
        switch (harFamilietilknytning) {
            case true:
                return <BodyShort size="small">Ja</BodyShort>;
            case false:
                return <BodyShort size="small">Nei</BodyShort>;
            default:
                return (
                    <>
                        <Tag variant="warning">Ikke fylt ut</Tag>
                    </>
                );
        }
    };

    const { rolle } = useContext(InnloggetBrukerContext);
    const [popoverAnker, setPopoverAnker] = useState<HTMLElement | undefined>();
    return (
        <>
            <div>
                <div className={cls.className}>
                    <Heading size="small">Relasjoner</Heading>
                    <VerticalSpacer rem={1} />
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <PenFillIkon />
                        <BodyShort size="small" style={{ marginLeft: '1rem' }}>
                            Fylles ut av arbeidsgiveren
                        </BodyShort>
                    </div>
                    <VerticalSpacer rem={1} />

                    <Label>Er det familiære eller økonomiske relasjoner mellom arbeidsgiveren og deltakeren?</Label>
                    <LesMerPanel åpneLabel="Hva menes med dette?" lukkLabel="Lukk">
                        <RelasjonHjelpetekst tiltakstype={avtale.tiltakstype}/>
                    </LesMerPanel>
                    <VerticalSpacer rem={0.5} />
                    <div
                        onMouseOver={(e) => setPopoverAnker(e.currentTarget)}
                        onMouseLeave={() => setPopoverAnker(undefined)}
                        className={cls.element('familietilknytning-valg')}
                        id="familevalg"
                    >
                        {rolle === 'VEILEDER' && avtale.tiltakstype !== 'SOMMERJOBB' ? (
                            <div>
                                {harFamilietilknytningSomJaNeiSvar(avtale.gjeldendeInnhold.harFamilietilknytning)}
                            </div>
                        ) : (
                            <>
                                <RadioPanel
                                    label="Ja"
                                    name="familievalg"
                                    checked={avtale.gjeldendeInnhold.harFamilietilknytning === true}
                                    value="ja"
                                    onChange={() => settAvtaleVerdier({ harFamilietilknytning: true })}
                                />
                                <RadioPanel
                                    label="Nei"
                                    name="familievalg"
                                    checked={avtale.gjeldendeInnhold.harFamilietilknytning === false}
                                    value="nei"
                                    onChange={() => {
                                        settAvtaleVerdier({
                                            familietilknytningForklaring: undefined,
                                            harFamilietilknytning: false,
                                        });
                                    }}
                                />
                            </>
                        )}
                    </div>
                    {avtale.gjeldendeInnhold.harFamilietilknytning && (
                        <>
                            <VerticalSpacer rem={1} />
                            {rolle === 'VEILEDER' && avtale.tiltakstype !== 'SOMMERJOBB' ? (
                                <>
                                    <Label>Vennligst utdyp denne relasjonen</Label>
                                    <BodyShort size="small">
                                        {avtale.gjeldendeInnhold.familietilknytningForklaring || ''}
                                    </BodyShort>
                                </>
                            ) : (
                                <PakrevdTextarea
                                    label="Vennligst utdyp denne relasjonen"
                                    maxLengde={500}
                                    verdi={avtale.gjeldendeInnhold.familietilknytningForklaring || ''}
                                    settVerdi={(verdi) => settAvtaleVerdier({ familietilknytningForklaring: verdi })}
                                />
                            )}
                        </>
                    )}
                    <>
                        {rolle === 'VEILEDER' && (
                            <Popover
                                avstandTilAnker={16}
                                onRequestClose={() => setPopoverAnker(undefined)}
                                ankerEl={popoverAnker}
                            >
                                <div style={{ padding: '1rem' }}>Dette fylles ut av arbeidsgiver.</div>
                            </Popover>
                        )}
                    </>
                </div>
            </div>
            <VerticalSpacer rem={2} />
        </>
    );
};

export default Relasjoner;
