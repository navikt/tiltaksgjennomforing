import { AvtaleContext } from '@/AvtaleProvider';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { oppdatereOppfølgingOgTilretteleggingInformasjon } from '@/services/rest-service';
import { EndreOppfølgingOgTilretteleggingInfo } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { MeetingRoom } from '@navikt/ds-icons/cjs';
import { Heading, Link } from '@navikt/ds-react';
import React, { FunctionComponent, useContext, useState } from 'react';
import './EndreOppfølgingOgTilrettelegging.less';

const EndreOppfølgingOgTilrettelegging: FunctionComponent = () => {
    const cls = BEMHelper('endreOppfølgingOgTilrettelegging');
    const context = useContext(AvtaleContext);
    const { oppfolging, tilrettelegging } = context.avtale.gjeldendeInnhold;
    const [modalApen, setModalApen] = useState(false);

    const [oppfølgingOgTilretteleggingInfo, setOppfølgingOgTilretteleggingInfo] =
        useState<EndreOppfølgingOgTilretteleggingInfo>({
            oppfolging: oppfolging,
            tilrettelegging: tilrettelegging,
        });

    const endreOppfølgingOgTilretteleggingInformasjon = async (): Promise<void> => {
        await oppdatereOppfølgingOgTilretteleggingInformasjon(context.avtale, oppfølgingOgTilretteleggingInfo);
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
        await setOppfølgingOgTilretteleggingInfo((prevState) => ({
            ...prevState,
            [key]: verdi,
        }));
    };

    const endreOpfølgingOgTilretteleggeingInnhold = (
        <div className={cls.className}>
            <div className={cls.element('oppfølging')}>
                <div className={cls.element('tittel')}>
                    <Heading size="small">Oppfølging</Heading>
                </div>
                <div className={cls.element('textareafelt-wrapper')}>
                    <PakrevdTextarea
                        className={cls.element('textareafelt')}
                        label="Beskriv hvilken oppfølging dere har avtalt"
                        verdi={oppfølgingOgTilretteleggingInfo.oppfolging}
                        settVerdi={(verdi) => settNyOppfølgingOgTilretteleggingInformasjon('oppfolging', verdi)}
                        maxLengde={1000}
                        feilmelding="Oppfølging er påkrevd"
                    />
                </div>
            </div>
            <div className={cls.element('Tilrettelegging')}>
                <div className={cls.element('tittel')}>
                    <Heading size="small">Tilrettelegging</Heading>
                </div>
                <div className={cls.element('textareafelt-wrapper')}>
                    <PakrevdTextarea
                        className={cls.element('textareafelt')}
                        label="Beskriv hvilken tilrettelegging dere har avtalt"
                        verdi={oppfølgingOgTilretteleggingInfo.tilrettelegging}
                        settVerdi={(verdi) => settNyOppfølgingOgTilretteleggingInformasjon('tilrettelegging', verdi)}
                        maxLengde={1000}
                        feilmelding="Tilrettelegging er påkrevd"
                    />
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Link
                onClick={(event) => {
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
                Endre oppfølging og tilrettelegging
            </Link>
            <BekreftelseModal
                style={{ minWidth: '35rem' }}
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Endre"
                oversiktTekst="Endre oppfølging og tilrettelegging"
                modalIsOpen={modalApen}
                bekreftOnClick={endreOppfølgingOgTilretteleggingInformasjon}
                lukkModal={() => setModalApen(false)}
                modalInnhold={endreOpfølgingOgTilretteleggeingInnhold}
            />
        </>
    );
};
export default EndreOppfølgingOgTilrettelegging;
