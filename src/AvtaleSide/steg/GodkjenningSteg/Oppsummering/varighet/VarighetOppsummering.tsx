import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Varighet } from '@/types/avtale';
import { HGrid, Label } from '@navikt/ds-react';
import { FunctionComponent, useContext } from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import VarighetIkon from './VarighetIkon';
import { formaterNorskeTall } from '@/utils';
import { formaterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';

const harDato = (dato?: string): string => {
    return dato ? formaterDato(dato, NORSK_DATO_FORMAT).toString() : '';
};

const VarighetOppsummering: FunctionComponent<Varighet> = ({
    startDato,
    sluttDato,
    stillingprosent,
    antallDagerPerUke,
}) => {
    const avtaleContext = useContext(AvtaleContext);
    const erMentorAvtale = avtaleContext.avtale?.tiltakstype === 'MENTOR';

    return (
        <Stegoppsummering ikon={<VarighetIkon />} tittel="Dato og arbeidstid">
            <HGrid columns={{ xs: 1, sm: 2, md: 3 }} gap="space-16">
                <div>
                    <Label>Startdato</Label>
                    <SjekkOmVerdiEksisterer verdi={harDato(startDato)} />
                    <VerticalSpacer rem={1} />
                </div>
                <div>
                    <Label>Sluttdato</Label>
                    <SjekkOmVerdiEksisterer verdi={harDato(sluttDato)} />
                </div>
                {!erMentorAvtale && (
                    <div>
                        <Label>Stillingsprosent</Label>
                        <SjekkOmVerdiEksisterer
                            verdi={stillingprosent}
                            formatertVerdi={`${formaterNorskeTall(stillingprosent)} %`}
                        />
                    </div>
                )}
            </HGrid>
            <div>
                <Label>Antall dager per uke</Label>
                <SjekkOmVerdiEksisterer
                    verdi={antallDagerPerUke}
                    formatertVerdi={formaterNorskeTall(antallDagerPerUke?.toString())}
                />
            </div>
        </Stegoppsummering>
    );
};

export default VarighetOppsummering;
