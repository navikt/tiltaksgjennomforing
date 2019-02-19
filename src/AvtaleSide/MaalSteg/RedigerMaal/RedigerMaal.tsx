import { Flatknapp } from 'nav-frontend-knapper';
import { Select, Textarea } from 'nav-frontend-skjema';
import * as React from 'react';
import LagreKnapp from '../../../komponenter/LagreKnapp/LagreKnapp';
import { Maal } from '../../avtale';
import { Maalkategori } from '../../maalkategorier';
import ApiError from '../../../api-error';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';

interface Props {
    lagreMaal: (maal: Maal) => Promise<any>;
    avbrytRedigering: () => void;
    defaultMaal?: Maal;
    ledigeMaalkategorier: Maalkategori[];
}

interface State {
    valgtKategori: Maalkategori;
    beskrivelse: string;
    beskrivelseFeil?: SkjemaelementFeil;
    valgtKategoriFeil?: SkjemaelementFeil;
}

class RedigerMaal extends React.Component<Props, State> {
    state = {
        valgtKategori:
            (this.props.defaultMaal && this.props.defaultMaal.kategori) ||
            this.props.ledigeMaalkategorier[0],
        beskrivelse:
            (this.props.defaultMaal && this.props.defaultMaal.beskrivelse) ||
            '',
        beskrivelseFeil: undefined,
        valgtKategoriFeil: undefined,
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
        this.setState({
            beskrivelse: event.currentTarget.value,
        });

        event.currentTarget.value
            ? this.setState({ beskrivelseFeil: undefined })
            : this.setState({
                  beskrivelseFeil: { feilmelding: 'Feltet kan ikke være tomt' },
              });
    };

    lagre = () => {
        if (this.state.beskrivelse && this.state.valgtKategori) {
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
        this.props.avbrytRedigering();
    };

    lagTellerTekst = (antallTegn: number, maxLength: number) => {
        return maxLength - antallTegn;
    };

    render() {
        const maalKategorier = this.props.ledigeMaalkategorier.map(maal => (
            <option value={maal} key={maal}>
                {maal}
            </option>
        ));

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
                    {maalKategorier}
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
