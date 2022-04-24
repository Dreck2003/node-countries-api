const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const dotenv = require("dotenv");
const readCountry = require("./src/utils/readCountries.js");
dotenv.config();

const PORT = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
    await readCountry();
  server.listen(PORT, () => {
    console.log("server listening at " + PORT); // eslint-disable-line no-console
  });
});

