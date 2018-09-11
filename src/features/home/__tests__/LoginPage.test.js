const puppeteer = require('puppeteer');

const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

jest.setTimeout(100000);

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThreshold: '0.004',
    failureThresholdType: 'percent',
    noColors: false,
});

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
        browser = await puppeteer.launch({
            headless: true,
            args: ['--disable-dev-shm-usage', '--cap-add=SYS_ADMIN'],
        });

        page = await browser.newPage();
        await page.goto('http://172.25.14.140:5600');
        await page.waitForSelector('article.lazyloaded');
    });

    beforeEach(async () => {});

    it('should match the image snapshot of the untouched page', async () => {
        await delay(300);

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    });

    it('should match the image snapshot onHover of the login button', async () => {
        await page.hover('[name="login-button"]');

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    });
    it('should match the image snapshot onFocus of the login button', async () => {
        await page.focus('[name="login-button"]');

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
