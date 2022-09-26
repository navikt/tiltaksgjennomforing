import { ReactComponent as NavIkon } from '@/assets/ikoner/navikon.svg';
import LoggUtKnapp from '@/InnloggingBoundary/LoggUtKnapp';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import BEMHelper from '@/utils/bem';
import { Accordion } from '@navikt/ds-react';
import { Link } from '@navikt/ds-react';
import { Undertekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import MediaQuery from 'react-responsive';
import './Innloggingslinje.less';

type Props = {
    innloggetBruker: InnloggetBruker;
    brukBackupmeny: boolean | undefined;
};

const cls = BEMHelper('innloggingslinje');

const Innloggingslinje: FunctionComponent<Props> = (props) => {
    const bruker = props.innloggetBruker.identifikator;

    return props.brukBackupmeny ? (
        <div className="innloggingslinje">
            <div className="innloggingslinje__innhold">
                <MediaQuery minWidth={577}>
                    <Link href="/tiltaksgjennomforing">
                        lenke til oversiktsiden
                        <div className={cls.element('navIkon')}>
                            <NavIkon />
                        </div>
                    </Link>
                    <div className={cls.element('identitetogloggut')}>
                        <Undertekst className={cls.element('identitetogloggut__identitet')}>{bruker}</Undertekst>
                        <LoggUtKnapp />
                    </div>
                </MediaQuery>
                <MediaQuery maxWidth={576}>
                    <Accordion style={{ border: '1px solid #c6c2bf' }}>
                        <Accordion.Item>
                            <Accordion.Header>
                                <div className={cls.element('mobileheader')}>
                                    <NavIkon />
                                    <div className={cls.element('brukernavn')} aria-label="innlogget bruker id">
                                        {bruker}
                                    </div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Content>
                                <div className={cls.className}>
                                    <LoggUtKnapp />
                                </div>
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion>
                </MediaQuery>
            </div>
        </div>
    ) : null;
};
export default Innloggingslinje;
