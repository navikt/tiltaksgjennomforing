import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react';

import StillingsOppsummering from './StillingsOppsummering';

test('Skal rendre stillingstype og arbeidsoppgaver', async () => {
    render(<StillingsOppsummering />);
    expect(await screen.findAllByText('Ikke fylt ut')).toHaveLength(2);
});
