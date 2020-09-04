import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './VerticalSpacer.less';

interface VerticalSpacerProps {
    fourPx?: boolean;
    eightPx?: boolean;
    sixteenPx?: boolean;
    twentyPx?: boolean;
    thirtyTwoPx?: boolean;
    dashed?: boolean;
}

/**
 * VerticalSpacer
 *
 * Presentasjonskomponent. Legg inn vertikalt tomrom.
 */
const VerticalSpacer = (classes: VerticalSpacerProps & { rem?: number }) => {
    if (classes.rem) {
        return <div style={{ marginTop: `${classes.rem}rem` }} />;
    } else {
        return <div className={classNames(classes)} />;
    }
};

VerticalSpacer.propTypes = {
    fourPx: PropTypes.bool,
    eightPx: PropTypes.bool,
    sixteenPx: PropTypes.bool,
    twentyPx: PropTypes.bool,
    thirtyTwoPx: PropTypes.bool,
    dashed: PropTypes.bool,
};

VerticalSpacer.defaultProps = {
    fourPx: false,
    eightPx: false,
    sixteenPx: false,
    twentyPx: false,
    thirtyTwoPx: false,
    dashed: false,
};

export default VerticalSpacer;
