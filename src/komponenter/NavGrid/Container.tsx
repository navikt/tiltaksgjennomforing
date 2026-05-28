import * as React from 'react';
import classNames from 'classnames';
import './navGrid.css';

const cls = (fluid: any, className: any) =>
    classNames(className, {
        container: fluid === false,
        'container-fluid': fluid === true,
    });

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    fluid?: boolean;
}

class Container extends React.Component<ContainerProps> {
    render() {
        const { children, className, fluid, ...props } = this.props;
        return (
            <div className={cls(fluid, className)} {...props}>
                {children}
            </div>
        );
    }
}

(Container as React.ComponentClass).defaultProps = {
    className: undefined,
    children: undefined,
    fluid: false,
};

export default Container;
