import React from 'react';

const VarselTegnForModal = ({ width, height }: { width: string; height: string }) => {
    return (
        <svg
            xmlns="https://www.w3.org/2000/svg"
            role="presentation"
            focusable="false"
            width={width}
            height={height}
            viewBox="0 0 64 64"
        >
            <g fill="none" fillRule="evenodd">
                <circle cx="32" cy="32" r="32" fill="#FFD399" />
                <g fill="#515658">
                    <path d="M37.102 45.45V28.9H24v3.25h2.899v13.3H24v3.25h16v-3.25zM32 26.2c3.313 0 6-2.419 6-5.4 0-2.982-2.687-5.4-6-5.4-3.314 0-6 2.418-6 5.4 0 2.981 2.686 5.4 6 5.4" />
                </g>
            </g>
        </svg>
    );
};

export default VarselTegnForModal;
