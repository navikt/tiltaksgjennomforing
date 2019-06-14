import * as React from 'react';
import DayPicker from 'react-day-picker';
// @ts-ignore
import momentLocaleUtils, { LocaleUtils } from 'react-day-picker/moment';
import Navigasjonsbar from './navigasjonsbar';
import DatovelgerCaption from './datovelger-caption';
import { datoIkkeTilbakeITid } from '../../../utils/datoUtils';

const today = new Date();

interface Props {
    valgtDato: Date;
    velgDato: (dato: Date) => void;
    lukk: () => void;
    datoTilbakeITid: (tilbakeITid: boolean) => void;
}

class Kalender extends React.Component<Props> {
    private dayPickerRef: HTMLDivElement | null;

    constructor(props: Props) {
        super(props);
        this.dayPickerRef = null;
    }

    componentDidMount() {
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        document.addEventListener('click', this.handleOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
    }

    setDayPickerRef(node: HTMLDivElement | null) {
        this.dayPickerRef = node;
    }

    handleOutsideClick(event: any) {
        // tslint:disable-line no-any
        if (this.dayPickerRef && !this.dayPickerRef.contains(event.target)) {
            this.props.lukk();
        }
    }

    velgDato = (dato: Date) => {
        this.props.velgDato(dato);
        if (!datoIkkeTilbakeITid(dato)) {
            this.props.datoTilbakeITid(true);
        } else {
            this.props.datoTilbakeITid(false);
        }
    };

    render() {
        const localeUtils: LocaleUtils = {
            ...momentLocaleUtils,
            formatWeekdayShort: (weekday: any, locale: any) => {
                return momentLocaleUtils
                    .formatWeekdayLong(weekday, locale)
                    .substring(0, 3);
            },
        };

        const navigasjonsbar = (
            <Navigasjonsbar showPreviousButton={true} showNextButton={true} />
        );

        return (
            <div
                className="datovelger__DayPicker"
                ref={node => this.setDayPickerRef(node)}
            >
                <DayPicker
                    locale="nb"
                    localeUtils={localeUtils}
                    firstDayOfWeek={1}
                    navbarElement={navigasjonsbar}
                    disabledDays={{ before: today }}
                    captionElement={
                        <DatovelgerCaption date={this.props.valgtDato} />
                    }
                    selectedDays={this.props.valgtDato}
                    initialMonth={this.props.valgtDato}
                    onDayClick={dato => this.velgDato(dato)}
                    containerProps={{ tabIndex: 0 }}
                />
            </div>
        );
    }
}

export default Kalender;
