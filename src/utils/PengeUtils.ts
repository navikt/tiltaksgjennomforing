export const formaterPenger = (penger: number) =>
    `${new Intl.NumberFormat('nb-NO', {
        style: 'decimal',
        maximumFractionDigits: 2,
    }).format(penger)} kr`;
