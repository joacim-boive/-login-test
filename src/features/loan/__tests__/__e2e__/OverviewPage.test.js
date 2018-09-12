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

        await login(page, config.test.persons[0].ssn);
    });

    beforeEach(async () => {});

    it('should match the image snapshot of the untouched page', async () => {
        await page.waitForSelector('.account-header__card-icon.lazyloaded');

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    });

    afterAll(async () => {
        await browser.close();
    });
});
