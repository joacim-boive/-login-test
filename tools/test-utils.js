const ip = require('ip');
const puppeteer = require('puppeteer');

const config = require('../package');

const { jestConfig } = config;

jestConfig.localDev = `http://${ip.address()}:${jestConfig.port}`;

class Browser {
    constructor(thisConfig = config) {
        this.config = thisConfig;
    }

    /**
     * Returns a new browser with default setting from package.json
     * @returns {Promise<{browser: *, page}>} The created Browser and new page ready for an URL to navigate to.
     */
    async init() {
        this.browser = await puppeteer.launch(jestConfig.puppeteer);
        this.page = await this.browser.newPage();

        await this.page.setViewport(jestConfig.puppeteer.defaultViewport);
    }

    /**
     * Opens a fresh browser without any cache and loads the local dev environment with default parameters from package.json
     * @param isWaitForFullLoad {boolean} Wait for the background image to be loaded (for snapshot comparisons)
     * @returns {Promise<{browser, page}>} The browser object and the login page ready for testing
     */
    async loginPage(isWaitForFullLoad = true) {
        await this.page.goto(jestConfig.localDev); // Goto the local dev environment login page

        if (isWaitForFullLoad) {
            await this.page.waitForSelector('article.lazyloaded'); // Wait for it to be fully loaded
        }
    }

    /**
     * Handles login to the local dev environment using default login methods
     * @param ssn {string} The Social Security Number to use for login
     * @returns {Promise<void>}
     */
    async login(ssn) {
        await this.loginPage();

        await this.page.focus('[name="ssn"]');
        await this.page.keyboard.type(ssn, { delay: 100 });
        await this.page.keyboard.press('Enter');

        await this.page.waitForSelector('.common-authenticated-page');
    }

    /**
     * Close this browser and free resources
     * @returns {Promise<void>}
     */
    async close() {
        await this.browser.close();
    }
}

/**
 * Return a promise that resolves after timeout in ms
 * @param timeout {Number} Number of milliseconds to wait
 * @returns {Promise<any>} The returned promise
 */
const delay = timeout =>
    new Promise(resolve => {
        setTimeout(resolve, timeout);
    });

module.exports = { config, jestConfig, delay, Browser };
