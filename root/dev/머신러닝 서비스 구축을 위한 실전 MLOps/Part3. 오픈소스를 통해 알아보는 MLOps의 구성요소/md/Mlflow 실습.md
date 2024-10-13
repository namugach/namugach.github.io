---
tags:
  - mlops
  - mlflow
create: 2024-09-12 23:32:44
---

## git으로 한번에 실행하기

### 클론
```sh
git clone https://github.com/namugach/mlflow_base.git
```

### 설치
```sh
cd mlflow_base
./install.sh
```

### 접속
```sh
docker exec -it mlflow_server bash -c "cd /root/src/basic && bash"
```

### 실행
```sh
./main.sh
```

### 확인
http://127.0.0.1:5000

---
## 사전 준비

### docker 컨테이너

#### 생성
```sh
docker container run -itd --name mlflow_server -v $(pwd)/src:/root/src -p 5000:5000 -p 1234:1234 namugach/ubuntu-basic:24.04-kor
```

#### 접속

```sh
docker container exec -it -w /root mlflow_server bash
```

### pyenv

[[pyenv 설치#사전 준비]]
[[pyenv 설치#설치]]
[[pyenv 설치#초기 설정]]

- python 설치
```sh
pyenv install 3.12.3
```

---
## mlflow
### 설치

```sh
pip install --upgrade pip
```

```sh
pip install mlflow
pip install virtualenv
```

### 확인

```sh
mlflow --version
```

---

## 작업디렉토리 만들기

```sh
cd ~/src
mkdir basic
cd basic
mkdir models run res
```

---

## 모델
### 다운로드
```sh
cd ~/src/basic
git clone https://github.com/mlflow/mlflow.git
```

### 준비
```sh
cp -R mlflow/examples/* models
```



---
## sklearn_elasticnet_diabetes

### 실행
```ad-attention
title: train 디렉토리
만드는 이유는 mlflow ui 를 했을 때
mlruns 디렉토리가 만들어 지는데
이게 python 파일을 실행했을 때 위치해 있는 경로에 생긴다.
그래서 res란 디렉토리를 만들고, 거기서 실행해줘야
모델이 한 곳에 모인다.
```

-  디렉토리 이동
```sh
cd ~/src/basic/res
```

- 입력
```sh
python ~/src/basic/models/sklearn_elasticnet_diabetes/linux/train_diabetes.py
```

- 출력
```sh
Elasticnet model (alpha=0.050000, l1_ratio=0.050000):
  RMSE: 78.59249466381223
  MAE: 66.30998032458166
  R2: 0.06607434687959957
Computing regularization path using the elastic net.
```

### 확인
- 입력
```sh
tree
```

- 출력
```sh
.
|-- ElasticNet-paths.png
`-- mlruns
    `-- 0
        |-- bc650299c1014a5087fe10d4c438e810
        |   |-- artifacts
        |   |   |-- ElasticNet-paths.png
        |   |   `-- model
        |   |       |-- MLmodel
        |   |       |-- conda.yaml
        |   |       |-- model.pkl
        |   |       |-- python_env.yaml
        |   |       `-- requirements.txt
        |   |-- meta.yaml
        |   |-- metrics
        |   |   |-- mae
        |   |   |-- r2
        |   |   `-- rmse
        |   |-- params
        |   |   |-- alpha
        |   |   `-- l1_ratio
        |   `-- tags
        |       |-- mlflow.log-model.history
        |       |-- mlflow.runName
        |       |-- mlflow.source.name
        |       |-- mlflow.source.type
        |       `-- mlflow.user
        `-- meta.yaml
```


### serve
- 실행
```sh
path=/root/src/basic/res/mlruns/0

# 최신 실행 ID를 추출
RUN_ID=$(ls -tr $path | grep -v 'meta.yaml' | grep -v 'datasets' | head -n 1)
mlflow models serve -m /root/src/basic/res/mlruns/0/$RUN_ID/artifacts/model --host 0.0.0.0 -p 1234
```

- 입력
```ad-attention
MLflow 2.0부터는 모델 서빙 API가 약간 변경 됨
```
```sh
curl -X POST -H "Content-Type: application/json" -d '{
  "dataframe_split": {
    "columns": ["age", "sex", "bmi", "bp", "s1", "s2", "s3", "s4", "s5", "s6"],
    "data": [[0.038076, 0.050680, 0.061696, 0.021872, -0.044223, -0.034821, -0.043401, -0.002592, 0.019908, -0.017646]]
  }
}' http://127.0.0.1:1234/invocations
```

- 출력
```sh
{"predictions": [153.20093644395587]}
```

---
## Automatic Logging

### 실행
```sh
cd /root/src/basic/res
python ~/src/basic/models/sklearn_autolog/pipeline.py
```


### 출력
```sh
---------- logged params ----------
{'lr': 'LinearRegression()',
 'lr__copy_X': 'True',
 'lr__fit_intercept': 'True',
 'lr__n_jobs': 'None',
 'lr__positive': 'False',
 'memory': 'None',
 'scaler': 'StandardScaler()',
 'scaler__copy': 'True',
 'scaler__with_mean': 'True',
 'scaler__with_std': 'True',
 'steps': "[('scaler', StandardScaler()), ('lr', LinearRegression())]",
 'verbose': 'False'}

---------- logged metrics ----------
{'training_mean_absolute_error': 2.220446049250313e-16,
 'training_mean_squared_error': 1.9721522630525295e-31,
 'training_r2_score': 1.0,
 'training_root_mean_squared_error': 4.440892098500626e-16,
 'training_score': 1.0}

---------- logged tags ----------
{'estimator_class': 'sklearn.pipeline.Pipeline', 'estimator_name': 'Pipeline'}

---------- logged artifacts ----------
['estimator.html',
 'model/MLmodel',
 'model/conda.yaml',
 'model/model.pkl',
 'model/python_env.yaml',
 'model/requirements.txt']
```

---

## XGB model

### pip
```sh
pip install xgboost
```

1. **필요한 라이브러리 설치 및 코드 다운로드**:
	- 참고 문서 : [XGBoost Autologging](https://github.com/mlflow/mlflow/tree/master/examples/xgboost)
	- iris data 를 xgboost 모델로 classification 수행.
	- xgboost, autolog, mlflow.log.metrics() 사용

### xgboost_native
- 입력
```sh
cd ~/src/basic/res
python ~/src/basic/models/xgboost/xgboost_native/train.py
```

- 출력
```sh
root@a8e67d993786:~/src/basic/res# python ~/src/basic/models/xgboost/xgboost_native/train.py 
[0]     train-mlogloss:0.74723
[1]     train-mlogloss:0.54060
[2]     train-mlogloss:0.40276
[3]     train-mlogloss:0.30789
[4]     train-mlogloss:0.24051
[5]     train-mlogloss:0.19086
[6]     train-mlogloss:0.15471
[7]     train-mlogloss:0.12807
[8]     train-mlogloss:0.10722
[9]     train-mlogloss:0.09053
2024/09/18 17:19:49 WARNING mlflow.utils.autologging_utils: MLflow autologging encountered a warning: "/usr/local/lib/python3.12/dist-packages/xgboost/core.py:158: UserWarning: [17:19:49] WARNING: /workspace/src/c_api/c_api.cc:1374: Saving model in the UBJSON format as default.  You can use file extension: `json`, `ubj` or `deprecated` to choose between formats."
```

### xgboost_sklearn
- 입력
```sh
python ~/src/basic/models/xgboost/xgboost_sklearn/train.py
```

- 출력
```sh
root@a8e67d993786:~/src/basic/res# python ~/src/basic/models/xgboost/xgboost_sklearn/train.py
2024/09/18 17:20:13 INFO mlflow.utils.autologging_utils: Created MLflow autologging run with ID 'cdcbae38ba7c4e199c4a35190fda5e7a', which will track hyperparameters, performance metrics, model artifacts, and lineage information for the current xgboost workflow
[0]     validation_0-rmse:62.19849
[1]     validation_0-rmse:58.28724
[2]     validation_0-rmse:55.81963
[3]     validation_0-rmse:54.86863
[4]     validation_0-rmse:54.82453
[5]     validation_0-rmse:55.38414
[6]     validation_0-rmse:55.94560
[7]     validation_0-rmse:55.60640
[8]     validation_0-rmse:55.55938
[9]     validation_0-rmse:55.96819
[10]    validation_0-rmse:55.53129
[11]    validation_0-rmse:55.49893
[12]    validation_0-rmse:55.72621
[13]    validation_0-rmse:56.04788
[14]    validation_0-rmse:55.55565
[15]    validation_0-rmse:56.06604
[16]    validation_0-rmse:55.99269
[17]    validation_0-rmse:56.60752
[18]    validation_0-rmse:56.96563
[19]    validation_0-rmse:57.13170
2024/09/18 17:20:13 WARNING mlflow.utils.autologging_utils: MLflow autologging encountered a warning: "/usr/local/lib/python3.12/dist-packages/xgboost/core.py:158: UserWarning: [17:20:13] WARNING: /workspace/src/c_api/c_api.cc:1374: Saving model in the UBJSON format as default.  You can use file extension: `json`, `ubj` or `deprecated` to choose between formats."
Logged data and model in run cdcbae38ba7c4e199c4a35190fda5e7a

---------- logged params ----------
{'base_score': 'None',
 'booster': 'None',
 'colsample_bylevel': 'None',
 'colsample_bynode': 'None',
 'colsample_bytree': 'None',
 'custom_metric': 'None',
 'device': 'None',
 'early_stopping_rounds': 'None',
 'eval_metric': 'None',
 'gamma': '0',
 'grow_policy': 'None',
 'interaction_constraints': 'None',
 'learning_rate': 'None',
 'max_bin': 'None',
 'max_cat_threshold': 'None',
 'max_cat_to_onehot': 'None',
 'max_delta_step': 'None',
 'max_depth': '3',
 'max_leaves': 'None',
 'maximize': 'None',
 'min_child_weight': 'None',
 'monotone_constraints': 'None',
 'multi_strategy': 'None',
 'n_jobs': 'None',
 'num_boost_round': '20',
 'num_parallel_tree': 'None',
 'objective': 'reg:squarederror',
 'random_state': 'None',
 'reg_alpha': 'None',
 'reg_lambda': '1',
 'sampling_method': 'None',
 'scale_pos_weight': 'None',
 'subsample': 'None',
 'tree_method': 'None',
 'validate_parameters': 'None',
 'verbose_eval': 'True',
 'verbosity': 'None'}

---------- logged metrics ----------
{'validation_0-rmse': 57.13169958420536}

---------- logged tags ----------
{}

---------- logged artifacts ----------
['feature_importance_weight.json',
 'feature_importance_weight.png',
 'model/MLmodel',
 'model/conda.yaml',
 'model/model.xgb',
 'model/python_env.yaml',
 'model/requirements.txt']
```


---

## 서버
```ad-attention
title: ui 서버 실행 할 때
model을 실행시킨 디렉토리에서 해야 함
그래야 실험 결과를 볼 수 있음
```
### 띄우기
```sh
cd ~/src/basic/res
mlflow ui --host 0.0.0.0
```

### 브라우저
http://127.0.0.1:5000/



