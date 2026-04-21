import { useAvtale } from '@/AvtaleProvider';
import { useFeatureToggles } from '@/FeatureToggles';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import nyheter from '@/komponenter/NyttIAppen/nyheter';
import Nytt from '@/komponenter/NyttIAppen/Nytt';
import { Avtale } from '@/types';
import { formaterDato, NORSK_DATO_FORMAT_FULL } from '@/utils/datoUtils';
import { Alert, Detail, Heading } from '@navikt/ds-react';
import { addDays, differenceInDays, endOfDay, max } from 'date-fns';
import React, { useContext } from 'react';

import './Banner.less';

interface Props {
    tekst: string;
    undertittel?: string;
}

const TOLV_UKER_I_DAGER = 7 * 12;
const FORSTE_JUNI_2026 = endOfDay(new Date('2026-06-01'));

const formaterSlettetidspunkt = (avtale: Avtale) => {
    const { sistEndret, opphav, tiltakstype, gjeldendeInnhold } = avtale;
    const tolvUkerEtterSistEndret = addDays(endOfDay(sistEndret), TOLV_UKER_I_DAGER);

    const slettetidspunkt =
        (opphav === 'ARENA' || gjeldendeInnhold.innholdType === 'ENDRET_AV_ARENA') && tiltakstype === 'MENTOR'
            ? max([FORSTE_JUNI_2026, tolvUkerEtterSistEndret])
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
