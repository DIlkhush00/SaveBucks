const cheerio = require('cheerio');
const axios = require('axios');

const load = async (item, cat = '') => {

    const proto = "https://www.";
    const domain = "amazon";
    const top_level_domain = ".in";
    const query = "/s?k=";
    const category = cat != ''? `&i=${cat}`: '';
    const url = proto + domain + top_level_domain + query + item + category;
    
    console.log("url: ", url);

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
        })

        return cheerio.load(response.data);

    } catch(error) {
        console.log("Error in getting html page", error);
    }

}

const getData = ($, index) => {
    let obj = {};
        
    let common = 'div.s-result-item[data-component-type="s-search-result"]:eq('+ index +')';

    // For product thumbnail
    let thumbSelector = `${common} .s-image`;
    let thumbnail = $(thumbSelector).attr('src');
    obj['thumbnail'] = thumbnail !== undefined ? thumbnail : '';

    // For product title
    let titleSelector = `${common} h2.a-size-mini a > span`;
    let title =  $(titleSelector).text().replace(/\s+/g, ' ').trim();
    obj['title'] = title !== undefined ? title : '';

    // For author (if product is a book)
    let authorSelector = `${common} div.a-color-secondary > div.a-row > .a-size-base:not(.a-color-secondary):is(span, a)`;
    let elements = $(authorSelector).filter((index, element) => {
        return !($(element).is('span') && $(element).index() === $(element).parent().children('.a-size-base').index($(element).parent().children('.a-size-base').filter('span').first()));
    });
    let author = $(elements).text();
    obj['authorName'] = author !== undefined ? author : '';

    // For product URL
    let URLSelector = `${common} h2.a-size-mini > a`;
    let productURL = $(URLSelector).attr('href');
    obj['productURL'] = productURL !== undefined ? productURL : '';

    // For product price
    // let price = $(`${common} .a-price-symbol:first`).text().replace(/\s+/g, ' ') +
    //             $(`${common} .a-price-whole:first`).text().replace(/\s+/g, ' ');
    // obj['price'] = price.trim();

    let priceSelector = `${common} div.puisg-col-inner > div[data-cy="price-recipe"] .a-row span.a-price > span.a-offscreen`;
    let price = $(priceSelector).first().text();
    obj['price'] = price !== undefined ? price : '';

    // Type of product
    let typeSelector = `${common} div.puisg-col-inner > div[data-cy="price-recipe"] > .a-row:first-of-type > a`
    let type = $(typeSelector).text();
    obj['type'] = type !== undefined ? type : '';

    return obj;
};


const getInfo = async (item, cat) => {
    console.log("item: ", item, " cat: ", cat);

    if(item == undefined) return [];

    const $ = await load(item, cat);
    const limit = 5;
    let data = [];

    if($ == null) return data;

    for(let i = 0; i < limit; i++)
    {
        data.push(getData($, i));
    }

    return data;
}


module.exports = getInfo ;