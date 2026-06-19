import { FunctionComponent } from 'react';
import { Varighet } from '@/types/avtale';
import { formaterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { HGrid, Label } from '@navikt/ds-react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import VarighetIkon from '../varighet/VarighetIkon';

const StartOgSluttdatoOppsummering: FunctionComponent<Varighet> = (props) => {
    const harDato = (dato?: string): string => (dato ? formaterDato(dato, NORSK_DATO_FORMAT) : '');

    return (
        <Stegoppsummering ikon={<VarighetIkon />} tittel="Varighet">
            <HGrid columns={{ xs: 1, sm: 2, md: 3 }} gap="space-16">
                <div>
                    <Label>Startdato</Label>
                    <SjekkOmVerdiEksisterer verdi={harDato(props.startDato)} />
                </div>
                <div>
                    <Label>Sluttdato</Label>
                    <SjekkOmVerdiEksisterer verdi={harDato(props.sluttDato)} />
                </div>
            </HGrid>
        </Stegoppsummering>
    );
};

export default StartOgSluttdatoOppsummering;
