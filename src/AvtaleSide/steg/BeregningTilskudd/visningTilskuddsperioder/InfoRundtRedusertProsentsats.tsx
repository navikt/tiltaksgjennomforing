import React, { useContext } from 'react';
import { BodyShort, Label } from '@navikt/ds-react';
import { formaterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { AvtaleContext } from '@/AvtaleProvider';
import BEMHelper from '@/utils/bem';

interface Props {
    className: string;
}

const InfoRundtRedusertProsentsats: React.FC<Props> = ({ className }: Props) => {
    const { avtale } = useContext(AvtaleContext);

    if (!avtale.gjeldendeInnhold.datoForRedusertProsent) return null;
    const cls = BEMHelper(className);

    return (
        <div className={cls.element('info-redusert-prosentsats')}>
            <Label>Reduksjon av tilskuddsprosent</Label>
            {avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' && (
                <BodyShort size="small">
                    Tilskuddsprosenten reduseres med 10% etter{' '}
                    {avtale.gjeldendeInnhold.lonnstilskuddProsent === 60 ? '1 år' : '6 måneder'}. Datoen for ny redusert
                    sats er <b>{formaterDato(avtale.gjeldendeInnhold.datoForRedusertProsent, NORSK_DATO_FORMAT)}</b>.
                </BodyShort>
            )}

            {avtale.tiltakstype === 'VARIG_LONNSTILSKUDD' && (
                <BodyShort size="small">
                    Tilskuddsprosenten reduseres til 67% etter 1 år om tilskuddsprosenten er eller over 68%. Datoen for
                    ny redusert sats er{' '}
                    <b>{formaterDato(avtale.gjeldendeInnhold.datoForRedusertProsent, NORSK_DATO_FORMAT)}</b>.
                </BodyShort>
            )}
        </div>
    );
};
export default InfoRundtRedusertProsentsats;
