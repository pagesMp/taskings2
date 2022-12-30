import { Sequelize } from "sequelize";

const db = new Sequelize("app", "","",{
    storage: "./database.sqlite",
    dialect:"sqlite",
    host:'./database.sqlite'
});

export default db;