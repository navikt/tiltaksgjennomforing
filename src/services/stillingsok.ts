export interface Stillingskategori {
    konseptId: number;
    label: string;
    styrk08: number;
}

export const hentStillinger = async (sok: string): Promise<Stillingskategori[]> => {
    const response = await fetch(`/tiltaksgjennomforing/stillingstitler?q=${sok}`);
    return response.json();
};
