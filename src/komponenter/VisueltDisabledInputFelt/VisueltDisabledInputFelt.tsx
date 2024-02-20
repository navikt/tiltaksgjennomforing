import { TextField } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

interface Props {
    label: string;
    tekst: string;
    size?: 'medium' | 'small';
}

const VisueltDisabledInputFelt: FunctionComponent<Props> = ({ label, tekst }) => (
    <TextField label={label} value={tekst} readOnly style={{ backgroundColor: '#f1f1f1' }} />
);

export default VisueltDisabledInputFelt;
