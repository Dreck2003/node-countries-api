const { Op } = require("sequelize");
const { Activities, Countries } = require("../db");
const getActivities = async (req, res) => {
  try {
    const { nombre } = req.query;

    let objeto = nombre
      ? {
          include: Countries,
          where: {
            name: {
              [Op.iLike]: `%${nombre}%`,
            },
          },
        }
      : {
          include: Countries,
          where: {
            name: {
              [Op.iLike]: `%%`,
            },
          },
        };
    console.log("Objeto: ", objeto);

    const actividades = await Activities.findAll(objeto);

    return res.send({ error: null, data: actividades });
  } catch (error) {
    console.log("ERROR EN GET ACTIVITITES: ", error);
    return res.status(500).send({ error: error, data: null });
  }
};

const createActivity = async (req, res) => {
  try {
    const { ids, name, dificultad, duracion, season } = req.body;

    if (!Array.isArray(ids)) {
      return res.status(400).json("no hay paises");
    }
    let identificadores = ids.slice(0, 5);
    console.log("los ids son: ", identificadores);

    if (!identificadores.length) {
      return res
        .status(400)
        .send({ error: "Not exists countries", data: null });
    }

    const newCountries = await Promise.all(
      identificadores.map((id) => Countries.findByPk(id))
    );

    console.log(newCountries);

    const paises = newCountries.filter(
      (pais) => pais !== null && pais.dataValues.name !== null
    );

    if (!paises.length) {
      return res
        .status(400)
        .esnd({ error: "Not exists countries", data: null });
    } else {
      //Existen countries para poder conectar:
      const [activity, iscreated] = await Activities.findOrCreate({
        where: {
          name: name,
        },
        defaults: {
          name: name,
          dificultad: dificultad,
          duration: duracion,
          season: season,
        },
      });
      if (iscreated) {
        //Entonces se creo!
        paises.forEach((pais) => {
          pais.addActivities(activity);
        });
        return res.send({ error: null, data: activity });
      } else {
        //Ya existia!
        return res
          .status(400)
          .send({ error: "The activity already exist", data: null });
      }
    }
  } catch (error) {
    console.log("ERROR EN CREATE ACTIVITY: ", error);
    return res.status(500).send({ error: error, data: null });
  }
};

module.exports = {
  getActivities,
  createActivity,
};
