import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BEMHelper from '@/utils/bem';
import { Loader } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import Skeleton from 'react-loading-skeleton';
import MediaQuery from 'react-responsive';
import './BeslutterOversiktSkeleton.less';
import 'react-loading-skeleton/dist/skeleton.css'
import AvtaleTabellRadHeader from '@/AvtaleOversikt/AvtaleTabellRadHeader';

const cls = BEMHelper('avtaletabell');

type Props = {
    erNavAnsatt: boolean;
};

const BeslutterOversiktSkeleton: FunctionComponent<Props> = (props) => {
    return (
        <div>
            <MediaQuery minWidth={881}>
                <AvtaleTabellRadHeader
                    className={cls.className}
                    erBeslutter={true}
                    erNavAnsatt={props.erNavAnsatt}
                />
                <div>
                    <VerticalSpacer rem={1} />
                    <Skeleton height={68} />
                    <VerticalSpacer rem={0.5} />
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

export default BeslutterOversiktSkeleton;
