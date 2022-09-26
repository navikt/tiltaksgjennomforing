import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { AvbrytelseGrunn } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Alert } from '@navikt/ds-react';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import './AnnullerAvtaleModal.less';
import BekreftelseModal from './BekreftelseModal';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
}

const cls = BEMHelper('annuller-avtale-modal');

const AnnullerAvtaleModal: FunctionComponent<Props> = (props) => {
    const [annetGrunn, setAnnetGrunn] = useState('');
    const [grunnFeil, setGrunnFeil] = useState<undefined | string>(undefined);
    const [annullertGrunn, setAnnullertGrunn] = useState<AvbrytelseGrunn | string>('');
    const avtaleContext = useContext(AvtaleContext);

    const bekreftAnnullerAvtale = async () => {
        const annullertGrunnIkkeSatt = !annullertGrunn || (annullertGrunn === 'Annet' && !annetGrunn);

        if (annullertGrunnIkkeSatt) {
            setGrunnFeil('Vennligst velg en grunn');
            return;
        }

        const grunn = annullertGrunn === 'Annet' ? annetGrunn : annullertGrunn;

        return avtaleContext.annullerAvtale(grunn).then(() => props.lukkModal());
    };

    useEffect(() => {
        if (annullertGrunn) {
            setGrunnFeil(undefined);
        }
    }, [annullertGrunn]);

    const modalInnhold = (
        <>
            <div>
                <p>
                    <Alert variant="info" inline>
                        Annullering brukes for tilfeller der tiltaket aldri ble noe av.
                    </Alert>
                </p>
                <Normaltekst>
                    Når du annullerer avtalen, blir innholdet låst, og den blir markert som "annullert" i din oversikt.
                    Du kan ikke redigere eller gjenopprette den etterpå.
                </Normaltekst>
            </div>
            <VerticalSpacer rem={1} />
            <div className={cls.element('grunner-og-annet')}>
                <div role="menu">
                    <VerticalSpacer rem={1.25} />
                    <SkjemaGruppe title="Hvorfor annulleres avtalen?" feil={grunnFeil}>
                        {[
                            'Feilregistrering',
                            'Begynt i arbeid',
                            'Fått tilbud om annet tiltak',
                            'Syk',
                            'Ikke møtt',
                            'Annet',
                        ].map((grunn) => (
                            <Radio
                                key={grunn}
                                label={grunn}
                                name="avbrytelsegrunn"
                                value={grunn}
                                checked={annullertGrunn === grunn}
                                onChange={(event) => {
                                    setAnnullertGrunn(event.currentTarget.value);
                                }}
                                role="menuitemradio"
                            />
                        ))}
                    </SkjemaGruppe>
                </div>
                <div>
                    {annullertGrunn === 'Annet' && (
                        <PakrevdTextarea
                            label=""
                            verdi={annetGrunn}
                            placeholder="Begrunnelse (påkrevd)"
                            settVerdi={(verdi) => setAnnetGrunn(verdi)}
                            maxLengde={500}
                            feilmelding="Begrunnelse er påkrevd"
                            className={cls.element('pakrevd-text-area')}
                        />
                    )}
                </div>
            </div>
            {annullertGrunn === 'Feilregistrering' && (
                <Alert variant="warning" inline>
                    Ved årsak <em>Feilregistrering</em> blir avtalen skjult for alle avtaleparter
                </Alert>
            )}
        </>
    );

    return (
        <BekreftelseModal
            bekreftOnClick={bekreftAnnullerAvtale}
            lukkModal={props.lukkModal}
            modalIsOpen={props.isOpen}
            oversiktTekst="Annuller avtalen"
            modalInnhold={modalInnhold}
            bekreftelseTekst="Annuller avtale"
            avbrytelseTekst="Behold avtale"
        />
    );
};

export default AnnullerAvtaleModal;
