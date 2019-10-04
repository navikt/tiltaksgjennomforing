/** Returner liste av enum-konstanter som ikke er av typen tall */
const enumValues = (enumType: any) =>
    Object.keys(enumType).filter(item => {
        return isNaN(Number(item));
    });

export default enumValues;
