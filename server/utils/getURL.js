module.exports = (item, cat) => {
    const proto = "https://www.";
    const domain = "google";
    const top_level_domain = ".com";
    const baseQuery = "/search?q=";
    const itemQuery = baseQuery + item;
    const category = cat !== '' ? '&tbm=' + cat : '';
    const url = proto + domain + top_level_domain + itemQuery + category;

    return url;
}