import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
    testDir: './playwright',
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    expect: {
        timeout: 30000,
        toHaveScreenshot: {
            maxDiffPixels: 100,
        },
    },
    use: {
        baseURL: 'https://tiltaksgjennomforing-labs.ekstern.dev.nav.no',
    },
    projects: [
        {
            name: 'Chromium desktop',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
};

export default config;
