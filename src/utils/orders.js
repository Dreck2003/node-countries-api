const returnOrder = (order) => {
  switch (order) {
    case "max":
      //es para la poblacion:
      return [["population", "DESC"]];

    case "min":
      //es para la poblacion:

      // return [['population','ASC']];// ESTO SE FILTRARA EN EL FRONT;
      return [];

    case "A-Zㅤ":
      //es para el name a-z

      return [
        ["name", "ASC"],
        // ["population", "ASC"],
      ];

    case "Z-Aㅤ":
      //es para el name z-a
      return [
        ["name", "DESC"],
        // ["population", 'DESC'],
      ];

    default:
      return [];
  }
};

module.exports = returnOrder;
