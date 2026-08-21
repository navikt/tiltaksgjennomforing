export {};

declare global {
    interface Window {
        __DECORATOR_DATA__?: unknown;
        webStorageController?: {
            getCurrentConsent: () => {
                consent: {
                    analytics: boolean;
                    surveys: boolean;
                };
            };
        };
        beforeSendHandler?: (type: string, payload: Record<string, unknown>) => Record<string, unknown>;
        sporing?: {
            track: (payload?: Record<string, unknown>) => void;
            identify: (id: string, data?: Record<string, unknown>) => void;
        };
    }
}
