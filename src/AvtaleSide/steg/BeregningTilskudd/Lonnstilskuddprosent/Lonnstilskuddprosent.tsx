import { useAvtale } from '@/AvtaleProvider';
import { useInnloggetBruker } from '@/InnloggingBoundary/InnloggingBoundary';
import ProsentInput from '@/komponenter/form/ProsentInput';
import { Heading, Select, Table } from '@navikt/ds-react';
import React from 'react';
import { BEMWrapper } from '@/utils/bem';
import { formaterProsent } from '@/utils/formaterProsent';
import { visPeriodeForTiltak } from '@/utils/datoUtils';
import { Avtale } from '@/types';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

interface Props {
    cls: BEMWrapper;
}

const getSatsIkkeSatt = (avtale: Avtale, erNavAnsatt: boolean) => {
    switch (avtale.tiltakstype) {
        case 'MIDLERTIDIG_LONNSTILSKUDD':
            return '40 % eller 60 % settes av veileder';
        case 'SOMMERJOBB':
            return '50 % eller 75 % settes av veileder';
        default:
            return !erNavAnsatt ? 'Settes av veileder i Nav' : '–';
    }
};

const Lonnstilskuddprosent = (props: Props) => {
    const { cls } = props;
    const { avtale, settOgKalkulerBeregningsverdier } = useAvtale();
    const innloggetBruker = useInnloggetBruker();

    const erSommerjobb = avtale.tiltakstype === 'SOMMERJOBB';
    const erVarigLts = avtale.tiltakstype === 'VARIG_LONNSTILSKUDD';
    const erFirearigLts = avtale.tiltakstype === 'FIREARIG_LONNSTILSKUDD';
    const erNavAnsatt = innloggetBruker.erNavAnsatt;

    if (erNavAnsatt && erVarigLts) {
        return (
            <div className={cls.element('kvalifiseringsgruppe')}>
                <div className={cls.element('tilskuddsprosent')}>
                    <Heading level="2" size="small" className={cls.element('tilskuddsprosent-heading')}>
                        Tilskuddsprosent
                    </Heading>
                    <ProsentInput
                        name="lonnstilskuddProsent"
                        width="S"
                        label="Tilskuddsprosent"
                        hideLabel
                        value={avtale.gjeldendeInnhold.lonnstilskuddProsent}
                        onChange={(event) => {
                            settOgKalkulerBeregningsverdier({
                                lonnstilskuddProsent: parseInt(event.target.value, 10),
                            });
                        }}
                        min={0}
                        max={75}
                    />
                </div>
            </div>
        );
    }

    if (erNavAnsatt && erSommerjobb) {
        return (
            <>
                <Select
                    label="Tilskuddsprosent"
                    value={avtale.gjeldendeInnhold.lonnstilskuddProsent}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                        settOgKalkulerBeregningsverdier({
                            lonnstilskuddProsent: parseInt(event.target.value, 10),
                        });
                    }}
                >
                    <option value="">- Velg tilskuddsprosent -</option>
                    <option value="50">50&nbsp;%</option>
                    <option value="75">75&nbsp;%</option>
                </Select>
                <VerticalSpacer rem={2} />
            </>
        );
    }

    if (avtale.gjeldendeInnhold.tilskuddstrinn.length) {
        return (
            <Table className={cls.element('tilskuddsprosent')}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Periode</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Varighet</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Tilskuddsprosent</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {avtale.gjeldendeInnhold.tilskuddstrinn.map((trinn, i) => {
                        return (
                            <Table.Row key={`${trinn.start}-${trinn.slutt}-${i}`}>
                                <Table.DataCell>
                                    {i + 1}
                                    {erFirearigLts ? '. år' : '. periode'}
                                </Table.DataCell>
                                <Table.DataCell>{visPeriodeForTiltak(trinn.start, trinn.slutt)}</Table.DataCell>
                                <Table.DataCell>
                                    {trinn.prosent
                                        ? formaterProsent(trinn.prosent)
                                        : getSatsIkkeSatt(avtale, erNavAnsatt)}
                                </Table.DataCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        );
    }

    return (
        <Table className={cls.element('tilskuddsprosent')}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Varighet</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Tilskuddsprosent</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.DataCell>
                        {visPeriodeForTiltak(avtale.gjeldendeInnhold.startDato, avtale.gjeldendeInnhold.sluttDato)}
                    </Table.DataCell>
                    <Table.DataCell>{getSatsIkkeSatt(avtale, erNavAnsatt)}</Table.DataCell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
};
export default Lonnstilskuddprosent;
