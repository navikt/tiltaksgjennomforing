import EtikettStatus from '@/BeslutterSide/EtikettStatus';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { tilskuddsperiodeStatusTekst } from '@/messages';
import { TilskuddsPeriode } from '@/types/avtale';
import { formatterPenger } from '@/utils/PengeUtils';
import BEMHelper from '@/utils/bem';
import { NORSK_DATO_OG_TID_FORMAT, formatterDatoHvisDefinert, formatterPeriode } from '@/utils/datoUtils';
import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react';
import { CSSProperties, FunctionComponent, useContext } from 'react';
import VerticalSpacer from '../layout/VerticalSpacer';
import './TilskuddsperiodeInfoModal.less';
import VarselTegnForModal from './VarselTegnForModal';

type Props = {
    modalIsOpen: boolean;
    lukkModal: () => void;
    tilskuddsperiode: TilskuddsPeriode;
    style?: CSSProperties;
};

const TilskuddsperiodeInfoModal: FunctionComponent<Props> = props => {
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const cls = BEMHelper('tilskuddsperiodeInfoModal');
    return (
        <div className={cls.className}>
            <Modal
                style={props.style}
                open={props.modalIsOpen}
                className={cls.element('modal-container')}
                aria-label={'bekrefte valgt handling'}
                onClose={props.lukkModal}
            >
                <Modal.Header>
                    <div className={cls.element('topIconContainer')}>
                        <VarselTegnForModal width={'80px'} height={'80px'} />
                    </div>
                </Modal.Header>

                <Modal.Body>
                    <div className={cls.element('body')}>
                        <div className={cls.element('knappRad')} />
                        <div className={cls.element('innhold')}>
                            <div className={cls.element('tittel')}>
                                <Heading size="medium">Tilskuddsperiode ({props.tilskuddsperiode.løpenummer})</Heading>
                                <VerticalSpacer rem={0.5} />
                                <EtikettStatus tilskuddsperiodestatus={props.tilskuddsperiode.status} />
                            </div>
                            <div className={cls.element('varselTekst')}>
                                <BodyShort size="small">Løpenummer: {props.tilskuddsperiode.løpenummer}</BodyShort>
                                <BodyShort size="small">Periode: {formatterPeriode(props.tilskuddsperiode.startDato, props.tilskuddsperiode.sluttDato)}</BodyShort>
                                <BodyShort size="small">Tilskuddsprosent: {props.tilskuddsperiode.lonnstilskuddProsent}%</BodyShort>
                                <BodyShort size="small">Beløp: {formatterPenger(props.tilskuddsperiode.beløp)}</BodyShort>
                                <BodyShort size="small">Status: {tilskuddsperiodeStatusTekst[props.tilskuddsperiode.status]}</BodyShort>
                                {innloggetBruker.erNavAnsatt && (
                                    <>
                                    <BodyShort size="small">Godkjent av beslutter ident: {props.tilskuddsperiode.godkjentAvNavIdent}</BodyShort>
                                    <BodyShort size="small">Godkjent av beslutter tidspunkt: {formatterDatoHvisDefinert(props.tilskuddsperiode.godkjentTidspunkt, NORSK_DATO_OG_TID_FORMAT)}</BodyShort>
                                    </>
                                )}
                                <BodyShort size="small">Refusjonsstatus: {props.tilskuddsperiode.refusjonStatus || 'Ingen'}</BodyShort>
                                </div>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={props.lukkModal}>
                        Lukk
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TilskuddsperiodeInfoModal;
