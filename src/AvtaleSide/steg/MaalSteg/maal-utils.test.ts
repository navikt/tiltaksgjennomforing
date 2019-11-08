import * as chai from 'chai';
import { finnLedigeMaalkategorier } from './maal-utils';
import { Maalkategori, maalkategorier } from '@/types/maalkategorier';

const expect = chai.expect;

describe('Test av maal-utils', () => {
    it('Skal fjerne brukte målkategorier', () => {
        const brukteKategorier: Maalkategori[] = ['Utprøving', 'Arbeidserfaring'];
        const ledigeMaalkategorier = finnLedigeMaalkategorier(brukteKategorier);
        expect(ledigeMaalkategorier).to.not.include('Utprøving');
        expect(ledigeMaalkategorier).to.not.include('Arbeidserfaring');
        expect(ledigeMaalkategorier).to.have.length(maalkategorier.length - 2);
    });

    it('Skal ikke fjerne Annet-kategorien', () => {
        const ledigeMaalkategorier = finnLedigeMaalkategorier(['Annet']);
        expect(ledigeMaalkategorier).to.include('Annet');
    });
});
