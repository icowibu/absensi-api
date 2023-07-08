import { Sequelize } from "sequelize";

const database = new Sequelize("sql6631323", "sql6631323", "FirTffajlW", {
  host: "sql6.freesqldatabase.com",
  dialect: "mysql",
});

export default database;
