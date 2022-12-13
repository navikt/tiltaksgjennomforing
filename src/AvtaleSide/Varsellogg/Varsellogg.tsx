import { ReactComponent as BurgerMenyIkon } from '@/assets/ikoner/burgermeny.svg';
import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { hentVarsellogg } from '@/services/rest-service';
import { Nettressurs, Status } from '@/types/nettressurs';
import { Varsel } from '@/types/varsel';
import BEMHelper from '@/utils/bem';
import { Alert, BodyShort, Heading, Link, Loader, Modal } from '@navikt/ds-react';
import moment from 'moment';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import './Varsellogg.less';
import VarselTabell from './VarselTabell';

const cls = BEMHelper('varsellogg');

const Varsellogg: FunctionComponent = () => {
    const [varselLoggModalApen, setVarselLoggModalApen] = useState<boolean>(false);
    const [varsler, setVarsler] = useState<Nettressurs<Varsel[]>>({ status: Status.IkkeLastet });
    const avtaleContext = useContext(AvtaleContext);

    useEffect(() => {
        setVarsler({ status: Status.LasterInn });
        // Hent nye varselr når loggen åpnes.
        if (varselLoggModalApen) {
            hentVarsellogg(avtaleContext.avtale.id)
                .then((data: Varsel[]) => setVarsler({ status: Status.Lastet, data }))
                .catch((error: Error) => setVarsler({ status: Status.Feil, error: error }));
        }
    }, [avtaleContext.avtale.id, varselLoggModalApen]);

    return (
        <>
            <Link
                id="varsellogglenke"
                onClick={() => setVarselLoggModalApen(true)}
                href="#"
                className={cls.element('menylenke')}
                role="menuitem"
            >
                <div aria-hidden={true}>
                    <BurgerMenyIkon className={cls.element('burger-ikon')} />
                </div>
                Hendelselogg
            </Link>
            <Modal
                open={varselLoggModalApen}
                onClose={() => setVarselLoggModalApen(false)}
                closeButton={true}
                aria-label="Varselloggmodal"
                className={cls.element('modal')}
                aria-modal={varselLoggModalApen}
                aria-labelledby="heading"
                aria-describedby="varsellogg for endringsaktiviteter i applikasjonen"
            >
                <Modal.Content>
                    <Heading size="medium" role="heading" id="heading" aria-level={1}>
                        Hendelselogg
                    </Heading>
                    <VerticalSpacer rem={1} />
                    {moment(avtaleContext.avtale.opprettetTidspunkt).isBefore('2020-09-10') && (
                        <>
                            <Alert variant="info">
                                Denne avtalen ble opprettet før hendelsesloggen ble innført og vil være mangelfull.
                            </Alert>
                            <VerticalSpacer rem={1} />
                        </>
                    )}
                    {varsler.status === Status.Lastet && varsler.data.length > 0 && (
                        <VarselTabell varsler={varsler.data} />
                    )}
                    {varsler.status === Status.LasterInn && (
                        <Loader variant="neutral" size="xlarge" className={cls.element('spinner')} onResize={undefined} onResizeCapture={undefined} />
                    )}
                    {varsler.status === Status.Feil && (
                        <BodyShort size="small">Klarte ikke hente hendelselogg. Prøv igjen senere.</BodyShort>
                    )}
                </Modal.Content>
            </Modal>
        </>
    );
};

export default Varsellogg;
