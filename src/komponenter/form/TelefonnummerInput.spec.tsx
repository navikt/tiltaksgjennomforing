import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import TelefonnummerInput from './TelefonnummerInput';

const renderInput = (settVerdi: (verdi?: string) => void) => {
    const { container } = render(<TelefonnummerInput label="Mobilnummer" name="deltakerTlf" settVerdi={settVerdi} />);
    return container.querySelector('input') as HTMLInputElement;
};

describe('TelefonnummerInput', () => {
    it('lagrer gyldig norsk nummer og fjerner +47-prefiks', () => {
        const settVerdi = vi.fn();
        const input = renderInput(settVerdi);
        fireEvent.change(input, { target: { value: '+4741234567' } });
        expect(settVerdi).toHaveBeenLastCalledWith('41234567');
    });

    it('lagrer gyldig norsk nummer uten landkode', () => {
        const settVerdi = vi.fn();
        const input = renderInput(settVerdi);
        fireEvent.change(input, { target: { value: '41234567' } });
        expect(settVerdi).toHaveBeenLastCalledWith('41234567');
    });

    it('lagrer gyldig norsk nummer med 0047-prefiks og fjerner prefikset', () => {
        const settVerdi = vi.fn();
        const input = renderInput(settVerdi);
        fireEvent.change(input, { target: { value: '004741234567' } });
        expect(settVerdi).toHaveBeenLastCalledWith('41234567');
    });

    it('lagrer utenlandske nummer', () => {
        const settVerdi = vi.fn();
        const input = renderInput(settVerdi);
        fireEvent.change(input, { target: { value: '+34636263227' } });
        expect(settVerdi).toHaveBeenLastCalledWith('+34636263227');
    });

    it('lagrer utenlandsk nummer med 00-prefiks', () => {
        const settVerdi = vi.fn();
        const input = renderInput(settVerdi);
        fireEvent.change(input, { target: { value: '004915123456789' } });
        expect(settVerdi).toHaveBeenLastCalledWith('004915123456789');
    });

    it('gir undefined for ugyldig nummer', () => {
        const settVerdi = vi.fn();
        const input = renderInput(settVerdi);
        fireEvent.change(input, { target: { value: '1234' } });
        expect(settVerdi).toHaveBeenLastCalledWith(undefined);
    });

    it('gir undefined for utenlandsk nummer uten landkodeprefiks', () => {
        const settVerdi = vi.fn();
        const input = renderInput(settVerdi);
        fireEvent.change(input, { target: { value: '34636263227' } });
        expect(settVerdi).toHaveBeenLastCalledWith(undefined);
    });

    it('gir undefined når feltet tømmes slik at påkrevd-validering virker', () => {
        const settVerdi = vi.fn();
        const input = renderInput(settVerdi);
        fireEvent.change(input, { target: { value: '41234567' } });
        fireEvent.change(input, { target: { value: '' } });
        expect(settVerdi).toHaveBeenLastCalledWith(undefined);
    });
});
