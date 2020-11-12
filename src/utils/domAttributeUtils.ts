const FIRSTDOMELEMENT = 0;

interface Props {
    className: string;
    attribute: string;
    value: boolean;
}

export const setDomAttribute = (props: Props) => {
    const element = document.getElementsByClassName(props.className);
    if (element[FIRSTDOMELEMENT]) {
        element[FIRSTDOMELEMENT].setAttribute(props.attribute, `${props.value}`);
    }
};
