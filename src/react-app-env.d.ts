/// <reference types="react-scripts" />
declare module '*.mp4' {
    const src: string;
    export default src;
}

declare module '*.module.less';

declare namespace React {
    namespace JSX {
        interface IntrinsicElements {
            'internarbeidsflate-decorator': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                'app-name'?: string;
                environment?: string;
                'url-format'?: string;
                proxy?: string;
                'fetch-active-enhet-on-mount'?: boolean;
                'fetch-active-user-on-mount'?: boolean;
                'fnr-sync-mode'?: string;
                'enhet-sync-mode'?: string;
                'show-enheter'?: boolean;
                'show-search-area'?: boolean;
                'enable-hotkeys'?: boolean;
            };
        }
    }
}
