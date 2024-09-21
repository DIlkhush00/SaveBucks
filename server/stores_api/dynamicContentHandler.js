const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

module.exports = async function (url, limit) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    const html = await page.content();

    const $ = cheerio.load(html);

    let thumbnails = {thumbnail : []};
    for(let index = 0; index < limit; index++)
    {
        let common = 'div.sh-pr__product-results-grid > div.sh-dgr__grid-result:eq(' + index + ')';
        let imgSelector = `${common} div.ArOc1c > img`;
        let thumbnail = $(imgSelector).attr('src');
        let id = $(common).attr('data-gpcid');
        thumbnail = thumbnail !== undefined ? thumbnail : '';
        thumbnails['thumbnail'].push({id, thumbnail});
    }

    await browser.close();

    return thumbnails;
};
