import { AvtaleContext } from '@/AvtaleProvider';
import type { FunctionComponent } from 'react';
import { useContext, useState } from 'react';
import { Alert, BodyShort, Button, Heading, Label, Link, Modal } from '@navikt/ds-react';
import { oppdaterInnsatsgruppe } from '@/services/rest-service';
import { ArrowsCirclepathIcon } from '@navikt/aksel-icons';
import { Feilkode, Feilmeldinger } from '@/types/feilkode';
import { Innsatsgruppe, innsatsgruppeTekst } from '@/types/innsatsgruppe';
import useSWRMutation from 'swr/mutation';

import styles from './OppdaterInnsatsgruppe.module.less';

const OppdaterInnsatsgruppe: FunctionComponent = () => {
    const { avtale, oppdatereAvtaleContext } = useContext(AvtaleContext);
    const [modalApen, setModalApen] = useState(false);

    const { trigger, isMutating, error, data, reset } = useSWRMutation(
        `/avtaler/${avtale.id}/oppdater-innsatsgruppe`,
        () => oppdaterInnsatsgruppe(avtale),
    );

    const lukkModal = () => {
        if (isMutating) {
            return;
        }
        if (data) {
            oppdatereAvtaleContext(data);
        }
        setModalApen(false);
        reset();
    };

    const nyInnsatsgruppe = data?.innsatsgruppe?.type ?? Innsatsgruppe.UKJENT;

    return (
        <>
            <Link
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setModalApen(true);
                }}
                href="#"
                role="menuitem"
                className={styles.lenke}
            >
                <div aria-hidden={true}>
                    <ArrowsCirclepathIcon style={{ marginRight: '0.5rem' }} />
                </div>
                Oppdater innsatsgruppe (§ 14 a)
            </Link>
            <Modal open={modalApen} onClose={lukkModal} aria-label="Oppdater innsatsgruppe">
                <Modal.Header>
                    <Heading level="2" size="small">
                        Oppdater innsatsgruppe (§ 14 a)
                    </Heading>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.innhold}>
                        {data ? (
                            <>
                                <BodyShort>Innsatsgruppen (§ 14 a) er oppdatert.</BodyShort>
                                <div>
                                    <Label as="p">Ny innsatsgruppe</Label>
                                    <BodyShort>{innsatsgruppeTekst[nyInnsatsgruppe]}</BodyShort>
                                </div>
                            </>
                        ) : (
                            <BodyShort>Vil du oppdatere innsatsgruppe (§ 14 a) for denne avtalen?</BodyShort>
                        )}
                        {error && (
                            <Alert variant="warning">
                                {Feilmeldinger[error?.message as Feilkode] ??
                                    error?.message ??
                                    'Det har skjedd en uventet feil'}
                            </Alert>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className={styles.knapper}>
                        {data ? (
                            <Button variant="primary" onClick={lukkModal}>
                                Lukk
                            </Button>
                        ) : (
                            <>
                                <Button variant="secondary" onClick={lukkModal} disabled={isMutating}>
                                    Avbryt
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={() => trigger().catch(() => {})}
                                    loading={isMutating}
                                >
                                    Oppdater
                                </Button>
                            </>
                        )}
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default OppdaterInnsatsgruppe;
