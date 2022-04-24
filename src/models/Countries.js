const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Countries",
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING(3),
        autoIncrement: false,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        set(nombre) {
          let name = nombre.toLowerCase();
          this.setDataValue("name", name);
        },
        get() {
          let nombre = this.getDataValue("name");
          let newName = nombre[0].toUpperCase() + nombre.slice(1);
          return newName;
        },
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      continent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capital: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subregion: {
        type: DataTypes.STRING,
      },
      area: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      population: {
        type: DataTypes.REAL,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );
};
