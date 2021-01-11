export const formatterProsent = (value: any): string => {
    if (!value) {
        return '';
    }
    return `${value} %`;
};
