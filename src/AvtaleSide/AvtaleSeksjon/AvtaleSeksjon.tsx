import * as React from 'react';
import Stegvelger from '../Stegvelger';
import BekreftelseSteg from './BekreftelseSteg';
import MaalsetningSteg from './MaalsetningSteg';
import ArbeidstidSteg from './ArbeidstidSteg/ArbeidstidSteg';
import ArbeidsoppgaverSteg from './ArbeidsoppgaverSteg';
import OppfolgingSteg from './OppfolgingSteg';
import { AvtaleConsumer } from '../avtaleContext';

const AvtaleSeksjon = () => (
    <AvtaleConsumer>
        {({ avtale, endreAvtale }) => (
            <Stegvelger>
                <MaalsetningSteg
                    label={'Målsetninger'}
                    {...avtale}
                    endreVerdi={endreAvtale}
                />
                <ArbeidsoppgaverSteg
                    label={'Arbeidsoppgaver'}
                    {...avtale}
                    endreVerdi={endreAvtale}
                />
                <ArbeidstidSteg
                    label={'Dato og arbeidstid'}
                    {...avtale}
                    endreVerdi={endreAvtale}
                />
                <OppfolgingSteg
                    label={'Oppfølging'}
                    {...avtale}
                    endreVerdi={endreAvtale}
                />
                <BekreftelseSteg
                    label={'Bekreftelse'}
                    {...avtale}
                    endreVerdi={endreAvtale}
                />
            </Stegvelger>
        )}
    </AvtaleConsumer>
);

export default AvtaleSeksjon;
