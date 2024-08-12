---
tags:
  - mlops
  - mysql
  - docker
  - public
create: 2024-08-13 02:30:50
---

## 컨테이너 생성 및 실행

```sh
docker container run -itd --name my-mlops-db \
  --network mlops \
  -e MYSQL_ROOT_PASSWORD=root \
  mysql:8.0.39
```

---
## 설정
```sh
# 컨테이너 진입
docker exec -it my-mlops-db bash

# MySQL 로그인
mysql -u root -p  # root 패스워드 입력

# 데이터베이스 생성
create database mlops;

# 생성 확인
show databases;

# 패스워드 인증 방식 변경(python mysqlclient 라이브러리 호환성)
alter user 'root'@'%' identified with mysql_native_password by 'root';
flush privileges;
```

