import React, { useRef, useEffect } from 'react';

import VarselKomponent from '@/komponenter/Varsel/VarselKomponent';

type Props = React.PropsWithChildren &
    Pick<React.ComponentProps<typeof VarselKomponent>, 'kanLukkes' | 'timeout' | 'type' | 'onLukkVarsel'>;

function LagreKnappVarsel(props: Props) {
    const varselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (varselRef && varselRef.current) {
            varselRef.current.focus();
        }
    }, [varselRef]);

    return <VarselKomponent {...props} className="lagreknapp__varsel" varselRef={varselRef} />;
}

export default LagreKnappVarsel;
