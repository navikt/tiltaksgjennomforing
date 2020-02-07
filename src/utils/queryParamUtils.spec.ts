import { lagQueryParams } from '@/utils/queryParamUtils';
import { Søketyper } from '@/AvtaleOversikt/Filtrering';

const innloggetBruker = { erNavAnsatt: false, identifikator: '', organisasjoner: [] };

test('Tomt array', () => {
    expect(lagQueryParams(innloggetBruker, [])).toEqual({});
});

test('Tiltakstype', () => {
    expect(
        lagQueryParams(innloggetBruker, [{ søketype: Søketyper.Tiltakstype, tiltakstype: 'ARBEIDSTRENING' }])
    ).toEqual({ tiltakstype: 'ARBEIDSTRENING' });
});

test('Flere søk', () => {
    expect(
        lagQueryParams(innloggetBruker, [
            { søketype: Søketyper.Tiltakstype, tiltakstype: 'ARBEIDSTRENING' },
            { søketype: Søketyper.BedriftSøk, bedriftNr: '9' },
        ])
    ).toEqual({ tiltakstype: 'ARBEIDSTRENING', bedriftNr: '9' });
});
