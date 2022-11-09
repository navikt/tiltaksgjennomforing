import { Back } from '@navikt/ds-icons';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import './TilbakeTilOversiktLenke.less';
import BEMHelper from '@/utils/bem';
import { Button } from '@navikt/ds-react';

type Props = {
    onClick?: () => void;
    tekst?: string;
};

const TilbakeTilOversiktLenke: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('tilbaketiloversikt');
    const history = useHistory();

    const handleOnClick = () => {
        if (props.onClick) {
            props.onClick();
        }
        history.goBack();
    };

    return (
        <Button
            variant="tertiary"
            onClick={handleOnClick}
            icon={<Back className={cls.element('chevron')} />}
            iconPosition="left"
        >
            {props.tekst || 'Tilbake til oversikt'}
        </Button>
    );
};

export default TilbakeTilOversiktLenke;
