import puppeteer from 'puppeteer';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

import { config, jestConfig, delay, login } from '../../../../../tools/utils';

jest.setTimeout(jestConfig.timeout);

const toMatchImageSnapshot = configureToMatchImageSnapshot(jestConfig.configureToMatchImageSnapshot);

expect.extend({ toMatchImageSnapshot });

// eslint-disable-next-line no-unused-vars

describe('LoginPage', async () => {
    let browser;
    let page;

    beforeAll(async () => {
        // Just in case we decide to go down the Docker route
        // https://developers.google.com/web/tools/puppeteer/troubleshooting
        browser = await puppeteer.launch(jestConfig.puppeteer);

        page = await browser.newPage();
        await page.goto(jestConfig.localDev);
        await page.waitForSelector('article.lazyloaded');
    });

    beforeEach(async () => {});

    it('should match the image snapshot of the untouched page', async () => {
        await delay(300);

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    });

    it('should match the image snapshot onHover of the login button', async () => {
        const button = await page.$('[name="login-button"]');

        await button.hover();

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    });
    it('should match the image snapshot onFocus of the login button', async () => {
        const button = await page.$('[name="login-button"]');

        await button.focus();

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    });

    it('should match the image snapshot onHover of the "Logga in med BankID" button', async () => {
        const button = await page.$('[name="login-button-bid"]');

        await button.hover();

        // Should need a delay as there's an animation on the button - but leaving this here for now.
        // await delay(400); // We need to wait for the animation to finish

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    });

    it('should be able to login', async () => {
        await login(page, config.test.persons[0].ssn);

        expect(page).toMatchElement('.account-header__card-number > h3', { text: 'MultiCard 001' });
    });

    afterAll(async () => {
        // await browser.close();
    });
});
