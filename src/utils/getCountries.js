const axios = require("axios");
const { Countries } = require("../db");
const fs = require("fs");

/**
 * the function do get `countries` from `restcountries`
 */
const getCreateCountries = async () => {
  try {
    let { data } = await axios.get("https://restcountries.com/v3/all");
    // console.log(data);
    // const path = `..'\'json/countries.json`;
    // let path = ["json", "countries.json"];
    console.log(__dirname);
    let path = `${__dirname}/../json/countries.json`;

    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    console.log("Se escribio el archivo json");
  } catch (error) {
    console.log("El error es en traer los paises: ", error);
  }
};

module.exports = {
  getCreateCountries,
};
