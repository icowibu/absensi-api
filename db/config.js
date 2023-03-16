import { Sequelize } from "sequelize"

const database = new Sequelize("mm_jaten", "root", "", {
  host: "localhost",
  dialect: "mysql"
})

export default database