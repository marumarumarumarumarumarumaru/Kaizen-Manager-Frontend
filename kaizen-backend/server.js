import express from 'express';

import bodyParser from "body-parser";

const app = express();

app.enable('trust proxy');

app.use(bodyParser.json());

app.get("/api", (req, res) => {
    res.json({ message: "Oh hello, I didn't see you there" });
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
