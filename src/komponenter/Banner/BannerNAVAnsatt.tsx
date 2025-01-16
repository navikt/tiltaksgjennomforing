import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import amplitude from 'amplitude-js';
import { Heading, Detail, Alert } from '@navikt/ds-react';
import React, { useContext } from 'react';
import VerticalSpacer from '../layout/VerticalSpacer';
import nyheter from '../NyttIAppen/nyheter';
import Nytt from '../NyttIAppen/Nytt';
import './Banner.less';
import { useAvtale } from '@/AvtaleProvider';
import { useFeatureToggles } from '@/FeatureToggleProvider';
import { addDays, max, differenceInDays, endOfDay } from 'date-fns';
import { formaterDato, NORSK_DATO_FORMAT_FULL } from '@/utils/datoUtils';

interface Props {
    tekst: string;
    undertittel?: string;
}

const TOLV_UKER_I_DAGER = 7 * 12;
const STARTDATO_FOR_RYDDING = endOfDay(new Date('2024-11-28'));

const formaterSlettetidspunkt = (sistEndret: string) => {
    const sistEndretPlussTolvUker = addDays(endOfDay(sistEndret), TOLV_UKER_I_DAGER);
    const slettetidspunkt = max([STARTDATO_FOR_RYDDING, sistEndretPlussTolvUker]);

    const antallDager = Math.abs(differenceInDays(new Date(), slettetidspunkt));

    if (antallDager === 0) {
        return `kl. 23:59 i dag`;
    }
    if (antallDager === 1) {
        return `24 timer`;
    }
    if (antallDager < 14) {
        return `${antallDager} dager`;
    }
    return `den ${formaterDato(slettetidspunkt, NORSK_DATO_FORMAT_FULL)}`;
};

const BannerNAVAnsatt: React.FunctionComponent<Props> = (props) => {
    const { avtale } = useAvtale();
    const { pabegyntAvtaleRyddeJobb } = useFeatureToggles();
    const innloggetBruker = useContext(InnloggetBrukerContext);

    return innloggetBruker.erNavAnsatt && avtale ? (
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
            {pabegyntAvtaleRyddeJobb && ['PÅBEGYNT', 'MANGLER_GODKJENNING'].includes(avtale.status) && (
                <Alert variant="info">
                    Avtalen vil automatisk slettes dersom den ikke blir inngått eller endret innen{' '}
                    {formaterSlettetidspunkt(avtale.sistEndret)}.
                </Alert>
            )}
        </>
    ) : null;
};

export default BannerNAVAnsatt;
