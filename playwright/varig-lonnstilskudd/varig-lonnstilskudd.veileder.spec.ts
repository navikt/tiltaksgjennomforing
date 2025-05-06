import { test, expect, Page } from '@playwright/test';

test.describe('Varig Lønnstilskudd', () => {
    test.describe('Veileder', () => {
        let page: Page;

        test.describe.configure({ mode: 'serial' });

        test.beforeAll(async ({ browser }) => {
            page = await browser.newPage();
            await page.goto('/tiltaksgjennomforing');
            await page.getByRole('button', { name: 'Som veileder' }).click();

            await expect(page.getByRole('button', { name: 'Logg ut' })).toBeVisible();

            await page.goto('/tiltaksgjennomforing/opprett-avtale');
        });

        test.afterAll(async ({ request }) => {
            const [avtaleId] = page.url().match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi) || [];

            const cookies = await page
                .context()
                .cookies()
                .then((c) => c.map((cookie) => `${cookie.name}=${cookie.value}`).join('; '));

            const avtale = await request
                .get(`/tiltaksgjennomforing/api/avtaler/${avtaleId}`, { headers: { Cookie: cookies } })
                .then((r) => r.json());

            const response = await request.post(`/tiltaksgjennomforing/api/avtaler/${avtaleId}/annuller`, {
                data: {
                    annullertGrunn: 'Feilregistrering',
                },
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookies,
                    'If-Unmodified-Since': avtale.sistEndret,
                },
            });

            expect(response.status()).toBe(200);
        });

        test.beforeEach(async () => {
            await page.addInitScript(() => {
                const interval = setInterval(() => {
                    const meny = document.querySelector<HTMLDivElement>('nav[id=stegmeny]');
                    if (meny) {
                        meny.style.position = 'relative';
                        clearInterval(interval);
                    }
                }, 250);
            });
        });

        test('Opprett avtale', async () => {
            await page.getByRole('radio', { name: 'Varig lønnstilskudd' }).click();
            await page.getByLabel('Deltakers fødselsnummer').fill('00000000000');
            await page.getByLabel('Virksomhetsnummer').fill('999999999');

            await expect(page).toHaveScreenshot({ fullPage: true });

            await page.getByRole('button', { name: 'Opprett avtale' }).click();
        });

        test('Kontaktinformasjon', async () => {
            await page.getByLabel('Fornavn').nth(0).fill('David');
            await page.getByLabel('Etternavn').nth(0).fill('Deltaker');
            await page.getByLabel('Mobilnummer').nth(0).fill('99887766');

            await page.getByLabel('Fornavn').nth(1).fill('Anna');
            await page.getByLabel('Etternavn').nth(1).fill('Arbeidsgiver');
            await page.getByLabel('Mobilnummer').nth(1).fill('99776655');

            await page.getByLabel('Fornavn').nth(2).fill('Konrad');
            await page.getByLabel('Etternavn').nth(2).fill('Kontaktperson');
            await page.getByLabel('Mobilnummer').nth(2).fill('99665544');

            await page.getByRole('button', { name: '+ Legg til kontaktperson' }).click();

            await page.getByLabel('Kontaktperson for refusjon sitt fornavn').nth(0).fill('Raymond');
            await page.getByLabel('Kontaktperson for refusjon sitt etternavn').nth(0).fill('Refusjon');
            await page.getByLabel('Kontaktperson for refusjon sitt mobilnummer').nth(0).fill('99556633');

            await expect(page).toHaveScreenshot({ fullPage: true });

            await page.getByRole('link', { name: 'Neste' }).click();
        });

        test('Varighet', async () => {
            await page.reload();

            const julaften = new Date('2025-12-24');
            await page
                .locator('input')
                .nth(0)
                .pressSequentially(`${julaften.getDate()}.${julaften.getMonth() + 1}.${julaften.getFullYear()}`);

            const nyttarsaften = new Date('2025-12-31');
            await page
                .locator('input')
                .nth(1)
                .pressSequentially(
                    `${nyttarsaften.getDate()}.${nyttarsaften.getMonth() + 1}.${nyttarsaften.getFullYear()}`,
                );

            await page.locator('input').nth(1).blur();

            await page.getByLabel('Stillingsprosent for deltaker').pressSequentially('100');
            await page.getByLabel('Antall dager per uke').pressSequentially('7');

            await page.getByLabel('Antall dager per uke').blur();

            await page.waitForLoadState('networkidle');
            await expect(page.getByText('Avtalen varer i 8 dager')).toBeVisible();
            await expect(page).toHaveScreenshot({ fullPage: true });

            await page.getByRole('link', { name: 'Neste' }).click();
        });

        test('Stilling', async () => {
            await page.reload();

            await page.locator('input[id=stillinginput]').fill('CEO');

            await page.getByText('CEO').nth(1).click();

            await page
                .getByLabel('Beskriv arbeidsoppgavene som inngår i stillingen')
                .pressSequentially('Skal bli sjefen over alle sjefer');

            await page.getByLabel('Beskriv arbeidsoppgavene som inngår i stillingen').blur();

            await expect(page).toHaveScreenshot({ fullPage: true });

            await page.getByRole('link', { name: 'Neste' }).click();
        });

        test('Oppfølging', async () => {
            await page.reload();

            await page
                .getByRole('textbox')
                .nth(0)
                .pressSequentially(
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                );

            await page
                .getByRole('textbox')
                .nth(1)
                .pressSequentially(
                    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                );

            await page.getByRole('textbox').nth(1).blur();

            await page.waitForLoadState('networkidle');
            await expect(page).toHaveScreenshot({ fullPage: true });

            await page.getByRole('link', { name: 'Neste' }).click();
        });

        test('Beregning av tilskudd', async () => {
            await page.reload();

            await page.getByRole('textbox').nth(0).fill('60');
            await page.getByLabel('Månedslønn før skatt').fill('10000');

            await page.getByLabel('Sats for feriepenger').click();
            await page.getByRole('option', { name: '12 %' }).click();

            await page.getByLabel('Obligatorisk tjenestepensjon fra 0 - 30 %').fill('20');

            await page.getByLabel('Sats for arbeidsgiveravgift').click();
            await page.getByRole('option', { name: '10,6 %' }).click();

            await page.getByRole('button', { name: 'Hent kontonummer fra Altinn' }).click();

            await expect(page).toHaveScreenshot({ fullPage: true });

            await page.getByRole('link', { name: 'Neste' }).click();
        });
        //
        // test('Godkjenning', async () => {
        //     await page.reload();
        //
        //     await page.getByRole('checkbox', { name: 'Jeg skal godkjenne på vegne av deltakeren' }).check();
        //     await page.getByRole('checkbox', { name: 'har ikke BankID' }).check();
        //     await page
        //         .getByRole('checkbox', {
        //             name: 'Deltakeren er informert om kravene og godkjenner innholdet i avtalen.',
        //         })
        //         .check();
        //
        //     await page.waitForLoadState('networkidle');
        //     await expect(page).toHaveScreenshot({ fullPage: true });
        // });
    });
});
