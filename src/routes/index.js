const fs = require("fs");
const { Router } = require("express");

const router = Router();

const routes = `${__dirname}`;

const skippedFile = ["index"];

fs.readdirSync(routes).forEach((file) => {
  const fileSinExtension = file.split(".").shift();

  if (!skippedFile.includes(fileSinExtension)) {
    console.log("Cargando----->", file);
    const rutas = require(`./${fileSinExtension}`);
    // console.log(`/${fileSinExtension}`);
    router.use(`/${fileSinExtension}`, rutas);
  }
});

module.exports = router;
