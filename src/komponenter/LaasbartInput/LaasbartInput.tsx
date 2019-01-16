import * as React from 'react';
import { Input } from 'nav-frontend-skjema';
import { Context, medContext, Rolle } from '../../AvtaleContext';
import ReadOnlyFelt from './ReadOnlyFelt/ReadOnlyFelt';

interface Props {
    label: React.ReactNode;
    verdi: string;
    rolle: Rolle;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

class LaasbartInput extends React.Component<Props & Context, {}> {
    render() {
        return (
            <>
                {this.props.rolle === 'DELTAKER' ? (
                    <ReadOnlyFelt
                        label={this.props.label}
                        tekst={this.props.verdi}
                        className={this.props.className}
                    />
                ) : (
                    <Input
                        className={this.props.className}
                        label={this.props.label}
                        defaultValue={this.props.verdi}
                        onChange={this.props.onChange}
                    />
                )}
            </>
        );
    }
}

export default medContext(LaasbartInput);
