---
tags:
  - docker
  - note
  - public
create: 2024-05-03 01:50:43
---
## Docker hub


### 로그인
```sh
docker login
```

### 로그인 확인
```sh
docker info | grep -i username
```

### 로그아웃
```sh
docker logout
```


### 저장소에 업데이트
```sh
docker image tag tagname:1.0 username/tagname:1.0
docker push username/tagname:1.0
```

---

## Image

### 확인

```
docker images
```

### 저장소에서 이미지 가져오기
```sh
docker pull 이미지_이름:버전
# docker pull ubuntu:22.04
# docker pull ubuntu:latest
# docker pull eninx:latest
```

### 저장소에서 이미지 찾기
https://hub.docker.com 
```sh
docker search 이미지이름
# docker search ubuntu
```

### 만들기

```text file:Dockerfile
FROM nginx:latest
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]	
# ---> 해당 이미지가 docker run 으로 컨테이너화가 될때 내부에 데몬 실행
```
```ad-attention
title:집중!
파일 `Dockerfile` 다른 것으로 하면 안됨
```
```sh
docker build -t your-image-name .
# docker build -t testweb:1.0 .
```


### 지우기
```sh
docker rmi container_id
# 혹은
docker rmi container_name
```

---

## Container

### 확인
#### 실행 중
```ps
docker ps
```
#### 모든
```ps
docker ps -a
```


### 만들기
#### ubuntu
```sh
docker create -i -t --name 컨테이너_이름 이미지_이름:버전
# docker create -i -t --name myUbuntu ubuntu:latest
```
```ad-info
- -i 상호 입출력
- -t tty를 활성화하여 bash 셸을 사용하도록 컨테이너에서 설정.

이 두 옵션을 사용하지 않으면 shell을 사용할 수 없음
```

#### enginx
```sh
docker create -p 8001:80 --name 컨테이너_이름 이미지_이름:버전
# docker create -p 8001:80 --name myUbuntu enginx:latest
```
```ad-info
- -p a:b: 포트포워딩

이렇게 하면 a를 b로 접근 시켜준다
```




### 시작
```ps
docker start 컨테이너_이름
```


### 진입하기
```ps
docker attach 컨테이너_이름
```

### 종료하지 않고 나가기
```ad-note
title: 단축키
Ctrl + P + Q
```

### 지우기
```sh
docker rm 컨테이너_이름
# docker rm myUbuntu
```


---

## 작업

### 복사
```sh
docker cp 복사대상파일 tag:/경로
```


