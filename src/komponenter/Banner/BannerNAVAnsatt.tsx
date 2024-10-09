import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import amplitude from 'amplitude-js';
import { Heading, Detail, Alert } from '@navikt/ds-react';
import React, { useContext } from 'react';
import VerticalSpacer from '../layout/VerticalSpacer';
import nyheter from '../NyttIAppen/nyheter';
import Nytt from '../NyttIAppen/Nytt';
import './Banner.less';
import moment from 'moment/moment';
import { useAvtale } from '@/AvtaleProvider';
import { useFeatureToggles } from '@/FeatureToggleProvider';

interface Props {
    tekst: string;
    undertittel?: string;
}

const formatertDato = (sistEndret: string) => {
    const sistEndretPlussTolvUker = moment(sistEndret).startOf('day').add(12, 'weeks');
    const dager = sistEndretPlussTolvUker.diff(moment(), 'days');
    if (dager === 0) {
        return `kl. 23:59 i dag`;
    }
    if (dager === 1) {
        return `24 timer`;
    }
    if (dager < 14) {
        return `${dager} dager`;
    }
    return `den ${sistEndretPlussTolvUker.format('DD.MM.YYYY')}`;
};

const BannerNAVAnsatt: React.FunctionComponent<Props> = (props) => {
    const { avtale } = useAvtale();
    const { 'pabegynt-avtale-rydde-jobb': isRyddejobbEnabled } = useFeatureToggles();
    const innloggetBruker = useContext(InnloggetBrukerContext);

    return innloggetBruker.erNavAnsatt ? (
        <>
            <div className="banner-veileder-container">
                <div className="banner-veileder" role="banner">
                    <div>
                        <Heading size="large" role="heading" aria-level={1}>
                            {props.tekst}
                        </Heading>

                        {props.undertittel && (
                            <>
                                <VerticalSpacer rem={0.5} />
                                <Detail style={{ fontWeight: 'bold' }}>{props.undertittel}</Detail>
                            </>
                        )}
                    </div>

                    <div>
                        <Nytt
                            onÅpneNyheter={() => amplitude.logEvent('#tiltak-nyheter-apnet')}
                            åpneVedFørsteBesøk={true}
                            nyheter={nyheter}
                            tittel="Nytt i tiltaksgjennomføring"
                            navn="Tiltaksgjennomføring"
                        />
                    </div>
                </div>
            </div>
            {isRyddejobbEnabled && ['PÅBEGYNT', 'MANGLER_GODKJENNING'].includes(avtale?.statusSomEnum) && (
                <Alert variant="info">
                    Avtalen vil automatisk utløpe dersom den ikke blir inngått eller endret innen{' '}
                    {formatertDato(avtale.sistEndret)}.
                </Alert>
            )}
        </>
    ) : null;
};

export default BannerNAVAnsatt;
