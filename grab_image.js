const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 1000
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });
  const name = 'erik';
  const profession = 'architect';
  const year = 2005;
  const query = profession + '+' + year;
  await page.goto('https://www.google.com/search?q=' + query + '&sxsrf=ACYBGNSF8lP91SmxWUEmHhfu1E6nbKPUcQ:1567961726122&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiovtPN2MHkAhWDbVAKHaABBrQQ_AUIEigB&biw=1680&bih=888');
  await page.keyboard.press('ArrowRight');

  for(var i = 0; i < 20; i++){
    await page.keyboard.down('Enter');
    await page.keyboard.press('ArrowRight');

    let imageHref = await page.evaluate((sel) => {
      console.log('whats this')
      console.log(sel);
      return document.querySelector(sel).getAttribute('src').replace('/', '');
    }, '.irc_mi');
    // const img = '.irc_mi > img';
    console.log(imageHref)
    // await page.screenshot({path: './screenshots/' + name + '/' + year + '_' + profession + '_' + i + '.png'}).catch(err => {console.log(err)});
  }

  // await browser.close();
})();