const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const port = 3000

app.get("/", (req, res) => {
    res.send("hi");
})

app.listen(port, () => {
    console.log(`I am listening at http://localhost:${port}`)
})

app.use(bodyParser.json());

