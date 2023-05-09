import React from 'react';
import classNames from 'classnames';
import MediaQuery from 'react-responsive';
import BEMHelper from '@/utils/bem';

interface Props {
    className: string;
    erBeslutter: boolean;
    erNavAnsatt: boolean;
}

const AvtaleTabellRadHeader: React.FC<Props> = ({ className, erBeslutter, erNavAnsatt }: Props) => {
    const cls = BEMHelper(className);
    return erBeslutter ? (
        <div className={classNames(cls.element('rad'), cls.element('header'))}>
            <div className={cls.element('beslutter-deltakerOgBedrift')}>Bedrift</div>
            <div className={cls.element('beslutter-deltakerOgBedrift')}>Deltaker</div>
            <div className={cls.element('beslutter-veileder')}>Veileder</div>
            <MediaQuery minWidth={576}>
                <div className={cls.element('beslutter-dato')}>
                    <div className={cls.element('beslutter-besluterdato')}>
                        <div>Startdato</div>
                        <div>periode</div>
                    </div>
                </div>
            </MediaQuery>
            <div className={cls.element('beslutter-headerstatus')}>Status</div>
        </div>
    ) : (
        <div className={classNames(cls.element('rad'), cls.element('header'))}>
            <div className={cls.element('veileder-deltakerOgBedrift')}>Bedrift</div>
            <div className={cls.element('veileder-deltakerOgBedrift')}>Deltaker</div>
            {erNavAnsatt && <div className={cls.element('veileder-veileder')}>Veileder</div>}
            <MediaQuery minWidth={576}>
                <div className={cls.element('veileder-dato')}>Startdato</div>
                <div className={cls.element('veileder-dato')}>Sluttdato</div>
            </MediaQuery>
            <div className={cls.element('veileder-statusikon')}>&nbsp;</div>
            <div className={cls.element('veileder-status')}>Status</div>
        </div>
    );
};
export default AvtaleTabellRadHeader;
