import * as React from 'react';
import StegmenyLenke from './StegmenyLenke/StegmenyLenke';
import './Stegmeny.less';
import {
    pathTilArbeidsoppgaverSteg,
    pathTilArbeidstidSteg,
    pathTilKontaktinformasjonSteg,
    pathTilMaalSteg,
    pathTilOppfolgingSteg,
    pathTilSigneringSteg,
} from '../../paths';

const menySteg = [
    { label: 'Kontaktinformasjon', url: pathTilKontaktinformasjonSteg },
    { label: 'Mål', url: pathTilMaalSteg },
    { label: 'Arbeidsoppgaver', url: pathTilArbeidsoppgaverSteg },
    { label: 'Dato og arbeidstid', url: pathTilArbeidstidSteg },
    { label: 'Oppfølging', url: pathTilOppfolgingSteg },
    { label: 'Signering', url: pathTilSigneringSteg },
];

const Stegmeny = () => {
    const stegLenker = menySteg.map(steg => (
        <StegmenyLenke
            label={steg.label}
            aktiv={false}
            ferdig={false}
            url={steg.url}
        />
    ));

    return <div className="stegmeny">{stegLenker}</div>;
};

export default Stegmeny;
