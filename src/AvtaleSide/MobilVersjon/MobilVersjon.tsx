import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Knapp } from 'nav-frontend-knapper';
import { Context, medContext } from '../../AvtaleContext';
import { AvtaleStegType } from '../AvtaleSide';

interface Props {
    avtaleSteg: AvtaleStegType;
    skalViseStegmeny: boolean;
}

const MobilVersjon: React.FunctionComponent<Props & Context> = props => {
    return (
        <form>
            {props.skalViseStegmeny
                ? Object.keys(props.avtaleSteg).map(steg => (
                      <div
                          className="avtaleside__ekspanderbart-panel"
                          key={steg}
                      >
                          <Ekspanderbartpanel
                              tittel={props.avtaleSteg[steg].label}
                          >
                              {props.avtaleSteg[steg].komponent}
                              <Knapp
                                  htmlType="button"
                                  onClick={props.lagreAvtale}
                                  className="avtaleside__lagre-knapp"
                              >
                                  Lagre
                              </Knapp>
                          </Ekspanderbartpanel>
                      </div>
                  ))
                : props.avtaleSteg.godkjenning.komponent}
        </form>
    );
};

export default medContext<Props>(MobilVersjon);
