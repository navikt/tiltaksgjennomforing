import * as React from 'react';
import classNames from 'classnames';
import './navGrid.css';

const cls = (className: any, xs: any, sm: any, md: any, lg: any) =>
    classNames('col', className, {
        [`col-xs-${xs}`]: !!xs,
        [`col-sm-${sm}`]: !!sm,
        [`col-md-${md}`]: !!md,
        [`col-lg-${lg}`]: !!lg,
    });

export interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    xs?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
    sm?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
    md?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
    lg?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
}

class Column extends React.Component<ColumnProps> {
    render() {
        const { children, className, xs, sm, md, lg, ...props } = this.props;

        return (
            <div className={cls(className, xs, sm, md, lg)} {...props}>
                {children}
            </div>
        );
    }
}

(Column as React.ComponentClass).defaultProps = {
    className: undefined,
    children: undefined,
    xs: undefined,
    sm: undefined,
    md: undefined,
    lg: undefined,
};

export default Column;
