import React, { FunctionComponent } from 'react';
import { Heading, Tag } from '@navikt/ds-react';
import { Nyhet } from './Nytt';

const printDato = (dato: Date) =>
    dato.toLocaleDateString
        ? dato.toLocaleDateString('no-NB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
          })
        : dato.toISOString();

interface Props {
    nyhet: Nyhet;
    ulest: boolean;
}

const Artikkel: FunctionComponent<Props> = ({ nyhet, ulest }) => {
    const klassenavn = 'nytt__artikkel' + (ulest ? ' nytt__artikkel--ulest' : '');

    return (
        <article className={klassenavn}>
            <Tag variant="info" className="nytt__artikkeldato">
                {printDato(nyhet.dato)}
            </Tag>
            <Heading size="small" className="nytt__artikkeltittel">
                {nyhet.tittel}
            </Heading>
            <div className="typo-normal nytt__artikkelinnhold">{nyhet.innhold}</div>
        </article>
    );
};

export default Artikkel;
