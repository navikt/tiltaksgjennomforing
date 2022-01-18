import React from 'react';
import {shallow} from 'enzyme';
import Avtaleparter from './Avtaleparter';
import {AvtaleContext, Context} from '@/AvtaleProvider';
import lonnstilskuddAvtaleMock from '@/mocking/lonnstilskudd-avtale-mock';

test('Test that <Avtaleparter> renders correctly', () => {
  const wrapper = shallow(
      <AvtaleContext.Provider value={{avtale: lonnstilskuddAvtaleMock} as Context}>
        <Avtaleparter/>
      </AvtaleContext.Provider>
  );
  expect(wrapper).toHaveLength(1);
});
