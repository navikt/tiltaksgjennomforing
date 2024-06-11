import { TextField } from '@navikt/ds-react';
import { describe } from 'node:test';
import { FunctionComponent } from 'react';

interface Props {
    label: string;
    tekst: string;
    description?: string;
    size?: 'medium' | 'small';
}

const VisueltDisabledInputFelt: FunctionComponent<Props> = ({ description, label, tekst }) => (
    <TextField label={label} value={tekst} description={description} readOnly style={{ backgroundColor: '#f1f1f1' }} />
);

export default VisueltDisabledInputFelt;
