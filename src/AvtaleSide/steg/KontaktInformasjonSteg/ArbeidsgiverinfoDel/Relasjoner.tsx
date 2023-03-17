import { ReactComponent as PenFillIkon } from '@/assets/ikoner/pencil-fill.svg';
import { AvtaleContext } from '@/AvtaleProvider';
import RelasjonHjelpetekst from '@/AvtaleSide/steg/KontaktInformasjonSteg/ArbeidsgiverinfoDel/RelasjonHjelpetekst';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import LesMerPanel from '@/komponenter/LesMerPanel/LesMerPanel';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import BEMHelper from '@/utils/bem';
import { Tag } from '@navikt/ds-react';
import { Popover, RadioGroup, Radio } from '@navikt/ds-react';
import { BodyShort, Heading, Label } from '@navikt/ds-react';
import React, { FunctionComponent, useContext, useState } from 'react';
import './Relasjoner.less';

const cls = BEMHelper('relasjoner');

const Relasjoner: FunctionComponent<{}> = () => {
    const { avtale, settAvtaleInnholdVerdier: settAvtaleVerdier } = useContext(AvtaleContext);
    const { gjeldendeInnhold } = avtale;
    const { harFamilietilknytning, familietilknytningForklaring } = gjeldendeInnhold;

    const harFamilietilknytningSomJaNeiSvar = (svar: boolean | undefined): JSX.Element => {
        switch (svar) {
            case true:
                return <BodyShort size="small">Ja</BodyShort>;
            case false:
                return <BodyShort size="small">Nei</BodyShort>;
            default:
                return <Tag variant="warning">Ikke fylt ut</Tag>;
        }
    };

    const { rolle } = useContext(InnloggetBrukerContext);
    const [popoverAnker, setPopoverAnker] = useState<HTMLElement | null>(null);

    return (
        <div className={cls.className}>
            <Heading size="small" className={cls.element('heading')}>
                Relasjoner
            </Heading>
            <div className={cls.element('info-ingress')}>
                <PenFillIkon />
                <BodyShort size="small" style={{ marginLeft: '1rem' }}>
                    Fylles ut av arbeidsgiveren
                </BodyShort>
            </div>
            <Label>Er det familiære eller økonomiske relasjoner mellom arbeidsgiveren og deltakeren?</Label>
            <LesMerPanel åpneLabel="Hva menes med dette?" lukkLabel="Lukk" className={cls.element('LesMerPanel')}>
                <RelasjonHjelpetekst />
            </LesMerPanel>
            <div
                onMouseOver={(e) => setPopoverAnker(e.currentTarget)}
                onMouseLeave={() => setPopoverAnker(null)}
                className={cls.element('familietilknytning-valg')}
                id="familevalg"
            >
                {rolle === 'VEILEDER' && avtale.tiltakstype !== 'SOMMERJOBB' ? (
                    <div className={cls.element('svar')}>
                        {harFamilietilknytningSomJaNeiSvar(harFamilietilknytning)}
                    </div>
                ) : (
                    <>
                        <RadioGroup legend="familie relasjoner" className={cls.element('familie-relasjoner')}>
                            <div className={cls.element('familie-relasjoner-valg')}>
                                <Radio
                                    name="familievalg"
                                    checked={harFamilietilknytning}
                                    value="ja"
                                    onChange={() => settAvtaleVerdier({ harFamilietilknytning: true })}
                                >
                                    Ja
                                </Radio>
                                <Radio
                                    name="familievalg"
                                    checked={harFamilietilknytning === false}
                                    value="nei"
                                    onChange={() => {
                                        settAvtaleVerdier({
                                            familietilknytningForklaring: undefined,
                                            harFamilietilknytning: false,
                                        });
                                    }}
                                >
                                    Nei
                                </Radio>
                            </div>
                        </RadioGroup>
                    </>
                )}
            </div>
            {harFamilietilknytning && (
                <div className={cls.element('harFamilietilknytning-forklaring')}>
                    {rolle === 'VEILEDER' && avtale.tiltakstype !== 'SOMMERJOBB' ? (
                        <>
                            <Label>Vennligst utdyp denne relasjonen</Label>
                            <BodyShort size="small">{familietilknytningForklaring || ''}</BodyShort>
                        </>
                    ) : (
                        <PakrevdTextarea
                            label="Vennligst utdyp denne relasjonen"
                            maxLengde={500}
                            verdi={familietilknytningForklaring || ''}
                            settVerdi={(verdi) => settAvtaleVerdier({ familietilknytningForklaring: verdi })}
                        />
                    )}
                </div>
            )}
            <>
                {rolle === 'VEILEDER' && (
                    <>
                        <Popover open={!!popoverAnker} anchorEl={popoverAnker} onClose={() => setPopoverAnker(null)}>
                            <Popover.Content>
                                <div style={{ padding: '1rem' }}>Dette fylles ut av arbeidsgiver.</div>
                            </Popover.Content>
                        </Popover>
                    </>
                )}
            </>
        </div>
    );
};

export default Relasjoner;
