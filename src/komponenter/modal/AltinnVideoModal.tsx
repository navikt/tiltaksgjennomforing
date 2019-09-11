import React from 'react';
import Modal from 'nav-frontend-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import video from '../../assets/media/roller-rettigheter.mp4';
import './AltinnVideoModal.less';
import BEMHelper from '../../utils/bem';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
}

const cls = BEMHelper('videomodal');

const getVideoSize = () => {
    const videoOptions = { height: 0, width: 0 };
    if (window.innerWidth < 768) {
        videoOptions.height = 300;
        videoOptions.width = 300;
    } else {
        videoOptions.height = 450;
        videoOptions.width = 700;
    }
    return videoOptions;
};

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
                <Systemtittel>
                    Slik tildeler du roller og rettigheter i Altinn.
                </Systemtittel>
            </div>
            <video
                width={getVideoSize().width}
                height={getVideoSize().height}
                controls
            >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </Modal>
    );
};

export default AltinnVideoModal;
