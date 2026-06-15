import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import StillingsOppsummering from './StillingsOppsummeringLonnstilskudd';

test('Skal rendre stillingstype og arbeidsoppgaver', async () => {
    render(<StillingsOppsummering tiltakstype="VARIG_LONNSTILSKUDD" versjonInnhold="OPPRINNELIG" />);
    expect(await screen.findAllByText('Ikke fylt ut')).toHaveLength(3);
});
