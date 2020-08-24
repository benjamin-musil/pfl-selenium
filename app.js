let {Builder, By} = require('selenium-webdriver');
let driver = new Builder().forBrowser('firefox').build();

(async function test(){

//Navigate to url
let baseUrl = 'https://sdetassessment.azurewebsites.net/'
await driver.get(baseUrl);
})();