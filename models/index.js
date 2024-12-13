"use strict";

const Sequelize = require("sequelize");

let config = require(__dirname + "/../config/config.js");
console.log("config", config);
config = config["development"];

const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// 설정 정보를 sequelize라는 키 안에 넣는다.
db.sequelize = sequelize;
// Sequelize 모듈을 Sequelize라는 키 안에 넣는다.
db.Sequelize = Sequelize;

db.Visitor = require("./Visitor")(sequelize, Sequelize);
// {
//   sequelize: sequelize,
//   Sequelize: Sequelize,
//   Visitor: visitor의 모델
// }

module.exports = db; // app.js
