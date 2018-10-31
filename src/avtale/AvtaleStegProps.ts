import { EventHandler } from 'react';
import AvtaleForm from './AvtaleForm';

export default interface AvtaleStegProps {
    label: string;
    form: AvtaleForm;
    handleChange: EventHandler<any>;
}
