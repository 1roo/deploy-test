// const Visitor = require("../model/Visitor");
const models = require("../models/index");
const { errorlogs } = require("../utils/common");

/* '/' GET */
exports.main = (req, res) => {
  res.render("index");
};

/* '/visitors' GET */
exports.getVisitors = (req, res) => {
  // console.log(Visitor.getVisitors());
  // [DB 연결 전]
  // res.render("visitors", { data: Visitor.getVisitors() });

  // [DB 연결 후, Sequelize 이전]
  // Visitor.getVisitors((result) => {
  //   console.log("전체목록 Cvisitor.js", result);
  //   res.render("visitors", { data: result });
  // });

  // [Sequelize 이후]
  // `SELECT * FROM visitor`
  models.Visitor.findAll()
    .then((result) => {
      console.log("findAll>> ", result);
      // findAll의 결과는 배열.
      // res.send(result);
      res.render("visitors", { data: result });
    })
    .catch((err) => {
      errorlogs(res, err);
    });
};

/* '/visitor/:id' GET */
exports.getVisitor = async (req, res) => {
  const id = req.params.id;
  // [Sequelize 이전]
  // Visitor.getVisitor(id, (result) => {
  //   console.log("한개 Cvisitor.js", result);
  //   res.send(result);
  // });

  // [Sequelize 이후]
  // `SELECT * FROM visitor WHERE id=${req.params.id}`
  try {
    const result = await models.Visitor.findOne({
      where: {
        id: req.params.id,
      },
    });
    console.log("findOne>> ", result);
    res.send(result);
  } catch (err) {
    errorlogs(res, err);
  }
};

/* '/visitor' POST(등록) */
exports.postVisitor = (req, res) => {
  console.log("req.body", req.body);
  //[Sequelize 이전]
  //   Visitor.postVisitor(req.body, (result) => {
  //     console.log("Cvisitor.js", result);
  //     res.send({ id: result, comment: req.body.comment, name: req.body.name });
  //   });
  //[Sequelize 이후]
  // `INSERT INTO visitor VALUE(null, "${data.name}", "${data.comment}")`
  models.Visitor.create({
    name: req.body.name,
    comment: req.body.comment,
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      errorlogs(res, err);
    });
};

/* '/visitor' DELETE(삭제) */
exports.deleteVisitor = async (req, res) => {
  // [Sequelize 이전]
  //   console.log("req.body", req.body);
  //   console.log("req.body.id", req.body.id);
  //   Visitor.deleteVisitor(req.body.id, () => {
  //     res.send("삭제 완료!");
  //   });

  // [Sequelize 이후]
  // `DELETE FROM visitor WHERE id=${id}`
  try {
    const result = await models.Visitor.destroy({
      where: { id: req.body.id },
    });
    console.log(result); // 1(성공) 0(실패)
    if (Boolean(result)) {
      res.send(req.body.id + "번 삭제 완료!");
    } else {
      res.send("삭제 실패");
    }
  } catch (err) {
    errorlogs(res, err);
  }
};

/* '/visitor' PATCH(수정) */
exports.patchVisitor = async (req, res) => {
  // [Sequelize 이전]
  //   console.log("req.body", req.body);
  //   Visitor.patchVisitor(req.body, () => {
  //     res.send("수정 완료");
  //   });

  // [Sequelize 이후]
  // `UPDATE visitor SET name="${data.name}", comment="${data.comment}" WHERE id=${data.id}`
  try {
    const [result] = await models.Visitor.update(
      {
        name: req.body.name,
        comment: req.body.comment,
      },
      {
        where: { id: req.body.id },
      }
    );
    console.log(result); // [1](성공) [0](실패)
    // const [number] = result;
    // console.log(number);

    if (Boolean(result)) {
      res.send("수정 완료");
    } else {
      res.send("잘못된 접근입니다.");
    }
  } catch (err) {
    errorlogs(res, err, "patch controller 내부");
  }
};
