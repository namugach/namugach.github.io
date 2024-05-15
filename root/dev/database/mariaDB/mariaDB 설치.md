---
tags:
  - mariaDB
  - linux
  - ubuntu
  - setup
create: 2024-04-30 22:54:09
---

## 버전
- 22.04 "jammy"
- 10.6

## 패키지 설치
```sh
sudo apt-get install apt-transport-https curl
```
## 필요한 패키지 설치
```sh
sudo mkdir -p /etc/apt/keyrings
```
## 키 저장 디렉토리 생성, 다운로드
```sh
sudo curl -o /etc/apt/keyrings/mariadb-keyring.pgp 'https://mariadb.org/mariadb_release_signing_key.pgp'
```


## mariadb.sources 작성
```sh
sudo vi /etc/apt/sources.list.d/mariadb.sources
```

```sh file:mariadb.sources
# MariaDB 10.6 repository list - created 2024-04-30 05:48 UTC
# https://mariadb.org/download/
X-Repolib-Name: MariaDB
Types: deb
# deb.mariadb.org is a dynamic mirror if your preferred mirror goes offline. See https://mariadb.org/mirrorbits/ for details.
# URIs: https://deb.mariadb.org/10.6/ubuntu
URIs: https://tw1.mirror.blendbyte.net/mariadb/repo/10.6/ubuntu
Suites: jammy
Components: main main/debug
Signed-By: /etc/apt/keyrings/mariadb-keyring.pgp

sudo apt-get update -y && sudo apt-get install mariadb-server -y
```


## 참조
- https://mariadb.org/download/?t=repo-config
