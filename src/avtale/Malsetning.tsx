import PanelBase from 'nav-frontend-paneler';
import { Textarea } from 'nav-frontend-skjema';
import * as React from 'react';
import AvtaleStegProps from './AvtaleStegProps';

class Malsetning extends React.Component<AvtaleStegProps, { text: string }> {
    constructor(props: AvtaleStegProps) {
        super(props);
        this.state = {
            text: this.props.form.maal || ''
        };
        this.onChange = this.onChange.bind(this);
    }

    public render() {
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

    private onChange(event:any) {
        this.setState({text: event.target.value});
        this.props.handleChange(event);
    }
}

export default Malsetning;
