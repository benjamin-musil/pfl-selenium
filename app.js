'use strict';

let { Builder, By } = require('selenium-webdriver');

let testCases = [
  { search: '1 2 3', expected: true },
  { search: '123', expected: false },
  { search: '1 2 30', expected: false },
  { search: '1 2 3 3 2 1', expected: true },
  { search: '1 2 3 2 1', expected: true },
  { search: '1 1 2 2 3 3', expected: false },
  { search: '1*****2****3', expected: true },
  { search: '1abc2abc3abc', expected: true },
  { search: '3 2 1', expected: false },
  { search: '3 2 1 2 3', expected: true },
  { search: 'abcde', expected: false },
  { search: `1 1 2 3 2 3`, expected: true },
  { search: `54658165131313213213215615646581891897891 1 2 3`, expected: true },
  { search: `1 -2 3`, expected: false },
  { search: '', expected: null }
];

// Add test cases for special characters
let delimiterArray = '~`!@#$%\\^&*+=\\[\\]\\\\\';,/{}|\\\\":<>\\?'.split('');
delimiterArray.forEach((char) => {
  let searchText = `${char}1${char}2${char}3${char}`;
  let testCase = { search: searchText, expected: true };
  testCases.push(testCase);
  searchText = `1${char}2${char}3`;
  testCase = { search: searchText, expected: true };
  testCases.push(testCase);
});

async function main() {
  let driver = new Builder().forBrowser('firefox').build();
  try {
    // Navigate browser to base url page
    let baseUrl = 'https://sdetassessment.azurewebsites.net/';
    await driver.get(baseUrl);

    // Need to click the 'Find' link, otherwise browser returns object response if navigated to directly
    await driver.findElement(By.linkText(`Find '1 2 3'`)).click();

    // Load the search form to see if we are on the right page
    await driver.findElement(By.id('searchtext'));

    console.log('Passed: Reached webpage');
  } catch (err) {
    console.log('FAILED: Webpage not reached. Error: ', err);
    await driver.quit();
    process.exit();
  }

  try {
    let failedCases = [];
    for (let i = 0; i < testCases.length; i++) {
      // Use await inside for loop to clear search form between searches
      let result = await searchString(testCases[i].search, driver);

      if (result === testCases[i].expected) {
        console.log(`Passed: '${testCases[i].search}'`);
      } else {
        console.log(`FAILED: '${testCases[i].search}', `
          + `Expected: ${testCases[i].expected}, Got: ${result}`);
        let failedCaseLog = `FAILED: '${testCases[i].search}', `
          + `Expected: ${testCases[i].expected}, `
          + `Got: ${result}`;
        failedCases.push(failedCaseLog);
      }
    }

    if (failedCases.length !== 0) {
      console.log(`The following ${failedCases.length} tests failed:`);
      failedCases.forEach(failedCase => console.log(failedCase));
    } else {
      console.log(`All test cases passed`);
    }
  } catch (err) {
    console.log(err);
  }
  await driver.quit();
  process.exit();
}

main();

// HELPER FUNCTIONS

/**
 * Get field ID number from field group lookup
 * @param {String} inputString String inside of the search form to be verified
 * @param {WebDriver} webDriver Selenium driver linked to a web page
 * @return {Boolean} True/false result returned by webpage
 */
async function searchString(inputString, webDriver) {
  let result = null;
  try {
    let searchForm = await webDriver.findElement(By.id('searchtext'));
    searchForm.sendKeys(inputString);
    let searchButton = await webDriver.findElement(By.id('searchbutton'));
    searchButton.click();

    // The second paragraph tag contains the response to the query
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
