---
tags:
  - pyenv
  - python
  - flask
  - postgreSql
  - public
create: 2024-06-02 23:50:29
---



![[AWS client to database.canvas]]
[[AWS client to database.canvas|보기]]

## pyenv
### 설치
```sh
sudo apt-get update; sudo apt-get install make build-essential libssl-dev zlib1g-dev \
libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm \
libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev

curl https://pyenv.run | bash
```


### 작성
```sh title:.bashrc
export PYENV_ROOT="$HOME/.pyenv"
[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```

```sh
exec $SHELL
```


### python 설치
```sh
pyenv install 3.11.9
pyenv virtualenv 3.11.9 py3_11_9
pyenv activate py3_11_9
pip install numpy pandas scikit-learn flask gunicorn psycopg2-binary
pyenv deactivate
```


### 테스트
```python title:test.py
import numpy
import pandas
import sklearn
import flask
import gunicorn
import psycopg2
```


```sh
python test.py
```

[[pyenv 설치]]
[[pyenv 실습]]

---
## postgresql

### 설치
```sh
# Import the repository signing key:
sudo apt install curl ca-certificates
sudo install -d /usr/share/postgresql-common/pgdg
sudo curl -o /usr/share/postgresql-common/pgdg/apt.postgresql.org.asc --fail https://www.postgresql.org/media/keys/ACCC4CF8.asc

# Create the repository configuration file:
sudo sh -c 'echo "deb [signed-by=/usr/share/postgresql-common/pgdg/apt.postgresql.org.asc] https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

# Update the package lists:
sudo apt update

# Install the latest version of PostgreSQL:
# If you want a specific version, use 'postgresql-16' or similar instead of 'postgresql'
sudo apt -y install postgresql
```


### 확인
```sh
sudo systemctl status postgresql.service
```


### 접속

```sh
sudo -i -u postgres
psql
```


### 비번 변경
```sql
ALTER USER postgres WITH PASSWORD 'postgres';
```


### DB
#### 생성
```sql
CREATE DATABASE ml;
```

#### 조회
```sql
\list
```

#### 접속
```
\c ml
```


```sql
CREATE TABLE pred_result(
    id SERIAL PRIMARY KEY,
    input NUMERIC,
    output NUMERIC,
    insert_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\dt
```


#### 조회
```sql
SELECT * FROM pred_result;
```

#### 나가기
```sh
\q
```


### 외부 접속 허용

```sh
/etc/postgresql/16/main
sudo vi postgresql.conf
```

```sh title:postgresql.conf
listen_addresses = '0.0.0.0
```


```sh
sudo vi pg_hba.conf
```

```sh title:pg_hba.conf
# IPv4 local connections:
host    all             all             127.0.0.1/32            scram-sha-256
# 이 부분 추가
host    all             all             0.0.0.0/0               scram-sha-256
```


### 재시작


```sh
sudo systemctl restart postgresql
sudo systemctl status postgresql
```


```sh
netstat -nap | grep 5432
```

했을 때

```sh
(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
tcp        0      0 0.0.0.0:5432            0.0.0.0:*               LISTEN      -                   
unix  2      [ ACC ]     STREAM     LISTENING     26570    -                    /var/run/postgresql/.s.PGSQL.5432
```
출력


### AWS EC2 인바운드 규칙 열어주기

```
인스턴스 -> 보안 -> 보안 그룹 -> 인바운드 규칙 편집 -> 규칙 추가
```

```
유형: PostgreSQL
번호: 5432
소스: 내 아이피
```
```ad-tip
이거 안해도 flask로 건들 수는 있다.
하지만 다른 클라이언트로 바로 접속하려면 해두는 게 좋다.
```

---

## DB에 입력하기

### 파일 구조
```
.
└── flaskapp
    ├── myapp
    │   └── main.py
    └── requirements.txt
```

### flast
#### 작성
```python title:main.py
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
@app.route('/predict', methods=['POST'])
def predict():
	data = request.json
	new_X = data['input']
	new_X_val = float(new_X[0])
	input_X = np.array(new_X_val).reshape(1, -1)
	y_pred = model.predict(input_X)
	y_pred_list = y_pred.tolist()
	y_pred_val = round(y_pred_list[0][0], 5)
	conn = psycopg2.connect(dbname='ml', user='postgres', password='postgres', host='127.0.0.1', port=5432)
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


#### 실행

```sh
pyenv activate py3_11_9
```

```
python ./main.py
```

#### error handling
##### 5000번 포트 사용
###### 문제
```ad-error
Port 5000 is in use by another program. Either identify and stop that program, or start the server with a different port.


```

###### 해결
```sh title:입력
sof -n -i TCP:5000
```

```sh title:출력
OMMAND  PID   USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
python  5096 ubuntu    3u  IPv4  14154      0t0  TCP *:5000 (LISTEN)
```

```sh title:입력
kill -9 509
```


### 데이터 보내기
#### window
##### 기본
```powershell
curl -d "{""input"":[""0.8""]}" -H "Content-Type: application/json" -X POST http://내_공개_아이피:5000/predict
```

##### 안될 때
```powershell
curl -d "{\"input\":[\"0.8\"]}" -H "Content-Type: application/json" -X POST http://내_공개_아이피:5000/predict
```

#### unix
- mac
- linux
- wsl
```sh
curl -d '{"input":["0.8"]}' -H "Content-Type: application/json" -X POST http://내_공개_아이피:5000/predict
```


### 확인

#### 접속
```sh
sudo -i -u postgres
psql
\c ml
```

#### 조회
```sql
SELECT * FROM pred_result;
```

| id  | input | output  | insert_dt                  |
| --- | ----- | ------- | -------------------------- |
| 1   | 0.8   | 2.64146 | 2024-05-31 05:52:12.485802 |

#### 나가기
```sh
\q
exit
```




