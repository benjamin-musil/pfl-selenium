'use strict';

let { Builder, By } = require('selenium-webdriver');
let driver = new Builder().forBrowser('firefox').build();

async function main() {
  try {
    // Navigate to base url
    let baseUrl = 'https://sdetassessment.azurewebsites.net/';
    await driver.get(baseUrl);

    // Need to click link the 'Find' link, otherwise returns JSON response if navigated to directly
    await driver.findElement(By.linkText(`Find '1 2 3'`)).click();

    // Array of test cases for search field
    let testCases = [
      { search: '1 2 3', expected: true },
      { search: '123', expected: true },
      { search: '1 2 3 3 2 1', expected: true },
      { search: '1 2 3 2 1', expected: true },
      { search: '1 1 2 2 3 3', expected: false },
      { search: '1*****2****3', expected: true },
      { search: '1abc2abc3abc', expected: true },
      { search: '3 2 1', expected: false },
      { search: '3 2 1 2 3', expected: true },
      { search: 'abcde', expected: false },
      { search: '', expected: null }
    ];

    let failedCases = 0;
    let results = [];
    // console.log('Start Selenium Tests...');
    // for (let i = 0; i < testCases.length; i++) {
    //   results.push = searchString(testCases[i], driver);
    //   if (testCases[i].expected === results[i]) {
    //     console.log('Test ' + testCases[i].search + ' => passed');
    //   } else {
    //     console.log('Test ' + testCases[i].search + ' => failed');
    //     failedCases++;
    //   }
    // }
    let searchForm = await driver.findElement(By.id('searchtext'));
    searchForm.sendKeys('1 2 3');
    let searchButton = await driver.findElement(By.id('searchbutton'));
    searchButton.click();
    let resultArray = await driver.findElements(By.tagName('p'));
    let result = await resultArray[1].getText();
    console.log(result);

    // for (let i = 0; i < testCases.length; i++) {
    //   searchForm.sendKeys(testCases[i].search);
    //   await new Promise(r => setTimeout(r, 1000));
    //   searchButton.click();
    //   await new Promise(r => setTimeout(r, 1000));
    //   results.push(await driver.findElements(By.tagName('p')));
    //   searchForm.clear();
    // }
    // await Promise.all(results);
    // console.log(results);
    // results.forEach((result) => {
    //   console.log(result[1].getText());
    // });
    // console.log('...end Selenium Tests.');

    // for (let i = 0; i < testCases.length; i++) {
    //   if (testCases[i].expected === results[i]) {
    //     console.log('Test ' + testCases[i].search + ' => passed');
    //   } else {
    //     console.log('Test ' + testCases[i].search + ' => failed');
    //     failedCases++;
    //   }
    // }
    // if (failedCases === 0) {
    //   console.log('All test cases passed!');
    // } else {
    //   console.log(
    //     `${failedCases} test cases failed. See the above log for failed cases.`
    //   );
    // }
  } catch (err) {
    console.log(err);
  }
}

main();

/**
 * Get field ID number from field group lookup
 * @param {String} inputString String inside of the search form to be verified
 * @param {WebElement} searchForm Form element returned by Selenium driver
 * @param {WebElement} searchButton Button element returned by Selenium driver
 * @return {Boolean} True/false result returned by webpage
 */
async function searchString(inputString, webDriver) {
  try {
    let searchForm = await webDriver.findElement(By.id('searchtext'));
    searchForm.sendKeys(inputString);
    let searchButton = await webDriver.findElement(By.id('searchbutton'));
    searchButton.click();

    let falseReturn
      = 'False: The text does not contain the integers 1 2 3 in this order.';
    let trueReturn
      = 'True: The text does contain the integers 1 2 3 in this order.';

    let elements = await webDriver.findElements(By.css('p'));
    if (elements[1] === falseReturn) {
      return false;
    } else if (elements[1] === trueReturn) {
      return true;
    }
  } catch (err) {
    console.log(err);
  }

  return null;
}
