import { FunctionComponent } from 'react';

type Props = {
    tittel: string;
};

const Dokumenttittel: FunctionComponent<Props> = (props) => {
    document.title = `${props.tittel} - Nav`;
    return null;
};

export default Dokumenttittel;
