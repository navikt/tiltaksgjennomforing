import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import React, { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';
import { RadioPanel } from 'nav-frontend-skjema';
import BEMHelper from '@/utils/bem';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Normaltekst } from 'nav-frontend-typografi';
import './StillingsSteg.less';

const cls = BEMHelper('StillingsSteg');

export interface StillingsKategorier {
    label: string;
    styrk08: number;
    konseptId: number;
}

const StillingSteg: FunctionComponent<{}> = () => {
    const avtaleContext = useContext(AvtaleContext);
    const [kategori, setKategorier] = useState<StillingsKategorier[] | undefined>(undefined);
    const counter = useRef(0);

    enum StillingsStatus {
        Stillingsfelt = 'Stillingsfelt',
        Stillingslist = 'Stillingslist',
    }

    const getStillingskategorier = (type: string) => {
        avtaleContext
            .hentStillingskategorier(type)
            .then((res: StillingsKategorier[]) => {
                setKategorier(res);
            })
            .catch(err => console.warn('feilet med henting av stillingsKategorier', err));
        avtaleContext.settAvtaleVerdi('stillingstittel', type);
    };

    const setFocus = (id: string, count: number) => {
        const elem = document.getElementById(id);
        if (elem) {
            elem.focus();
            counter.current = count;
        }
    };

    useEffect(() => {
        const toppenAvListen = () => counter.current === 0;
        const setFocusStillingsFelt = () => setFocus(StillingsStatus.Stillingsfelt, 0);

        const setFocusListElementUp = () =>
            setFocus(StillingsStatus.Stillingslist + (counter.current - 1), counter.current - 1);
        const setFocusListElementDown = () =>
            setFocus(StillingsStatus.Stillingslist + (counter.current + 1), counter.current + 1);

        const ArrowUpListEvent = () => (toppenAvListen() ? setFocusStillingsFelt() : setFocusListElementUp());

        const listEventOnPressArrowKey = (event: KeyboardEvent) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                const aktivtElement = document.activeElement;
                if (aktivtElement && aktivtElement.id === StillingsStatus.Stillingsfelt && event.key === 'ArrowDown') {
                    event.preventDefault();
                    return setFocus(StillingsStatus.Stillingslist + 0, 0);
                }

                if (aktivtElement && aktivtElement.id === StillingsStatus.Stillingslist + counter.current) {
                    event.preventDefault();
                    return event.key === 'ArrowDown' ? setFocusListElementDown() : ArrowUpListEvent();
                }
            }
        };

        document.addEventListener('keydown', listEventOnPressArrowKey);
        return () => document.removeEventListener('keydown', listEventOnPressArrowKey);
    }, [StillingsStatus]);

    const getInputverdi = () =>
        avtaleContext.avtale.stillingstittel ? avtaleContext.avtale.stillingstittel.toLowerCase() : '';

    const setInputverdi = (event: React.MouseEvent<HTMLAnchorElement | MouseEvent>, label: string) => {
        event.preventDefault();
        avtaleContext.settAvtaleVerdi('stillingstittel', label);
        setKategorier(undefined);
    };

    const highlightPattern = (text: string, pattern: string) => {
        const txtfragments = text.split(pattern);
        if (txtfragments.length <= 1) {
            return text;
        }
        const matches = text.match(pattern);

        return txtfragments.reduce(
            (arr: any, element: any, index: number) =>
                matches && matches[index]
                    ? [
                          ...arr,
                          element,
                          <span className="typo-undertittel" key={index}>
                              {matches[index]}
                          </span>,
                      ]
                    : [...arr, element],
            []
        );
    };

    return (
        <Innholdsboks utfyller="veileder_og_arbeidsgiver">
            <SkjemaTittel>Stilling</SkjemaTittel>
            <div className={cls.element('kategori-wrapper')}>
                <PakrevdInput
                    label="Stillingstittel"
                    verdi={avtaleContext.avtale.stillingstittel || ''}
                    settVerdi={verdi => getStillingskategorier(verdi)}
                    id={StillingsStatus.Stillingsfelt}
                    autoComplete="off"
                />
                {kategori && kategori.length > 0 && (
                    <div className={cls.element('stillingskategorier')}>
                        <ul>
                            {kategori.map((kat, index) => {
                                const tekst = highlightPattern(kat.label.toLowerCase(), getInputverdi());
                                return (
                                    <a
                                        className={cls.element('kategori')}
                                        key={index}
                                        href="https://arbeidsgiver.nav.no/tiltaksgjennomforing"
                                        onClick={event => setInputverdi(event, kat.label)}
                                        role="button"
                                        id={StillingsStatus.Stillingslist + index}
                                        onMouseOver={() => setFocus(StillingsStatus.Stillingslist + index, index)}
                                    >
                                        <li>
                                            <span className="typo-normal">{tekst}</span>
                                        </li>
                                    </a>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
            <PakrevdTextarea
                label="Beskriv arbeidsoppgavene som inngår i stillingen"
                verdi={avtaleContext.avtale.arbeidsoppgaver || ''}
                settVerdi={verdi => avtaleContext.settAvtaleVerdi('arbeidsoppgaver', verdi)}
                maxLengde={1000}
                feilmelding="Beskrivelse av arbeidsoppgavene er påkrevd"
            />
            {(avtaleContext.avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
                avtaleContext.avtale.tiltakstype === 'VARIG_LONNSTILSKUDD') && (
                <>
                    <Normaltekst>Er stillingen fast eller midlertidig</Normaltekst>
                    <VerticalSpacer rem={0.5} />
                    <div className={cls.element('stillingstype_radio')}>
                        <RadioPanel
                            onChange={() => avtaleContext.settAvtaleVerdier({ stillingstype: 'FAST' })}
                            checked={avtaleContext.avtale.stillingstype === 'FAST'}
                            label="Fast"
                            name="stillingstype"
                            value="fast"
                        />
                        <RadioPanel
                            onChange={() => avtaleContext.settAvtaleVerdier({ stillingstype: 'MIDLERTIDIG' })}
                            checked={avtaleContext.avtale.stillingstype === 'MIDLERTIDIG'}
                            label="Midlertidig"
                            name="stillingstype"
                            value="midlertidig"
                        />
                    </div>
                    <VerticalSpacer rem={2} />
                </>
            )}
            <LagreKnapp lagre={avtaleContext.lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
        </Innholdsboks>
    );
};

export default StillingSteg;
