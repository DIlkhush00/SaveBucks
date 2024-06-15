const cheerio = require('cheerio');
const axios = require('axios');

const load_fk = async (item, cat) => {

    const proto = "https://www.";
    const domain = "flipkart";
    const top_level_domain = ".com";
    const query = "/pr?sid=bks&q=";
    const category = cat !== '' ? '/' + cat : '';
    const url = proto + domain + top_level_domain + category + query + item;
    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', // Mimicking a browser User-Agent
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
      };

    try {
        console.log("Requesting Flipkart URL: ", url);
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


const getData_fk = ($, index) => {
    let obj = {};
    let common = 'div.cPHDOP > div._75nlfW > div:eq(' + index + ')';

    // Check if there's any result
    const noResult = $('div.cPHDOP > div.xFpzYq').length > 0;
    if(noResult || $(common).length == 0) {
        console.log("No result from flipkart!");
        obj['thumbnail'] = '';
        obj['title'] = '';
        obj['extra'] = '';
        obj['type'] = '';
        obj['authorName'] = '';
        obj['productURL'] = '';
        obj['price'] = '';
        obj['source'] = 'Flipkart';

        obj['valid'] = false;

        return obj;
    }

    // For product thumbnail
    let thumbSelector = `${common} div.slAVV4 > a.VJA3rP div._4WELSP > img`;
    let thumbnail = $(thumbSelector).attr('src');
    obj['thumbnail'] = thumbnail !== undefined ? thumbnail : '';

    // For product title
    let titleSelector = `${common} div.slAVV4 > a.wjcEIp`;
    let title = $(titleSelector).text().replace(/\s+/g, ' ').trim();
    obj['title'] = title !== undefined ? title : '';

    // For author (if product is a book), type
    let textSelector = `${common} div.slAVV4 > a.wjcEIp + div.NqpwHC`;
    let extra = $(textSelector).text();
    console.log("Text: ", extra);

    obj['extra'] = extra !== undefined ? extra : '';

    let type = '';
    let author = '';

    obj['type'] = type !== undefined ? type : '';
    obj['authorName'] = author !== undefined ? author : '';

    // For product URL
    let URLSelector = `${common} div.slAVV4 > a.wjcEIp`;
    let productURL = $(URLSelector).attr('href');
    obj['productURL'] = productURL !== undefined ? productURL : '';

    // For product price
    let priceSelector = `${common} div.slAVV4 > a.DMMoT0  div.Nx9bqj`;
    let price = $(priceSelector).text();
    obj['price'] = price !== undefined ? price : '';

    // Source
    obj['source'] = 'Flipkart';

     // Valid
     obj['valid'] = true;

    return obj;
};


const getInfo_fk = async (item, cat) => {

    if(item == undefined) return [];

    const $ = await load_fk(item, cat);
    const limit = 3;
    let data = [];

    if($ == null) return data;

    for(let i = 0; i < limit; i++)
    {
        data.push(getData_fk($, i));
    }

    return data;
}


module.exports = getInfo_fk ;