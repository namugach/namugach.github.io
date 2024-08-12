---
tags:
  - docker
  - build
  - setting
  - mlops
create: 2024-08-13 02:11:30
---
## 전처리

### 설치

```sh
sudo apt-get update
sudo apt-get install -y unzip
mkdir workspace
cd workspace
wget https://github.com/namugach/mlops-study/archive/refs/heads/master.zip
unzip master.zip
cd mlops-study-master/mlops-movie-predictor
```

### network
[[docker network 생성]]

---
## 빌드

```sh
docker build -t my-mlops:v1 .
```

---
## 컨테이너 생성

```sh
docker container run -itd --name my-mlops \
  -e WANDB_API_KEY=c9177943bdd16a302be32788ed7c28f35347f005 \
  -e DB_USER=root \
  -e DB_PASSWORD=root \
  -e DB_HOST=my-mlops-db \
  -e DB_PORT=3306 \
  --network mlops \
  my-mlops:v1
```

---
## 환경 변수

### 실행
```sh
docker exec -it my-mlops env
```

### 확인
```sh
PATH=/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=ca0e5d05d3c7
TERM=xterm
DB_PORT=3306
WANDB_API_KEY=c9177943bdd16a302be32788ed7c28f35347f005
DB_USER=root
DB_PASSWORD=root
DB_HOST=my-mlops-db
LANG=C.UTF-8
GPG_KEY=A035C8C19219BA821ECEA86B64E628F8D684696D
PYTHON_VERSION=3.11.4
PYTHON_PIP_VERSION=23.1.2
PYTHON_SETUPTOOLS_VERSION=65.5.1
PYTHON_GET_PIP_URL=https://github.com/pypa/get-pip/raw/0d8570dc44796f4369b652222cf176b3db6ac70e/public/get-pip.py
PYTHON_GET_PIP_SHA256=96461deced5c2a487ddc65207ec5a9cffeca0d34e7af7ea1afc470ff0d746207
HOME=/root
```


---

## 실행

```ad-check
title:실행하기 전에
[[mlops mysql 컨테이너 연결]]

이거부터 확인
```

### preprocessing
```sh
docker exec -it my-mlops python src/main.py preprocessing --date 240813
```

### train
```sh
docker exec -it my-mlops python src/main.py train --model_name movie_predictor --optimizer adam
```

### inference
#### 실시간 추론
```sh
docker exec -it my-mlops python src/main.py inference \
--data "[1, 1209290, 4508, 7.577, 1204.764]" \
--batch_size 1
```

#### 데이터 쓰기
```sh
docker exec -it my-mlops python src/main.py inference
```


---

## api 서버 띄우기
### 컨테이너 생성 및 실행
```sh
docker container run -itd --name my-mlops-api \
-e WANDB_API_KEY=c9177943bdd16a302be32788ed7c28f35347f005 \
-e DB_USER=root \
-e DB_PASSWORD=root \
-e DB_HOST=my-mlops-db \
-e DB_PORT=3306 \
-p 9999:8000 \
--network mlops \
my-mlops:v1
```

### train
```sh
docker exec -it my-mlops-api python src/main.py train --model_name movie_predictor --optimizer adam
```


### server start
```sh
docker exec -d my-mlops-api bash start_api_server.sh
```


### api docs에 접속
#### ec2
```web
http://공개_ip:9999/docs
```

#### wsl
```web
http://127.0.0.1:9999/docs
```


