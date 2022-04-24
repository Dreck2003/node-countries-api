const { Countries } = require("../db");
const fs = require("fs");

const readCountry = async () => {
  try {
    let path = `${__dirname}/../json/countries.json`;
    let data = fs.readFileSync(path, "utf-8");
    // console.log("DATA: ", typeof data);
    let result = JSON.parse(data);
    // console.log("result: ", result);

    result.forEach(async (country) => {
      try {
        await Countries.create({
          id: country.ccn3 || country.cca3,
          name: country.name.common,
          img: country.flags ? country.flags[1] : "There is no image",
          continent: country.continents
            ? country.continents[0]
            : "Has no continent",
          capital: country.capital ? country.capital[0] : "Has no capital",
          subregion: country.subregion
            ? country.subregion
            : "There is no subregion",
          area: country.area ? country.area : 0,
          population: country.population ? country.population : 0,
        });
      } catch (error) {
        console.log("ERROR EN COUNTRY WAJAJAJA: ", error);
      }
    });
  } catch (error) {
    console.log("ERROR EN READ COUNTRIES: ", error);
  }
};

module.exports = readCountry;
