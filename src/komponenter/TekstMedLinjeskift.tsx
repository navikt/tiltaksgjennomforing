import React, { Fragment } from 'react';

const TekstMedLinjeskift = (props: { tekst?: string }) => (
    <>
        {props.tekst &&
            props.tekst.split('\n').map((item, index) => (
                <Fragment key={index}>
                    {index > 0 && <br />}
                    {item}
                </Fragment>
            ))}
    </>
);

export default TekstMedLinjeskift;
