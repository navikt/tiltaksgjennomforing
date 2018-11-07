import AvtaleModell from './AvtaleModell';

export default interface AvtaleProps {
    endreVerdi: (felt: string, verdi: any) => void;
    form: AvtaleModell;
}
