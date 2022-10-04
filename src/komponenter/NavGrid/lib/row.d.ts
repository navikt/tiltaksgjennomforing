import * as React from 'react';
import '../navGrid.css';
export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}
declare class Row extends React.Component<RowProps> {
    render(): JSX.Element;
}
export default Row;
