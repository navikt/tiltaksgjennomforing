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
    return (
        <div className={classNames(cls.element('rad'), cls.element('header'))}>
            <div className={cls.element('deltakerOgBedrift')}>Bedrift</div>
            <div className={cls.element('deltakerOgBedrift')}>Deltaker</div>
            {erNavAnsatt && <div className={cls.element('veileder')}>Veileder</div>}
            <MediaQuery minWidth={576}>
                <div className={cls.element('dato')}>
                    {erBeslutter ? (
                        <div className={cls.element('besluterdato')}>
                            <div>Startdato</div>
                            <div>periode</div>
                        </div>
                    ) : (
                        'Startdato'
                    )}
                </div>
                {!erBeslutter && <div className={cls.element('dato')}>Sluttdato</div>}
            </MediaQuery>
            <div className={cls.element('statusikon')}>&nbsp;</div>
            {erBeslutter ? (
                <div className={cls.element('headerstatus')}>Status</div>
            ) : (
                <div className={cls.element('status')}>Status</div>
            )}
        </div>
    );
};
export default AvtaleTabellRadHeader;
