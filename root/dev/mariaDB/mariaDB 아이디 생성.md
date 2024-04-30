---
tags:
  - mariaDB
  - setting
create: 2024-05-01 00:56:33
---

## 로그인
```sh
sudo mariadb -u root -p
```
## 아이디 생성
```sql
CREATE DATABASE hrdb;

GRANT ALL PRIVILEGES ON hrdb.*
TO hr_admin@'%' IDENTIFIED BY 'password'
WITH GRANT OPTION;

FLUSH PRIVILEGES;
EXIT;
```

## 로그인, 비번 password
```sh
mysql -u hr_admin -p hrdb
# 비번 password
```

## use sql
```sql
STATUS;
SOURCE hr_info.sql;
```
- [hr_info.sql](hr_info.sql)

## 확인
```sql
SHOW TABLES;
DESC employees;
SELECT * FROM employees;
```
