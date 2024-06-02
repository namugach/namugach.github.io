---
tags:
  - python
  - pyenv
  - 실습
create: 2024-05-13 11:20:05
---

- [[pyenv 설치]]

## 버전 확인

```
pyenv install --list
```

## 설치

```sh
pyenv install 3.11.9
```

## 라이브러리 설치
```sh
pyenv activate py3_11_9
pip install pandas
pip install scikit-learn
pip install flask
pip install gunicorn
pip install psycopg2-binary
```

## 백그라운드 실행
```sh
nohup python pytest02.py > /dev/null 2>&1 &
```

### 확인
```ps
ps -ef | grep pytest02
```

## 죽이기

```sh
kill -9 23978
```