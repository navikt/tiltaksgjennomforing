import { FunctionComponent, useContext } from 'react';
import { BodyShort, Heading } from '@navikt/ds-react';
import { TilskuddPeriodeStatus } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { AvtaleContext } from '@/AvtaleProvider';
import { formaterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';

const TilskuddsperiodeBehandlingsTittel: FunctionComponent = () => {
    const cls = BEMHelper('beslutter-panel');
    const { avtale } = useContext(AvtaleContext);

    if (!avtale.gjeldendeTilskuddsperiode) return null;

    const tittel: { [key in TilskuddPeriodeStatus]: string } = {
        AVSLÅTT: 'Tilskuddsperiode er returnert',
        GODKJENT: 'Tilskuddsperiode er godkjent',
        UBEHANDLET: 'Tilskuddsperiode som skal godkjennes',
        ANNULLERT: 'Tilskuddsperiode er annullert',
        BEHANDLET_I_ARENA: 'Tilskuddsperiode er behandlet i Arena',
        OPPFØLGING_KREVES: 'Tilskuddsperiode krever oppfølging',
    };

    return (
        <div className={cls.element('tittel')}>
            <Heading level="2" size="small">
                {tittel[avtale.gjeldendeTilskuddsperiode.status]}
            </Heading>
            <BodyShort size="small">{formaterDato(avtale.opprettetTidspunkt, NORSK_DATO_FORMAT)}</BodyShort>
        </div>
    );
};
export default TilskuddsperiodeBehandlingsTittel;
