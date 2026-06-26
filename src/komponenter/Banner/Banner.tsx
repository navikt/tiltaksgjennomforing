import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { NotifikasjonWidget } from '@navikt/arbeidsgiver-notifikasjon-widget';
import { Detail, Heading } from '@navikt/ds-react';
import { Virksomhetsvelger } from '@navikt/virksomhetsvelger';
import '@navikt/virksomhetsvelger/dist/assets/style.css';
import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import VerticalSpacer from '../layout/VerticalSpacer';
import styles from './banner.module.less';
import classNames from 'classnames';

interface Props {
    tekst: string;
    byttetOrg?: (org: string) => void;
    undertittel?: string;
    valgtOrganisasjon?: string;
}

const Banner: React.FunctionComponent<Props> = ({ tekst, byttetOrg, undertittel, valgtOrganisasjon }) => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const [searchParams] = useSearchParams();
    const bedriftParam = searchParams.get('bedrift');
    const erLangTittel = tekst.length > 30;

    const bedriftsmenyTittel = (
        <>
            <Heading className={classNames({ [styles.bannerLangTittel]: erLangTittel })} size="large">
                {tekst}
            </Heading>
            {undertittel && <Detail style={{ marginTop: '0.25rem', fontWeight: 'bold' }}>{undertittel}</Detail>}
        </>
    );

    switch (innloggetBruker.rolle) {
        case 'ARBEIDSGIVER':
            return (
                <div className={styles.arbeidsgiverBanner}>
                    <div className={styles.bannerInnhold}>
                        <div className={styles.arbeidsgiverBannerInnhold}>
                            <div className={styles.arbeidsgiverBannerHeader}>{bedriftsmenyTittel}</div>
                            <div className={styles.arbeidsgiverBannerWidgets}>
                                <Virksomhetsvelger
                                    organisasjoner={innloggetBruker.altinnTilganger.hierarki}
                                    initValgtOrgnr={bedriftParam || valgtOrganisasjon}
                                    onChange={(org) => byttetOrg?.(org.orgnr)}
                                />
                                <NotifikasjonWidget />
                            </div>
                        </div>
                    </div>
                </div>
            );
        case 'DELTAKER':
        case 'MENTOR':
            return (
                <div className={styles.mentorBanner}>
                    <Heading
                        className={erLangTittel ? styles.bannerLangTittel : ''}
                        size="large"
                        role="heading"
                        aria-level={1}
                    >
                        {tekst}
                    </Heading>
                    {undertittel && (
                        <>
                            <VerticalSpacer rem={0.5} />
                            <Detail style={{ fontWeight: 'bold' }}>{undertittel}</Detail>
                        </>
                    )}
                </div>
            );
        default:
            return null;
    }
};

export default Banner;
