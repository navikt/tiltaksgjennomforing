import React, { FunctionComponent, PropsWithChildren, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BodyLong, Button, Loader, Modal } from '@navikt/ds-react';
import { Locked } from '@navikt/ds-icons';

import { Rolle } from '@/types';
import { useAvtaleKreverAktsomhet } from '@/services/use-rest';
import { useInnloggetBruker } from '@/InnloggingBoundary/InnloggingBoundary';

import { container } from './AvtaleKontroll.module.less';

const ROLLER_SOM_KREVER_KONTROLL: Rolle[] = ['ARBEIDSGIVER'];

const AvtaleKontroll: FunctionComponent<PropsWithChildren> = (props) => {
    const { rolle } = useInnloggetBruker();
    const isKreverKontroll = ROLLER_SOM_KREVER_KONTROLL.includes(rolle);

    const { avtaleId } = useParams<{ avtaleId: string }>();
    const { isLoading, data } = useAvtaleKreverAktsomhet(isKreverKontroll ? avtaleId : undefined);

    const navigate = useNavigate();
    const ref = useRef<HTMLDialogElement>(null);
    const [isGodkjent, setGodkjent] = useState<boolean>(!isKreverKontroll);

    if (isLoading) {
        return (
            <div className={container}>
                <Loader variant="neutral" size="xlarge" />
            </div>
        );
    }

    if (!data?.kreverAktsomhet || isGodkjent) {
        return props.children;
    }

    return (
        <Modal
            ref={ref}
            open={true}
            header={{
                icon: <Locked title="Lås" />,
                heading: 'Deltaker har adressebeskyttelse',
            }}
            onClose={() => {
                navigate(-1);
            }}
        >
            <Modal.Body>
                <BodyLong>
                    Denne personen har hemmelig adresse og du må derfor utvise aktsomhet. Du skal kun gjøre oppslag
                    dersom det er nødvendig for å levere tjenesten til denne personen. Nav logger ditt navn og tidspunkt
                    for oppslaget.
                </BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="button"
                    onClick={() => {
                        setGodkjent(true);
                    }}
                >
                    Vis avtale
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Avslutt
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AvtaleKontroll;
