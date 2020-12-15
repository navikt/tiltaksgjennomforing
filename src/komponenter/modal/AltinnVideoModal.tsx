import video from '@/assets/media/roller-rettigheter.mp4';
import { trackVideo } from '@/utils/amplitude';
import BEMHelper from '@/utils/bem';
import Modal from 'nav-frontend-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import MediaQuery from 'react-responsive';
import './AltinnVideoModal.less';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
}

const cls = BEMHelper('videomodal');

const videoInstruks = `I videoen vises det hvordan man delegere en rettighet i Altinn.
Dette gjøres på følgende måte:
1. Logge seg inn på altinn.no.
2. Trykke på innstillinger for bedriften du skal delegere rettigheter i.
3. Velg andre med rettigheter til virksomheten og personen du skal gi rettighet til.
4. Søk etter rettigheten, huk av for alle rettigheter og klikk gi rettigheter.`;

const AltinnVideoModal: React.FunctionComponent<Props> = props => {
    return (
        <Modal
            className={cls.element('modal')}
            contentLabel="Roller og rettigheter"
            closeButton={true}
            isOpen={props.isOpen}
            onRequestClose={() => props.lukkModal()}
        >
            <div className={cls.element('tittel')}>
                <Systemtittel>Slik tildeler du roller og rettigheter i Altinn.</Systemtittel>
            </div>
            <MediaQuery minWidth={576}>
                <video width="700" height="450" controls={true} onTimeUpdate={trackVideo} aria-label={videoInstruks}>
                    <source src={video} type="video/mp4" />
                    Nettleseren din støtter ikke denne videoen.
                </video>
            </MediaQuery>
            <MediaQuery maxWidth={575}>
                <video width="300" height="300" controls={true} onTimeUpdate={trackVideo} aria-label={videoInstruks}>
                    <source src={video} type="video/mp4" />
                    Nettleseren din støtter ikke denne videoen.
                </video>
            </MediaQuery>
        </Modal>
    );
};

export default AltinnVideoModal;
