import React, { FunctionComponent, useContext, useState } from 'react';
import { AvtaleContext } from '@/AvtaleProvider';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import BEMHelper from '@/utils/bem';
import Lenke from 'nav-frontend-lenker';
import { EndreOppfølgingOgTilretteleggingInfo } from '@/types/avtale';
import { MeetingRoom } from '@navikt/ds-icons/cjs';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { oppdatereOppfølgingOgTilretteleggingInformasjon } from '@/services/rest-service';

import './EndreOppfølgingOgTilrettelegging.less';
import { Undertittel } from 'nav-frontend-typografi';

const EndreOppfølgingOgTilrettelegging: FunctionComponent = () => {
    const cls = BEMHelper('endreOppfølgingOgTilrettelegging');
    const context = useContext(AvtaleContext);
    const { oppfolging, tilrettelegging } = context.avtale;
    const [modalApen, setModalApen] = useState(false);

    const [oppfølgingOgTilretteleggingInfo, setOppfølgingOgTilretteleggingInfo] = useState<
        EndreOppfølgingOgTilretteleggingInfo
    >({
        oppfolging: oppfolging,
        tilrettelegging: tilrettelegging,
    });

    const endreOppfølgingOgTilretteleggingInformasjon = async (): Promise<void> => {
        try {
            await oppdatereOppfølgingOgTilretteleggingInformasjon(context.avtale, oppfølgingOgTilretteleggingInfo);
        } catch (err) {
            console.warn('feilet med å lagre oppdaterte beregninger: ', err);
        }
        setModalApen(false);
        await context.hentAvtale(context.avtale.id);
    };

    const settNyOppfølgingOgTilretteleggingInformasjon = async <
        K extends keyof EndreOppfølgingOgTilretteleggingInfo,
        V extends EndreOppfølgingOgTilretteleggingInfo
    >(
        key: K,
        verdi: V[K]
    ) => {
        await setOppfølgingOgTilretteleggingInfo(prevState => ({
            ...prevState,
            [key]: verdi,
        }));
    };

    const endreOpfølgingOgTilretteleggeingInnhold = (
        <div className={cls.className}>
            <div className={cls.element('oppfølging')}>
                <div className={cls.element('tittel')}>
                    <Undertittel>Oppfølging</Undertittel>
                </div>
                <div className={cls.element('textareafelt')}>
                    <PakrevdTextarea
                        label="Beskriv hvilken oppfølging dere har avtalt"
                        verdi={oppfølgingOgTilretteleggingInfo.oppfolging}
                        placeholder="Begrunnelse (påkrevd)"
                        settVerdi={verdi => settNyOppfølgingOgTilretteleggingInformasjon('oppfolging', verdi)}
                        maxLengde={500}
                        feilmelding="Begrunnelse er påkrevd"
                    />
                </div>
            </div>
            <div className={cls.element('tittel')}>
                <Undertittel>Tilrettelegging</Undertittel>
            </div>
            <div className={cls.element('textareafelt')}>
                <PakrevdTextarea
                    label="Beskriv hvilken tilrettelegging dere har avtalt"
                    verdi={oppfølgingOgTilretteleggingInfo.tilrettelegging}
                    placeholder="Begrunnelse (påkrevd)"
                    settVerdi={verdi => settNyOppfølgingOgTilretteleggingInformasjon('tilrettelegging', verdi)}
                    maxLengde={500}
                    feilmelding="Begrunnelse er påkrevd"
                />
            </div>
        </div>
    );

    return (
        <>
            <Lenke
                onClick={event => {
                    event.stopPropagation();
                    setModalApen(true);
                }}
                href="#"
                role="menuitem"
                className={cls.element('lenke')}
            >
                <div aria-hidden={true}>
                    <MeetingRoom className={cls.element('ikon')} />
                </div>
                Endre Oppfølging og Tilrettelegging
            </Lenke>
            <BekreftelseModal
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Endre"
                oversiktTekst="Endre oppfølging og tilrettelegging"
                modalIsOpen={modalApen}
                bekreftOnClick={endreOppfølgingOgTilretteleggingInformasjon}
                lukkModal={() => setModalApen(false)}
                varselTekst={endreOpfølgingOgTilretteleggeingInnhold}
            />
        </>
    );
};
export default EndreOppfølgingOgTilrettelegging;
