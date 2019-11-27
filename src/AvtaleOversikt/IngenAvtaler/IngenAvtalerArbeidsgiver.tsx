import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import BEMHelper from '@/utils/bem';
import { EtikettAdvarsel } from 'nav-frontend-etiketter';
import { Ingress, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext } from 'react';
import './IngenAvtalerArbeidsgiver.less';

type Props = {};

const cls = BEMHelper('ingenAvtalerArbeidsgiver');

const IngenAvtalerArbeidsgiver: FunctionComponent<Props> = props => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const harTilgangPaMinstEnOrg = innloggetBruker.organisasjoner.length > 0;
    const organisasjonsListe = innloggetBruker.organisasjoner.map(org => (
        <p>
            <EtikettAdvarsel>
                {org.bedriftNavn} ({org.bedriftNr})
            </EtikettAdvarsel>
        </p>
    ));

    return (
        <div>
            {harTilgangPaMinstEnOrg && (
                <div>
                    <Undertittel className={cls.element('header')}>Ingen avtaler</Undertittel>
                    <Ingress>Du har ingen avtaler her enda.</Ingress>
                    <Ingress>Du har tilgang på følgende bedrifter: {organisasjonsListe}</Ingress>
                    <Ingress>
                        Det har ikke blitt opprettet noen avtaler på noen av disse bedriftene, hvis du mener du skulle
                        hatt tilgang på en avtale registrert på en annen bedrift, mangler du tilgang i Altinn til denne
                        bedrften.
                    </Ingress>
                    <Ingress>
                        Du må enten ha rollen <i>Helse-, sosial- og velferdstjenester</i> eller enkelttjenesten{' '}
                        <i>Avtale om arbeidstrening.</i>{' '}
                        <EksternLenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                            Les mer om roller og rettigheter på Altinn.no
                        </EksternLenke>
                    </Ingress>
                </div>
            )}

            {!harTilgangPaMinstEnOrg && (
                <div>
                    <Systemtittel className={cls.element('header')}>Du mangler rettigheter i Altinn</Systemtittel>
                    <div>
                        <Ingress>
                            Du har ikke tilstrekkelig tilgang på noen bedriftsnummere. Bruk av vår
                            <ul>
                                <li>
                                    Du må bli tildelt riktig rolle/rettighet i Altinn. Du må enten ha rollen{' '}
                                    <i>Helse-, sosial- og velferdstjenester</i> eller enkelttjenesten{' '}
                                    <i>Avtale om arbeidstrening.</i>{' '}
                                    <EksternLenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                                        Les mer om roller og rettigheter på Altinn.no
                                    </EksternLenke>
                                </li>
                            </ul>
                        </Ingress>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IngenAvtalerArbeidsgiver;
