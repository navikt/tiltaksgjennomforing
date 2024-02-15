import React from 'react';
import { AlleredeRegistrertAvtale } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import './alleredeOpprettetAvtale.less';
import { BodyShort } from '@navikt/ds-react';
import { visPeriodeForTiltak } from '@/utils/datoUtils';
import { tiltakstypeTekst } from '@/messages';
import sortBy from 'lodash.sortby';
import RadInfo from '@/komponenter/alleredeOpprettetTiltak/innholdsvisning/RadInfo';
import AlleredeOpprettetAvtaleDetaljer from '@/komponenter/alleredeOpprettetTiltak/innholdsvisning/AlleredeOpprettetAvtaleDetaljer';

interface Props {
    alleredeRegistrertAvtale: AlleredeRegistrertAvtale[] | [];
}

const AlleredeOpprettetAvtale: React.FC<Props> = ({ alleredeRegistrertAvtale }) => {
    const cls = BEMHelper('alleredeOpprettetAvtale');

    return (
        <div className={cls.className}>
            <div className={cls.element('info')}>
                {sortBy(alleredeRegistrertAvtale, ['startDato', 'status']).map(
                    (avtale: AlleredeRegistrertAvtale, index: number) => {
                        return (
                            <div key={index} className={cls.element('avtale')}>
                                <div className={cls.element('periode-wrapper')}>
                                    <RadInfo
                                        label={'PERIODE:'}
                                        info={visPeriodeForTiltak(avtale.startDato, avtale.sluttDato)}
                                        infoNotBold={true}
                                    />
                                </div>
                                <RadInfo label={'avtale nummer:'} info={avtale.avtaleNr} />
                                <BodyShort size="small">Tiltakstype: {tiltakstypeTekst[avtale.tiltakstype]}</BodyShort>
                                <AlleredeOpprettetAvtaleDetaljer innhold={avtale} />
                            </div>
                        );
                    },
                )}
            </div>
        </div>
    );
};
export default AlleredeOpprettetAvtale;
