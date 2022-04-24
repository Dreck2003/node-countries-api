const { Countries, Activities } = require("../db");
const { Op } = require("sequelize");
const returnOrder = require("../utils/orders");

const getCountries = async (req, res) => {
  try {
    const { name, continent, order } = req.query;
    const orden = returnOrder(order);

    const countries = await Countries.findAll({
      order: orden,
      where: {
        name: {
          [Op.iLike]: name ? `%${name}%` : "%%",
        },
        continent: {
          [Op.iLike]: continent || "%%",
        },
      },
    });

    return res.send({ error: null, data: countries });
  } catch (error) {
    console.log("ERROR EM GER COUNTRIES", error);
  }
};

const getSingleCountry = async (req, res) => {
  try {
    let id = req.params.id;
    const country = await Countries.findOne({
      include: Activities,
      where: {
        id,
      },
    });
    console.log("El country es : ", country);

    if (country) {
      return res.status(200).send({ error: null, data: country });
    } else {
      return res
        .status(404)
        .send({ error: "The country does not exist", data: null });
    }
  } catch (error) {
    console.log("ERROR EN GET SINGLE PAIS: ", error);
    return res.status(500).send({ error: error, data: null });
  }
};

module.exports = {
  getCountries,
  getSingleCountry,
};
