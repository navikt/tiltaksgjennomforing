import React from 'react';
import { shallow } from 'enzyme';
import BekreftelseModal from './BekreftelseModal';

test('Test that <BekreftelseModal> renders correctly', () => {
    const testFunc = async () => {
        console.log('resolve');
    };
    const wrapper = shallow(
        <BekreftelseModal
            modalInnhold="dummy"
            oversiktTekst="dummy"
            bekreftelseTekst="dummy"
            avbrytelseTekst="dummy"
            bekreftOnClick={testFunc}
            lukkModal={() => void 0}
            modalIsOpen={false}
        />
    );
    expect(wrapper).toHaveLength(1);
});
