import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import TelefonnummerInput from './TelefonnummerInput';

const renderInput = (settVerdi: (verdi?: string) => void) => {
    const { container } = render(<TelefonnummerInput label="Mobilnummer" name="deltakerTlf" settVerdi={settVerdi} />);
    return container.querySelector('input') as HTMLInputElement;
};

describe('TelefonnummerInput', () => {
    it('lagrer gyldig norsk nummer uten landkode', () => {
        const settVerdi = vi.fn();
        const input = renderInput(settVerdi);
        fireEvent.change(input, { target: { value: '+4741234567' } });
        expect(settVerdi).toHaveBeenLastCalledWith('41234567');
    });

    it('lagrer utenlandske nummer', () => {
        const settVerdi = vi.fn();
        const input = renderInput(settVerdi);
        fireEvent.change(input, { target: { value: '+34636263227' } });
        expect(settVerdi).toHaveBeenLastCalledWith('+34636263227');
    });

    it('gir undefined når feltet tømmes slik at påkrevd-validering virker', () => {
        const settVerdi = vi.fn();
        const input = renderInput(settVerdi);
        fireEvent.change(input, { target: { value: '41234567' } });
        fireEvent.change(input, { target: { value: '' } });
        expect(settVerdi).toHaveBeenLastCalledWith(undefined);
    });
});
