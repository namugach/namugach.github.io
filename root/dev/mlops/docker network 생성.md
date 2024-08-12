---
tags:
  - docker
  - setting
  - public
create: 2024-08-08 11:37:57
---

## 생성

```sh
docker network create --gateway 172.20.0.1 --subnet 172.20.0.0/24 mlops
```

---
## 확인

```sh
ubuntu@ip-172-31-23-166:~$ docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
14fc8c65bc96   bridge    bridge    local
ae569fc79b54   host      host      local
299688b5d3d9   mlops     bridge    local
06be7d2218af   none      null      local
```

---
## 예시

```sh
docker run -itd --name my-mlops --network mlops python:3.11-buster
```







