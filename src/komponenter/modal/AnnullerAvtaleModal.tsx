import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { AvbrytelseGrunn } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Alert, BodyShort } from '@navikt/ds-react';
import { RadioGroup, Radio } from '@navikt/ds-react';
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

    return (
        <BekreftelseModal
            bekreftOnClick={bekreftAnnullerAvtale}
            lukkModal={props.lukkModal}
            modalIsOpen={props.isOpen}
            oversiktTekst="Annuller avtalen a"
            bekreftelseTekst="Annuller avtale"
            avbrytelseTekst="Behold avtale"
        >
            <div>
                <p>
                    <Alert variant="info" inline>
                        Annullering brukes for tilfeller der tiltaket aldri ble noe av.
                    </Alert>
                </p>
                <BodyShort size="small">
                    Når du annullerer avtalen, blir innholdet låst, og den blir markert som "annullert" i din oversikt.
                    Du kan ikke redigere eller gjenopprette den etterpå.
                </BodyShort>
            </div>
            <VerticalSpacer rem={1} />
            <div className={cls.element('grunner-og-annet')}>
                <div role="menu">
                    <VerticalSpacer rem={1.25} />
                    <RadioGroup
                        legend="Valg av grunn for annullering av avtalen"
                        title="Hvorfor annulleres avtalen?"
                        error={grunnFeil}
                    >
                        {[
                            'Feilregistrering',
                            'Begynt i arbeid',
                            'Fått tilbud om annet tiltak',
                            'Syk',
                            'Ikke møtt',
                            'Annet',
                        ].map((label) => (
                            <Radio
                                key={label}
                                name="avbrytelsegrunn"
                                value={label}
                                checked={annullertGrunn === label}
                                onChange={(event) => {
                                    setAnnullertGrunn(event.currentTarget.value);
                                }}
                                role="menuitemradio"
                            >
                                {label}
                            </Radio>
                        ))}
                    </RadioGroup>
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
        </BekreftelseModal>
    );
};

export default AnnullerAvtaleModal;
