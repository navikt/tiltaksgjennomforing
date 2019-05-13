import React from 'react';

const MålIkon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <defs>
                <path
                    id="malOppsummeringIkon"
                    d="M23.973 8.803a.5.5 0 0 1-.164.556l-6.723 5.282 2.89 8.666a.502.502 0 0 1-.772.562L12 18.586 4.796 23.87a.503.503 0 0 1-.59.001.503.503 0 0 1-.18-.563l2.888-8.666L.191 9.36a.502.502 0 0 1 .31-.894h8.145L11.53.3c.14-.4.802-.4.943 0l2.882 8.166H23.5a.5.5 0 0 1 .473.337zm-7.782 5.269l5.864-4.606H15a.501.501 0 0 1-.472-.334L12 1.968 9.472 9.132A.501.501 0 0 1 9 9.466H1.945l5.864 4.606c.166.131.232.352.166.552l-2.504 7.51 6.233-4.571a.497.497 0 0 1 .592 0l6.233 4.571-2.504-7.51c-.066-.2 0-.421.166-.552z"
                />
            </defs>
            <g fill="none" fillRule="evenodd">
                <mask id="malOppsummeringIkon_b" fill="#fff">
                    <use xlinkHref="#malOppsummeringIkon" />
                </mask>
                <use fill="#3E3832" xlinkHref="#malOppsummeringIkon" />
                <g fill="#3E3832" mask="url(#malOppsummeringIkon_b)">
                    <path d="M0 24h24V0H0z" />
                </g>
            </g>
        </svg>
    );
};

export default MålIkon;
