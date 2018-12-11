import { Avtale } from '../Stegside/avtale';

export default abstract class Service {
    async abstract hentAvtale(id: string): Promise<Avtale>;
    async abstract hentAvtaler(): Promise<Map<string, Avtale>>;
    async abstract lagreAvtale(avtale: Avtale): Promise<Avtale>;
    async abstract opprettAvtale(): Promise<Avtale>;
}