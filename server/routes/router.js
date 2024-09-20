const router = require("express").Router();
const getInfo_az = require('../stores_api/amazon');
const getInfo_fk = require('../stores_api/flipkart');
const getInfo_pk = require('../stores_api/pustakkosh');
const getInfo_gg = require('../stores_api/google');

router.post("/products", async (req, res) => {
    const { item } = req.body;
    const category_gg = 'shop';

    const promises = [
        getInfo_gg(item, category_gg),
    ];

    // Use Promise.allSettled to wait for all the promises to settle
    Promise.allSettled(promises)
        .then((results) => {
            let totalData = [];

            results.forEach((result) => {
                if (result.status === "fulfilled") {
                    totalData = totalData.concat(result.value);
                } else {
                    console.log("Got error: ", result.reason);
                }
            });

            res.status(200).send(totalData);
        })
        .catch((err) => {
            res.status(500).send("Encountered an unexpected error while getting the data");
            console.log("Got error: ", err);
        });
});

module.exports = router;
