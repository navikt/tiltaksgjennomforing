import {AvtaleContext} from '@/AvtaleProvider';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import {Task} from '@navikt/ds-icons/cjs';
import Lenke from 'nav-frontend-lenker';

import React, {FunctionComponent, useContext, useState} from 'react';
import {Undertittel} from "nav-frontend-typografi";
import PakrevdInput from "@/komponenter/PakrevdInput/PakrevdInput";
import TelefonnummerInput from "@/komponenter/TelefonnummerInput/TelefonnummerInput";
import BEMHelper from "@/utils/bem";

const EndreOmMentor: FunctionComponent = () => {
    const cls = BEMHelper('endreOmMentor');
    const [modalApen, setModalApen] = useState(false);
    const {avtale, hentAvtale} = useContext(AvtaleContext);
    const {
        mentorFornavn,
        mentorEtternavn,
        mentorTlf,
    } = avtale.gjeldendeInnhold;
    const [mentorInfo, setMentorInfo] = useState({
        mentorFornavn: mentorFornavn,
        mentorEtternavn: mentorEtternavn,
        mentorTlf: mentorTlf
    })

    const lukkModal = () => {
        setModalApen(false);
    };
    const endreUtgifter = async () => {
       // await endreInkluderingstilskudd(avtale, inkluderingstilskuddsutgiftListe);
        await hentAvtale();
        setModalApen(false);
    };

    const endreOmMentorInnhold = (
        <div className={cls.className}>
            <div className={cls.element('tittel')}>
                <Undertittel>Informasjon om mentor</Undertittel>
                <div className={cls.element('inputfelter')}>
                    <PakrevdInput
                        label="Fornavn"
                        verdi={mentorInfo.mentorFornavn}
                        settVerdi={(verdi) => setMentorInfo({...mentorInfo, mentorFornavn:verdi})}
                    />
                    <PakrevdInput
                        label="Etternavn"
                        verdi={mentorInfo.mentorEtternavn}
                        settVerdi={(verdi) => setMentorInfo({...mentorInfo, mentorEtternavn:verdi})}
                    />
                    <TelefonnummerInput
                        label="Telefonnummer "
                        verdi={mentorInfo.mentorTlf}
                        settVerdi={(verdi) => setMentorInfo({...mentorInfo, mentorTlf:verdi})}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Lenke
                style={{display: 'flex', alignItems: 'center'}}
                onClick={(event) => {
                    event.stopPropagation();
                    setModalApen(true);
                }}
                href="#"
                role="menuitem"
            >
                <div style={{marginRight: '0.5rem'}} aria-hidden={true}>
                    <Task/>
                </div>
                Endre om Mentor
            </Lenke>
            <BekreftelseModal
                style={{maxWidth: '40rem'}}
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Endre"
                oversiktTekst="Endre om mentor"
                modalIsOpen={modalApen}
                bekreftOnClick={endreUtgifter}
                lukkModal={lukkModal}
                modalInnhold={endreOmMentorInnhold}
            />
        </>
    );
};

export default EndreOmMentor;
