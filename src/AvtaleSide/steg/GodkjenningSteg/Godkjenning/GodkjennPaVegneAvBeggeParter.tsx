import { Checkbox } from 'nav-frontend-skjema';
import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';

type Props = {
    setskalGodkjennesPaVegne: Dispatch<SetStateAction<boolean>>;
};

const GodkjennPaVegneAvBeggeParter: FunctionComponent<Props> = props => {
    const [godkjennPaVegneAvBegge, setGodkjennPaVegneAvBegge] = useState(false);
    const godkjennPaVegneLabel = godkjennPaVegneAvBegge
        ? 'Jeg skal godkjenne på vegne av deltaker og arbeidsgiver, fordi deltakeren og arbeidsgiveren'
        : 'Jeg skal godkjenne på vegne av deltakeren og arbeidsgiveren';

    return (
        <>
            <Checkbox
                label={godkjennPaVegneLabel}
                checked={godkjennPaVegneAvBegge}
                onChange={e => {
                    props.setskalGodkjennesPaVegne(e.currentTarget.checked);
                    setGodkjennPaVegneAvBegge(e.currentTarget.checked);
                }}
            />
        </>
    );
};

export default GodkjennPaVegneAvBeggeParter;
