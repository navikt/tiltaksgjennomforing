import React, { CSSProperties, Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { Modal } from '@navikt/ds-react';
import VarselTegnForModal from '@/komponenter/modal/VarselTegnForModal';
import BEMHelper from '@/utils/bem';
import './alleredeOpprettetAvtaleModal.less';

interface Props {
    isApen: boolean;
    onLukk: () => void;
}

const AlleredeOpprettetAvtaleModal = (props: PropsWithChildren<Props>) => {
    const { isApen, onLukk, children } = props;
    const cls = BEMHelper('alleredeOpprettetAvtaleModal');

    return (
        <div className={cls.className}>
            <Modal
                open={isApen}
                className={cls.element('modal-container')}
                aria-label={'bekrefte valgt handling'}
                onClose={onLukk}
            >
                <div>
                    <div className={cls.element('topIconContainer')}>
                        <VarselTegnForModal width={'80px'} height={'80px'} />
                    </div>
                    {children}
                </div>
            </Modal>
        </div>
    );
};
export default AlleredeOpprettetAvtaleModal;
