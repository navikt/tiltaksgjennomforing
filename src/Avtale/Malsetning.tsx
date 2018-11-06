import PanelBase from 'nav-frontend-paneler';
import { Textarea } from 'nav-frontend-skjema';
import * as React from 'react';
import AvtaleStegProps from './AvtaleStegProps';

class Malsetning extends React.Component<AvtaleStegProps, { text: string }> {
    state = {
        text: this.props.form.maal,
    };

    onChange = (event: any) => {
        this.setState({ text: event.target.value });
        this.props.handleChange(event);
    };

    render() {
        return (
            <PanelBase>
                <Textarea
                    label={'Målsetninger for arbeidstreningen'}
                    id={'maal'}
                    onChange={this.onChange}
                    value={this.state.text}
                />
            </PanelBase>
        );
    }
}

export default Malsetning;
