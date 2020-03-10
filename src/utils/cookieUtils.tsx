import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import { useCookies } from 'react-cookie';

const getCookie = (name: string) => {
    const pattern = RegExp(name + '=.[^;]*');
    const matched = document.cookie.match(pattern);
    if (matched) {
        const cookie = matched[0].split('=');
        return cookie[1];
    }
    return false;
};

const useInnloggetPartCookie = () => {
    const [, setCookie] = useCookies();

    return (innloggetPart: string) => {
        setCookie(INNLOGGET_PART, innloggetPart, { sameSite: 'strict', path: '/tiltaksgjennomforing' });

        if (!getCookie(INNLOGGET_PART)) {
            // Some browsers does not support path
            setCookie(INNLOGGET_PART, innloggetPart);
        }
    };
};

export default useInnloggetPartCookie;
