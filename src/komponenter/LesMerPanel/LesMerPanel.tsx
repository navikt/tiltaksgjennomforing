import classNames from 'classnames';
import React, { useState, PropsWithChildren } from 'react';
import { Collapse } from 'react-collapse';
import InfoToggler from './InfoToggler/InfoToggler';
import './LesMerPanel.less';

interface Props {
    åpneLabel: string;
    lukkLabel: string;
    className?: string;
    onÅpne?: () => void;
}

const LesMerPanel: React.FunctionComponent<PropsWithChildren<Props>> = ({
    åpneLabel,
    lukkLabel,
    children,
    className,
    onÅpne,
}) => {
    const [åpen, setÅpenState] = useState<boolean>(false);

    const setÅpen = (skalÅpnes: boolean) => {
        setÅpenState(skalÅpnes);
        if (skalÅpnes && onÅpne) {
            onÅpne();
        }
    };

    return (
        <div className={'les-mer-panel'}>
            <div className={classNames('les-mer-panel__toggler', åpen && 'les-mer-panel__toggler--åpen', className)}>
                <InfoToggler onToggle={() => setÅpen(!åpen)} åpen={åpen}>
                    <span>{åpen ? lukkLabel : åpneLabel}</span>
                </InfoToggler>
            </div>
            <div className="les-mer-panel__innhold" aria-expanded={åpen} aria-hidden={!åpen}>
                <Collapse isOpened={åpen}>
                    <>{children}</>
                </Collapse>
            </div>
        </div>
    );
};

export default LesMerPanel;
