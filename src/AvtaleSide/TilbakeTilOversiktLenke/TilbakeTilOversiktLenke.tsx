import { Path } from '@/Router';
import BEMHelper from '@/utils/bem';
import { Back } from '@navikt/ds-icons';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import './TilbakeTilOversiktLenke.less';

type Props = {
    onClick?: () => void;
    tekst?: string;
};

const TilbakeTilOversiktLenke: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('tilbaketiloversikt');
    return (
        <Link
            to={{ pathname: Path.OVERSIKT, search: window.location.search }}
            className={cls.element('lenke')}
            onClick={props.onClick}
            role="menuitem"
        >
            <div aria-hidden={true}>
                <Back className={cls.element('chevron')} />
            </div>
            {props.tekst || 'Tilbake til oversikt'}
        </Link>
    );
};

export default TilbakeTilOversiktLenke;
