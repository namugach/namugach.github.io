---
tags:
  - flask
  - mlflow
create: 2024-09-18 02:10:59
---
`````ad-attention
title: docker로
실행할 때, vscode docker plugin으로 attach 해서 들어갔을 때는
get 방식은 port가 겹침으로 3000번으로 실행 하고
post는 docker에서 
```sh
docker container run -itd -p 5000:5000 mlflow:0.1
```
5000번을 포트포워딩을 설정해서 포트를 외부로 노출 해야
터미널에서 값을 보낼 수 가 있음.
`````


## 설치

```sh
pip install Flask
```


---

## Hello World! with Flask
### get
```ad-attention
title: vscode plugin을
사용했다면 아래처럼 하고 그렇지 않고 exec 명령어를 사용하여
터미널에서 서버를 실행했다면 5000번으로 해도. 상관 없음
```
#### 생성
```sh
vi app.py
```

#### 작성
```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_workd():
  return "<p>Hello?</p>"

@app.route("/fastcampus")
def hello_fastcampus():
  return "<p>Hello, Fast Campus!</p>"


if __name__ == "__main__":
  app.run(debug=True, host="0.0.0.0", port=5000)
```


#### 실행
```sh
python app.py
```

#### 확인
- http://127.0.0.1:5000
- http://127.0.0.1:5000/fastcampus


### post
```ad-check
title: docker 컨테이너면
포트포워딩 된 것으로 서버 실행 해야함
```
#### 추가
```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_workd():
  return "<p>Hello?</p>"

@app.route("/fastcampus")
def hello_fastcampus():
  return "<p>Hello, Fast Campus!</p>"

# --------------
import json
@app.route("/predict", methods=["POST", "PUT"])
def inference():
  return json.dumps({'hello': 'world'}), 200 
# --------------

if __name__ == "__main__":
  app.run(debug=True, host="0.0.0.0", port=5000)
```

#### 실행
```sh
curl -X POST http://127.0.0.1:5000/predict
curl -X PUT http://127.0.0.1:5000/predict
```

#### 출력
```sh
{"hello": "world"}{"hello": "world"}
```

---

## model serve

### train.py
```python
import os
import pickle
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split
RANDOM_SEED = 1234

# STEP 1) data load
data = load_iris()

# STEP 2) data split
X = data['data']
y = data['target']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3,
random_state=RANDOM_SEED)

# STEP 3) train model
model = RandomForestClassifier(n_estimators=300, random_state=RANDOM_SEED)
model.fit(X_train, y_train)

# STEP 4) evaluate model
print(f"Accuracy : {accuracy_score(y_test, model.predict(X_test))}")
print(classification_report(y_test, model.predict(X_test)))

# STEP 5) save model to ./build/model.pkl
os.makedirs("./build", exist_ok=True)
pickle.dump(model, open('./build/model.pkl', 'wb'))
```

### app.py
```python
import pickle
from flask import Flask, jsonify, request
import numpy as np

app = Flask(__name__)

@app.route("/")
def hello_workd():
  return "<p>Hello?</p>"

@app.route("/fastcampus")
def hello_fastcampus():
  return "<p>Hello, Fast Campus!</p>"


# 지난 시간에 학습한 모델 파일을 불러옵니다.
model = pickle.load(open('./build/model.pkl', 'rb'))


# POST /predict 라는 API 를 구현합니다.
@app.route('/predict', methods=['POST'])
def make_predict():
  # API Request Body 를 python dictionary object 로 변환합니다.
  request_body = request.get_json(force=True)
  # request body 를 model 의 형식에 맞게 변환합니다.
  X_test = [request_body['sepal_length'], request_body['sepal_width'],
  request_body['petal_length'], request_body['petal_width']]
  X_test = np.array(X_test)
  X_test = X_test.reshape(1, -1)
  # model 의 predict 함수를 호출하여, prediction 값을 구합니다.
  y_test = model.predict(X_test)
  # prediction 값을 json 화합니다.
  response_body = jsonify(result=y_test.tolist())
  # predict 결과를 담아 API Response Body 를 return 합니다.
  return response_body


if __name__ == "__main__":
  app.run(debug=True, host="0.0.0.0", port=5000)
```

