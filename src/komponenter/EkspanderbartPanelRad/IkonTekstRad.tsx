import BEMHelper from '@/utils/bem';
import React from 'react';
import './EkspanderbartPanelRad.less';
import { Heading, HeadingProps, Label } from '@navikt/ds-react';

interface Props {
    svgIkon: React.ReactNode;
    classname?: string;
    headerTekst?: {
        tekst: string;
        headingType?: HeadingProps["size"];
    };
}

const cls = BEMHelper('howto');

const IkonTekstRad: React.FunctionComponent<Props> = (props) => {
    const { svgIkon, headerTekst, classname, children } = props;
    let header = null;
    if (headerTekst?.headingType) {
        header = <Heading size={headerTekst.headingType}>{headerTekst.tekst}</Heading>;
    } else if (headerTekst) {
        header = <Label>{headerTekst?.tekst}</Label>;
    }
    return (
        <div className={cls.element(classname ? `element ${classname}` : 'element')}>
            <div className={cls.element('ikon')}>{svgIkon}</div>
            <div className={cls.element('tekst')}>
                {header}
                <>{children}</>
            </div>
        </div>
    );
};

export default IkonTekstRad;
