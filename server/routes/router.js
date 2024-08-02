const router = require("express").Router();
const getInfo_az = require('../stores_api/amazon');
const getInfo_fk = require('../stores_api/flipkart');
const getInfo_pk = require('../stores_api/pustakkosh');

router.post("/books", async (req, res) => {
    const { item } = req.body;
    const category_az = 'stripbooks';
    const category_fk = 'books';
    const category_pk = 'product';

    // Create an array of promises for all the API calls
    const promises = [
        getInfo_az(item, category_az),
        getInfo_fk(item, category_fk),
        getInfo_pk(item, category_pk)
    ];

    // Use Promise.allSettled to wait for all the promises to settle
    Promise.allSettled(promises)
        .then((results) => {
            let totalData = [];

            results.forEach((result) => {
                if (result.status === "fulfilled") {
                    totalData = totalData.concat(result.value);
                }
            });

            res.status(200).send(totalData);
        })
        .catch((err) => {
            res.status(500).send("Encountered an unexpected error while getting the data");
        });
});

module.exports = router;
