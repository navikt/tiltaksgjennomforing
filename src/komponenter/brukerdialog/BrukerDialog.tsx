import React from 'react';
import BEMHelper from '@/utils/bem';
import Chat from './chat-animasjon/Chat';
import './brukerDialog.less';
import useBrukerDialog from '@/komponenter/brukerdialog/useBrukerDialog';
import { Label, Link } from '@navikt/ds-react';

const BrukerDialog: React.FC = () => {
    const redirectUrl: string = useBrukerDialog();

    const cls = BEMHelper('bruker-dialog');
    const redirectBrukerdialog = () => window.open(redirectUrl, '_blank');

    function createRipple(event: React.MouseEvent<HTMLButtonElement>) {
        const button = event.currentTarget;

        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const position = button.getBoundingClientRect();
        const adjustedToCircleCenter = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - (position.left + adjustedToCircleCenter)}px`;
        circle.style.top = `${event.clientY - (position.top + adjustedToCircleCenter)}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];

        if (ripple) {
            ripple.remove();
        }
        button.appendChild(circle);
    }

    return (
        <>
            <div className={cls.className}>
                <button
                    className={cls.element('container')}
                    onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                        event.preventDefault();
                        createRipple(event);
                        setTimeout(() => redirectBrukerdialog(), 400);
                    }}
                >
                    <div className={cls.element('wrapper')}>
                        <div className={cls.element('illustrasjon')}>
                            <Chat />
                        </div>
                        <div className={cls.element('tittel')}>
                            <Link
                                className={cls.element('tittel-lenke')}
                                href="#"
                                onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
                                    event.preventDefault()
                                }
                            >
                                <Label>Ny funksjon</Label>
                                Skriv og les meldinger om avtalen her
                            </Link>
                        </div>
                    </div>
                </button>
            </div>
        </>
    );
};
export default BrukerDialog;
