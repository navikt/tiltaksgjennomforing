import useValidering from '@/komponenter/useValidering';
import { Input } from 'nav-frontend-skjema';
import { Alert } from '@navikt/ds-react';
import React, { useState } from 'react';
import BEMHelper from '@/utils/bem';
import './TelefonnummerInput.less';

interface Props {
    className?: string;
    label: string;
    verdi?: string;
    feilmelding?: string;
    settVerdi: (verdi: string) => void;
}

const TelefonnummerInput: React.FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('telefonnummer-input-container');
    const [telefonnummer, setTelefonnummer] = useState(props.verdi);

    const [erMobilNummer, setErMobilNummer] = useState<boolean>(true);

    const norskTlfnrRegex = /^((\+|00)47)?\d{8}$/; // Kan inneholde +47 eller 0047 og må ha 8 siffer
    const norskMobilnummerRegex = /^(((0{2}?)|(\+){1})47)?(4|9)[\d]{7}/;

    //const svenskMobilnummer = /^((((0{2}?)|(\+){1})46)|0)7[\d]{8}/;

    const [feil, setFeil, sjekkInputfelt] = useValidering(props.verdi, [
        (verdi) => {
            if (!verdi) {
                setErMobilNummer(true);
                return 'Telefonnummer er påkrevd';
            }
            if (verdi && !norskTlfnrRegex.test(verdi.replace(/\s/g, ''))) {
                setErMobilNummer(true);
                return 'Ugyldig telefonnummer';
            }
            if (verdi && !norskMobilnummerRegex.test(verdi.replace(/\s/g, ''))) {
                setErMobilNummer(false);
            }
            if (verdi && norskMobilnummerRegex.test(verdi.replace(/\s/g, ''))) {
                setErMobilNummer(true);
            }
        },
    ]);

    console.log('erMobilNummer', erMobilNummer);

    return (
        <div className={cls.className}>
            <Input
                bredde="S"
                label={props.label}
                value={telefonnummer || ''}
                feil={feil}
                onChange={(event) => {
                    const verdi = event.target.value.replace(/[^ 0-9+]/g, ''); // Aksepter kun tall, space, og pluss tegn
                    setTelefonnummer(verdi);

                    // fjerner landkode for å kun sende telefonnummeret til backend
                    props.settVerdi(verdi.replace(/\s/g, '').replace(/\+47/g, '').replace(/^0047/g, ''));
                    setFeil(undefined);
                }}
                onBlur={sjekkInputfelt}
                maxLength={23}
            />
            {!erMobilNummer && (
                <>
                    <Alert variant="warning" className={cls.element('alert')}>
                        Det anbefales å bruke et mobilnummer. Vi bruker varsling på SMS for å opplyse om status på
                        avtalen og frister på når refusjon må sendes inn
                    </Alert>
                </>
            )}
        </div>
    );
};

export default TelefonnummerInput;
