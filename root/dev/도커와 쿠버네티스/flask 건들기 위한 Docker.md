---
tags:
  - docker
  - public
create: 2024-06-02 23:53:13
---


https://docs.docker.com/engine/install/ubuntu/
## 저장소 등록
```sh
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```
---
## 설치
```sh
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
---
## 권한
```sh
sudo usermod -aG docker $USER
exec $SHELL

# 재접속
exit
```
---
## 확인

### 기본
```sh
docker
docker version
```

```ad-attention
권한 설정이 안돼있으면

```{sh} sudo docker```
```{sh} docker --version```
```

### 명확히
```sh
systemctl status docker
```

---
## Hello world
### 컨테이너
#### 실행
```sh
docker container run hello-world
```

#### 출력
```sh title:출력
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

### 확인
#### 실행중
```sh
docker container ls
```

#### 모든
```sh
docker container ls -a
```

---
## 우분투

### pull, create, start, attach 한 번에
```sh
docker container run -it ubuntu
```

```ad-note
pull, create, start, attach를 한번에 한 효과를 보게 된다.
그리고 종료 할 때는 exit
```

### 종료
```sh
exit
```



