import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

import { config, jestConfig, Browser } from '../../../../../tools/test-utils';

jest.setTimeout(jestConfig.timeout);

const toMatchImageSnapshot = configureToMatchImageSnapshot(jestConfig.configureToMatchImageSnapshot);

expect.extend({ toMatchImageSnapshot });

describe('LoginPage', async () => {
    const browser = new Browser();

    beforeAll(async () => {
        // This isn't according to best practices, but until the delay in login with BankID is solved
        //
        await browser.init();

        await browser.loginPage();
    });

    it('should match the image snapshot of the untouched page', async () => {
        const image = await browser.page.screenshot();

        expect(image).toMatchImageSnapshot();
    });

    it('should match the image snapshot onHover of the login button', async () => {
        const button = await browser.page.$('[name="login-button"]');

        await button.hover();

        const image = await browser.page.screenshot();

        expect(image).toMatchImageSnapshot();
    });
    it('should match the image snapshot onFocus of the login button', async () => {
        const button = await browser.page.$('[name="login-button"]');

        await button.focus();

        const image = await browser.page.screenshot();

        expect(image).toMatchImageSnapshot();
    });

    it('should match the image snapshot onHover of the "Logga in med BankID" button', async () => {
        const button = await browser.page.$('[name="login-button-bid"]');

        await button.hover();

        const image = await browser.page.screenshot();

        expect(image).toMatchImageSnapshot();
    });

    it('should be able to login', async () => {
        await browser.login(config.test.persons[0].ssn);
        await browser.page.waitFor(300);

        expect(browser.page).toMatchElement('.account-header__card-number > h3', { text: 'MultiCard 001' });
    });
});
