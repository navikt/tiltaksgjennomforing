import { Checkbox, List } from '@navikt/ds-react';
import './GodkjenningsPanel.less';

interface GodkjenningsPanelProps {
    isChecked: boolean;
    setChecked: (checked: boolean) => void;
    checkboxLabel: string;
    children?: React.ReactNode;
}

const GodkjenningsPanel: React.FC<GodkjenningsPanelProps> = ({ isChecked, setChecked, children, checkboxLabel }) => {
    return (
        <div className={isChecked ? 'godkjenningspanel-checked' : 'godkjenningspanel'}>
            {children}
            <Checkbox onChange={() => setChecked(!isChecked)} checked={isChecked} children={checkboxLabel} />
        </div>
    );
};

export default GodkjenningsPanel;
