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
    avbrytRedigering: () => void;
    defaultMaal?: Maal;
    ledigeMaalkategorier: Maalkategori[];
}

const RedigerMaal: FunctionComponent<Props> = props => {
    const context = useContext(AvtaleContext);
    const { ledigeMaalkategorier } = props;

    const [valgtKategori, setValgtKategori] = useState<Maalkategori | undefined>(
        props.defaultMaal && props.defaultMaal.kategori
    );
    const [beskrivelse, setBeskrivelse] = useState<string>((props.defaultMaal && props.defaultMaal.beskrivelse) || '');
    const [beskrivelseFeil, setBeskrivelseFeil] = useState<SkjemaelementFeil | undefined>(undefined);
    const [valgtKategoriFeil, setValgtKategoriFeil] = useState<SkjemaelementFeil | undefined>(undefined);
    const [erLagret, setErLagret] = useState<boolean>(false);

    console.log('default maal', props.defaultMaal);

    useEffect(() => {
        /*     if (context.mellomLagring) {
                if (context.mellomLagring.maalTekst !== '') {
                    console.log('skal ikke sees på unmount');
                    setValgtKategori(context.mellomLagring.maal);
                    setBeskrivelse(context.mellomLagring.maalTekst);
                }
            }*/

        return () => {
            console.log('return callback i useEffect: beskrivelse er: ', beskrivelse);
            /* console.log('return on useEffect...');
                const liste = ledigeMaalkategorier.filter(mal => mal !== valgtKategori);
                console.log('beskrivelse er satt: ', beskrivelse);
                console.log('state er ikke lagret enda ', !erLagret);
                if (beskrivelse !== '' && !erLagret) {
                    const tempMaal = {
                        maal: valgtKategori ? valgtKategori : liste[0],
                        maalTekst: beskrivelse,
                    };
                    console.log('temp mål: ', tempMaal);
                    if (context.setMellomLagring) {
                        console.log('forbereder mellomlagring...');
                        context.setMellomLagring(tempMaal);
                    }
                } else if (!valgtKategori && beskrivelse === '') {
                    console.log('kategori og beskrivelse ikke satt');
                    context.setMellomLagring(undefined);
                }*/
        };
    }, [
        beskrivelse,
        /* beskrivelse,
        erLagret,
        valgtKategori,
        fjernMellomLagring,
        ledigeMaalkategorier,
        setMellomLagring,
        mellomLagretData,*/
    ]);

    const getFørsteKategori = () => {
        const liste = ledigeMaalkategorier.filter(mal => mal !== valgtKategori);
        return liste[0];
    };

    const velgKategori = (event: React.FormEvent<HTMLSelectElement>) => {
        setValgtKategori(event.currentTarget.value as Maalkategori);
        setValgtKategoriFeil(
            event.currentTarget.value
                ? undefined
                : {
                      feilmelding: 'En kategori må være valgt',
                  }
        );
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

    const settBeskrivelsen = (event: any) => {
        if (event.currentTarget.value.length <= 1000) {
            console.log('beskrivelse er: ', event.currentTarget.value);
            setBeskrivelse(event.currentTarget.value);
        }
        setBeskrivelseFeil(event.currentTarget.value ? undefined : { feilmelding: 'Feltet kan ikke være tomt' });
    };

    const lagre = () => {
        if (/*beskrivelse && valgtKategori*/ context.mellomLagring?.maal && context.mellomLagring.maalTekst) {
            setErLagret(true);
            props.avbrytRedigering();
            return context.lagreMaal({
                id: props.defaultMaal && props.defaultMaal.id,
                kategori: context.mellomLagring.maal,
                beskrivelse: context.mellomLagring.maalTekst,
            });
        } else {
            if (!beskrivelse) {
                setBeskrivelseFeil({
                    feilmelding: 'Feltet kan ikke være tomt',
                });
            }
            if (!valgtKategori) {
                setValgtKategoriFeil({ feilmelding: 'En kategori må være valgt' });
            }
            throw new ApiError('En uventet feil har oppstått.');
        }
    };

    const avbrytKnappOnClick = () => {
        context.setMellomLagring(undefined);
        setErLagret(true);
        props.avbrytRedigering();
    };

    const lagTellerTekst = (antallTegn: number, maxLength: number) => {
        return maxLength - antallTegn;
    };

    const genererKategoriListe = () => {
        const redigerComponentListe = [];
        redigerComponentListe.push(
            <option value="" key="nav.no">
                Velg mål
            </option>
        );
        if (valgtKategori) {
            redigerComponentListe.push(
                <option value={valgtKategori} key={valgtKategori}>
                    {valgtKategori}
                </option>
            );
        }
        // finnLedigeMaalkategorier(context.avtale.maal)
        const liste = props.ledigeMaalkategorier
            .filter(mal => mal !== valgtKategori)
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
            {console.log('context val: ', context.mellomLagring)}
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
