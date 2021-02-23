export interface Stillingskategori {
    konseptId: number;
    label: string;
    styrk08: number;
}

export const hentStillinger = async (sok: string): Promise<Stillingskategori[]> => {
    const response = await fetch(`https://arbeidsgiver.nav.no/stillingstitler/search?q=${sok}`);
    return response.json();
};
