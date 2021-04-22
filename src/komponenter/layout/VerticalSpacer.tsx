import React from 'react';

const VerticalSpacer = (props: { rem: number }) => {
    return <div style={{ marginTop: `${props.rem}rem` }} />;
};

export default VerticalSpacer;
