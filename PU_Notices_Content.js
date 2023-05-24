const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto('https://pu.edu.np/notice/');

  // Wait for the required element to be rendered
  await page.waitForSelector('.sub-heading');

  // Get the first link with class 'sub-heading'
  const firstLink = await page.$('.sub-heading a');
  const linkHref = await page.evaluate(link => link.getAttribute('href'), firstLink); // Use getAttribute('href') instead of href property

  // Navigate to the first link
  await page.goto(linkHref);

  // Wait for the notice content element to be rendered
  await page.waitForSelector('.notice-content');

  // Extract the content
  const isImage = await page.evaluate(() => {
    const contentElement = document.querySelector('.notice-content');
    return contentElement.tagName.toLowerCase() === 'img';
  });

  if (isImage) {
    // Save the image
    await page.screenshot({ path: 'sc.png' });
    console.log('Image saved as sc.png');
  } else {
    // Extract the text content
    const content = await page.$eval('.notice-content', element => element.textContent.trim());
    console.log(content);
  }

  // Close the browser
  await browser.close();
})();
