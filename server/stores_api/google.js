const cheerio = require('cheerio');
const axios = require('axios');

const load_gg = async (url, headers) => {

    try {
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


/**
 * This function scrapes the data from the websites
 * 
 * @param $: Function
 * @param index: Integer
 * @returns an object which contains: thumbnail, title, productURL, productSecondaryURL, price, source, valid
*/
const getData_gg = ($, index) => {
    let obj = {};
    let common = 'div.sh-pr__product-results-grid > div.sh-dgr__grid-result:eq(' + index + ')';

    // Check if there's any result
    const noResult = $('div.sh-pr__product-results-grid > div.sh-dgr__grid-result').length > 0;
    if(!noResult) {
        obj['thumbnail'] = '';
        obj['title'] = '';
        obj['productURL'] = '';
        obj['productSecondaryURL'] = '';
        obj['price'] = '';
        obj['source'] = '';
        obj['valid'] = false;

        return obj;
    }
    
    // For product idsh-dgr__grid-result
    let ID = $(common).attr('data-gpcid');
    obj['id'] = ID ? ID : '';

    // For product thumbnail
    obj['thumbnail'] = '';


    // For product title
    let titleSelector = `${common} div.EI11Pd > h3.tAxDx`;
    let title = $(titleSelector).text().replace(/\s+/g, ' ').trim();
    obj['title'] = title !== undefined ? title : '';

    // For product URL
    let URLSelector = `${common} div.mnIHsc > a.shntl`;
    let productURL = $(URLSelector).attr('href');
    obj['productURL'] = productURL !== undefined ? productURL : '';

    // For product secondary URL
    let secondaryURLSelector = `${common} a.translate-content`;
    let productSecondaryURL = $(secondaryURLSelector).attr('href');
    obj['productSecondaryURL'] = productSecondaryURL !== undefined ? productSecondaryURL : '';

    // For product price
    let priceSelector = `${common} div.mnIHsc > a.shntl span.OFFNJ`;
    let price = $(priceSelector).text().trim();
    obj['price'] = price !== undefined ? price : '';

    // For source
    let sourceSelector = `${common} div.mnIHsc > a.shntl div.IuHnof`;
    let sourceElement = $(sourceSelector);

    // Extract only text nodes and ignore other elements (like style tags)
    let source = sourceElement.contents().filter(function() {
        return this.type === 'text';
    }).text().trim();

    if (!source) {
        source = sourceElement.text().trim();  // Directly get the text if no filtering needed
    }

    obj['source'] = source;

    // Validity
    obj['valid'] = true;

    return obj;
};


const getInfo_gg = async (url, limit = 5) => {

    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', // Mimicking a browser User-Agent
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
    };

    const $ = await load_gg(url, headers);
    let data = [];

    if($ == null) return data;

    for(let index = 0; index < limit; index++)
    {
        let obj = getData_gg($, index);
        data.push(obj);
    }

    return data;
}


module.exports = getInfo_gg ;