import BEMHelper from '@/utils/bem';
import classNames from 'classnames';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React, { FunctionComponent } from 'react';
import Skeleton from 'react-loading-skeleton';
import MediaQuery from 'react-responsive';
import './AvtaleOversiktSkeleton.less';

const cls = BEMHelper('avtaleoversiktskeleton');

type Props = {
    erNavAnsatt: boolean;
};

const AvtaleOversiktSkeleton: FunctionComponent<Props> = props => {
    return (
        <div className={cls.element('spinnerlol')}>
            <MediaQuery minWidth={940}>
                <div className={classNames(cls.element('header'), cls.element('rad'))}>
                    <div className={cls.element('deltakerOgBedrift')}>Bedrift</div>
                    <div className={cls.element('deltakerOgBedrift')}>Deltaker</div>
                    {props.erNavAnsatt && <div className={cls.element('veileder')}>Veileder</div>}
                    <MediaQuery minWidth={576}>
                        <div className={cls.element('opprettet')}>Opprettet</div>
                    </MediaQuery>
                    <div className={cls.element('status')}>Status</div>
                    <div className={cls.element('statusikon')}>&nbsp;</div>
                </div>
                <div className={cls.element('skeletonrader')}>
                    <Skeleton width={816} height={68} />
                    <Skeleton width={816} height={68} />
                    <Skeleton width={816} height={68} />
                </div>
            </MediaQuery>
            <MediaQuery maxWidth={939}>
                <div className={cls.element('spinner')}>
                    <NavFrontendSpinner type={'XXL'} />
                </div>
            </MediaQuery>
        </div>
    );
};

export default AvtaleOversiktSkeleton;
