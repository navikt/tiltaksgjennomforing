import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { AvbrytelseGrunn } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import './AvbrytAvtaleModal.less';
import BekreftelseModal from './BekreftelseModal';
import AlertStripe from 'nav-frontend-alertstriper';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
}

const cls = BEMHelper('avbryt-avtale-modal');

const AnnullerAvtaleModal: FunctionComponent<Props> = props => {
    const [annetGrunn, setAnnetGrunn] = useState('');
    const [grunnFeil, setGrunnFeil] = useState<undefined | SkjemaelementFeil>(undefined);
    const [annullertGrunn, setAnnullertGrunn] = useState<AvbrytelseGrunn | string>('');
    const avtaleContext = useContext(AvtaleContext);

    const bekreftAnnullerAvtale = async () => {
        const annullertGrunnIkkeSatt = !annullertGrunn || (annullertGrunn === 'Annet' && !annetGrunn);

        if (annullertGrunnIkkeSatt) {
            setGrunnFeil({ feilmelding: 'Vennligst velg en grunn' });
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
                    <AlertStripe type="info" form="inline">
                        Annullering brukes for tilfeller der tiltaket aldri ble noe av.
                    </AlertStripe>
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
                        ].map(grunn => (
                            <Radio
                                key={grunn}
                                label={grunn}
                                name="avbrytelsegrunn"
                                value={grunn}
                                checked={annullertGrunn === grunn}
                                onChange={event => {
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
                            settVerdi={verdi => setAnnetGrunn(verdi)}
                            maxLengde={500}
                            feilmelding="Begrunnelse er påkrevd"
                            className={cls.element('pakrevd-text-area')}
                        />
                    )}
                </div>
            </div>
            {annullertGrunn === 'Feilregistrering' && (
                <AlertStripe type="advarsel" form="inline">
                    Ved årsak <em>Feilregistrering</em> blir avtalen skjult for deltaker og arbeidsgiver
                </AlertStripe>
            )}
        </>
    );

    return (
        <BekreftelseModal
            bekreftOnClick={bekreftAnnullerAvtale}
            lukkModal={props.lukkModal}
            modalIsOpen={props.isOpen}
            oversiktTekst="Annuller avtalen"
            varselTekst={modalInnhold}
            bekreftelseTekst="Annuller avtale"
            avbrytelseTekst="Behold avtale"
        />
    );
};

export default AnnullerAvtaleModal;
