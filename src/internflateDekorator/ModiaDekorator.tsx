import React, { FunctionComponent } from 'react';
import NAVSPA from '@navikt/navspa';
import { DecoratorProps } from '@/internflateDekorator/decoratorprops';

interface Props {
    enableModiaDekorator: boolean;
}

const ModiaDekorator: FunctionComponent<Props> = ({ enableModiaDekorator }: Props) => {
    if (!enableModiaDekorator) return null;

    const config = {
        appname: 'Tiltaksgjennomføring',
        useProxy: true,
        toggles: {
            visVeileder: true,
        },
    };
    const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

    return <InternflateDecorator {...config} />;
};
export default ModiaDekorator;
