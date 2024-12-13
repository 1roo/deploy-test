const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "sesac",
  password: "mysql",
  database: "sesac",
});

// 1. 전체 데이터 조회
exports.getVisitors = (cb) => {
  // => [DB 연결 전]
  // return [
  //   { id: 1, name: "홍길동", comment: "내가 왔다." },
  //   { id: 2, name: "이찬혁", comment: "으라차차" },
  // ];

  // [DB 연결 후]
  conn.query(`SELECT * FROM visitor`, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log("visitor 테이블의 전체 조회: ", rows);
    // select문의 결과 rows
    /*
    return [
      RowDataPacket { id: 1, name: '홍길동', comment: '내가왔다' },
      RowDataPacket { id: 2, name: '이찬혁', comment: '야호' }
      ]
    */
    cb(rows);
  });
};

// 2. 특정 데이터 조회
exports.getVisitor = (id, cb) => {
  conn.query(`SELECT * FROM visitor WHERE id=${id}`, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log("visitor 테이블 데이터 한개 조회: ", rows);

    cb(rows[0]);
  });
};

// 3. 데이터 등록
// visitor 테이블에 데이터 삽입
exports.postVisitor = (data, cb) => {
  // data= req.body,comment와 name 정보가 있는 객체 형태
  conn.query(
    // 문자열은 따옴표안에 둘러싸야 함
    `INSERT INTO visitor VALUE(null, "${data.name}", "${data.comment}")`,
    (err, rows) => {
      if (err) throw err;
      console.log("model post", rows);
      /* 
  OkPacket {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 5, // 현재 넣어진 id
      serverStatus: 2,
      warningCount: 0,
      message: '',
      protocol41: true,
      changedRows: 0
        }
      */
      cb(rows.insertId);
    }
  );
};

// 4. 데이터 삭제
exports.deleteVisitor = (id, cb) => {
  conn.query(`DELETE FROM visitor WHERE id=${id}`, (err, rows) => {
    if (err) throw err;
    console.log("모델 Visitor.js 특정 데이터 삭제", rows);
    /*
    OkPacket {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      serverStatus: 2,
      warningCount: 0,
      message: '',
      protocol41: true,
      changedRows: 0
    }
    */
    cb();
  });
};

// 5. 데이터 수정
exports.patchVisitor = (data, cb) => {
  console.log("model data: ", data);
  conn.query(
    `UPDATE visitor SET name="${data.name}", comment="${data.comment}" WHERE id=${data.id}`,
    (err, rows) => {
      if (err) throw err;
      console.log("Visitor.js 수정", rows);
      /*
      OkPacket {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        serverStatus: 2,
        warningCount: 0,
        message: '(Rows matched: 1  Changed: 1  Warnings: 0',
        protocol41: true,
        changedRows: 1
      }
      */
      cb();
    }
  );
};
