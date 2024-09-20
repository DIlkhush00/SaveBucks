const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

module.exports = async function (url, index) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for the dynamically loaded content (image) to be available
    // await page.waitForSelector(`${common} div.ArOc1c > img`);

    // Get the HTML content after the page is fully rendered
    const html = await page.content();

    // Load the HTML into Cheerio
    const $ = cheerio.load(html);

    let common = 'div.sh-pr__product-results-grid > div.sh-dgr__grid-result:eq(' + index + ')';


    // Now you can use Cheerio to query the HTML as usual
    let thumbSelector = `${common} div.ArOc1c > img`;
    let thumbnail = $(thumbSelector).attr('src');
 
    const imgData = thumbnail !== undefined ? thumbnail : '';

    await browser.close();

    return imgData;
};
