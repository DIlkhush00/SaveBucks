const router = require("express").Router();
const getInfo_az = require('../stores_api/amazon');
const getInfo_fk = require('../stores_api/flipkart');
const getInfo_pk = require('../stores_api/pustakkosh');

router.post("/amazon", async (req, res) => {
    const { item } = req.body;
    const category_az = 'stripbooks';
    const category_fk = 'books';
    const category_pk = 'product';
    let totalData = [];

    // Getting Data From The Amazon
    getInfo_az(item, category_az)
    .then((data) => {
       totalData = totalData.concat(data);

        // Getting Data From The Flipkart
        return getInfo_fk(item, category_fk);
    })
    .then((data) => {
        totalData = totalData.concat(data);

        // Getting Data From The PustakKosh
        return getInfo_pk(item, category_pk);
    })
    .then((data) => {
        totalData = totalData.concat(data);
        res.status(200).send(totalData);
    })
    .catch((err) => {
        res.status(500).send("Encountered an unexpected error while getting the data");
        console.log("Got error: ", err);
    })
});

module.exports = router;