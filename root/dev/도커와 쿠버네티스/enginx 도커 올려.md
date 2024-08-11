---
tags:
  - enginx
  - docker
  - public
create: 2024-06-03 09:11:34
---
## 디렉토리

```sh
cd ~/work/docker
mkdir nginxtest
```

---
## Dockerfile

```dockerfile
FROM nginx:1.26.0

CMD ["nginx", "-g", "daemon off;"]
```

---

## 빌드

```sh
# ~/work/docker/nginxtest
docker image build . -t mynginx01
```

```sh
docker image ls
```

```sh
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
flaskapi01    latest    a8c4fa3dda54   2 days ago      1.38GB
my-ubuntu     0.1       47f1ae23d4f6   3 days ago      114MB
# 여기
mynginx01     latest    6f5998e2d7ff   4 weeks ago     188MB
ubuntu        latest    bf3dc08bfed0   4 weeks ago     76.2MB
hello-world   latest    d2c94e258dcb   13 months ago   13.3kB
```

---
## 컨테이터

### 실행
```sh
docker container run -d mynginx01
```

### 확인
```sh
docker container ls
```

```sh
CONTAINER ID   IMAGE       COMMAND                  CREATED         STATUS         PORTS     NAMES
43ec4cd47554   mynginx01   "/docker-entrypoint.…"   5 seconds ago   Up 4 seconds   80/tcp    sweet_johnson
```

```ad-check
STATUS Up 확인
```

---
## 도커 컴포즈

https://docs.docker.com/compose/install/linux/#install-using-the-repository

```sh
sudo apt-get update
sudo apt-get install docker-compose-plugin

# 버전 확인
docker compose version

```

---
## 파일 구조
```sh
.
├── docker
│   ├── flaskapp
│   │   ├── Dockerfile
│   │   ├── myapp
│   │   │   └── main.py
│   │   └── requirements.txt
│   └── nginxtest
│       └── Dockerfile
├── flaskapp
│   └── main.py
└── test
    └── while_loop.py
```

---
## requirements.txt

```sh
cd ~/work/docker/flaskapp
vi requirements.txt
```

```txt
scikit-learn==1.5.0
flask==3.0.3
psycopg2==2.9.9
gunicorn==22.0.0
```

```ad-note
gunicorn==22.0.0 추가
```

---

## nginxtest 디렉토리

### default.conf

- p: 121
```conf title:default.conf
server{
	listen 80;
	server_name localhost;

	location /{
		proxy_pass http://flasktest:5000;
	}
}
```

```ad-important
flasktest: 컨테이너 이름
```

### DockerFile

```dockerfile
FROM nginx:1.26.0

RUN rm /etc/nginx/conf.d/default.conf

COPY default.conf /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]
```



---

## docker compose
### docker-compose.yml

#### 작성

```sh
cd ~/work/docker
vi docker-compose.yml
```

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

networks:
  composenet01:

```

`````ad-info
```yaml
depends_on:
- flasktest
```
플라스트 시작 하고 실행
`````

### 디렉토리 구조

```sh
~/work/docker$ tree
.
├── docker-compose.yml
├── flaskapp
│   ├── Dockerfile
│   ├── myapp
│   │   └── main.py
│   └── requirements.txt
└── nginxtest
    ├── Dockerfile
    └── default.conf
```

### 실행

#### 이동
```sh
cd ~/work/docker
ls
docker-compose.yml flaskapp nginxtest
```

#### 빌드
```sh
docker compose up -d --build
```

#### 출력
```sh
[+] Building 38.2s (19/19) FINISHED                                            docker:default
 => [flasktest internal] load build definition from Dockerfile                           0.0s
 => => transferring dockerfile: 240B                                                     0.0s
 => [flasktest internal] load metadata for docker.io/library/python:3.11.9               1.4s
 => [flasktest internal] load .dockerignore                                              0.0s
 => => transferring context: 2B                                                          0.0s
 => [flasktest 1/6] FROM docker.io/library/python:3.11.9@sha256:091e0f5da680e5c972c59cb  0.0s
 => [flasktest internal] load build context                                              0.0s
 => => transferring context: 1.49kB                                                      0.0s
 => CACHED [flasktest 2/6] WORKDIR /usr/src/app                                          0.0s
 => [flasktest 3/6] COPY . .                                                             0.0s
 => [flasktest 4/6] RUN python -m pip install --upgrade pip                              3.7s
 => [flasktest 5/6] RUN pip install -r requirements.txt                                 28.3s 
 => [flasktest 6/6] WORKDIR ./myapp                                                      0.1s 
 => [flasktest] exporting to image                                                       2.5s 
 => => exporting layers                                                                  2.4s 
 => => writing image sha256:c3c423501acbb875a188b1dcb382c53be8aaef291e2b34f89af4be2ccbe  0.0s
 => => naming to docker.io/library/docker-flasktest                                      0.0s
 => [nginxtest internal] load build definition from Dockerfile                           0.0s
 => => transferring dockerfile: 169B                                                     0.0s
 => [nginxtest internal] load metadata for docker.io/library/nginx:1.26.0                1.4s
 => [nginxtest internal] load .dockerignore                                              0.0s
 => => transferring context: 2B                                                          0.0s
 => CACHED [nginxtest 1/3] FROM docker.io/library/nginx:1.26.0@sha256:192e88a0053c17868  0.0s
 => [nginxtest internal] load build context                                              0.0s
 => => transferring context: 138B                                                        0.0s
 => [nginxtest 2/3] RUN rm /etc/nginx/conf.d/default.conf                                0.2s
 => [nginxtest 3/3] COPY default.conf /etc/nginx/conf.d/                                 0.1s
 => [nginxtest] exporting to image                                                       0.1s
 => => exporting layers                                                                  0.0s
 => => writing image sha256:658637f4e58bd21bc65735eaa372fdda01d7b6a77dcb7c9e309c72ecf5f  0.0s
 => => naming to docker.io/library/docker-nginxtest                                      0.0s
[+] Running 3/3
 ✔ Network docker_composenet01   Created                                                 0.1s 
 ✔ Container docker-flasktest-1  Started                                                 0.4s 
 ✔ Container docker-nginxtest-1  Started                                                 0.7s
```

### 중지
```sh
docker compose down
```

```sh
[+] Running 3/3
 ✔ Container docker-nginxtest-1  Removed                                                 0.2s 
 ✔ Container docker-flasktest-1  Removed                                                10.2s 
 ✔ Network docker_composenet01   Removed  
```

### 애러 핸들

안됐을 때는
```sh
docker container ls
```

그리고 status 확인

### db 건들기

#### windows
```powershell
curl -d "{""input"":[""0.3""]}" -H "Content-Type: application/json" -X POST http://인스턴스IP주소/predict
```

#### unix
```sh
curl -d '{"input":["0.３"]}' -H "Content-Type: application/json" -X POST http://내_공개_ip/predict
```


#### db 확인

```sh
sudo -i -u postgres
```

```sql
\c ml
SELECT * FROM pred_result;
```

| id  | input | output  | insert_dt                  |
| --- | ----- | ------- | -------------------------- |
| 1   | 0.8   | 2.64146 | 2024-05-31 05:52:12.485802 |
| 2   | 0.6   | 2.23995 | 2024-06-02 16:24:37.69677  |
| 3   | 0.3   | 1.63768 | 2024-06-03 05:33:07.58507  |

```sql
\q
```

```sh
exit
```

