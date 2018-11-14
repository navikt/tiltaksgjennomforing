import * as React from 'react';
import './KontaktinfoSteg.less';
import DeltakerinfoDel from './DeltakerinfoDel/DeltakerinfoDel';
import ArbeidsgiverinfoDel from './ArbeidsgiverinfoDel/ArbeidsgiverinfoDel';
import VeilederinfoDel from './VeilederinfoDel/VeilederinfoDel';
import { AvtaleConsumer } from '../avtaleContext';

const KontaktinfoSteg = () => (
    <AvtaleConsumer>
        {({ avtale, endreAvtale }) => {
            console.log(avtale); // tslint:disable-line no-console
            return (
                <div className="kontaktinformasjon">
                    <DeltakerinfoDel {...avtale} endreVerdi={endreAvtale} />
                    <ArbeidsgiverinfoDel {...avtale} endreVerdi={endreAvtale} />
                    <VeilederinfoDel {...avtale} endreVerdi={endreAvtale} />
                </div>
            );
        }}
    </AvtaleConsumer>
);

export default KontaktinfoSteg;
