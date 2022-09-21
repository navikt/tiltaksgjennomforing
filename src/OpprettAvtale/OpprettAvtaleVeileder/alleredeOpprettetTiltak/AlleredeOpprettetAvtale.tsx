import React from 'react';
import { AlleredeRegistrertAvtale } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import './alleredeOpprettetAvtale.less';
import { Normaltekst } from 'nav-frontend-typografi';
import { visPeriodeForTiltak } from '@/utils/datoUtils';
import AlleredeOpprettetAvtaleDetaljer from '@/OpprettAvtale/OpprettAvtaleVeileder/alleredeOpprettetTiltak/AlleredeOpprettetAvtaleDetaljer';
import { tiltakstypeTekst } from '@/messages';
import RadInfo from '@/OpprettAvtale/OpprettAvtaleVeileder/alleredeOpprettetTiltak/RadInfo';
import _ from 'lodash';

interface Props {
    alleredeRegistrertAvtale: AlleredeRegistrertAvtale[] | [];
}

const AlleredeOpprettetAvtale: React.FC<Props> = ({ alleredeRegistrertAvtale }) => {
    const cls = BEMHelper('alleredeOpprettetAvtale');

    return (
        <div className={cls.className}>
            <div className={cls.element('info')}>
                {_.sortBy(alleredeRegistrertAvtale, ['startDato', 'status']).map(
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
                                <Normaltekst>Tiltakstype: {tiltakstypeTekst[avtale.tiltakstype]}</Normaltekst>
                                <AlleredeOpprettetAvtaleDetaljer innhold={avtale} />
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
};
export default AlleredeOpprettetAvtale;
