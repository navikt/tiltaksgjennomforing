import React from 'react';
import classNames from 'classnames';
import MediaQuery from 'react-responsive';
import BEMHelper from '@/utils/bem';
import { Table } from '@navikt/ds-react';

interface Props {
    className: string;
    erBeslutter: boolean;
    erNavAnsatt: boolean;
}

const AvtaleTabellRadHeader: React.FC<Props> = ({ className, erBeslutter, erNavAnsatt }: Props) => {
    const cls = BEMHelper(className);
    return erBeslutter ? (
        <Table.Header className={classNames(cls.element('rad'), cls.element('header'))}>
            <Table.Row>
                <Table.ColumnHeader className={cls.element('tiltakstype')}>Tiltakstype</Table.ColumnHeader>
                <Table.ColumnHeader className={cls.element('beslutter-deltakerOgBedrift')}>Bedrift</Table.ColumnHeader>
                <Table.ColumnHeader className={cls.element('beslutter-deltakerOgBedrift')}>Deltaker</Table.ColumnHeader>
                <Table.ColumnHeader className={cls.element('beslutter-veileder')}>Veileder</Table.ColumnHeader>
                <Table.ColumnHeader className={cls.element('beslutter-dato')}>Startdato <br/> periode</Table.ColumnHeader>
                <Table.ColumnHeader className={cls.element('beslutter-headerstatus')}>Status</Table.ColumnHeader>
                <Table.ColumnHeader className={cls.element('beslutter-headerpil')}></Table.ColumnHeader>
            </Table.Row>
        </Table.Header>
    ) : (
        <Table.Header className={classNames(cls.element('rad'), cls.element('header'))}>
            <Table.Row>
                <Table.ColumnHeader className={cls.element('veileder-deltakerOgBedrift')}>Bedrift</Table.ColumnHeader>
                <Table.ColumnHeader className={cls.element('veileder-deltakerOgBedrift')}>Deltaker</Table.ColumnHeader>
                {erNavAnsatt && (
                    <Table.ColumnHeader className={cls.element('veileder-veileder')}>Veileder</Table.ColumnHeader>
                )}
                <Table.ColumnHeader
                    className={cls.element('veileder-dato', erNavAnsatt ? '' : 'arbeidsgiver-deltaker')}
                >
                    Startdato
                </Table.ColumnHeader>
                <Table.ColumnHeader
                    className={cls.element('veileder-dato', erNavAnsatt ? '' : 'arbeidsgiver-deltaker')}
                >
                    Sluttdato
                </Table.ColumnHeader>
                <Table.ColumnHeader className={cls.element('veileder-statusikon')}>&nbsp;</Table.ColumnHeader>
                    <Table.ColumnHeader className={cls.element('veileder-status')}>Status</Table.ColumnHeader>
                    <Table.ColumnHeader className={cls.element('beslutter-headerpil')}></Table.ColumnHeader>
            </Table.Row>
        </Table.Header>
    );
};
export default AvtaleTabellRadHeader;
