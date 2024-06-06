---
tags:
  - docker
  - nginx
  - postgreSql
  - public
create: 2024-06-04 10:12:45
---

## 디렉토리

### 생성
```sh
cd ~/work
mkdir psqltest
```

### 이동
```sh
cd psqltest
```


---
## Dockerfile 작성
```sh
FROM postgres:16.3
```

---
## 구조 확인
```sh
tree
.
├── docker-compose.yml
├── flaskapp
│   ├── Dockerfile
│   ├── myapp
│   │   └── main.py
│   └── requirements.txt
├── nginxtest
│   ├── Dockerfile
│   └── default.conf
└── psqltest
    └── Dockerfile
```


---

## docker-compose.yml
### 열기
```sh
:~/work/docker$ vi docker-compose.yml
```

### 작성
```yaml
services:
  flasktest:
    build: ./flaskapp
    networks:
     - composenet01
    restart: always
  
  nginxtest:
    build: ./nginxtest
    networks:
    - composenet01
    ports:
    - "80:80"
    depends_on:
    - flasktest

  psqltest:
    build: ./psqltest
    container_name: psqltest
    networks:
    - composenet01
    restart: always
    volumes:
    - myvolume01:/var/lib/postgresql/data
    environment:
    - POSTGRES_USER=postgres
    - POSTGRES_PASSWORD=postgres
    - POSTGRES_DB=postgres

volumes:
  myvolume01:

networks:
  composenet01:

```

```ad-note
psqltest 부분 장성
```

---

## flaskapp/myapp

### 열기
```sh
~/work/docker/flaskapp/myapp$ vim main.py
```

### 수정

```sh
...( )
conn = psycopg2.connect(dbname='ml', user='postgres', password='postgres', host='psqltest', port=5432)
...( )
```

```ad-note
`host='psqltest'`
```


---

## Compose
### 경로 이동
```sh
cd ~/work/docker
```

### 빌드
#### 시작
```sh
docker docker compose up -d --build
```

#### 완료
```sh
[+] Building 50.9s (24/24) FINISHED
=> [flasktest internal] load build definition from Dockerfile
=> => transferring dockerfile: 241B
...( )
[+] Running 5/5
Network docker_composenet01 Created
Volume "docker_myvolume01" Created
Container flasktest Started
Container psqltest Started
Container nginxtest Started
```

### 컨테이너
#### 조회
```sh
docker container ls
```

#### 출력
```sh
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
d978f5f34183 docker-nginxtest "/docker-entrypoint.…" 29 seconds ago Up 28 seconds 0.0.0.0:80->80/tcp, :::80->80/tcp nginxtest
084e876750a0 docker-psqltest "docker-entrypoint.s…" 30 seconds ago Up 29 seconds 5432/tcp psqltest
14dea1fe0200 docker-flasktest "/bin/sh -c 'gunicor…" 30 seconds ago Up 29 seconds 5000/tcp flasktest
```

### web
```ad-note
title: 브라우저
주소: 인스턴스 ip 주소

내용: HELLO, ML API SERVER
```


### database

#### 컨테이너

##### 조회
```sh
docker container ls
```

```sh
CONTAINER ID   IMAGE              COMMAND                  CREATED          STATUS          PORTS                               NAMES
a88f2c3846f5   docker-nginxtest   "/docker-entrypoint.…"   29 minutes ago   Up 29 minutes   0.0.0.0:80->80/tcp, :::80->80/tcp   docker-nginxtest-1
df0bbba2c7de   docker-flasktest   "/bin/sh -c 'gunicor…"   29 minutes ago   Up 29 minutes   5000/tcp                            docker-flasktest-1
a60d681088ac   docker-psqltest    "docker-entrypoint.s…"   29 minutes ago   Up 29 minutes   5432/tcp                            psqltest
```

```ad-note
psqltest 컨테이너
```

##### 접속
```sh
docker container exec -it a60d681088ac /bin/bash
```

#### postgres

#### 접속
```sh
psql -U postgre
```

##### 데이터베이스 만들기
```sql
CREATE DATABASE ml;

\c ml
```

##### 테이블 만들기
```sql
CREATE TABLE pred_result(
    id SERIAL PRIMARY KEY,
    input NUMERIC,
    output NUMERIC,
    insert_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 보내기
##### curl
```
curl -d '{"input":["0.３"]}' -H "Content-Type: application/json" -X POST http://43.203.77.126/predict
```

##### 출력 결과
```
{"input":0.3,"predicted_output":1.63768}
```
