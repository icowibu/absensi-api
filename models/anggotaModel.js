import { Sequelize } from "sequelize";
import database from "../db/config.js";

const { DataTypes } = Sequelize;

// format ttl : yyyy-mm-dd
// umur dihitung otomatis
const Anggota = database.define(
  "anggota",
  {
    idAnggota: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nama: DataTypes.STRING,
    noTelp: DataTypes.STRING,
    hobi: DataTypes.STRING,
    kelompok: DataTypes.ENUM("al-hikmah", "husbil", "giri mekar", "al-fatah"),
    gender: DataTypes.ENUM("pria", "wanita"),
    ttl: DataTypes.STRING,
    status: DataTypes.ENUM("remaja", "usia menikah"),
  },
  {
    freezeTableName: true,
  }
);

export default Anggota;

(async () => {
  await Anggota.sync();
})();
