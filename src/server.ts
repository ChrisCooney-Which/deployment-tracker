const express = require("express");
const { PORT, DATABASE_CONFIG } = require("./config");
const knex = require("knex")(DATABASE_CONFIG);
const { handlePost } = require("./controllers/handlePost");

const app = express();
app.use(express.json());

app.post("/deployment", async (req, res) => {
  const { attributes } = req.body.data;

  if (!attributes) {
    res.status(400);
    res.json("Error Data was not supplied in the correct format");
    return;
  }

  const wasPostSuccessful = await handlePost(knex, attributes);

  if (wasPostSuccessful) {
    res.json("Deployment logged");
    return;
  }
  res.status(400);
  res.json("Error Data was not logged");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
