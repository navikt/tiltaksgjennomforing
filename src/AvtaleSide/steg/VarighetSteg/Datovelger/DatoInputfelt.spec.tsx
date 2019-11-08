import React from 'react';
import { shallow } from 'enzyme';
import DatoInputfelt from './DatoInputfelt';
import moment from 'moment';

test('Test that <DatoInputfelt> renders correctly', () => {
    const stub = jest.fn();
    const wrapper = shallow(
        <DatoInputfelt
            valgtDato={moment()}
            inputErRiktigFormatert={stub}
            datoTilbakeITid={stub}
            className={'dummy'}
            velgDato={stub}
        />
    );
    expect(wrapper).toHaveLength(1);
});
