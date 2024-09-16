import LagreKnappBase, { useLagreKnapp } from '@/komponenter/LagreKnapp/LagreKnappBase';
import { ButtonProps } from '@navikt/ds-react';
import { Feilkode } from '@/types/feilkode';

interface Props extends ButtonProps {
    lagre: () => Promise<any>;
    suksessmelding?: string;
    setFeilmelding?: (value: Feilkode) => void;
}

function LagreKnapp(props: Props) {
    const { lagre, suksessmelding, setFeilmelding, ...rest } = props;
    const [onClick, largeKnappOpts] = useLagreKnapp(lagre, { suksessmelding, onFeil: setFeilmelding });

    return <LagreKnappBase onClick={onClick} {...largeKnappOpts} {...rest} />;
}

export default LagreKnapp;
