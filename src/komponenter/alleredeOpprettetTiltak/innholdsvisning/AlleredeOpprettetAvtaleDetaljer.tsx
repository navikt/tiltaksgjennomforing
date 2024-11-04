import React, { useState } from 'react';
import { BEMWrapper } from '@/utils/bem';
import { AlleredeRegistrertAvtale } from '@/types/avtale';
import { BodyShort, Link } from '@navikt/ds-react';
import { Expand } from '@navikt/ds-icons';
import { formatterDato } from '@/utils/datoUtils';
import { avtaleStatusTekst } from '@/messages';
import RadInfo from '@/komponenter/alleredeOpprettetTiltak/innholdsvisning/RadInfo';
import { storForbokstav } from '@/utils/stringUtils';

interface Props {
    cls: BEMWrapper;
    innhold: AlleredeRegistrertAvtale;
}

const AlleredeOpprettetAvtaleDetaljer: React.FC<Props> = ({ cls, innhold }) => {
    const [seDetaljer, setSeDetaljer] = useState<boolean>(false);

    const settGodkjentAvBeslutter = () => {
        if (['VARIG_LONNSTILSKUDD', 'MIDLERTIDIG_LONNSTILSKUDD', 'SOMMERJOBB'].includes(innhold.tiltakstype)) {
            const info = innhold.godkjentAvBeslutter
                ? formatterDato(innhold.godkjentAvBeslutter, 'DD.MM.YY')
                : 'ikke godkjent';
            return <RadInfo label={'Godkjent av beslutter:'} info={info} infoNotBold={true} />;
        }
        return null;
    };

    const settDatoInfo = (datoString: string | null, backupTxt: string): string =>
        datoString ? formatterDato(datoString, 'DD.MM.YY') : backupTxt;

    return (
        <div className={cls.element('avtale-detaljer')}>
            <BodyShort size="small">
                <Link
                    className={cls.element('lenke-detaljer')}
                    href={'/se-alle-detaljer'}
                    onClick={(event) => {
                        event.preventDefault();
                        setSeDetaljer(!seDetaljer);
                    }}
                >
                    <span>Detaljer</span>
                    <span className={cls.element('chevron-detaljer', seDetaljer ? 'open' : 'close')}>
                        <Expand />
                    </span>
                </Link>
            </BodyShort>
            <div className={cls.element('detalje-innhold-wrapper', seDetaljer ? 'open' : 'close')}>
                <div className={cls.element('detalje-innhold')}>
                    <RadInfo label={'Opprettet av:'} info={storForbokstav(innhold.opphav)} infoNotBold={true} />
                    <RadInfo
                        label={'Veileder ident:'}
                        info={innhold.veilederNavIdent ? innhold.veilederNavIdent : 'ikke satt'}
                        infoNotBold={true}
                    />
                    <RadInfo label={'Deltaker fødselsnummer:'} info={innhold.deltakerFnr} infoNotBold={true} />
                    <RadInfo label={'Bedriftsnummer:'} info={innhold.bedriftNr} infoNotBold={true} />
                    <RadInfo
                        label={'Godkjent av veileder:'}
                        info={settDatoInfo(innhold.godkjentAvVeileder, 'ikke godkjent')}
                        infoNotBold={true}
                    />
                    {settGodkjentAvBeslutter()}
                    <RadInfo label={'Avtale status'} info={avtaleStatusTekst[innhold.status]} />
                    <RadInfo label={'Avtale Inngått:'} info={settDatoInfo(innhold.avtaleInngått, 'ikke inngått')} />
                </div>
            </div>
        </div>
    );
};
export default AlleredeOpprettetAvtaleDetaljer;
