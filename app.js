let {Builder, By} = require('selenium-webdriver');
let driver = new Builder().forBrowser('firefox').build();

async function test() {
  try {
    // Navigate to base url
    let baseUrl = 'https://sdetassessment.azurewebsites.net/';
    await driver.get(baseUrl);

    // Need to click link the 'Find' link, otherwise returns JSON response if navigated to directly
    driver.findElement(By.linkText(`Find '1 2 3'`)).click();

    // let search = await driver.findElement(
    //   By.xpath(`//input[@id='searchtext']`)
    // );

    await new Promise(r => setTimeout(r, 2000));

    let searchForm = await driver.findElement(By.id('searchtext'));
    searchForm.sendKeys('1 2 3');

    let searchButton = await driver.findElement(By.id('searchbutton'));
    searchButton.click();

  } catch (err) {
    console.log(err);
  }
}

test();