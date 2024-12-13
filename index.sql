SHOW DATABASES;

SHOW tables;

USE sesac;

CREATE TABLE visitor(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(10) NOT NULL,
    comment MEDIUMTEXT
);

INSERT INTO visitor (name, comment) VALUES ('홍길동', '내가 왔다.');
INSERT INTO visitor (name, comment) VALUES ('이찬혁', '으라차차');
INSERT INTO visitor (name, comment) VALUES ('삭제예정', '으라차차');

DESC visitor;
SELECT * FROM visitor;
UPDATE visitor SET comment='야호' WHERE id=2;
DELETE FROM visitor WHERE id=3;


################### DCL(제어어) ###################
-- mysql 사용자 생성
CREATE USER 'sesac'@'%' IDENTIFIED BY 'mysql';
-- 권한 부여
GRANT ALL PRIVILEGES ON *.* TO 'sesac'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;

ALTER USER 'sesac'@'%' IDENTIFIED WITH mysql_native_password BY 'mysql';

SELECT * FROM mysql.user;
SHOW GRANTS for 'sesac'@'%';