import React, { FunctionComponent } from 'react';

const TilskuddsutgiftTabell: FunctionComponent = props => {
    return (
        <table className="tabell">
        <thead>
            <tr>
                <th>Tilskudd</th>
                <th>Dato</th>
                <th>Utgifter</th>
                <th>Handling</th>
            </tr>
        </thead>
        <tbody>
            {props.children}
        </tbody>
    </table>
    )
};

export default TilskuddsutgiftTabell;
