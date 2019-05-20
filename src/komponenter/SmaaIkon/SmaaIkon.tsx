import React from 'react';
import './SmaaIkon.less';
import BEMHelper from '../../utils/bem';

interface Props {
    svgIkon?: React.ReactNode;

    svgSmaaIkon?: React.ReactNode;
}

const cls = BEMHelper('howto');

const SmaaIkon: React.FunctionComponent<Props> = props => {
    const { svgIkon, svgSmaaIkon } = props;

    return (
        <div>
            <div className={cls.element('smaaikon')}>{svgSmaaIkon}</div>
        </div>
    );
};

export default SmaaIkon;
