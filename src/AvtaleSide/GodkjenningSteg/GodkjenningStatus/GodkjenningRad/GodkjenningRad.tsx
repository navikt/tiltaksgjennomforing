import React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import checkIkon from '../check-circle.svg';
import problemIkon from '../report-problem-circle.svg';
import './GodkjenningRad.less';

interface Props {
    godkjentAvtale: boolean;
    personFornavn: string;
    personEtternavn: string;
    placeholderName: string;
    class: string;
}

const GodkjenningRad: React.FunctionComponent<Props> = props => {
    const godkjentStatus: string = props.godkjentAvtale
        ? 'Avtale godkjent'
        : 'Venter på godkjenning';

    const fullName = () => {
        if (props.personFornavn && props.personEtternavn) {
            return props.personFornavn + ' ' + props.personEtternavn;
        } else if (props.personFornavn && !props.personEtternavn) {
            return props.personFornavn;
        } else if (props.personEtternavn && !props.personFornavn) {
            return props.personEtternavn;
        } else if (!props.personFornavn && !props.personEtternavn) {
            return props.placeholderName;
        }
    };

    return (
        <div className={props.class}>
            <Normaltekst className="godkjenningsrad__inline">
                {fullName()}
            </Normaltekst>
            <span className="godkjenningsrad__status">
                <Element className="godkjenningsrad__inline">
                    {godkjentStatus}
                </Element>{' '}
                <img
                    className="godkjenningsrad__godkjenningIkon"
                    src={props.godkjentAvtale ? checkIkon : problemIkon}
                />
            </span>
        </div>
    );
};

export default GodkjenningRad;
