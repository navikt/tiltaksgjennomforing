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
import { Context, medContext } from '../AvtaleContext';

const Stegmeny = (props: Context) => {
    const menySteg = [
        {
            label: 'Kontaktinformasjon',
            url: pathTilKontaktinformasjonSteg(props.avtale.id),
        },
        { label: 'Mål', url: pathTilMaalSteg(props.avtale.id) },
        {
            label: 'Arbeidsoppgaver',
            url: pathTilArbeidsoppgaverSteg(props.avtale.id),
        },
        {
            label: 'Dato og arbeidstid',
            url: pathTilArbeidstidSteg(props.avtale.id),
        },
        { label: 'Oppfølging', url: pathTilOppfolgingSteg(props.avtale.id) },
        { label: 'Signering', url: pathTilSigneringSteg(props.avtale.id) },
    ];

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

export default medContext(Stegmeny);
