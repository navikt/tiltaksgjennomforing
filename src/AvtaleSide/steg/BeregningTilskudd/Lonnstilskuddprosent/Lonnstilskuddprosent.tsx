import { useAvtale } from '@/AvtaleProvider';
import { useInnloggetBruker } from '@/InnloggingBoundary/InnloggingBoundary';
import ProsentInput from '@/komponenter/form/ProsentInput';
import { Heading, Select } from '@navikt/ds-react';
import React from 'react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import TilskuddstrinnTabell from '@/AvtaleSide/steg/BeregningTilskudd/Lonnstilskuddprosent/TilskuddstrinnTabell';

const parseIntOrUndefined = (value: string | undefined): number | undefined => {
    return value ? parseInt(value, 10) : undefined;
};

const Lonnstilskuddprosent = () => {
    const { avtale, settOgKalkulerBeregningsverdier } = useAvtale();
    const innloggetBruker = useInnloggetBruker();

    const erSommerjobb = avtale.tiltakstype === 'SOMMERJOBB';
    const erVarigLts = avtale.tiltakstype === 'VARIG_LONNSTILSKUDD';
    const erNavAnsatt = innloggetBruker.erNavAnsatt;

    if (erNavAnsatt && erVarigLts) {
        return (
            <div>
                <Heading level="3" size="small">
                    Tilskuddsprosent
                </Heading>
                <VerticalSpacer rem={0.5} />
                <ProsentInput
                    name="lonnstilskuddProsent"
                    width="S"
                    label="Tilskuddsprosent"
                    hideLabel
                    value={avtale.gjeldendeInnhold.lonnstilskuddProsent}
                    onChange={(event) => {
                        settOgKalkulerBeregningsverdier({
                            lonnstilskuddProsent: parseIntOrUndefined(event.target.value),
                        });
                    }}
                    min={0}
                    max={75}
                />
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
                            lonnstilskuddProsent: parseIntOrUndefined(event.target.value),
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

    return <TilskuddstrinnTabell />;
};
export default Lonnstilskuddprosent;
