const router = require("express").Router();

router.post("/amazon", async (req, res) => {
    const data = req.body;
    res.json({receivedData: data});
});

// Export the router so it can be used in the server.js file
module.exports = router;