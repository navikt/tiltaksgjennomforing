import { describe, expect, test } from 'vitest'

import { maalkategorier } from '@/types/maalkategorier';
import { Maal } from '@/types/avtale';

import { finnLedigeMaalkategorier } from './maal-utils';

describe('Test av maal-utils', () => {
    test('Skal fjerne brukte målkategorier', () => {
        const brukteKategorier: Maal[] = [
            {
                beskrivelse: '',
                id: 'UTPRØVING',
                kategori: 'UTPRØVING',
            },
            {
                beskrivelse: '',
                id: 'ARBEIDSERFARING',
                kategori: 'ARBEIDSERFARING',
            },
        ];
        const ledigeMaalkategorier = finnLedigeMaalkategorier(brukteKategorier);
        expect(ledigeMaalkategorier).to.not.include('UTPRØVING');
        expect(ledigeMaalkategorier).to.not.include('ARBEIDSERFARING');
        expect(ledigeMaalkategorier).to.have.length(maalkategorier.length - 2);
    });

    test('Skal ikke fjerne Annet-kategorien', () => {
        const ledigeMaalkategorier = finnLedigeMaalkategorier([
            {
                beskrivelse: '',
                id: 'ANNET',
                kategori: 'ANNET',
            },
        ]);
        expect(ledigeMaalkategorier).to.include('ANNET');
    });
});
