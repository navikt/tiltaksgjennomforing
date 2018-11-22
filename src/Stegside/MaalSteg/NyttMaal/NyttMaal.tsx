import * as React from 'react';
import { Context, medContext } from '../../AvtaleContext';
import { Select, Textarea } from 'nav-frontend-skjema';
import { Maalkategori } from '../../maalkategorier';
import { Hovedknapp } from 'nav-frontend-knapper';
import { guid } from 'nav-frontend-js-utils';

interface Props {
    skjulNyttMaalForm: () => {};
}

interface State {
    valgtKategori: Maalkategori;
    beskrivelse: string;
}

class NyttMaal extends React.Component<Context & Props, State> {
    maalListe: Maalkategori[] = [
        'Utprøving',
        'Arbeidserfaring',
        'Språkopplæring',
        'Oppnå fagbrev/kompetansebevis',
        'Få jobb i bedriften',
        'Annet',
    ];

    state = {
        valgtKategori: this.maalListe[0],
        beskrivelse: '',
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

    lagreMaal = () => {
        const maal = this.props.avtale.maal;
        this.props.avtale.maal.push({
            id: guid(),
            kategori: this.state.valgtKategori,
            beskrivelse: this.state.beskrivelse,
        });
        this.props.settAvtaleVerdi('maal', maal);
        this.setState({
            valgtKategori: this.maalListe[0],
            beskrivelse: '',
        });
        this.props.skjulNyttMaalForm();
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
                    onClick={this.lagreMaal}
                >
                    Lagre mål
                </Hovedknapp>
            </>
        );
    }
}

export default medContext(NyttMaal);
