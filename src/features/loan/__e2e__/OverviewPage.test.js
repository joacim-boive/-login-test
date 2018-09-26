import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

import { config, jestConfig, Browser } from '../../../../tools/test-utils';

jest.setTimeout(jestConfig.timeout);

const toMatchImageSnapshot = configureToMatchImageSnapshot(jestConfig.configureToMatchImageSnapshot);

expect.extend({ toMatchImageSnapshot });

describe('LoginPage', async () => {
    const browser = new Browser();

    beforeAll(async () => {
        await browser.init();

        await browser.login(config.test.persons[0].ssn);
    });

    it('should match the image snapshot of the untouched page', async () => {
        await browser.page.waitForSelector('.ecster-card.lazyloaded');
        await browser.page.waitFor(300);

        const image = await browser.page.screenshot();

        expect(image).toMatchImageSnapshot();
    });
});
