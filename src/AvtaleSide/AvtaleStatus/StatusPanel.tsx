import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Heading } from '@navikt/ds-react';
import React from 'react';
import HvemHarGodkjentModal from './HvemHarGodkjentModal';
import styles from './StatusPanel.module.less';
import { useFeatureToggles } from '@/FeatureToggles';

interface Props {
    header: string;
    body?: React.ReactNode;
}

const StatusPanel = (props: Props) => {
    const { header, body } = props;
    const { visHvemHarGodkjent } = useFeatureToggles();

    return (
        <Innholdsboks ariaLabel={header} style={{ backgroundColor: '#FFECCC' }}>
            <div className={styles.statusPanel}>
                <Heading level="2" size="large">
                    {header}
                </Heading>
                <VerticalSpacer rem={1} />
                {body}
                {visHvemHarGodkjent && (
                    <>
                        <VerticalSpacer rem={1} />
                        <HvemHarGodkjentModal />
                    </>
                )}
            </div>
        </Innholdsboks>
    );
};

export default StatusPanel;
