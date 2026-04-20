import { Checkbox, List } from '@navikt/ds-react';
import { godkjenningspanel, godkjenningspanelChecked } from './GodkjenningsPanel.module.less';
import { PropsWithChildren } from 'react';

interface GodkjenningsPanelProps {
    isChecked: boolean;
    setChecked: (checked: boolean) => void;
    checkboxLabel: string;
}

const GodkjenningsPanel: React.FC<PropsWithChildren<GodkjenningsPanelProps>> = ({
    isChecked,
    setChecked,
    children,
    checkboxLabel,
}) => {
    return (
        <div className={isChecked ? godkjenningspanelChecked : godkjenningspanel}>
            {children}
            <Checkbox onChange={() => setChecked(!isChecked)} checked={isChecked} children={checkboxLabel} />
        </div>
    );
};

export default GodkjenningsPanel;
