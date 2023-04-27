import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BEMHelper from '@/utils/bem';
import classNames from 'classnames';
import { Loader } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import Skeleton from 'react-loading-skeleton';
import MediaQuery from 'react-responsive';
import './AvtaleOversiktSkeleton.less';

const cls = BEMHelper('avtaletabell');

type Props = {
    erNavAnsatt: boolean;
};

const AvtaleOversiktSkeleton: FunctionComponent<Props> = (props) => {
    return (
        <div>
            <MediaQuery minWidth={881}>
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
                <div>
                    <VerticalSpacer rem={1} />
                    <Skeleton height={68} />
                    <VerticalSpacer rem={0.5} />
                    <Skeleton height={68} />
                    <VerticalSpacer rem={0.5} />
                    <Skeleton height={68} />
                    <VerticalSpacer rem={1} />
                    <Skeleton height={68} />
                    <VerticalSpacer rem={0.5} />
                    <Skeleton height={68} />
                    <VerticalSpacer rem={0.5} />
                    <Skeleton height={68} />
                    <VerticalSpacer rem={1} />
                    <Skeleton height={68} />
                    <VerticalSpacer rem={0.5} />
                    <Skeleton height={68} />
                    <VerticalSpacer rem={1} />
                </div>
            </MediaQuery>
            <MediaQuery maxWidth={880}>
                <div className="avtaleoversiktskeleton__spinner">
                    <Loader variant="neutral" size="2xlarge" />
                </div>
            </MediaQuery>
        </div>
    );
};

export default AvtaleOversiktSkeleton;
