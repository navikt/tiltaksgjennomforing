import { FunctionComponent } from 'react';

type Props = {
    tittel: string;
};

const Dokumenttittel: FunctionComponent<Props> = props => {
    document.title = `${props.tittel} - NAV`;
    return null;
};

export default Dokumenttittel;
