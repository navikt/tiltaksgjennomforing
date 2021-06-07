import { AvtaleContext } from '@/AvtaleProvider';
import MaalKategorier from '@/AvtaleSide/steg/MaalSteg/RedigerMaal/MaalKategorier';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import { Maal } from '@/types/avtale';
import { ApiError } from '@/types/errors';
import { Maalkategori } from '@/types/maalkategorier';
import { Flatknapp } from 'nav-frontend-knapper';
import { Select, Textarea } from 'nav-frontend-skjema';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import React, { FunctionComponent, useContext, useState } from 'react';

interface Props {
    avsluttRedigering: () => void;
    defaultMaal?: Maal;
    ledigeMaalkategorier: Maalkategori[];
}

const RedigerMaal: FunctionComponent<Props> = props => {
    const context = useContext(AvtaleContext);
    const { defaultMaal } = props;

    const initieltMaal = () => {
        if (defaultMaal) {
            return defaultMaal;
        } else if (!defaultMaal && context.mellomLagring) {
            return context.mellomLagring;
        }
        return undefined;
    };

    const [valgtMaal, setValgtMaal] = useState<Partial<Maal> | undefined>(initieltMaal());

    const [beskrivelseFeil, setBeskrivelseFeil] = useState<SkjemaelementFeil | undefined>(undefined);
    const [valgtKategoriFeil, setValgtKategoriFeil] = useState<SkjemaelementFeil | undefined>(undefined);

    const settValgtKategori = (event: React.FormEvent<HTMLSelectElement>) => {
        const { value } = event.currentTarget;
        setValgtMaal({
            ...valgtMaal,
            kategori: value as Maalkategori,
        });
        if (valgtMaal?.kategori && valgtMaal?.beskrivelse) {
            context.setMellomLagring({ ...(valgtMaal as Maal), kategori: value as Maalkategori });
        }
    };

    const settBeskrivelse = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.currentTarget.value.length <= 1000) {
            setValgtMaal({ ...valgtMaal, beskrivelse: event.currentTarget.value });
            if (valgtMaal?.kategori && valgtMaal?.beskrivelse) {
                context.setMellomLagring({ ...(valgtMaal as Maal), beskrivelse: event.currentTarget.value });
            }
        }
    };

    const lagreMaal = () => {
        if (valgtMaal?.kategori && valgtMaal?.beskrivelse) {
            context.setMellomLagring(undefined);
            props.avsluttRedigering();
            return context.lagreMaal(valgtMaal as Maal);
        }
        return setFeilmelding();
    };

    const setFeilmelding = (): void => {
        if (!valgtMaal?.beskrivelse) {
            return setBeskrivelseFeil({
                feilmelding: 'Feltet kan ikke være tomt',
            });
        } else if (!valgtMaal.kategori) {
            return setValgtKategoriFeil({ feilmelding: 'En kategori må være valgt' });
        }
        throw new ApiError('En uventet feil har oppstått.');
    };

    const avbrythandling = () => {
        context.setMellomLagring(undefined);
        props.avsluttRedigering();
    };

    const tellerTekst = (antallTegn: number, maxLength: number) => {
        return maxLength - antallTegn;
    };

    return (
        <>
            <Select
                className="rediger-maal__kategori-dropdown"
                label="Hva er målet med arbeidstreningen?"
                value={valgtMaal?.kategori}
                onChange={settValgtKategori}
                feil={valgtKategoriFeil}
                onBlur={settValgtKategori}
            >
                <MaalKategorier
                    ledigeMaalKategorier={props.ledigeMaalkategorier}
                    valgtMaalKategori={valgtMaal?.kategori}
                />
            </Select>
            <Textarea
                label="Beskriv målet"
                value={valgtMaal?.beskrivelse || ''}
                onChange={settBeskrivelse}
                maxLength={1000}
                tellerTekst={tellerTekst}
                feil={beskrivelseFeil}
                onBlur={settBeskrivelse}
            />
            <LagreKnapp lagre={lagreMaal} label={'Lagre mål'} className={'rediger-maal__lagre-knapp'} />
            <Flatknapp onClick={avbrythandling}>Avbryt</Flatknapp>
        </>
    );
};

export default RedigerMaal;
