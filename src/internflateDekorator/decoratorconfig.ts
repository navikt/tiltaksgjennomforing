import { miljo } from '@/utils';

type Environment = 'q0' | 'q1' | 'q2' | 'q3' | 'q4' | 'prod' | 'local' | 'mock';
type UrlFormat = 'LOCAL' | 'NAV_NO' | 'ANSATT';
type SyncMode = 'sync' | 'writeOnly' | 'ignore';

interface DecoratorConfig {
    appName: string;
    fetchActiveEnhetOnMount?: boolean;
    fetchActiveUserOnMount?: boolean;
    fnrSyncMode?: SyncMode;
    enhetSyncMode?: SyncMode;
    showEnheter?: boolean;
    showSearchArea?: boolean;
    environment: Environment;
    urlFormat: UrlFormat;
    proxy?: string;
}

const decoratorconfig = (): DecoratorConfig => {
    return {
        appName: 'Tiltaksgjennomføring',
        fetchActiveEnhetOnMount: true,
        fetchActiveUserOnMount: true,
        fnrSyncMode: 'ignore',
        enhetSyncMode: 'ignore',
        showEnheter: false,
        showSearchArea: false,
        environment: miljo() === 'prod' ? 'prod' : 'q2',
        urlFormat: 'NAV_NO',
        proxy: '/modiacontextholder',
    };
};

export default decoratorconfig;
