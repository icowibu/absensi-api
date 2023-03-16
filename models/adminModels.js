import { Sequelize } from "sequelize";
import database from "../db/config.js";

const { DataTypes } = Sequelize;

function isUnique(value, next) {
    var self = this;

    User.find({ where: { email: value } })
        .then(function (user) {
            // reject if a different user wants to use the same email
            if (user && self.id !== user.id) {
                return next('username sudah digunakan !');
            }
            return next();
        })
        .catch(function (err) {
            return next(err);
        });
}

const Admin = database.define("admin", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
});

export default Admin;

(async () => {
    await Admin.sync();
})();
