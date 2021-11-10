import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import React, { FunctionComponent, useContext } from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import ProsentInput from '@/komponenter/form/ProsentInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

export enum Kvalifiseringsgruppe {
    SPESIELT_TILPASSET_INNSATS = 'BATT', // Personen har nedsatt arbeidsevne og har et identifisert behov.
    SITUASJONSBESTEMT_INNSATS = 'BFORM', // Personen har moderat bistandsbehov
    VARIG_TILPASSET_INNSATS = 'VARIG', // Personen har varig nedsatt arbeidsevne
    BEHOV_FOR_ARBEIDSEVNEVURDERING = 'BKART', // Personen har behov for arbeidsevnevurdering
    STANDARD_INNSATS = 'IKVAL', // Personen har behov for ordinær bistand
    IKKE_VURDERT = 'IVURD', // Ikke vurdert
    RETTIGHETER_ETTER_FTRL_KAP11 = 'KAP11', // Rettigheter etter Ftrl. Kapittel 11
    HELSERELATERT_ARBEIDSRETTET_OPPFOLGING_I_NAV = 'OPPFI', // Helserelatert arbeidsrettet oppfølging i NAV
    SYKMELDT_OPPFOLGING_PA_ARBEIDSPLASSEN = 'VURDI', // Sykmeldt, oppfølging på arbeidsplassen
    SYKMELDT_UTEN_ARBEIDSGIVER = 'VURDU', // Sykmeldt uten arbeidsgiver
}

const KvalifiseringsgruppeSats: FunctionComponent = () => {
    const { avtale, settOgKalkulerBeregningsverdier } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);

    return (
        <>
            {innloggetBruker.erNavAnsatt ? (
                <>
                    {avtale.tiltakstype === 'VARIG_LONNSTILSKUDD' && (
                        <>
                            <Undertittel>Tilskuddsprosent</Undertittel>
                            <VerticalSpacer rem={1.25} />
                            <ProsentInput
                                name="lonnstilskuddProsent"
                                bredde="S"
                                label=""
                                value={avtale.lonnstilskuddProsent}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    settOgKalkulerBeregningsverdier({
                                        lonnstilskuddProsent: parseInt(event.target.value, 10),
                                    });
                                }}
                                min={0}
                                max={75}
                            />
                            <VerticalSpacer rem={1} />
                        </>
                    )}
                </>
            ) : (
                <>
                    <Normaltekst>
                        {avtale.lonnstilskuddProsent ? (
                            avtale.lonnstilskuddProsent + ' %'
                        ) : (
                            <>
                                {avtale.tiltakstype === 'VARIG_LONNSTILSKUDD' && 'Her kan NAV sette en sats.'}
                                {avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' &&
                                    'Her kan NAV sette en sats på 40% eller 60%'}
                                {avtale.tiltakstype === 'SOMMERJOBB' && 'Her kan NAV sette en sats på 50% eller 75%'}
                            </>
                        )}
                    </Normaltekst>
                    <VerticalSpacer rem={1} />
                </>
            )}
        </>
    );
};
export default KvalifiseringsgruppeSats;
