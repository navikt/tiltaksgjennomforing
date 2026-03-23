import React, { useContext } from 'react';
import { Alert, Detail, Heading } from '@navikt/ds-react';
import { addDays, differenceInDays, endOfDay, max } from 'date-fns';

import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';

import Nytt from '@/komponenter/NyttIAppen/Nytt';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import nyheter from '@/komponenter/NyttIAppen/nyheter';
import { Avtale } from '@/types';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { formaterDato, NORSK_DATO_FORMAT_FULL } from '@/utils/datoUtils';
import { useAvtale } from '@/AvtaleProvider';
import { useFeatureToggles } from '@/FeatureToggles';

import './Banner.less';

interface Props {
    tekst: string;
    undertittel?: string;
}

const TOLV_UKER_I_DAGER = 7 * 12;
const FORSTE_SEPTEMBER_2025 = endOfDay(new Date('2025-09-01'));

const formaterSlettetidspunkt = (avtale: Avtale) => {
    const { sistEndret, opphav, tiltakstype } = avtale;
    const tolvUkerEtterSistEndret = addDays(endOfDay(sistEndret), TOLV_UKER_I_DAGER);

    const slettetidspunkt =
        opphav === 'ARENA' && tiltakstype === 'VTAO'
            ? max([FORSTE_SEPTEMBER_2025, tolvUkerEtterSistEndret])
            : tolvUkerEtterSistEndret;

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
    const erLangTittel = props.tekst.length > 40;

    return (
        innloggetBruker.erNavAnsatt && (
            <>
                <div className="banner-veileder-container">
                    <div className="banner-veileder" role="banner">
                        <div>
                            <Heading
                                className={erLangTittel ? 'banner-lang-tittel' : ''}
                                size="large"
                                role="heading"
                                aria-level={1}
                            >
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
                                åpneVedFørsteBesøk={true}
                                nyheter={nyheter}
                                tittel="Nytt i tiltaksgjennomføring"
                                navn="Tiltaksgjennomføring"
                            />
                        </div>
                    </div>
                </div>
                {avtale && pabegyntAvtaleRyddeJobb && ['PÅBEGYNT', 'MANGLER_GODKJENNING'].includes(avtale.status) && (
                    <Alert variant="info">
                        Avtalen vil automatisk slettes dersom den ikke blir inngått eller endret innen{' '}
                        {formaterSlettetidspunkt(avtale)}.
                    </Alert>
                )}
            </>
        )
    );
};

export default BannerNAVAnsatt;
