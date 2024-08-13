---
tags:
  - mlops
  - setting
  - github
  - dockerHub
create: 2024-08-13 17:04:55
---
```ad-check
title:작업 환경
windows: wsl2

mac도 비슷할 것임.
```

## docker

### Dockerfile

#### 이동
```sh
cd
```

#### 열기
```sh
vi Dockerfile
```

#### 작성
```dockerfile
# Ubuntu 기반의 Docker 이미지 생성
FROM ubuntu:24.04

# 필수 패키지 설치
RUN apt-get update && \
  apt-get install -y \
  docker.io \
  openssh-server \
  curl \
  net-tools \
  git \
  wget \
  tree \
  vim \
  && rm -rf /var/lib/apt/lists/*

# .bashrc 파일을 root 홈으로 복사
RUN cp /home/ubuntu/.bashrc /root/.bashrc


# SSH 설정
RUN mkdir /var/run/sshd && \
  sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# 포트 22 열기
# EXPOSE 22

# Docker 데몬과 SSH 데몬을 동시에 실행
CMD ["/bin/bash", "-c", "dockerd & /usr/sbin/sshd -D"]
```

### 빌드
```sh
docker build -t ubuntu-dind:v1 .
```

### 컨테이너
`````ad-attention
title: 중요!!
docker 컨테이너 안에서 docker를 사용할 때는
```ad-danger
title: 꼭 
--privileged 
```
옵션을 붙여서 컨테이너를 생성해야 한다.
`````
#### 생성 및 실행
```sh
docker container run --privileged -itd --name ml-pipe ubuntu-dind:v1
```

#### 접속
```sh
docker container exec -it ml-pipe bash
```

### 확인
#### 입력
```sh
docker container ls
```

#### 출력
```sh
ONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```


---

## Poetry

### 설치
```sh
curl -sSL https://install.python-poetry.org | python3 -
```

### 열기
```sh
vi ~/.bashrc
```

### 추가
```sh
export PATH="/root/.local/bin:$PATH"
```

### 적용
```sh
source .bashrc
```

### 확인
```sh
poetry --version
```



---

## github

### 저장소

#### 생성
![[Pasted image 20240814013010.png]]

![[Pasted image 20240814013151.png]]

#### 클론
![[Pasted image 20240814014038.png]]

![[Pasted image 20240814014048.png]]

```sh
git clone https://github.com/namugach/my-django-backend.git
```

### 리모트 확인
![[Pasted image 20240814014411.png]]
```sh
cd my-django-backend
git remote -v
```

### readme.md 작성
![[Pasted image 20240814014514.png]]
```sh
vi README.md
```


![[Pasted image 20240814014540.png]]
```vim
원하는 내용을 입력
```

저장 및 종료

### stateus

#### 확인
![[Pasted image 20240814014712.png]]
```sh
git status
```

#### 추가
![[Pasted image 20240814014747.png]]

```sh
git add .
git status
```

### 커밋
![[Pasted image 20240814014827.png]]
```sh
git commit -m "start"
```


### log 확인
![[Pasted image 20240814014905.png]]

```sh
git log
```

### 다시 저장소
#### push
![[Pasted image 20240814014939.png]]
```sh
git push
```

#### 확인
![[Pasted image 20240814015031.png]]

---
## docker hub

https://app.docker.com/

회원 가입/로그인

### 토큰 생성

![[Pasted image 20240813171826.png]]

![[Pasted image 20240813171851.png]]

![[Pasted image 20240814022732.png]]
1. 입력: my-django-backend
2. 선택: read, write, delete
3. 클릭

![[Pasted image 20240814023045.png]]
- 클릭: 복사

### github actions secret

#### 등록
![[Pasted image 20240814023358.png]]
1. 확인
2. 클릭
3. 클릭
4. 클릭

#### DOCKERHUB_TOKEN
![[Pasted image 20240814023603.png]]
1. 입력: DOCKERHUB_TOKEN
2. 입력: 복사한 토큰
3. 클릭

![[Pasted image 20240814023727.png]]
1. 확인
2. 클릭

#### DOCKERHUB_USER
![[Pasted image 20240814024000.png]]
1. 입력: DOCKERHUB_USER
2. 입력: docker hub 아이디
3. 클릭


![[Pasted image 20240814024116.png]]
