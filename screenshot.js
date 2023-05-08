'use strict';

const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });
  await page.goto('https://www.biswashdhungana.com.np');
  await page.screenshot({path: 'br4ke-screenshot.png', fullPage: true, height: 1080, width: 1920, timeout: 20000,printBackground: true,});
  await browser.close();
  
})();