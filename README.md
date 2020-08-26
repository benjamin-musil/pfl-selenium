# PFL Selenium Assignment
Example UI Test with Selenium Web Driver for https://sdetassessment.azurewebsites.net/

## Requirements

- Node.js v12
- Selenium [WebDriver for JavaScript](https://www.selenium.dev/downloads/)
- Mozilla Firefox
- Mozilla's [GeckoDriver](https://github.com/mozilla/geckodriver) (added to PATH - [instructions below](#Add-GeckoDriver-to-PATH))

## Setup

1) Clone the repository to a local folder.

2) Run the following commands:

```sh
$ npm install
$ node app.js
```

### Add GeckoDriver to PATH (Unix)
Check repo link in the requirements section to check for latest driver

```sh
wget https://github.com/mozilla/geckodriver/releases/download/v0.27.0/geckodriver-v0.27.0-linux64.tar.gz
tar -xvzf geckodriver*
chmod +x geckodriver
sudo mv geckodriver /usr/local/bin/
```

Source: https://askubuntu.com/questions/870530/how-to-install-geckodriver-in-ubuntu 