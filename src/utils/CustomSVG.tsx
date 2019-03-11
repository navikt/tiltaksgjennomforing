import * as React from 'react';

export interface IconRef {
    id: string;
    viewBox: string;
}

interface Props {
    iconRef: IconRef;
    size?: number;
    className?: string;
}

const CustomSVGFromSprite = ({ iconRef, size, className, ...other }: Props) => (
    <FlexibleSvg
        iconRef={iconRef || { id: '', viewBox: '' }}
        height={size}
        width={size}
        className={className}
        {...other}
    />
);

interface FlexibleProps {
    iconRef: IconRef;
    height?: number;
    width?: number | string;
    className?: string;
}

export const FlexibleSvg = ({ iconRef, height, width, className, ...other }: FlexibleProps) => {
    const viewBox = { 'view-box': iconRef.viewBox };
    return (
        <svg className={className} height={height} width={width} {...viewBox} {...other}>
            <use xlinkHref={`#${iconRef.id}`} />
        </svg>
    );
};

export default CustomSVGFromSprite;
