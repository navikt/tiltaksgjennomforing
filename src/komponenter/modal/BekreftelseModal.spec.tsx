import React from 'react';
import { shallow } from 'enzyme';
import BekreftelseModal from './BekreftelseModal';

test('Test that <BekreftelseModal> renders correctly', () => {
    const wrapper = shallow(
        <BekreftelseModal
            modalIsOpen={true}
            bekreftOnClick={() => new Promise((resolve) => resolve)}
            lukkModal={() => void 0}
            varselTekst="dummy"
            oversiktTekst="dummy"
            bekreftelseTekst="dummy"
            avbrytelseTekst="dummy"
        />
    );
    expect(wrapper).toHaveLength(1);
});
