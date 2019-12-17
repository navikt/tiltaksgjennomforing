import * as chai from 'chai';
import { finnLedigeMaalkategorier } from './maal-utils';
import { Maalkategori, maalkategorier } from '@/types/maalkategorier';

const expect = chai.expect;

describe('Test av maal-utils', () => {
    it('Skal fjerne brukte målkategorier', () => {
        const brukteKategorier: Maalkategori[] = ['UTPRØVING', 'ARBEIDSERFARING'];
        const ledigeMaalkategorier = finnLedigeMaalkategorier(brukteKategorier);
        expect(ledigeMaalkategorier).to.not.include('UTPRØVING');
        expect(ledigeMaalkategorier).to.not.include('ARBEIDSERFARING');
        expect(ledigeMaalkategorier).to.have.length(maalkategorier.length - 2);
    });

    it('Skal ikke fjerne Annet-kategorien', () => {
        const ledigeMaalkategorier = finnLedigeMaalkategorier(['ANNET']);
        expect(ledigeMaalkategorier).to.include('ANNET');
    });
});
