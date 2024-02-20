import { expect, test } from 'vitest';
import { erUnder18 } from '@/utils/fnrUtils';

test('skal slå false fordi person er over 18 år', () => {
    const bursdagDato: string = '01128802211';
    expect(erUnder18(bursdagDato)).toBe(false);
});

test('skal slå true fordi person er under 18 år', () => {
    const bursdagDato: string = '07062376680';
    expect(erUnder18(bursdagDato)).toBe(true);
});
