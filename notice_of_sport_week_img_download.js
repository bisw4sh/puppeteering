const puppeteer = require('puppeteer');

async function downloadImage() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://pu.edu.np/notice/notice-for-sports-meet/');

  const imageSrc = await page.evaluate(() => {
    const noticeContentElement = document.querySelector('.notice-content');
    const imageElement = noticeContentElement.querySelector('img');
    return imageElement.src;
  });

  if (imageSrc) {
    const viewSource = await page.goto(imageSrc);
    await viewSource.buffer().then(buffer => {
      const fs = require('fs');
      fs.writeFile('notice_sport_week.png', buffer, () => {
        console.log('Image saved successfully!');
      });
    });
  } else {
    console.log('No image found.');
  }

  await browser.close();
}

downloadImage();
