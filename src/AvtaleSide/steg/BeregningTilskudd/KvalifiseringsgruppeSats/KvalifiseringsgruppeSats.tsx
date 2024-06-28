import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import ProsentInput from '@/komponenter/form/ProsentInput';
import { BodyShort, Heading } from '@navikt/ds-react';
import React, { FunctionComponent, useContext } from 'react';
import { BEMWrapper } from '@/utils/bem';

interface Props {
    cls: BEMWrapper;
}

const KvalifiseringsgruppeSats: FunctionComponent<Props> = ({ cls }: Props) => {
    const { avtale, settOgKalkulerBeregningsverdier } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const settTekstTilLonntilskuddProsent = () => {
        switch (avtale.tiltakstype) {
            case 'VARIG_LONNSTILSKUDD':
                return <>Her kan NAV sette en sats.</>;
            case 'MIDLERTIDIG_LONNSTILSKUDD':
                return <>Her kan NAV sette en sats på 40% eller 60%</>;
            case 'SOMMERJOBB':
                return <>Her kan NAV sette en sats på 50% eller 75%</>;
            default:
                return null;
        }
    };

    const settLonnstilskuddsprosent = () => {
        return avtale.gjeldendeInnhold.lonnstilskuddProsent
            ? (avtale.gjeldendeInnhold.lonnstilskuddProsent ?? '0').toString() + ' %'
            : settTekstTilLonntilskuddProsent();
    };

    return innloggetBruker.erNavAnsatt ? (
        <div className={cls.element('kvalifiseringsgruppe')}>
            {avtale.tiltakstype === 'VARIG_LONNSTILSKUDD' ? (
                <div className={cls.element('tilskuddsprosent')}>
                    <Heading level="2" size="small" className={cls.element('tilskuddsprosent-heading')}>
                        Tilskuddsprosent
                    </Heading>
                    <ProsentInput
                        name="lonnstilskuddProsent"
                        width="S"
                        label=""
                        value={avtale.gjeldendeInnhold.lonnstilskuddProsent}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            settOgKalkulerBeregningsverdier({
                                lonnstilskuddProsent: parseInt(event.target.value, 10),
                            });
                        }}
                        min={0}
                        max={75}
                    />
                </div>
            ) : (
                <div className={cls.element('tilskuddsprosent')}>
                    <Heading level="2" size="small">
                        Tilskuddsprosent
                    </Heading>
                    <BodyShort size="small">{settLonnstilskuddsprosent()}</BodyShort>
                </div>
            )}
        </div>
    ) : (
        <div className={cls.element('tilskuddsprosent')}>
            <Heading level="2" size="small">
                Tilskuddsprosent
            </Heading>
            <BodyShort size="small">{settLonnstilskuddsprosent()}</BodyShort>
        </div>
    );
};
export default KvalifiseringsgruppeSats;
