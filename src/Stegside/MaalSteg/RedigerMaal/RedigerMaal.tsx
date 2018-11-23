import * as React from 'react';
import { Select, Textarea } from 'nav-frontend-skjema';
import { Maalkategori } from '../../maalkategorier';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Maal } from '../../avtale';
import { guid } from 'nav-frontend-js-utils';
import * as moment from 'moment';

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

    lagreKnappOnClick = () => {
        this.props.lagreMaal({
            id: (this.props.defaultMaal && this.props.defaultMaal.id) || guid(),
            opprettetTimestamp:
                (this.props.defaultMaal &&
                    this.props.defaultMaal.opprettetTimestamp) ||
                moment().valueOf(),
            kategori: this.state.valgtKategori,
            beskrivelse: this.state.beskrivelse,
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
                    onClick={this.lagreKnappOnClick}
                >
                    Lagre mål
                </Hovedknapp>
            </>
        );
    }
}

export default RedigerMaal;
