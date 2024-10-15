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

const TOLV_UKER_I_DAGER = 7 * 12;
const START_DATO_FOR_RYDDING = moment('2024-11-28').endOf('day');

const formaterSlettetidspunkt = (sistEndret: string) => {
    const sistEndretPlussTolvUker = moment(sistEndret).endOf('day').add(TOLV_UKER_I_DAGER, 'days');
    const slettetidspunkt = START_DATO_FOR_RYDDING.isAfter(sistEndretPlussTolvUker)
        ? START_DATO_FOR_RYDDING
        : sistEndretPlussTolvUker;

    const antallDager = slettetidspunkt.diff(moment(), 'days');

    if (antallDager === 0) {
        return `kl. 23:59 i dag`;
    }
    if (antallDager === 1) {
        return `24 timer`;
    }
    if (antallDager < 14) {
        return `${antallDager} dager`;
    }
    return `den ${slettetidspunkt.format('DD.MM.YYYY')}`;
};

const BannerNAVAnsatt: React.FunctionComponent<Props> = (props) => {
    const { avtale } = useAvtale();
    const { pabegyntAvtaleRyddeJobb } = useFeatureToggles();
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
            {pabegyntAvtaleRyddeJobb && ['PÅBEGYNT', 'MANGLER_GODKJENNING'].includes(avtale?.statusSomEnum) && (
                <Alert variant="info">
                    Avtalen vil automatisk slettes dersom den ikke blir inngått eller endret innen{' '}
                    {formaterSlettetidspunkt(avtale.sistEndret)}.
                </Alert>
            )}
        </>
    ) : null;
};

export default BannerNAVAnsatt;
