import React, { FunctionComponent, PropsWithChildren } from 'react';

type Props = {
    redigerbar: boolean;
};

const TilskuddsutgiftTabell: FunctionComponent<PropsWithChildren<Props>> = (props) => {
    return (
        <table className="tabell">
            <thead>
                <tr>
                    <th>Tilskudd</th>
                    <th>Utgifter</th>
                    {props.redigerbar && <th>Handling</th>}
                </tr>
            </thead>
            <tbody>{props.children}</tbody>
        </table>
    );
};

export default TilskuddsutgiftTabell;
