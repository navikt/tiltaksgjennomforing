import BEMHelper from '@/utils/bem';
import { Loader, Table } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import Skeleton from 'react-loading-skeleton';
import MediaQuery from 'react-responsive';
import './BeslutterOversiktSkeleton.less';
import '../../AvtaleOversikt/AvtaleTabell.less';
import 'react-loading-skeleton/dist/skeleton.css';
import AvtaleTabellRadHeader from '@/AvtaleOversikt/AvtaleTabellRadHeader';

const cls = BEMHelper('avtaletabell');

type Props = {
    erNavAnsatt: boolean;
};

const BeslutterOversiktSkeleton: FunctionComponent<Props> = (props) => {
    return (
        <>
            <MediaQuery minWidth={881}>
                <Table className={cls.className + ' avtaleoversiktskeleton'}>
                    <AvtaleTabellRadHeader
                        className={cls.className}
                        erBeslutter={true}
                        erNavAnsatt={props.erNavAnsatt}
                    />
                    <Table.Body>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
                            <Table.Row key={idx}>
                                <Table.DataCell colSpan={100}>
                                    <Skeleton height={68} />
                                </Table.DataCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </MediaQuery>
            <MediaQuery maxWidth={880}>
                <div className="avtaleoversiktskeleton__spinner">
                    <Loader variant="neutral" size="2xlarge" />
                </div>
            </MediaQuery>
        </>
    );
};

export default BeslutterOversiktSkeleton;
