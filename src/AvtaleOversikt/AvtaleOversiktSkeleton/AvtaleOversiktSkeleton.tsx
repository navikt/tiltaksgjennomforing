import BEMHelper from '@/utils/bem';
import { Loader, Table } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import Skeleton from 'react-loading-skeleton';
import MediaQuery from 'react-responsive';
import './AvtaleOversiktSkeleton.less';
import '../../AvtaleOversikt/AvtaleTabell.less';
import AvtaleTabellRadHeader from '../AvtaleTabellRadHeader';

const cls = BEMHelper('avtaletabell');

type Props = {
    erNavAnsatt: boolean;
};

const AvtaleOversiktSkeleton: FunctionComponent<Props> = (props) => {
    return (
        <>
            <MediaQuery minWidth={881}>
                <Table className={cls.className + ' avtaleoversiktskeleton'}>
                    <AvtaleTabellRadHeader erBeslutter={false} erNavAnsatt={props.erNavAnsatt} />
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

export default AvtaleOversiktSkeleton;
