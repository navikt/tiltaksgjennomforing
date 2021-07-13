import React from 'react';

const HorizontalSpacer = (props: { rem: number }) => {
    return <div style={{ display: 'inline-block', marginLeft: `${props.rem}rem` }} />;
};

export default HorizontalSpacer;
