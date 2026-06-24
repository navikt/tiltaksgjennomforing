import { TextField } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

interface Props {
    label: string;
    tekst: string;
    description?: string;
    size?: 'medium' | 'small';
    className?: string;
}

const VisueltDisabledInputFelt: FunctionComponent<Props> = ({ description, label, tekst, className }) => (
    <TextField
        label={label}
        value={tekst}
        description={description}
        readOnly
        style={{ backgroundColor: '#f1f1f1' }}
        className={className}
    />
);

export default VisueltDisabledInputFelt;
