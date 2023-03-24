import React, { PropsWithChildren, useContext } from 'react';
import KontonummerInput from '@/komponenter/form/henteKontornummer/KontonummerInput';
import { Money } from '@navikt/ds-icons';
import { BodyShort } from '@navikt/ds-react';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import { hentKontonummerForArbeidsgiver } from '@/services/rest-service';
import BEMHelper from '@/utils/bem';
import { AvtaleContext } from '@/AvtaleProvider';
import './hentekontonummer.less';

interface Props {
    visningAvKnappHentKontonummerForArbeidsgiver: boolean;
}

const HenteKontonummer: React.FC<Props> = ({
    visningAvKnappHentKontonummerForArbeidsgiver,
}: PropsWithChildren<Props>) => {
    const cls = BEMHelper('kontonummer');
    const { avtale, lagreAvtale, settAvtaleInnholdVerdier } = useContext(AvtaleContext);
    return (
        <div>
            <div className={cls.element('kontonummer-input')} hidden={visningAvKnappHentKontonummerForArbeidsgiver}>
                <KontonummerInput
                    label={'Kontonummer til arbeidsgiver'}
                    value={avtale.gjeldendeInnhold.arbeidsgiverKontonummer}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        settAvtaleInnholdVerdier({ arbeidsgiverKontonummer: event.target.value });
                    }}
                    onBlur={() => lagreAvtale()}
                />
            </div>
            <div
                hidden={!visningAvKnappHentKontonummerForArbeidsgiver}
                className={cls.element('kontonummer-container')}
            >
                <div className={cls.element('kontonummer-info')}>
                    <div className={cls.element('kontonummer-visning')}>
                        <span>
                            <Money />
                        </span>
                        <BodyShort size="small">
                            <strong>Kontonummer: </strong>
                            {avtale.gjeldendeInnhold.arbeidsgiverKontonummer}
                        </BodyShort>
                    </div>
                    <BodyShort size="small">
                        Hvis kontonummeret ikke stemmer så må det oppdateres hos{' '}
                        <EksternLenke href="https://www.altinn.no/skjemaoversikt/arbeids--og-velferdsetaten-nav/bankkontonummer-for-refusjoner-fra-nav-til-arbeidsgiver/">
                            Altinn.
                        </EksternLenke>
                    </BodyShort>
                </div>
                <div className={cls.element('kontonummer-hente-knapp')}>
                    <LagreKnapp
                        label="Hent kontonummer fra Altinn"
                        lagre={async () => {
                            const arbeidsgiverKontonummer = await hentKontonummerForArbeidsgiver(avtale.id);
                            settAvtaleInnholdVerdier({ arbeidsgiverKontonummer });
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
export default HenteKontonummer;
