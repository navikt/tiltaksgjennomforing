import { Avtale } from '../Stegside/avtale';

export default abstract class Service {
    abstract hentAvtale(id: string): Promise<Avtale>;
    abstract hentAvtaler(): Promise<Map<string, Avtale>>;
    abstract lagreAvtale(avtale: Avtale): Promise<{ versjon: string }>;
    abstract opprettAvtale(): Promise<Avtale>;
}
