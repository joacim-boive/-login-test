import puppeteer from 'puppeteer';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import ip from 'ip';
import packageJson from '../../../../../package';

const config = packageJson.jestConfig;
const localDev = `http://${ip.address()}:${config.port}`;

jest.setTimeout(config.timeout);

const toMatchImageSnapshot = configureToMatchImageSnapshot(config.configureToMatchImageSnapshot);

expect.extend({ toMatchImageSnapshot });

// eslint-disable-next-line no-unused-vars
const delay = timeout =>
    new Promise(resolve => {
        setTimeout(resolve, timeout);
    });

describe('LoginPage visual regression', async () => {
    let browser;
    let page;

    beforeAll(async () => {
        // Just in case we decide to go down the Docker route
        // https://developers.google.com/web/tools/puppeteer/troubleshooting
        browser = await puppeteer.launch(config.puppeteer);

        page = await browser.newPage();
        await page.goto(localDev);
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

    afterAll(async () => {
        await browser.close();
    });
});
