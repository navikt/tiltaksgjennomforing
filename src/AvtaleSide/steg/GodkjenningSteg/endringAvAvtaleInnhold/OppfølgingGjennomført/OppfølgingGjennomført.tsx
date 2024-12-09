import { AvtaleContext } from '@/AvtaleProvider';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import { oppdatereKontaktInformasjon } from '@/services/rest-service';
import { EndreKontaktInfo, TiltaksType, VTAO } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Neutral } from '@navikt/ds-icons/cjs';
import { BodyShort, Checkbox, Heading, Link } from '@navikt/ds-react';
import React, { FunctionComponent, useContext, useState } from 'react';

import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

const OppfølgingGjennomført: FunctionComponent = () => {
    const cls = BEMHelper('endreKontaktInformasjon');
    const { avtale, hentAvtale, settAvtaleInnholdVerdi } = useContext(AvtaleContext);
    const vtao = avtale.gjeldendeInnhold.vtao;

    const [modalApen, setModalApen] = useState(false);

    const type: TiltaksType = avtale.tiltakstype;
    const endreRefusjonInfo: boolean =
        type === 'MIDLERTIDIG_LONNSTILSKUDD' || type === 'VARIG_LONNSTILSKUDD' || type === 'SOMMERJOBB';

    const endreKontaktInformasjon = async (): Promise<void> => {
        //await oppdatereKontaktInformasjon(avtale, kontaktInfo);
        setModalApen(false);
        await hentAvtale(avtale.id);
    };

    return (
        <>
            <Link
                onClick={(event) => {
                    event.stopPropagation();
                    setModalApen(true);
                }}
                href="#"
                role="menuitem"
                className={cls.element('link')}
            >
                <div aria-hidden={true}>
                    <Neutral className={cls.element('ikon')} />
                </div>
                Oppfølging VTA-O Gjennomført
            </Link>
            <BekreftelseModal
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Fortsett"
                oversiktTekst="Oppfølging VTA-O Gjennomført"
                modalIsOpen={modalApen}
                bekreftOnClick={endreKontaktInformasjon}
                lukkModal={() => setModalApen(false)}
            >
                <BodyShort size="small">
                    Jeg bekrefter at det har blitt foretatt oppfølging av deltaker og vurdert at tiltaket skal
                    fortsette.
                </BodyShort>
            </BekreftelseModal>
        </>
    );
};

export default OppfølgingGjennomført;
