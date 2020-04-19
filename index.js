const axios = require('axios');
const {Builder, By, until} = require('selenium-webdriver');

(async function wikiTask () {
    const driver = await new Builder().forBrowser('chrome').build();
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    const getRandomVal = source => source[Math.floor(Math.random() * source.length)];
    const randomString = length => [...Array(length)].map(_ => getRandomVal(alphabet)).join('');
    const delay = ms => new Promise(resolve => setTimeout(() => resolve(), ms));

    try {
        await driver.get('https://en.wikipedia.org/');
        await driver.findElement(By.id('searchInput')).sendKeys(randomString(3));
        const suggestionResults = await driver.wait(until.elementLocated(By.className('suggestions-results')));

        await delay(2000);
        
        const suggestionResultsList = await suggestionResults.findElements(By.className('mw-searchSuggest-link'));
        const link = await getRandomVal(suggestionResultsList).getAttribute('href');
        const message = `<a href='${link}'>Your Daily Wiki Link</a>`;
        
        axios.post(`https://api.telegram.org/bot${your_bot_id}/sendMessage`, {
            chat_id: {your_chat_id},
            text: message,
            parse_mode: 'html'
        });
       
    } catch (err) {
        console.log(err);
    }

    finally {
        await driver.quit();
    }
    
})();
