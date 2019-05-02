export const datoIkkeTilbakeITid = (dato: Date) => {
    // Datoer uten tidspunkt
    const valgtDato = new Date(
        dato.getFullYear(),
        dato.getMonth(),
        dato.getDate()
    );
    const today = new Date();
    const todayDato = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    if (valgtDato >= todayDato) {
        return true;
    } else {
        return false;
    }
};
