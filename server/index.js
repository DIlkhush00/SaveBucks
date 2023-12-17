const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Server listening
server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export server for testing
module.exports = server;