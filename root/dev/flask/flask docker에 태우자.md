---
tags:
  - flask
  - docker
  - postgreSql
  - public
create: 2024-06-02 23:59:36
---


![[AWS client to docker database.canvas]]
[[AWS client to docker database.canvas|보기]]

## 디렉토리 정리

### 구조
```sh
.
├── docker
│   └── flaskapp
│       ├── Dockerfile
│       ├── myapp
│       │   └── main.py
│       └── requirements.txt
└── flaskapp
    └── main.py
```

```ad-attention
test와 while_loop.py 파일이 있을 수 있지만
docker와 flaskapp 디렉토리 구조가 같다면 문제 없음
```

### 전처리
```sh
sudo apt install tree
```

### 작업
```sh
# 작업 디렉토리로 이동
cd ~/work

# main.py 파일 flaskapp 디렉토리 이동
mkdir flaskapp
mv main.py flaskapp

# flaskapp 디렉토리 docker 디렉토리 안으로 복사
mkdir docker 
cp -r flaskapp docker # -r 옵션은 깊은 복사

# 작업 디렉토리 변경
cd docker/flaskapp/

# main.py myapp 디렉토리로 이동
mkdir myapp
mv main.py myapp

# 설정 파일 생성
touch Dockerfile
touch requirements.txt

# 전체 디렉토리 확인
cd ~/work
tree
```
---
## 도커에 로컬 DB 연결 통로 뚫어주기

```ad-important
title:매우!

여기서 
```{python} conn = psycopg2.connect(dbname='ml', user='postgres', password='postgres', host='172.17.0.1', port=5432)```

host 부분을 docker ip로 바꿔 줘야 한다.

하지 않으면 클라이언트에서 post로 db에 접근 하지 못한다.
```

### IP 확인
```sh
ifconfig
```

하면

```sh
docker0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255
        inet6 fe80::42:82ff:fe9b:e70e  prefixlen 64  scopeid 0x20<link>
        ether 02:42:82:9b:e7:0e  txqueuelen 0  (Ethernet)
        RX packets 372  bytes 39785 (39.7 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 314  bytes 59552 (59.5 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

enX0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 9001
        inet 172.31.8.194  netmask 255.255.240.0  broadcast 172.31.15.255
        inet6 fe80::39:1aff:feff:673  prefixlen 64  scopeid 0x20<link>
        ether 02:39:1a:ff:06:73  txqueuelen 1000  (Ethernet)
        RX packets 134980  bytes 52783685 (52.7 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 113282  bytes 18350518 (18.3 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 223904  bytes 18604065 (18.6 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 223904  bytes 18604065 (18.6 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

veth889f608: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::8488:9bff:fe4d:3fb1  prefixlen 64  scopeid 0x20<link>
        ether 86:88:9b:4d:3f:b1  txqueuelen 0  (Ethernet)
        RX packets 355  bytes 42968 (42.9 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 313  bytes 58612 (58.6 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

이런 형식이 나올 텐데.
`docker0`의 `inet 172.17.0.1` 부분을 넣어 주면 된다.

### main.py

```python
import numpy as np
from sklearn.linear_model import LinearRegression
import psycopg2
from flask import Flask, request, jsonify
app = Flask(__name__)
# 학습
np.random.seed(0)
X = np.random.rand(10, 1)
y = 2 * X + 1 + 0.1 * np.random.randn(10, 1)
model = LinearRegression()
model.fit(X, y)
@app.route('/')
def welcome():
	return 'HELLO, ML API SERVER'

@app.route('/test', methods=['POST'])
def test():
	print(request.json)
	print("this is test")
	return "this is test"

@app.route('/predict', methods=['POST'])
def predict():
	data = request.json
	new_X = data['input']
	new_X_val = float(new_X[0])
	input_X = np.array(new_X_val).reshape(1, -1)
	y_pred = model.predict(input_X)
	y_pred_list = y_pred.tolist()
	y_pred_val = round(y_pred_list[0][0], 5)
	# 여기 host
	conn = psycopg2.connect(dbname='ml', user='postgres', password='postgres', host='172.17.0.1', port=5432)
	cur = conn.cursor()
	query = "INSERT INTO pred_result (input, output) VALUES (%s, %s)"
	values = (new_X_val, y_pred_val)
	cur.execute(query, values)
	conn.commit()
	cur.close()
	conn.close()
	res = jsonify({'input': new_X_val, 'predicted_output': y_pred_val})
	return res
if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000)
```



---
## requirements.txt

### pyenv activate
```sh
pyenv activate py3_11_9 
```

### 라이브러리 확인
```sh
pip list | grep -E 'scikit-learn|Flask|gunicorn|psycopg2'
```

```sh title:출력
Flask           3.0.3
gunicorn        22.0.0
psycopg2-binary 2.9.9
scikit-learn    1.5.0
```

### 작성
```ad-attention
title:앗! 텐션
버전명이 다르면 안된다.
```

```text title:requirements.txt
flask==3.0.3
psycopg2==2.9.9
scikit-learn==1.5.0
```


---
## Dockerfile

```Dockerfile title:/home/ubuntu/work/docker/flaskapp/Dockerfile
FROM python:3.11.9

WORKDIR /usr/src/app

COPY . .

RUN python -m pip install --upgreade pip
RUN pip install -r requirements.txt

WORKDIR ./myapp

CMD python main.py

EXPOSE 5000
```

```ad-info
- `FROM`: 베이스 도커 이미지 지정
- `WORKDIR`: cd 명령어와 같이 컨테이너 내 작업 디렉토리 전환
- `COPY`: 호스트 파일을 컨테이너 내부로 복사
- `RUN`: 이미지 빌드 과정에 사용
- `CMD`: 컨테이너를 띄울때 사용
```

---
## 이미지 빌드

### 이동
```sh
cd work/docker/flaskapp/
tree
.
├── Dockerfile
├── myapp
│   └── main.py
└── requirements.txt
```

### 빌드

```sh
docker image build . -t flaskapi01
```

### 확인
```sh title:입력
docker image ls
```

```sh title:출력
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
flaskapi01    latest    a8c4fa3dda54   2 days ago      1.38GB
my-ubuntu     0.1       47f1ae23d4f6   3 days ago      114MB
ubuntu        latest    bf3dc08bfed0   4 weeks ago     76.2MB
hello-world   latest    d2c94e258dcb   13 months ago   13.3kB
```


---
## AWS EC2 인바운드 규칙 열어주기

```
인스턴스 -> 보안 -> 보안 그룹 -> 인바운드 규칙 편집 -> 규칙 추가
```

```
유형: http
번호: 80
소스: 내 아이피
```
---
## 빌드 이미지 실행

### 실행
```sh
docker container run -d -p 80:5000 flaskapi01
```

### 확인
```sh title:입력
docker container ls
```

```sh title:출력
CONTAINER ID   IMAGE        COMMAND                  CREATED         STATUS         PORTS                                   NAMES
1b71df899d3a   flaskapi01   "/bin/sh -c 'python …"   2 minutes ago   Up 2 minutes   0.0.0.0:80->5000/tcp, :::80->5000/tcp   zealous_diffie
```

### 접속

```ad-note
브라우저 창에서 ec2 public ip를 입력 후
`HELLO, ML API SERVER` 출력 하면 성공
```

---

## api 요청

### windows
#### 기본
```powershell
curl -d "{""input"":[""0.6""]}" -H "Content-Type: application/json" -X POST http://내_공개_아이피/predict
```

#### 안될 때
```powershell
curl -d "{\"input\":[\"0.6\"]}" -H "Content-Type: application/json" -X POST http://내_공개_아이피/predict
```

```ad-note
웬만하면 위의 경우가 될테지만 윈도우 10 터미널에서 "의 처리를 못해서
에러를 출력한 경험이 있었다. 안될 경우 시도 해보자.
```


### unix
- mac
- linux
- wsl
```sh
curl -d '{"input":["0.6"]}' -H "Content-Type: application/json" -X POST http://내_공개_아이피/predict
```

### 출력
```sh
{"input":0.6,"predicted_output":2.23995}
```
---

## 확인

### 접속
```sh
sudo -i -u postgres
psql
\c ml
```

### 조회
```sql
SELECT * FROM pred_result;
```

| id  | input | output  | insert_dt                  |
| --- | ----- | ------- | -------------------------- |
| 1   | 0.8   | 2.64146 | 2024-05-31 05:52:12.485802 |
| 22  | 0.6   | 2.23995 | 2024-06-02 16:24:37.69677  |

### 나가기
```sh
\q
exit
```


