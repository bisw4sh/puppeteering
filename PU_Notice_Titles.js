const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto('https://pu.edu.np/notice/');

  // Wait for the required element to be rendered
  await page.waitForSelector('.sub-heading');

  // Extract the titles
  const titles = await page.evaluate(() => {
    const titleElements = document.querySelectorAll('.sub-heading');
    const titles = Array.from(titleElements).map(element => element.textContent.trim());
    return titles;
  });

  // Print the titles
  console.log(titles);

  // Close the browser
  await browser.close();
})();
