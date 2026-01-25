import { AvtaleContext } from '@/AvtaleProvider';
import RelasjonHjelpetekst from '@/AvtaleSide/steg/KontaktInformasjonSteg/ArbeidsgiverinfoDel/RelasjonHjelpetekst';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import PenFillIkon from '@/assets/ikoner/pencil-fill.svg?react';
import LesMerPanel from '@/komponenter/LesMerPanel/LesMerPanel';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import RadioPanel from '@/komponenter/radiopanel/RadioPanel';
import { TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { BodyShort, Heading, Label, RadioGroup, Tag } from '@navikt/ds-react';
import { FunctionComponent, useContext } from 'react';
import './Relasjoner.less';

const cls = BEMHelper('relasjoner');

interface Props {
    tiltakstype: TiltaksType;
}

const Relasjoner: FunctionComponent<Props> = ({ tiltakstype }: Props) => {
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
    // På arbeidstrening og for VTAO kunne veileder endre familierelasjon på avtalene som ble opprettet i Arena,
    // men for mentor skal avtalene gjenåpnes og behandles på nytt av alle parter.
    const isKanEndreFamilierelasjon =
        rolle !== 'VEILEDER' ||
        avtale.tiltakstype === 'SOMMERJOBB' ||
        (avtale.opphav === 'ARENA' && avtale.tiltakstype !== 'MENTOR');

    return (
        <div className={cls.className}>
            <Heading level="2" size="small" className={cls.element('heading')}>
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
                <RelasjonHjelpetekst tiltakstype={tiltakstype} />
            </LesMerPanel>
            <div className={cls.element('familietilknytning-valg')} id="familevalg">
                {isKanEndreFamilierelasjon ? (
                    <RadioGroup
                        legend="Familierelasjoner"
                        value={avtale.gjeldendeInnhold.harFamilietilknytning}
                        className={cls.element('familie-relasjoner')}
                    >
                        <div className={cls.element('familie-relasjoner-valg')}>
                            <RadioPanel
                                className={cls.element('radioknapp')}
                                name="familievalg"
                                checked={harFamilietilknytning}
                                value={true}
                                onChange={() => settAvtaleVerdier({ harFamilietilknytning: true })}
                            >
                                Ja
                            </RadioPanel>
                            <RadioPanel
                                className={cls.element('radioknapp')}
                                name="familievalg"
                                checked={harFamilietilknytning === false}
                                value={false}
                                onChange={() => {
                                    settAvtaleVerdier({
                                        familietilknytningForklaring: undefined,
                                        harFamilietilknytning: false,
                                    });
                                }}
                            >
                                Nei
                            </RadioPanel>
                        </div>
                    </RadioGroup>
                ) : (
                    <div className={cls.element('svar')}>
                        {harFamilietilknytningSomJaNeiSvar(harFamilietilknytning)}
                    </div>
                )}
            </div>
            {harFamilietilknytning && (
                <div className={cls.element('harFamilietilknytning-forklaring')}>
                    {isKanEndreFamilierelasjon ? (
                        <PakrevdTextarea
                            label="Vennligst utdyp denne relasjonen"
                            maxLengde={500}
                            verdi={familietilknytningForklaring || ''}
                            settVerdi={(verdi) => settAvtaleVerdier({ familietilknytningForklaring: verdi })}
                        />
                    ) : (
                        <>
                            <Label>Vennligst utdyp denne relasjonen</Label>
                            <BodyShort size="small">{familietilknytningForklaring || ''}</BodyShort>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Relasjoner;
