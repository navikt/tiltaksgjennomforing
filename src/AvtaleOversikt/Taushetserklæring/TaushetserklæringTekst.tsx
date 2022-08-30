import EksternLenke from '@/komponenter/navigation/EksternLenke';
import BEMHelper from '@/utils/bem';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';

const TausetserklæringTekst = () => {
    const cls = BEMHelper('etterRegistrering');
    return (
        <div style={{ padding: '0.5rem' }}>
            <Systemtittel>Taushetsplikt for avtale</Systemtittel>
            <p>
                Forvaltningsloven, arbeids- og velferdsforvaltningsloven og lov om sosiale tjenester i arbeids- og
                velferdsforvaltningen inneholder strenge regler om taushetsplikt. Det skal bevares taushet om alle
                opplysninger en i medfør av arbeid for NAV får om noens personlige forhold. Taushetsplikten gjelder også
                opplysninger som fødested, fødselsdato, personnummer, statsborgerforhold, sivilstand, yrke, bosted og
                arbeidssted. I tillegg vil taushetsplikten kunne omfatte opplysninger om drifts- eller
                forretningsforhold som det vil være av konkurransemessig betydning å hemmeligholde av hensyn til den
                opplysningen gjelder.
            </p>
            <p>
                Taushetsplikten innebærer både at man skal unnlate å avsløre opplysninger for andre og aktivt hindre at
                uvedkommende får tilgang eller kjennskap til taushetsbelagte opplysninger. Taushetsplikten gjelder også
                overfor andre som utfører arbeid for NAV med mindre det foreligger tjenstlige behov.
            </p>
            <p>
                Taushetsplikten gjelder både i arbeidet og i fritiden. Taushetsplikten består også etter at tjeneste
                eller arbeid er utført. Opplysninger som er underlagt taushetsplikt, kan heller ikke utnyttes i egen
                virksomhet eller i tjeneste eller arbeid for andre.
            </p>
            <p>
                Reglene om taushetsplikt gjelder alle som utfører arbeid for NAV. Alle plikter derfor å sette seg inn i
                reglene om taushetsplikt.
            </p>
            <p>
                Alle som utfører arbeid for NAV, skal videre hindre at opplysninger om sikkerhetsrutiner og
                sikkerhetsinstrukser som regulerer NAVs sikkerhet gjøres kjent for uvedkommende.
            </p>
            <p>
                Brudd på taushetsplikten kan medføre konsekvenser for det relevante kontraktuelle forhold og
                straffeansvar etter straffeloven §§ 209 og 210.
            </p>
            <div style={{ padding: '1rem', lineHeight: '0.5rem', fontSize: '0.9rem' }}>
                <Systemtittel>Hva sier regelverket?</Systemtittel>
                <div className={cls.element('lenker')}>
                    <EksternLenke
                        className={cls.element('lenke')}
                        href={'https://lovdata.no/dokument/NL/lov/2006-06-16-20/KAPITTEL_2#%C2%A77'}
                    >
                        ARBEIDS- OG VELFERDSFORVALTNINGSLOVEN § 7
                    </EksternLenke>

                    <EksternLenke
                        className={cls.element('lenke')}
                        href={'https://lovdata.no/dokument/NL/lov/1967-02-10/KAPITTEL_3#%C2%A713e'}
                    >
                        Lenke til FORVALTNINGSLOVEN § 13-13E OG 13G
                    </EksternLenke>

                    <EksternLenke
                        className={cls.element('lenke')}
                        href={'https://lovdata.no/dokument/NL/lov/2005-05-20-28/KAPITTEL_2-6#%C2%A7209'}
                    >
                        STRAFFELOVEN §§ 209 OG 210
                    </EksternLenke>
                    <EksternLenke
                        className={cls.element('lenke')}
                        href={'https://lovdata.no/dokument/NL/lov/2009-12-18-131/KAPITTEL_5#%C2%A744'}
                    >
                        LOV OM SOSIALE TJENESTER I ARBEIDS OG VELFERDSFORVALTNINGEN § 44
                    </EksternLenke>
                </div>
            </div>
        </div>
    );
};
export default TausetserklæringTekst;
