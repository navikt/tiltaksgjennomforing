import Avtale from './Avtale';

export default interface AvtaleProps {
    endreVerdi: (felt: string, verdi: any) => void;
    form: Avtale;
}
