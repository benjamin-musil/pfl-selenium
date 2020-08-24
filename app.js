'use strict';

let { Builder, By } = require('selenium-webdriver');
let driver = new Builder().forBrowser('firefox').build();

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

async function main() {
  try {
    // Navigate to base url
    let baseUrl = 'https://sdetassessment.azurewebsites.net/';
    await driver.get(baseUrl);

    // Need to click the 'Find' link, otherwise returns JSON response if navigated to directly
    await driver.findElement(By.linkText(`Find '1 2 3'`)).click();

    let failedCases = 0;
    for (let i = 0; i < testCases.length; i++) {
      let result = await searchString(testCases[i].search, driver);

      if (result === testCases[i].expected) {
        console.log(`Passed: '${testCases[i].search}'`);
      } else {
        console.log(`FAILED: '${testCases[i].search}'`);
        failedCases++;
      }
    }

    console.log(`${failedCases} tests failed. See above console logs for failed tests`);
  } catch (err) {
    console.log(err);
  }
}

main();

/**
 * Get field ID number from field group lookup
 * @param {String} inputString String inside of the search form to be verified
 * @param {Builder} webDriver Selenium driver linked to a web page
 * @return {Boolean} True/false result returned by webpage
 */
async function searchString(inputString, webDriver) {
  let result = null;
  try {
    let searchForm = await webDriver.findElement(By.id('searchtext'));
    searchForm.sendKeys(inputString);
    let searchButton = await webDriver.findElement(By.id('searchbutton'));
    searchButton.click();
    let responseArray = await webDriver.findElements(By.tagName('p'));
    let response = await responseArray[1].getText();
    let falseReturn
      = 'False: The text does not contain the integers 1 2 3 in this order.';
    let trueReturn
      = 'True: The text does contain the integers 1 2 3 in this order.';

    if (response === falseReturn) {
      result = false;
    } else if (response === trueReturn) {
      result = true;
    }
    searchForm.clear();
  } catch (err) {
    console.log(err);
  }

  return new Promise((res) => {
    res(result);
  });
}
