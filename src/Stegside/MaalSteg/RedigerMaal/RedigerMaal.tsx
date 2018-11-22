import * as React from 'react';
import { Select, Textarea } from 'nav-frontend-skjema';
import { Maalkategori } from '../../maalkategorier';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Maal } from '../../avtale';
import { guid } from 'nav-frontend-js-utils';

interface Props {
    lagreMaal: (maal: Maal) => void;
    defaultMaal?: Maal;
}

interface State {
    valgtKategori: Maalkategori;
    beskrivelse: string;
}

class RedigerMaal extends React.Component<Props, State> {
    maalListe: Maalkategori[] = [
        'Utprøving',
        'Arbeidserfaring',
        'Språkopplæring',
        'Oppnå fagbrev/kompetansebevis',
        'Få jobb i bedriften',
        'Annet',
    ];

    state = {
        valgtKategori:
            (this.props.defaultMaal && this.props.defaultMaal.kategori) ||
            this.maalListe[0],
        beskrivelse:
            (this.props.defaultMaal && this.props.defaultMaal.beskrivelse) ||
            '',
    };

    velgKategori = (event: React.FormEvent<HTMLSelectElement>) => {
        this.setState({
            valgtKategori: event.currentTarget.value as Maalkategori,
        });
    };

    settBeskrivelse = (event: any) => {
        this.setState({
            beskrivelse: event.currentTarget.value,
        });
    };

    lagTellerTekst = (antallTegn: number, maxLength: number) => {
        return maxLength - antallTegn;
    };

    render() {
        const maalKategorier = this.maalListe.map(maal => (
            <option value={maal} key={maal}>
                {maal}
            </option>
        ));

        return (
            <>
                <Select
                    className="nytt-maal__kategori-dropdown"
                    label="Hva er målet med arbeidstreningen?"
                    selected={this.state.valgtKategori}
                    onChange={this.velgKategori}
                >
                    {maalKategorier}
                </Select>
                <Textarea
                    label="Besktiv målet"
                    value={this.state.beskrivelse}
                    onChange={this.settBeskrivelse}
                    maxLength={1000}
                    tellerTekst={this.lagTellerTekst}
                />
                <Hovedknapp
                    className="nytt-maal__lagre-knapp"
                    htmlType="button"
                    onClick={() =>
                        this.props.lagreMaal({
                            id:
                                (this.props.defaultMaal &&
                                    this.props.defaultMaal.id) ||
                                guid(),
                            kategori: this.state.valgtKategori,
                            beskrivelse: this.state.beskrivelse,
                        })
                    }
                >
                    Lagre mål
                </Hovedknapp>
            </>
        );
    }
}

export default RedigerMaal;
