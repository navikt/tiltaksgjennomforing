import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react';

import { AvtaleContext, Context } from '@/AvtaleProvider';
import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';

import StillingSteg from './StillingSteg';

test('<StillingSteg> renders correctly', async () => {
    render(
        <AvtaleContext.Provider value={{ avtale: arbeidstreningAvtaleMock } as Context}>
            <StillingSteg />
        </AvtaleContext.Provider>
    );
    expect(await screen.findByText('Fylles ut av NAV og arbeidsgiveren')).toBeDefined();
});
