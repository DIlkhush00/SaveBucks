const cheerio = require('cheerio');
const axios = require('axios');

const load_pk = async (item, cat) => {

    const proto = "https://www.";
    const domain = "pustakkosh";
    const top_level_domain = ".com";
    const query = "/?s=";
    const category = cat !== '' ? cat : '';
    const qParams = "&post_type=" + category + "&et_search=true";
    const url = proto + domain + top_level_domain  + query + item + qParams;

    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', // Mimicking a browser User-Agent
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
      };

    try {
        console.log("Requesting Pustakkosh URL: ", url);
        const response = await axios.get(url, { headers })

        return cheerio.load(response.data);

    } catch(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
    }

}


const getData_pk = ($, index) => {
    let obj = {};
    let common = 'div.content-product:eq(' + index + ')';

    // Check the available stock
    let stockSelector = `${common} > div.product-image-wrapper > p`;
    let outOfStock = $(stockSelector).hasClass('out-of-stock');

    if(outOfStock) {
        obj['thumbnail'] = '';
        obj['title'] = '';
        obj['extra'] = '';
        obj['type'] = '';
        obj['authorName'] = '';
        obj['productURL'] = '';
        obj['price'] = '';
        obj['source'] = 'PustakKosh';

        obj['valid'] = false;


        return obj;
    }

    // For product thumbnail
    let thumbSelector = `${common} > div.product-image-wrapper > a.product-content-image > img`;
    let thumbnail = $(thumbSelector).attr('src');
    obj['thumbnail'] = thumbnail !== undefined ? thumbnail : '';

    // For product title
    let titleSelector = `${common} > div.product-details > h2.product-title > a`;
    let title = $(titleSelector).text().replace(/\s+/g, ' ').trim();
    obj['title'] = title !== undefined ? title : '';

    // For author (if product is a book), type and extra
    let extra = '';
    obj['extra'] = extra !== undefined ? extra : '';

    let type = '';
    let author = '';

    obj['type'] = type !== undefined ? type : '';
    obj['authorName'] = author !== undefined ? author : '';

    // For product URL
    let productURL = $(titleSelector).attr('href');
    obj['productURL'] = productURL !== undefined ? productURL : '';

    // For product price
    // Check if discounted price
    let discount = `${common} > div.product-details > span.price span.woocommerce-Price-amount:eq(0)`
    let parentDiscountElem = $(discount).parent()
    let parentTag = parentDiscountElem.prop('tagName').toLowerCase();

    let priceSelector = '';
    let symbolSelector = '';
    console.log("parentTag, ", parentTag);
    if(parentTag == 'del') {
        console.log("del detected")
        priceSelector = `${common} > div.product-details > span.price > ins > span.woocommerce-Price-amount  > bdi`;
        // symbolSelector = `${common} > div.product-details > span.price > ins > span.woocommerce-Price-amount > bdi > span.woocommerce-Price-currencySymbol`;

    } else {
        console.log("no del");
        priceSelector = `${common} > div.product-details > span.price  span.woocommerce-Price-amount  > bdi`;
        // symbolSelector = `${common} > div.product-details > span.price  span.woocommerce-Price-amount > bdi > span.woocommerce-Price-currencySymbol`;
    }

    let price = $(priceSelector).text();
    // let symbol = $(symbolSelector).text();

    obj['price'] = price !== undefined ? price : '';

    // Source
    obj['source'] = 'PustakKosh';

    // Valid
    obj['valid'] = true;

    return obj;
};


const getInfo_pk = async (item, cat) => {

    if(item == undefined) return [];

    const $ = await load_pk(item, cat);
    const limit = 3;
    let data = [];

    if($ == null) return data;

    for(let i = 0; i < limit; i++)
    {
        data.push(getData_pk($, i));
    }

    return data;
}


module.exports = getInfo_pk ;