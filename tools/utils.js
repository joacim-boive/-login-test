import ip from 'ip';
import config from '../package';
import puppeteer from 'puppeteer';

const { jestConfig } = config;

jestConfig.localDev = `http://${ip.address()}:${jestConfig.port}`;

const login = async (page, ssn) =>{
    await page.focus('[name="ssn"]');
    await page.keyboard.type(ssn, { delay: 100 });
    await page.keyboard.press('Enter');

    await page.waitForSelector('.common-authenticated-page');
};

/**
 * Return a promise that resolves after timeout in ms
 * @param timeout {Number} Number of milliseconds to wait
 * @returns {Promise<any>} The returned promise
 */
const delay = timeout =>
    new Promise(resolve => {
        setTimeout(resolve, timeout);
    });

export { config, jestConfig, delay, login };
