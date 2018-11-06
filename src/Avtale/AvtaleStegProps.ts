import { EventHandler } from 'react';
import AvtaleModell from './AvtaleModell';

export default interface AvtaleStegProps {
    label: string;
    form: AvtaleModell;
    handleChange: EventHandler<any>;
}
