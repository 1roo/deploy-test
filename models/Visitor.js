const Visitor = function (Sequelize, DataTypes) {
  const model = Sequelize.define(
    "visitor",
    {
      id: {
        // id INT NOT NULL AUTO INCREMENT PRIMARY KEY
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        // name VARCHAR(10) NOT NULL
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      comment: {
        // comment MEDIUMTEXT
        type: DataTypes.TEXT("medium"),
      },
    }, // 컬럼 정의
    {
      // 데이터 추가/수정 컬럼(createdAt, updatedAt)을 자동으로 만들어서 기록. 기본값 true
      timestamps: false,
      // 첫번째 인자로 전달해준 모델 이름 그대로 테이블 이름을 고정. 기본값 false
      freezeTableName: true,
    }
  );

  return model;
};

module.exports = Visitor; // models/index.js에서 사용할 예정
