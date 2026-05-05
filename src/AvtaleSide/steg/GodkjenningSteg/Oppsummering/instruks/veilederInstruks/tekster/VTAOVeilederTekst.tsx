import { List } from '@navikt/ds-react';

const VTAOVeilederTekst = () => (
    <List size="small">
        <List.Item>
            Etter at du har godkjent avtalen, må avtalen og de første tilskuddsperiodene godkjennes av beslutter. Det er
            først da avtalen er endelig godkjent.
        </List.Item>
        <List.Item>
            Arena skal ikke benyttes til registrering av avtale, tilsagn eller refusjon for tiltaket varig tilrettelagt
            arbeid i ordinær virksomhet.
        </List.Item>
        <List.Item>
            Arbeidsgiver vil automatisk få utbetalt tilskuddet hver måned på konto uten å måtte godkjenne.
        </List.Item>
        <List.Item>
            Hver 6. mnd vil du få en automatisk varsling i løsning om at det må foretas en oppfølging av tiltaket. Du må
            bekrefte at tiltaket skal fortsette for at arbeidsgiver skal få utbetalt refusjon.
        </List.Item>
        <List.Item>
            Det går automatisk melding til NAV Arbeid og ytelser med beskjed om at bruker har fått innvilget
            tiltaksplass.
        </List.Item>
        <List.Item>Avtalen blir automatisk journalført i Gosys.</List.Item>
    </List>
);

export default VTAOVeilederTekst;
