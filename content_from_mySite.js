'use strict';

const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch({headless : false});
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });
  await page.goto('https://www.biswashdhungana.com.np');

  const gettingTitle = await page.evaluate( () => {
    const title = document.querySelector('.box')
    return title.innerText
})

console.log(gettingTitle)

await browser.close();
  
})();