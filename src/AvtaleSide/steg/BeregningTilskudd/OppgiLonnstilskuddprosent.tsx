import {AvtaleContext} from '@/AvtaleProvider';
import {InnloggetBrukerContext} from '@/InnloggingBoundary/InnloggingBoundary';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import {Normaltekst, Undertittel} from 'nav-frontend-typografi';
import {FunctionComponent, useContext} from 'react';
import LonnstilskuddProsent from './Lonnstilskuddprosent';

const OppgiLonnstilskuddprosent: FunctionComponent = () => {
  const innloggetBruker = useContext(InnloggetBrukerContext);
  const {avtale, settOgKalkulerBeregningsverdier} = useContext(AvtaleContext);

  return (
      <div>
        <Undertittel>Tilskuddsprosent</Undertittel>
        <VerticalSpacer rem={1}/>
            {innloggetBruker.erNavAnsatt && (
                <>
                    <Normaltekst>Velg sats for refusjon som arbeidsgiver skal få tilbake</Normaltekst>
                    <LonnstilskuddProsent
                        tiltakstype={avtale.tiltakstype}
                        lonnstilskuddProsent={avtale.gjeldendeInnhold.lonnstilskuddProsent}
                        settLonnstilskuddProsent={(verdi) =>
                            settOgKalkulerBeregningsverdier({lonnstilskuddProsent: verdi})
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
