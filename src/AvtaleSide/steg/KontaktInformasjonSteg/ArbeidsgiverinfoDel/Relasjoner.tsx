import { AvtaleContext } from '@/AvtaleProvider';
import RelasjonHjelpetekst from '@/AvtaleSide/steg/KontaktInformasjonSteg/ArbeidsgiverinfoDel/RelasjonHjelpetekst';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import PenFillIkon from '@/assets/ikoner/pencil-fill.svg?react';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { BodyShort, Heading, Label, Tag } from '@navikt/ds-react';
import { FunctionComponent, useContext } from 'react';
import './Relasjoner.less';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import RadioBlocks from '@/komponenter/radioblocks/RadioBlocks';

const cls = BEMHelper('relasjoner');

interface Props {
    tiltakstype: TiltaksType;
}

const mapSelectedValue = (value: boolean | undefined | null): string | undefined => {
    if (value === undefined || value === null) return undefined;
    return value ? 'JA' : 'NEI';
};

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
    const kanEndreFamilierelasjon =
        rolle === 'ARBEIDSGIVER' || (avtale.opphav === 'ARENA' && avtale.tiltakstype === 'VTAO');

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
            <VerticalSpacer rem={1} />
            <div className={cls.element('familietilknytning-valg')} id="familievalg">
                {kanEndreFamilierelasjon ? (
                    <>
                        <RadioBlocks
                            legend="Familierelasjoner"
                            values={{
                                JA: 'Ja',
                                NEI: 'Nei',
                            }}
                            selectedValue={mapSelectedValue(harFamilietilknytning)}
                            onChange={(e) => {
                                const verdi = e.target.value === 'JA';
                                settAvtaleVerdier({
                                    familietilknytningForklaring: verdi ? familietilknytningForklaring : undefined,
                                    harFamilietilknytning: verdi,
                                });
                            }}
                            direction="row"
                        />
                        <VerticalSpacer rem={1} />
                    </>
                ) : (
                    <div className={cls.element('svar')}>
                        {harFamilietilknytningSomJaNeiSvar(harFamilietilknytning)}
                    </div>
                )}
            </div>
            {harFamilietilknytning && (
                <>
                    <VerticalSpacer rem={2} />
                    <div className={cls.element('harFamilietilknytning-forklaring')}>
                        {kanEndreFamilierelasjon ? (
                            <PakrevdTextarea
                                label="Vennligst utdyp denne relasjonen"
                                maxLengde={500}
                                verdi={familietilknytningForklaring || ''}
                                settVerdi={(verdi) => settAvtaleVerdier({ familietilknytningForklaring: verdi })}
                            />
                        ) : (
                            <>
                                <Label>Beskrivelse av denne relasjonen</Label>
                                <VerticalSpacer rem={1} />
                                <BodyShort size="small">{familietilknytningForklaring || ''}</BodyShort>
                            </>
                        )}
                    </div>
                </>
            )}
            <VerticalSpacer rem={1} />
            <RelasjonHjelpetekst tiltakstype={tiltakstype} />
        </div>
    );
};

export default Relasjoner;
