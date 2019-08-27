import { Flatknapp } from 'nav-frontend-knapper';
import { Select, Textarea } from 'nav-frontend-skjema';
import * as React from 'react';
import LagreKnapp from '../../../komponenter/LagreKnapp/LagreKnapp';
import { Maal } from '../../avtale';
import { Maalkategori } from '../../maalkategorier';
import ApiError from '../../../api-error';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { TemporaryLagring } from '../../../AvtaleContext';
import { setFritekstMaksTusenTegn } from '../maal-utils';

interface Props {
    lagreMaal: (maal: Maal) => Promise<any>;
    avbrytRedigering: () => void;
    defaultMaal?: Maal;
    ledigeMaalkategorier: Maalkategori[];
    mellomLagretData?: TemporaryLagring;
    setMellomLagring?: (maalInput: TemporaryLagring) => void;
    fjernMellomLagring?: () => void;
}

interface State {
    valgtKategori?: Maalkategori;
    beskrivelse: string;
    beskrivelseFeil?: SkjemaelementFeil;
    valgtKategoriFeil?: SkjemaelementFeil;
    erLagret: boolean;
}

class RedigerMaal extends React.Component<Props, State> {
    state = {
        valgtKategori:
            this.props.defaultMaal && this.props.defaultMaal.kategori,
        beskrivelse:
            (this.props.defaultMaal && this.props.defaultMaal.beskrivelse) ||
            '',
        beskrivelseFeil: undefined,
        valgtKategoriFeil: undefined,
        erLagret: false,
    };

    componentDidMount(): void {
        if (this.props.mellomLagretData) {
            if (this.props.mellomLagretData.maalTekst !== '') {
                this.setState({
                    valgtKategori: this.mapKategoriTilMaal(
                        this.props.mellomLagretData.maal
                    ),
                    beskrivelse: this.props.mellomLagretData.maalTekst,
                });
            }
        }
    }

    componentWillUnmount(): void {
        const liste = this.props.ledigeMaalkategorier.filter(
            mal => mal !== this.state.valgtKategori
        );
        if (this.state.beskrivelse !== '' && !this.state.erLagret) {
            const tempMaal = {
                maal: this.state.valgtKategori
                    ? this.state.valgtKategori
                    : liste[0],
                maalTekst: this.state.beskrivelse,
            };
            if (this.props.setMellomLagring) {
                this.props.setMellomLagring(tempMaal);
            }
        } else if (!this.state.valgtKategori && this.state.beskrivelse === '') {
            if (this.props.fjernMellomLagring) {
                this.props.fjernMellomLagring();
            }
        }
    }

    mapKategoriTilMaal = (input: string): Maalkategori => {
        switch (input) {
            case 'Få jobb i bedriften':
                return 'Få jobb i bedriften';
            case 'Arbeidserfaring':
                return 'Arbeidserfaring';
            case 'Utprøving':
                return 'Utprøving';
            case 'Språkopplæring':
                return 'Språkopplæring';
            case 'Oppnå fagbrev/kompetansebevis':
                return 'Oppnå fagbrev/kompetansebevis';
            case 'Annet':
                return 'Annet';
            default:
                return 'Få jobb i bedriften';
        }
    };

    velgKategori = (event: React.FormEvent<HTMLSelectElement>) => {
        this.setState({
            valgtKategori: event.currentTarget.value as Maalkategori,
        });

        event.currentTarget.value
            ? this.setState({ valgtKategoriFeil: undefined })
            : this.setState({
                  valgtKategoriFeil: {
                      feilmelding: 'En kategori må være valgt',
                  },
              });
    };

    settBeskrivelse = (event: any) => {
        if (event.currentTarget.value.length <= 1000) {
            this.setState({
                beskrivelse: event.currentTarget.value,
            });
        }

        event.currentTarget.value
            ? this.setState({ beskrivelseFeil: undefined })
            : this.setState({
                  beskrivelseFeil: { feilmelding: 'Feltet kan ikke være tomt' },
              });
    };

    lagre = () => {
        if (this.state.beskrivelse && this.state.valgtKategori) {
            this.setState({ erLagret: true });
            if (this.props.fjernMellomLagring) {
                this.props.fjernMellomLagring();
            }
            return this.props.lagreMaal({
                id: this.props.defaultMaal && this.props.defaultMaal.id,
                opprettetTimestamp:
                    this.props.defaultMaal &&
                    this.props.defaultMaal.opprettetTimestamp,
                kategori: this.state.valgtKategori,
                beskrivelse: this.state.beskrivelse,
            });
        } else {
            if (!this.state.beskrivelse) {
                this.setState({
                    beskrivelseFeil: {
                        feilmelding: 'Feltet kan ikke være tomt',
                    },
                });
            }
            if (!this.state.valgtKategori) {
                this.setState({
                    valgtKategoriFeil: {
                        feilmelding: 'En kategori må være valgt',
                    },
                });
            }
            throw new ApiError('');
        }
    };

    avbrytKnappOnClick = () => {
        if (this.props.fjernMellomLagring) {
            this.props.fjernMellomLagring();
        }
        this.setState({ erLagret: true }, () => {
            this.props.avbrytRedigering();
        });
    };

    lagTellerTekst = (antallTegn: number, maxLength: number) => {
        return maxLength - antallTegn;
    };

    genererKategoriListe = () => {
        const redigerComponentListe = [];
        redigerComponentListe.push(
            <option value="" key="">
                Velg mål{' '}
            </option>
        );
        if (this.state.valgtKategori) {
            redigerComponentListe.push(
                <option
                    value={this.state.valgtKategori}
                    key={this.state.valgtKategori}
                >
                    {this.state.valgtKategori}
                </option>
            );
        }
        const liste = this.props.ledigeMaalkategorier
            .filter(mal => mal !== this.state.valgtKategori)
            .map((mal, index) => (
                <option value={mal} key={index}>
                    {mal}
                </option>
            ));
        redigerComponentListe.push(...liste);
        return redigerComponentListe;
    };

    render() {
        return (
            <>
                <Select
                    className="rediger-maal__kategori-dropdown"
                    label="Hva er målet med arbeidstreningen?"
                    value={this.state.valgtKategori}
                    onChange={this.velgKategori}
                    feil={this.state.valgtKategoriFeil}
                    onBlur={this.velgKategori}
                >
                    {this.genererKategoriListe()}
                </Select>
                <Textarea
                    label="Beskriv målet"
                    value={this.state.beskrivelse}
                    onChange={this.settBeskrivelse}
                    maxLength={1000}
                    tellerTekst={this.lagTellerTekst}
                    feil={this.state.beskrivelseFeil}
                    onBlur={this.settBeskrivelse}
                />
                <LagreKnapp
                    lagre={this.lagre}
                    label={'Lagre mål'}
                    className={'rediger-maal__lagre-knapp'}
                />
                <Flatknapp onClick={this.avbrytKnappOnClick}>Avbryt</Flatknapp>
            </>
        );
    }
}

export default RedigerMaal;
