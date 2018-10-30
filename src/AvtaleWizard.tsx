import KnappBase from 'nav-frontend-knapper';
import PanelBase from 'nav-frontend-paneler';
import { Input, SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
import Stegindikator from 'nav-frontend-stegindikator';
import * as React from 'react';
import { ReactNode } from 'react';
import Stegvelger from './Stegvelger';

interface State {
    aktivtSteg: React.Component;
}

interface StegProps {
    label: string;
    children: ReactNode;
}

const stegliste = [
    new React.Component<StegProps>({
        label: 'Person',
        children: (
            <PanelBase>
                <SkjemaGruppe title={'Opplysninger om person'}>
                    <Input label={'Fødselsnummer'} id={'fnr'} bredde={'M'} />
                    <Input label={'Navn'} id={'navn'} bredde={'XL'} />
                    <Input
                        label={'Telefon'}
                        id={'persontlf'}
                        bredde={'M'}
                        type={'tel'}
                    />
                </SkjemaGruppe>
            </PanelBase>
        ),
    }),
    new React.Component<StegProps>({
        label: 'Arbeidsgiver',
        children: (
            <PanelBase>
                <SkjemaGruppe title={'Opplysninger om arbeidsgiver'}>
                    <Input
                        label={'Organisasjonsnummer'}
                        id={'orgnr'}
                        bredde={'M'}
                    />
                    <Input
                        label={'Bedriftens navn'}
                        id={'bedriftsnavn'}
                        bredde={'XL'}
                    />
                    <Input
                        label={'Kontaktperson'}
                        id={'kontaktperson'}
                        bredde={'XL'}
                    />
                    <Input
                        label={'Telefon'}
                        id={'bedriftstlf'}
                        bredde={'M'}
                        type={'tel'}
                    />
                </SkjemaGruppe>
            </PanelBase>
        ),
    }),
    new React.Component<StegProps>({
        label: 'Målsetninger',
        children: (
            <PanelBase>
                <Textarea
                    label={'Målsetninger for arbeidstreningen'}
                    id={'mål'}
                    value={''}
                    onChange={() => {/* noop */}}
                />
            </PanelBase>
        ),
    }),
    new React.Component<StegProps>({
        label: 'Bekreftelse',
        children: (
            <PanelBase>
                <SkjemaGruppe
                    className={'bekreft'}
                    title={'Bekreft innhold i avtalen'}
                >
                    <KnappBase type="standard" disabled={false}>
                        Bekreft som bruker
                    </KnappBase>
                    <KnappBase type="standard" disabled={false}>
                        Bekreft som arbeidsgiver
                    </KnappBase>
                    <KnappBase type="standard" disabled={false}>
                        Bekreft som NAV-veileder
                    </KnappBase>
                </SkjemaGruppe>
            </PanelBase>
        ),
    }),
];

class AvtaleWizard extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            aktivtSteg: stegliste[0],
        } as State;
        this.oppdater = this.oppdater.bind(this);
    }

    public render() {
        return (
            <>
                <Stegindikator
                    onChange={this.oppdater}
                    steg={stegliste.map((steg, index) => ({
                        label: steg.props.label,
                        index: index + 1,
                    }))}
                    visLabel={true}
                />
                <Stegvelger aktivtChild={this.state.aktivtSteg} />
            </>
        );
    }

    private oppdater(index: number) {
        this.setState({ aktivtSteg: stegliste[index] });
    }
}

export default AvtaleWizard;
