const router = require("express").Router();
const getInfo_gg = require('../stores_api/google');
const getURL = require("../utils/getURL");
const dynamicContentHandler = require('../stores_api/dynamicContentHandler');

router.get("/", (req, res) => {
    res.send("ok");
})

router.post("/products", async (req, res) => {
    const { item, clientId } = req.body;
    const category_gg = 'shop';
    const limit = 10;
    const url = getURL(item, category_gg);
    const promises = [
        getInfo_gg(url, limit),
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

            const io = req.app.get('socketio');

            dynamicContentHandler(url, limit).then((thumbnails) => {
                io.to(clientId).emit('image-loaded', { thumbnails });
            }).catch((error) => {
                console.log("Error loading dynamic content: ", error);
            });

        })
        .catch((err) => {
            console.log("Got error: ", err);
        });
});

module.exports = router;
