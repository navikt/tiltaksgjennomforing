import React from 'react';

type Props = {
    navn: string;
};

const Ikon = ({ navn }: Props) => (
    <svg className="nytt__ikon" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <title>Nytt i {navn}</title>
        <path
            d="M28 3.8a4 4 0 014 4v14a4 4 0 01-4 4H17v2h5.1a1 1 0 110 2.1h-12a1 1 0 110-2.1h5.1v-2H4a4 4 0 01-4-4v-6a1 1 0 011-1.1 1.2 1.2 0 011 1.2v3.9h28v-12a2 2 0 00-2-2H15.2a1 1 0 010-2.1zm0 20a2 2 0 002-2H2a2 2 0 002 2z"
            fill="#3e3832"
        />
        <path
            d="M1.3 9.1h-.2a.6.6 0 01-.6-.6 6.2 6.2 0 014-6 6.8 6.8 0 015.4.3L9.6 2a.6.6 0 01.3-.8.6.6 0 01.8.4l1.1 2.9a.6.6 0 01-.3.8l-3 1a.6.6 0 01-.7-.3.6.6 0 01.3-.8l2-.7A5.4 5.4 0 005 3.7a5 5 0 00-3.3 4.8.6.6 0 01-.4.6zm11.5-1.7a.6.6 0 01.7.6 6.2 6.2 0 01-4 6 6.8 6.8 0 01-5.5-.4l.3 1a.6.6 0 01-1.1.4l-1.1-3a.6.6 0 01.4-.7l2.9-1.1a.6.6 0 01.4 1.2l-2 .7a5.5 5.5 0 005.2.7A5 5 0 0012.2 8a.6.6 0 01.6-.6z"
            stroke="#3e3832"
            strokeMiterlimit="10"
            strokeWidth=".7"
            fill="#3e3832"
        />
    </svg>
);

export default Ikon;
