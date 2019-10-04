import * as React from 'react';

interface Props {
    onNextClick?: () => void;
    onPreviousClick?: () => void;
    showPreviousButton: boolean;
    showNextButton: boolean;
}

function Navigasjonsbar(props: Props) {
    const className = 'DayPicker-NavButton';
    return (
        <div role="toolbar">
            <button
                tabIndex={0}
                aria-label="Forrige måned"
                className={`${className} DayPicker-NavButton--prev`}
                disabled={!props.showPreviousButton}
                type="button"
                onClick={event => {
                    event.preventDefault();
                    if (props.onPreviousClick) {
                        props.onPreviousClick();
                    }
                }}
            />
            <button
                tabIndex={0}
                aria-label="Neste måned"
                className={`${className} DayPicker-NavButton--next`}
                disabled={!props.showNextButton}
                type="button"
                onClick={event => {
                    event.preventDefault();
                    if (props.onNextClick) {
                        props.onNextClick();
                    }
                }}
            />
        </div>
    );
}

export default Navigasjonsbar;
