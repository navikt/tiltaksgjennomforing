import { AvtaleContext } from '@/AvtaleProvider';
import GodkjennPåVegneAvDeltakerCheckboxer from '@/AvtaleSide/steg/GodkjenningSteg/Godkjenning/godkjenningVeileder/komponenter/GodkjennPåVegneAvDeltakerCheckboxer';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import { GodkjentPaVegneAvDeltakerGrunner } from '@/types/avtale';
import { CheckboxGroup, Checkbox } from '@navikt/ds-react';
import React, { Dispatch, FunctionComponent, SetStateAction, useContext, useState } from 'react';
import GodkjennPaVegneAvMedAlleredeOpprettetTiltak from '@/komponenter/alleredeOpprettetTiltak/GodkjennPaVegneAvMedAlleredeOpprettetTiltak';
import { fetchdata } from '@/komponenter/alleredeOpprettetTiltak/api/alleredeUtils';
import {
    AlleredeOpprettetAvtaleContext,
    Context as AlleredeOpprettetContext,
} from '@/komponenter/alleredeOpprettetTiltak/api/AlleredeOpprettetAvtaleProvider';
import BEMHelper from '@/utils/bem';

interface Props {
    skalGodkjennesPaVegne: boolean;
    setSkalGodkjennesPaVegne: Dispatch<SetStateAction<boolean>>;
}

const GodkjennPaVegneAvDeltaker: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('godkjenning');
    const { avtale, godkjennPaVegneAvDeltaker } = useContext(AvtaleContext);
    const { deltakerFnr, tiltakstype, id, gjeldendeInnhold } = avtale;
    const { startDato, sluttDato } = gjeldendeInnhold;
    const { alleredeRegistrertAvtale, setAlleredeRegistrertAvtale } =
        useContext<AlleredeOpprettetContext>(AlleredeOpprettetAvtaleContext);
    const [godkjenningsModalIsOpen, setGodkjenningsModalIsOpen] = useState<boolean>(false);

    const godkjennPaVegneLabel: string = props.skalGodkjennesPaVegne
        ? 'Jeg skal godkjenne på vegne av deltakeren, fordi deltakeren'
        : 'Jeg skal godkjenne på vegne av deltakeren';

    const [godkjentPåVegneAvGrunner, setGodkjentPåVegneAvGrunner] = useState<GodkjentPaVegneAvDeltakerGrunner>({
        digitalKompetanse: false,
        reservert: false,
        ikkeBankId: false,
    });

    const [feilmeldingGrunn, setFeilmeldingGrunn] = useState<string>();
    const [deltakerInformert, setDeltakerInformert] = useState<boolean>(false);
    const [feilDeltakerInformert, setFeilDeltakerInformert] = useState<string>();
    const [godkjennPaVegne, setGodkjennPaVegne] = useState<string[]>(
        props.skalGodkjennesPaVegne ? ['godkjennPaVegne'] : [''],
    );
    const [bekreftAtDeltakerErInformert, setBekreftAtDeltakerErInformert] = useState<string[]>(['']);

    const godkjenn = (): void | Promise<void> => {
        const valgtMinstEnGrunn =
            godkjentPåVegneAvGrunner.ikkeBankId ||
            godkjentPåVegneAvGrunner.reservert ||
            godkjentPåVegneAvGrunner.digitalKompetanse;
        if (!valgtMinstEnGrunn) {
            return setFeilmeldingGrunn('Oppgi minst én grunn for godkjenning på vegne av deltaker');
        } else {
            setFeilmeldingGrunn(undefined);
        }
        if (!deltakerInformert) {
            return setFeilDeltakerInformert('Deltaker må være informert om kravene og godkjenne innholdet i avtalen.');
        } else {
            setFeilDeltakerInformert(undefined);
        }
        return godkjennPaVegneAvDeltaker(godkjentPåVegneAvGrunner);
    };

    return (
        <div className={cls.element('godkjenn-pa-vegne-av')}>
            <CheckboxGroup legend="" onChange={(value: any[]) => setGodkjennPaVegne(value)} value={godkjennPaVegne}>
                <Checkbox
                    value="godkjennPaVegne"
                    onChange={(e) => {
                        props.setSkalGodkjennesPaVegne(e.currentTarget.checked);
                    }}
                >
                    {godkjennPaVegneLabel}
                </Checkbox>
            </CheckboxGroup>

            {props.skalGodkjennesPaVegne && (
                <React.Fragment>
                    <div className={cls.element('checkbox-wrapper')}>
                        <GodkjennPåVegneAvDeltakerCheckboxer
                            tiltakstype={avtale.tiltakstype}
                            godkjentPåVegneAvGrunner={godkjentPåVegneAvGrunner}
                            setGodkjentPåVegneAvGrunner={setGodkjentPåVegneAvGrunner}
                            feilmeldingGrunn={feilmeldingGrunn}
                            setFeilmeldingGrunn={setFeilmeldingGrunn}
                        />
                    </div>
                    <CheckboxGroup
                        legend="Bekreft at deltaker er informert om kravene"
                        error={feilDeltakerInformert}
                        onChange={(value: any[]) => setBekreftAtDeltakerErInformert(value)}
                        value={bekreftAtDeltakerErInformert}
                    >
                        <Checkbox
                            value="bekreftAtDeltakerErInformert"
                            onChange={() => setDeltakerInformert((prevState: boolean) => !prevState)}
                        >
                            Deltakeren er informert om kravene og godkjenner innholdet i avtalen.
                        </Checkbox>
                    </CheckboxGroup>
                </React.Fragment>
            )}
            {props.skalGodkjennesPaVegne && (
                <LagreKnapp
                    className={cls.element('lagre-knapper')}
                    lagre={() =>
                        fetchdata({
                            deltakerFnr,
                            tiltakstype,
                            id,
                            startDato,
                            sluttDato,
                            alleredeRegistrertAvtale,
                            setAlleredeRegistrertAvtale,
                            setGodkjenningsModalIsOpen,
                            godkjenn,
                        })
                    }
                    label="Godkjenn avtalen"
                />
            )}
            <GodkjennPaVegneAvMedAlleredeOpprettetTiltak
                godkjennPaVegneAv={() => godkjenn()}
                modalIsOpen={godkjenningsModalIsOpen}
                setModalIsOpen={setGodkjenningsModalIsOpen}
            />
        </div>
    );
};

export default GodkjennPaVegneAvDeltaker;
