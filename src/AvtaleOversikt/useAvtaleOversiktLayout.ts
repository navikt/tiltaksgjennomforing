import { useMediaQuery } from 'react-responsive';
import { CSSProperties } from 'react';

type AvtaleLayout = {
    mellomromPåHverSide: string;
    erNokPlassTilTabell: boolean;
    erNokPlassTilTabellOgFilter: boolean;
    stylingAvFilter: CSSProperties;
    stylingAvTabell: CSSProperties;
    stylingAvFilterOgTabell: CSSProperties;
};

type UseAvtaleOversiktLayout = () => AvtaleLayout;

const breddeTabell = 55;
const breddeFilter = 15;
const breddeMellom = 2;
const mellomromPåHverSide = 0.5;

const totalBredde = mellomromPåHverSide * 2 + breddeFilter + breddeMellom + breddeTabell;

const rem = (tall: number) => tall + 'rem';

const useAvtaleOversiktLayout: UseAvtaleOversiktLayout = () => {
    const erNokPlassTilTabellOgFilter = useMediaQuery({ minWidth: rem(totalBredde) });
    const erNokPlassTilTabell = useMediaQuery({ minWidth: rem(breddeTabell) });

    let stylingAvFilter: CSSProperties = {};
    let stylingAvTabell: CSSProperties;
    let stylingAvFilterOgTabell: CSSProperties = {};

    if (erNokPlassTilTabellOgFilter) {
        stylingAvFilter = { width: rem(breddeFilter), marginRight: rem(breddeMellom) };
        stylingAvTabell = { width: rem(breddeTabell) };
        stylingAvFilterOgTabell = { flexDirection: 'row', justifyContent: 'center' };
    } else {
        stylingAvTabell = { marginTop: '1rem' };
    }

    return {
        erNokPlassTilTabell,
        erNokPlassTilTabellOgFilter,
        mellomromPåHverSide: rem(mellomromPåHverSide),
        stylingAvFilter,
        stylingAvTabell,
        stylingAvFilterOgTabell,
    };
};

export default useAvtaleOversiktLayout;
