const router = require("express").Router();
const getInfo = require('../stores_api/amazon');

router.post("/amazon", async (req, res) => {
    const { item, category } = req.body;

    // console.log("item and category: ", item, " ", category);

    getInfo(item, category)
    .then((data) => {
        console.log(data);
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send("Encountered an unexpected error while getting the data");
        console.log("Got error: ", err);
    })
});

module.exports = router;