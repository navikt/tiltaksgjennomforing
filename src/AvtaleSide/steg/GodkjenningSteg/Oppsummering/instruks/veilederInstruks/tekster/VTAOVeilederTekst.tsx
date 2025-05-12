import { BodyShort } from '@navikt/ds-react';
import BEMHelper from '@/utils/bem';

const VTAOVeilederTekst = () => {
    const cls = BEMHelper('instruks');
    return (
        <ul>
            <li className={cls.element('list-element')}>
                <BodyShort size="small">
                    Etter at du har godkjent avtalen, må avtalen og de første tilskuddsperiodene godkjennes av
                    beslutter. Det er først da avtalen er endelig godkjent.
                </BodyShort>
            </li>
            <li className={cls.element('list-element')}>
                <BodyShort size="small">
                    Arena skal ikke lenger benyttes til registrering av avtale, tilsagn eller refusjon for tiltaket
                    varig tilrettelagt arbeid i ordinær virksomhet.
                </BodyShort>
            </li>
            <li className={cls.element('list-element')}>
                <BodyShort size="small">
                    Tilsagnsbrevet sendes ikke lenger til innboksen til arbeidsgiver i Altinn. Innholdet i
                    tilsagnsbrevet er innarbeidet i avtalen til arbeidsgiver.
                </BodyShort>
            </li>
            <li className={cls.element('list-element')}>
                <BodyShort size="small">
                    Arbeidsgiver vil automatisk få utbetalt tilskuddet hver måned på konto uten å måtte godkjenne.
                </BodyShort>
            </li>
            <li className={cls.element('list-element')}>
                <BodyShort size="small">
                    Hver 6. mnd vil du få en automatisk varsling i løsning om at det må foretas en oppfølging av
                    tiltaket. Du må bekrefte at tiltaket skal fortsette for at arbeidsgiver skal få utbetalt refusjon.
                </BodyShort>
            </li>
            <li className={cls.element('list-element')}>
                <BodyShort size="small">
                    Det går automatisk melding til NAV Arbeid og ytelser med beskjed om at bruker har fått innvilget
                    tiltaksplass.
                </BodyShort>
            </li>
            <li>
                <BodyShort size="small">Avtalen blir automatisk journalført i Gosys.</BodyShort>
            </li>
        </ul>
    );
};
export default VTAOVeilederTekst;
