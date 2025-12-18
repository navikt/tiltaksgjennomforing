import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { Alert, RadioGroup, Radio, InfoCard, List } from '@navikt/ds-react';
import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import BekreftelseModal from './BekreftelseModal';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
}

const AnnullerAvtaleModal: FunctionComponent<Props> = (props) => {
    const [annetGrunn, setAnnetGrunn] = useState('');
    const [grunnFeil, setGrunnFeil] = useState<undefined | string>(undefined);
    const [annullertGrunn, setAnnullertGrunn] = useState<string>('');
    const avtaleContext = useContext(AvtaleContext);

    const bekreftAnnullerAvtale = async () => {
        const annullertGrunnIkkeSatt = !annullertGrunn || (annullertGrunn === 'Annet' && !annetGrunn);

        if (annullertGrunnIkkeSatt) {
            setGrunnFeil('Vennligst velg en grunn');
            return;
        }

        const grunn = annullertGrunn === 'Annet' ? annetGrunn : annullertGrunn;

        return avtaleContext.annullerAvtale(grunn).then(() => props.lukkModal());
    };

    useEffect(() => {
        if (annullertGrunn) {
            setGrunnFeil(undefined);
        }
    }, [annullertGrunn]);

    return (
        <BekreftelseModal
            bekreftOnClick={bekreftAnnullerAvtale}
            lukkModal={props.lukkModal}
            modalIsOpen={props.isOpen}
            oversiktTekst="Annuller avtalen"
            bekreftelseTekst="Annuller avtale"
            avbrytelseTekst="Behold avtale"
        >
            <>
                <InfoCard data-color="warning">
                    <InfoCard.Header icon={<ExclamationmarkTriangleIcon />}>
                        <InfoCard.Title>Vær varsom</InfoCard.Title>
                    </InfoCard.Header>
                    <InfoCard.Content>
                        <List>
                            <List.Item>
                                Annullering brukes kun for tilfeller der tiltaket aldri ble påbegynt, og det ikke er
                                utbetalt noe til arbeidsgiver
                            </List.Item>
                            <List.Item>
                                Når avtalen annulleres, låses innholdet. Den kan ikke redigeres eller gjenopprettes
                                etter dette.
                            </List.Item>
                            <List.Item>Eventuell historikk i Arena slettes.</List.Item>
                            {avtaleContext.avtale.opphav === 'ARENA' && (
                                <List.Item>
                                    Annullering av denne avtalen kan generere en vurder konsekvens for ytelse oppgave,
                                    som du må følge opp.
                                </List.Item>
                            )}
                        </List>
                    </InfoCard.Content>
                </InfoCard>
                <VerticalSpacer rem={1.5} />
                <div role="menu">
                    <RadioGroup
                        legend="Valg av grunn for annullering av avtalen"
                        title="Hvorfor annulleres avtalen?"
                        error={grunnFeil}
                    >
                        {[
                            'Feilregistrering',
                            'Begynt i arbeid',
                            'Fått tilbud om annet tiltak',
                            'Syk',
                            'Ikke møtt',
                            'Annet',
                        ].map((label) => (
                            <Radio
                                key={label}
                                name="avbrytelsegrunn"
                                value={label}
                                checked={annullertGrunn === label}
                                onChange={(event) => {
                                    setAnnullertGrunn(event.currentTarget.value);
                                }}
                                role="menuitemradio"
                            >
                                {label === 'Feilregistrering' ? (
                                    <>{label} (avtalen vil bli skjult for alle avtaleparter)</>
                                ) : (
                                    label
                                )}
                            </Radio>
                        ))}
                    </RadioGroup>
                    <div>
                        {annullertGrunn === 'Annet' && (
                            <PakrevdTextarea
                                label=""
                                verdi={annetGrunn}
                                placeholder="Begrunnelse (påkrevd)"
                                settVerdi={(verdi) => setAnnetGrunn(verdi)}
                                maxLengde={500}
                                feilmelding="Begrunnelse er påkrevd"
                            />
                        )}
                    </div>
                </div>
            </>
        </BekreftelseModal>
    );
};

export default AnnullerAvtaleModal;
