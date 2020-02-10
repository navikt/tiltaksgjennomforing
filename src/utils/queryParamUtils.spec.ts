import { lagQueryParams } from '@/utils/queryParamUtils';
import { Søkefelt } from '@/AvtaleOversikt/Filtrering';

const innloggetBruker = { erNavAnsatt: false, identifikator: '', organisasjoner: [] };

test('Tomt array', () => {
    expect(lagQueryParams(innloggetBruker, [])).toEqual({});
});

test('Tiltakstype', () => {
    expect(
        lagQueryParams(innloggetBruker, [{ søketype: Søkefelt.Tiltakstype, tiltakstype: 'ARBEIDSTRENING' }])
    ).toEqual({ tiltakstype: 'ARBEIDSTRENING' });
});

test('Flere søk', () => {
    expect(
        lagQueryParams(innloggetBruker, [
            { søketype: Søkefelt.Tiltakstype, tiltakstype: 'ARBEIDSTRENING' },
            { søketype: Søkefelt.BedriftSøk, bedriftNr: '9' },
        ])
    ).toEqual({ tiltakstype: 'ARBEIDSTRENING', bedriftNr: '9' });
});
