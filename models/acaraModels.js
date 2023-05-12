import { Sequelize } from "sequelize";
import database from "../db/config.js";

const { DataTypes } = Sequelize;

// format ttl : yyyy-mm-dd
// umur dihitung otomatis
const Acara = database.define(
  "acara",
  {
    acara: DataTypes.STRING,
    tempat: DataTypes.STRING,
    hari: DataTypes.STRING,
    dariJam: DataTypes.STRING,
    sampaiJam: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Acara;

(async () => {
  await Acara.sync();
})();
