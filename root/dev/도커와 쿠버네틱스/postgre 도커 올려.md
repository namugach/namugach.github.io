---
tags:
  - postgreSql
  - docker
  - public
create: 2024-06-03 15:05:51
---

## 이미지 Pull

### 받기

```sh
docker image pull postgres
```


### 확인
```sh
docker image ls
```

### 출력
```sh
REPOSITORY         TAG       IMAGE ID       CREATED         SIZE
postgres           latest    cff6b68a194a   3 weeks ago     432MB
```

---


## 컨테이너
### 실행
```
docker container run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```


### 확인
```sh
docker container ls
```

### 출력
```
CONTAINER ID   IMAGE      COMMAND                  CREATED         STATUS         PORTS      NAMES
6701cce130d1   postgres   "docker-entrypoint.s…"   8 seconds ago   Up 7 seconds   5432/tcp   some-postgres
```



### 내부

#### 진입
```sh
docker container exec -it 6701cce130d1 /bin/bash
```

#### postgres
##### 접속
```sh
psql -U postgres
```

##### db 생성
```sql
CREATE DATABASE ml;
```

##### 나가기
```sh
\q
exit
```

### 정지
```sl
docker container stop [컨테이너 이름 / id]
```



### 재가동 진입
#### 시작
```sh
docker container start 6701cce130d1
```

#### 진입
```sh
docker container exec -it 6701cce130d1 /bin/bas
```

#### sql
##### 접속
```sh
psql -U postgres
```

##### 리스트 확인
```
\list
```

ml 확인


### 삭제

```sh
docker container rm [컨테이너 이름 / id]
```

헌데 하기 전에

[[#정지]]

---

## 도커 볼륨

### 디렉토리
```sh
cd ~/work
mkdir test
cd test
```


```sh
pwd
# path 복사
```


### 컨테이너
#### 가동
```sh
docker container run -e POSTGRES_PASSWORD=mysecretpassword -v /home/ubuntu/work/test:/work/test:rw -d postgres
```


```ad-info
-v 호스트_경로:컨테이너_경로
```

#### 접속
##### 아이디 확인
```sh
docker container ls
CONTAINER ID   IMAGE      COMMAND                  CREATED         STATUS         PORTS      NAMES
7c0e0288c74b   postgres   "docker-entrypoint.s…"   9 minutes ago   Up 9 minutes   5432/tcp   gallant_wilson
```

##### 연결
```sh
docker container exec -it 7c0e0288c74b /bin/bash
```

##### 확인
```sh
ls
```

```
bin   dev                         etc   lib    media  opt   root  sbin  sys  usr  work
boot  docker-entrypoint-initdb.d  home  lib64  mnt    proc  run   srv   tmp  var
```

```ad-note
work 디렉토리 확인
```

##### 실험
```sh
cd work/test/
ls
while_loop.py  yaml_example.yml
mkdir tem_test
exit
```

```sh
ls
```

하면 도커 아닌 곳에도 tmp_test 파일이 생성 돼 있음

