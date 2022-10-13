import * as React from 'react';
import '../navGrid.css';
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    fluid?: boolean;
}
declare class Container extends React.Component<ContainerProps> {
    render(): JSX.Element;
}
export default Container;
