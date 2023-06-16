import { Sequelize } from "sequelize";
import database from "../db/config.js";

const { DataTypes } = Sequelize;

/*

absensi akan berisikan string berbentuk array. field ini berguna untuk menampung data siapa saja yang ikut maupun izin pada acara tersebut
bentuk dari arraynya akan seperti ini :
absensi : "[[1,"hadir"],[2,"izin"],[3,"hadir"]]"

angka merefresentasikan id dari para anggota, dan indeks 1 berisikan informasi absensi

*/

const Absensi = database.define(
  "absensi",
  {
    idAcara: DataTypes.STRING,
    idAnggota: DataTypes.STRING,
    status: DataTypes.ENUM("hadir", "izin", "bolos"),
  },
  {
    freezeTableName: true,
  }
);

export default Absensi;

(async () => {
  await Absensi.sync();
})();
