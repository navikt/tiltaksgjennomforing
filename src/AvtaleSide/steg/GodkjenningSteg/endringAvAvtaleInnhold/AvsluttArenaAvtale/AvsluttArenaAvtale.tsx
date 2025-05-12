import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { avsluttArenaAvtale } from '@/services/rest-service';
import { formaterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { Notes } from '@navikt/ds-icons/cjs';
import { Alert, BodyShort, Label, Link } from '@navikt/ds-react';
import { FunctionComponent, useContext, useState } from 'react';

const AvsluttArenaAvtale: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const [modalApen, setModalApen] = useState(false);
    const [datoFeil, setDatoFeil] = useState<string>();

    const naavaerendeDato = avtaleContext.avtale.gjeldendeInnhold.sluttDato;

    const lukkModal = (): void => {
        setModalApen(false);
        setDatoFeil(undefined);
    };

    const avsluttAvtale = async (): Promise<void> => {
        if (!naavaerendeDato) {
            setDatoFeil('Dato må fylles ut. Gå til varighetssteget og velg sluttdato.');
            return;
        }
        await avsluttArenaAvtale(avtaleContext.avtale);
        await avtaleContext.hentAvtale();
        lukkModal();
    };

    // Skal kun vises hvis avtalen er migrert fra ARENA og ikke godkjent av veileder
    if (avtaleContext.avtale.opphav !== 'ARENA' && avtaleContext.avtale.godkjentAvVeileder == null) return null;

    return (
        <>
            <div>
                <Link
                    onClick={(event) => {
                        event.stopPropagation();
                        setModalApen(true);
                    }}
                    href="#"
                    role="menuitem"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <div aria-hidden={true}>
                        <Notes style={{ marginRight: '0.5rem' }} />
                    </div>
                    Avslutt Arena avtale
                </Link>
            </div>

            <BekreftelseModal
                style={{ maxWidth: '100%' }}
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Avslutt avtale"
                oversiktTekst="Avslutt Arena avtale"
                modalIsOpen={modalApen}
                bekreftOnClick={avsluttAvtale}
                lukkModal={lukkModal}
            >
                <div className={'forkortAvtale'}>
                    <div>
                        <Label>Nåværende sluttdato for avtalen:</Label>
                        <BodyShort size="small">
                            {naavaerendeDato ? formaterDato(naavaerendeDato, NORSK_DATO_FORMAT) : 'Dato ikke valgt'}
                        </BodyShort>
                    </div>
                    <VerticalSpacer rem={1} />
                    <BodyShort size="small">
                        Avtalen vil bli avsluttet med valgt sluttdato. Om dette er feil dato, vennligst korriger
                        sluttdatoen i varighetssteget i menyen til venstre før du avslutter avtalen her.
                    </BodyShort>
                </div>
                {datoFeil && (
                    <>
                        <VerticalSpacer rem={2} />
                        <Alert variant="error">{datoFeil}</Alert>
                    </>
                )}
            </BekreftelseModal>
        </>
    );
};

export default AvsluttArenaAvtale;
