import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { BodyShort, Heading } from '@navikt/ds-react';
import { FunctionComponent, useContext } from 'react';
import LonnstilskuddProsent from './Lonnstilskuddprosent';

const OppgiLonnstilskuddprosent: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale, settOgKalkulerBeregningsverdier } = useContext(AvtaleContext);

    return (
        <div>
            <Heading size="small">Tilskuddsprosent</Heading>
            <VerticalSpacer rem={1} />
            {innloggetBruker.erNavAnsatt && (
                <>
                    <BodyShort size="small">Velg sats for refusjon som arbeidsgiver skal få tilbake</BodyShort>
                    <LonnstilskuddProsent
                        tiltakstype={avtale.tiltakstype}
                        lonnstilskuddProsent={avtale.gjeldendeInnhold.lonnstilskuddProsent}
                        settLonnstilskuddProsent={(verdi) =>
                            settOgKalkulerBeregningsverdier({ lonnstilskuddProsent: verdi })
                        }
                    />
                </>
            )}
            {!innloggetBruker.erNavAnsatt && (
                <>
                    {avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' && 'Her kan NAV sette en sats på 40% eller 60%'}
                    {avtale.tiltakstype === 'VARIG_LONNSTILSKUDD' && 'Her kan NAV sette en sats.'}
                    {avtale.tiltakstype === 'SOMMERJOBB' && 'Her kan NAV sette en sats på 50% eller 75%'}
                </>
            )}
            <VerticalSpacer rem={2} />
        </div>
    );
};

export default OppgiLonnstilskuddprosent;
