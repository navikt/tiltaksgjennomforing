import { AvtaleContext, TemporaryLagring } from '@/AvtaleProvider';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import { Maal } from '@/types/avtale';
import { ApiError } from '@/types/errors';
import { Maalkategori } from '@/types/maalkategorier';
import { Flatknapp } from 'nav-frontend-knapper';
import { Select, Textarea } from 'nav-frontend-skjema';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import * as React from 'react';
import { FunctionComponent, useContext, useEffect, useState } from 'react';

interface Props {
    lagreMaal: (maal: Maal) => Promise<any>;
    avsluttRedigering: () => void;
    defaultMaal?: Maal;
    ledigeMaalkategorier: Maalkategori[];
}

const RedigerMaal: FunctionComponent<Props> = props => {
    const context = useContext(AvtaleContext);
    const { ledigeMaalkategorier } = props;

    const [valgtKategori, setValgtKategori] = useState<Maalkategori | undefined>(
        props.defaultMaal && props.defaultMaal.kategori
    );

    const [beskrivelseFeil, setBeskrivelseFeil] = useState<SkjemaelementFeil | undefined>(undefined);
    const [valgtKategoriFeil, setValgtKategoriFeil] = useState<SkjemaelementFeil | undefined>(undefined);

    console.log('default maal', props.defaultMaal);

    useEffect(() => {
        if (props.defaultMaal && props.defaultMaal.kategori !== context.mellomLagring?.maal) {
            context.setMellomLagring({
                maal: props.defaultMaal.kategori,
                maalTekst: props.defaultMaal.beskrivelse,
            });
        }
    }, []);

    const getFørsteKategori = () => {
        return ledigeMaalkategorier.find(mal => mal !== context.mellomLagring?.maal);
    };

    const nySettValgtKategori = (event: React.FormEvent<HTMLSelectElement>) => {
        context.setMellomLagring({
            maal: event.currentTarget.value as Maalkategori,
            maalTekst: context.mellomLagring?.maalTekst as string,
        });
    };

    const nySettBeskrivelsen = (event: any) => {
        if (event.currentTarget.value.length <= 1000) {
            context.setMellomLagring({
                maal: context.mellomLagring?.maal,
                maalTekst: event.currentTarget.value,
            });
        }
    };

    const lagre = () => {
        if (context.mellomLagring?.maal && context.mellomLagring.maalTekst) {
            props.avsluttRedigering();
            const maal = {
                id: props.defaultMaal && props.defaultMaal.id,
                kategori: context.mellomLagring.maal,
                beskrivelse: context.mellomLagring.maalTekst,
            };
            context.setMellomLagring(undefined);
            return context.lagreMaal(maal);
        } else {
            if (!context.mellomLagring?.maalTekst) {
                setBeskrivelseFeil({
                    feilmelding: 'Feltet kan ikke være tomt',
                });
            }
            if (!context.mellomLagring?.maal) {
                setValgtKategoriFeil({ feilmelding: 'En kategori må være valgt' });
            }
            throw new ApiError('En uventet feil har oppstått.');
        }
    };

    const avbrytKnappOnClick = () => {
        context.setMellomLagring(undefined);

        props.avsluttRedigering();
    };

    const lagTellerTekst = (antallTegn: number, maxLength: number) => {
        return maxLength - antallTegn;
    };

    const genererKategoriListe = (): React.ReactNode => {
        const redigerComponentListe = [];
        redigerComponentListe.push(
            <option value="" key="nav.no">
                Velg mål
            </option>
        );
        if (context.mellomLagring?.maal) {
            redigerComponentListe.push(
                <option value={context.mellomLagring?.maal} key={context.mellomLagring?.maal}>
                    {context.mellomLagring?.maal}
                </option>
            );
        }
        const liste = props.ledigeMaalkategorier
            .filter(mal => mal !== context.mellomLagring?.maal)
            .map((maalKategori, index) => (
                <option value={maalKategori} key={index}>
                    {maalKategori}
                </option>
            ));
        redigerComponentListe.push(...liste);
        return redigerComponentListe;
    };

    return (
        <>
            <Select
                className="rediger-maal__kategori-dropdown"
                label="Hva er målet med arbeidstreningen?"
                value={context.mellomLagring?.maal}
                onChange={nySettValgtKategori}
                feil={valgtKategoriFeil}
                onBlur={nySettValgtKategori}
            >
                {genererKategoriListe()}
            </Select>
            <Textarea
                label="Beskriv målet"
                value={context.mellomLagring?.maalTekst || ''}
                onChange={nySettBeskrivelsen}
                maxLength={1000}
                tellerTekst={lagTellerTekst}
                feil={beskrivelseFeil}
                onBlur={nySettBeskrivelsen}
            />
            <LagreKnapp lagre={lagre} label={'Lagre mål'} className={'rediger-maal__lagre-knapp'} />
            <Flatknapp onClick={avbrytKnappOnClick}>Avbryt</Flatknapp>
        </>
    );
};

export default RedigerMaal;
