import TallInput, { Props as TallInputProps } from '@/komponenter/form/TallIInput';

type Props = Omit<TallInputProps, 'name' | 'min' | 'maks' | 'desimaler'>;

function AntallDagerInput(props: Props) {
    return <TallInput {...props} min={0.1} maks={7} name="antallDagerPerUke" desimaler />;
}

export default AntallDagerInput;
