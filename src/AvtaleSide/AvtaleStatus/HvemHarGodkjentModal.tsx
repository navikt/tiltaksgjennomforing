import CheckIkon from '@/assets/ikoner/check.svg?react';
import VarselIkon from '@/assets/ikoner/varsel.svg?react';
import { AvtaleContext } from '@/AvtaleProvider';
import { TiltaksType } from '@/types/avtale';
import { formatterDato } from '@/utils/datoUtils';
import { BodyLong, BodyShort, Button, Label, Modal } from '@navikt/ds-react';
import { FunctionComponent, useContext, useState } from 'react';
import './HvemHarGodkjentModal.less';

type Props = {};

const HvemHarGodkjentModal: FunctionComponent<Props> = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const avtaleContext = useContext(AvtaleContext);

    return (
        <div>
            <Button size="xsmall" onClick={() => setModalOpen(true)}>
                Hvem har godkjent?
            </Button>

            <Modal
                style={{ minWidth: '40rem' }}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                header={{ heading: 'Hvem har godkjent?' }}
            >
                <Modal.Body>
                    <div className="godkjenningstatus">
                        <div className="godkjenningstatus__rader">
                            <GodkjenningRad
                                godkjentAvtale={avtaleContext.avtale.godkjentAvDeltaker}
                                navn={`${avtaleContext.avtale.gjeldendeInnhold.deltakerFornavn} ${avtaleContext.avtale.gjeldendeInnhold.deltakerEtternavn}`}
                            />
                            {avtaleContext.avtale.tiltakstype === 'MENTOR' && (
                                <GodkjenningRad
                                    godkjentAvtale={avtaleContext.avtale.godkjentAvMentor}
                                    navn={`${avtaleContext.avtale.gjeldendeInnhold.mentorFornavn} ${avtaleContext.avtale.gjeldendeInnhold.mentorEtternavn}`}
                                    tiltakstype="MENTOR"
                                />
                            )}

                            <GodkjenningRad
                                godkjentAvtale={avtaleContext.avtale.godkjentAvArbeidsgiver}
                                navn={avtaleContext.avtale.gjeldendeInnhold.bedriftNavn}
                            />
                            <GodkjenningRad godkjentAvtale={avtaleContext.avtale.avtaleInngått} navn="NAV" />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" onClick={() => setModalOpen(false)}>
                        Lukk
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

type GodkjenningRadProps = {
    godkjentAvtale?: string;
    navn: string;
    tiltakstype?: TiltaksType;
};

const GodkjenningRad: React.FunctionComponent<GodkjenningRadProps> = (props: GodkjenningRadProps) => {
    const Ikon = props.godkjentAvtale ? CheckIkon : VarselIkon;
    const harGodkjentTekst = props.tiltakstype === 'MENTOR' ? 'Signert' : 'Godkjent';
    const måGodkjenneTekst = props.tiltakstype === 'MENTOR' ? 'Må signere' : 'Må godkjenne';

    const godkjentStatus: string = props.godkjentAvtale
        ? harGodkjentTekst + ' ' + formatterDato(props.godkjentAvtale)
        : måGodkjenneTekst;

    const navn = props.navn;

    return (
        <div
            className="godkjenningsrad"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignContent: 'stretch' }}
        >
            <BodyShort size="small">{navn}</BodyShort>
            <div className="godkjenningsrad__status" style={{ float: 'right' }}>
                <Label>{godkjentStatus}</Label>
                <Ikon
                    title="Godkjenningsgrad"
                    className="godkjenningsrad__godkjenningIkon"
                    style={{ display: 'inline-block', marginLeft: '1rem', verticalAlign: 'bottom' }}
                />
            </div>
        </div>
    );
};

export default HvemHarGodkjentModal;
