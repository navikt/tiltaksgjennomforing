import * as React from 'react';
import { SkjemaGruppe, Input } from 'nav-frontend-skjema';
import './ArbeidsgiverinfoDel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import { Context, medContext } from '../../../AvtaleContext';
import PakrevdInput from '../../../komponenter/PakrevdInput/PakrevdInput';
import { Avtale } from '../../avtale';

const ArbeidsgiverinfoDel = (props: Context) => {
    const onChange = (label: keyof Avtale) => {
        return (event: any) => props.settAvtaleVerdi(label, event.target.value);
    };

    const bedriftInfo = (
        <SkjemaGruppe title="Om bedriften">
            <div className="arbeidsgiverbedriftrad">
                <PakrevdInput
                    className="arbeidsgiverbedriftrad__fornavn"
                    label="Bedriftens navn"
                    verdi={props.avtale.bedriftNavn}
                    onChange={onChange('bedriftNavn')}
                />

                <Input
                    className="arbeidsgiverbedriftrad__bedriftnr"
                    label="Bedriftsnummer"
                    value={props.avtale.bedriftNr}
                    disabled={true}
                />
            </div>
        </SkjemaGruppe>
    );

    const arbeidsgiverInfo = (
        <SkjemaGruppe title="Kontaktperson for avtalen">
            <div className="arbeidsgiverkontaktpersonrad">
                <PakrevdInput
                    className="arbeidsgiverkontaktpersonrad__fornavn"
                    label="Fornavn"
                    verdi={props.avtale.arbeidsgiverFornavn}
                    onChange={onChange('arbeidsgiverFornavn')}
                />
                <PakrevdInput
                    className="arbeidsgiverkontaktpersonrad__etternavn"
                    label="Etternavn"
                    verdi={props.avtale.arbeidsgiverEtternavn}
                    onChange={onChange('arbeidsgiverEtternavn')}
                />
            </div>
            <div className="arbeidsgiverkontaktpersonrad">
                <PakrevdInput
                    className="arbeidsgiverkontaktpersonrad__tlf"
                    label="Telefonnummer"
                    verdi={props.avtale.arbeidsgiverTlf}
                    onChange={onChange('arbeidsgiverTlf')}
                />
            </div>
        </SkjemaGruppe>
    );

    return (
        <>
            <Systemtittel className="arbeidsgiver-tittel">
                Informasjon om arbeidsgiver
            </Systemtittel>
            {bedriftInfo}
            {arbeidsgiverInfo}
        </>
    );
};

export default medContext<{}>(ArbeidsgiverinfoDel);
