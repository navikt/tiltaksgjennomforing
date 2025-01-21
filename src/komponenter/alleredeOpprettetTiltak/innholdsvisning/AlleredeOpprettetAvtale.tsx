import React from 'react';
import { AlleredeRegistrertAvtale } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import './alleredeOpprettetAvtale.less';
import { BodyShort } from '@navikt/ds-react';
import { visPeriodeForTiltak } from '@/utils/datoUtils';
import { tiltakstypeTekst } from '@/messages';
import RadInfo from '@/komponenter/alleredeOpprettetTiltak/innholdsvisning/RadInfo';
import AlleredeOpprettetAvtaleDetaljer from '@/komponenter/alleredeOpprettetTiltak/innholdsvisning/AlleredeOpprettetAvtaleDetaljer';
import { sortBy } from '@/utils/utils';

interface Props {
    alleredeRegistrertAvtale: AlleredeRegistrertAvtale[] | [];
}

const AlleredeOpprettetAvtale: React.FC<Props> = ({ alleredeRegistrertAvtale }) => {
    const cls = BEMHelper('alleredeOpprettetAvtale');

    return (
        <div className={cls.className}>
            {sortBy(alleredeRegistrertAvtale, ['startDato', 'status']).map((avtale: AlleredeRegistrertAvtale) => {
                return (
                    <div key={avtale.id} className={cls.element('avtale')}>
                        <RadInfo
                            label={'Periode:'}
                            info={visPeriodeForTiltak(avtale.startDato, avtale.sluttDato)}
                            infoNotBold={true}
                        />

                        <RadInfo label={'Avtalenummer:'} info={avtale.avtaleNr} />
                        <BodyShort size="small">Tiltakstype: {tiltakstypeTekst[avtale.tiltakstype]}</BodyShort>
                        <AlleredeOpprettetAvtaleDetaljer cls={cls} innhold={avtale} />
                    </div>
                );
            })}
        </div>
    );
};
export default AlleredeOpprettetAvtale;
