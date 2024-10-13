---
tags:
  - feast
  - mlops
create: 2024-10-08 17:16:15
---
[feast란](https://d-yong.tistory.com/116)



## 시작

### docker
- 생성
```sh
docker container run -itd -v ./work:/root/work --name mlops namugach/ubuntu-basic:24.04-kor
```

- 접속
```sh
docker container exec -it -w /root mlops bash
```

### feast

- 디렉토리 생성 및 이동
```sh
cd work
mkdir -p mlops/feature_store && cd mlops/feature_store
```

- 설치
```sh
pip install feast -U -q
pip install Pygments -q
```

- 초기화
```sh
feast init feature_repo
```


---


## server

### docker

#### 파일 작성

- 교재용
```dockerFile
# syntax=docker/dockerfile:1
FROM jupyter/base-notebook
WORKDIR /home/jovyan
COPY . /home/jovyan

RUN pip3 install -r requirements.txt

USER jovyan
RUN feast init feature_repo && \
		cd feature_repo/feature_repo && \
		feast apply && \
		feast materialize-incremental $(date +%Y-%m-%d)


CMD [ "/bin/sh", "-c", "cd /home/jovyan/feature_repo/feature_repo && feast serve --host 0.0.0.0"]

WORKDIR /home/jovyan
```

- 커스텀
```dockerFile
FROM namugach/ubuntu-basic:24.04-kor
WORKDIR /root
COPY . /home/ubuntu

RUN pip3 install feast scikit-learn mlflow

RUN feast init feature_repo && \
		cd feature_repo/feature_repo && \
		feast apply && \
		feast materialize-incremental $(date +%Y-%m-%d)


CMD [ "/bin/sh", "-c", "cd /root/feature_repo/feature_repo && feast serve --host 0.0.0.0"]
```

#### 이미지 빌드
```sh
docker build --tag feast-docker .
```


#### 컨테이너 생성
- 교재용
```sh
docker container run -itd --name feast-jupyter -p 8888:8888 -p 6566:6566 -p 5001:5001 -e JUPYTER_TOKEN='password' feast-docker:latest
```

- 커스텀
```sh
docker container run -itd -v ~/work:/root/work --name feast_server -p 8888:8888 -p 6566:6566 -p 5001:5001 namugach/feast:0.1
```
#### 확인
```sh
curl -X POST \
  "http://localhost:6566/get-online-features" \
  -d '{
    "features": [
      "driver_hourly_stats:conv_rate",
      "driver_hourly_stats:acc_rate",
      "driver_hourly_stats:avg_daily_trips"
    ],
    "entities": {
      "driver_id": [1001, 1002, 1003]
    }
  }'
```