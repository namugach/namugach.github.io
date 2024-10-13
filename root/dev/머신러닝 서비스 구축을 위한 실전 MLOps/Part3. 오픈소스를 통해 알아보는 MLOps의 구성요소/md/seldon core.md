---
tags:
  - mlops
  - kubernetes
create: 2024-09-19 18:00:57
---

## 들어가기 앞서

`````ad-danger
title: 위험
무엇이든 버전의 주제 파악을 해야.
```ad-error
title: error가
```
나지 않는다.

```ad-check
title:check check 또 check 치
```
`````

---

## minikube
````ad-attention
title: apiextensions.k8s.io/v1beta1 버전을 
사용하는 CRD가 더 이상 지원되지 않는다는 오류 때문에
버전을 낮춰야해.  `by iejob`
````

### 삭제
```sh
minikube delete
```
### 생성
```ad-info
- 쿠버네티스 1.20.0 버전
- Docker 드라이버
- CPU 4개
- 메모리 4GB
```
```sh
minikube start --kubernetes-version=v1.20.0 --driver=docker --cpus=4 --memory=4g
```

---
## helm

### 설치

https://github.com/helm/helm/releases 에서 
[Linux amd64](https://get.helm.sh/helm-v3.16.1-linux-amd64.tar.gz) 링크 주소 복사

```sh
wget <URI>
# 압축 풀기
tar -zxvf helm-v?.?.?-linux-amd64.tar.gz
# 바이너리 PATH 로 이동
mv linux-amd64/helm /usr/local/bin/helm
# helm 정상 동작 확인
helm help
```

### 저장소 

#### 추가
- 입력
```sh
helm repo add datawire https://www.getambassador.io
```

- 출력
```sh
"datawire" has been added to your repositories
```


#### 업데이트
- 입력
```sh
helm repo update
```

- 출력
```sh
Hang tight while we grab the latest from your chart repositories...
...Successfully got an update from the "datawire" chart repository
Update Complete. ⎈Happy Helming!⎈
```

---
## ambassador

### 설치

- 입력
```ad-check
title: version
ambassador-6.9.1
```
```sh
helm install ambassador datawire/ambassador \
  --namespace seldon-system \
  --create-namespace \
  --set image.repository=quay.io/datawire/ambassador \
  --set enableAES=false \
  --set crds.keep=false \
  --version 6.9.1
```

- 출력
```ad-attention
title: 설치할 때
많은 경고가 나오지만, 별 문제는 없다.
```
```sh
NAME: ambassador
LAST DEPLOYED: Fri Sep 20 16:54:42 2024
NAMESPACE: seldon-system
STATUS: deployed
REVISION: 1
NOTES:
-------------------------------------------------------------------------------
  Congratulations! You've successfully installed Ambassador!

-------------------------------------------------------------------------------
To get the IP address of Ambassador, run the following commands:
NOTE: It may take a few minutes for the LoadBalancer IP to be available.
     You can watch the status of by running 'kubectl get svc -w  --namespace seldon-system ambassador'

  On GKE/Azure:
  export SERVICE_IP=$(kubectl get svc --namespace seldon-system ambassador -o jsonpath='{.status.loadBalancer.ingress[0].ip}')

  On AWS:
  export SERVICE_IP=$(kubectl get svc --namespace seldon-system ambassador -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')

  echo http://$SERVICE_IP:

For help, visit our Slack at http://a8r.io/Slack or view the documentation online at https://www.getambassador.io.

```

### 확인
#### 계속 모니터링
```ad-tip
title: 빠저나오려면
ctrl + c
```
```sh
kubectl get pod -n seldon-system -w
```

#### 한 번만
```sh
kubectl get pod -n seldon-system
```


---

## Seldon-core

### 설치

- 입력
```ad-check
title: version
seldon-core-operator-1.11.0
```
```sh
helm install seldon-core seldon-core-operator \
  --repo https://storage.googleapis.com/seldon-charts \
  --namespace seldon-system \
  --create-namespace \
  --set usageMetrics.enabled=true \
  --set ambassador.enabled=true \
  --version 1.11.0
```

- 출력
```sh
NAME: seldon-core
LAST DEPLOYED: Fri Sep 20 16:57:30 2024
NAMESPACE: seldon-system
STATUS: deployed
REVISION: 1
TEST SUITE: None
```


---

## Quick Start

### Seldon Deployment

#### namespace
- 입력
```sh
kubectl create namespace seldon
```

- 출력
```sh
namespace/seldon created
```

#### 작성
- 생성
```sh
vi sample.yaml
```

- 입력
```yml
apiVersion: machinelearning.seldon.io/v1  # Seldon Core의 API 버전
kind: SeldonDeployment  # SeldonDeployment 리소스 정의
metadata:
  name: iris-model  # SeldonDeployment의 이름
  namespace: seldon  # 배포할 네임스페이스
spec:
  name: iris  # Seldon Core 내에서 사용할 모델 이름
  predictors:
  - graph:
      implementation: SKLEARN_SERVER  # Seldon Core에서 pre-packaged 된 sklearn 서버 사용
      modelUri: gs://seldon-models/v1.11.0-dev/sklearn/iris  # Google Storage에 저장된 미리 학습된 Iris 모델 경로
      name: classifier  # predictor의 이름
    name: default  # 기본 설정
    replicas: 1  # 로드 밸런싱을 위한 replica 개수 (기본적으로 1개 설정)
```

#### 실행
- 입력
```sh
kubectl apply -f sample.yaml
```

- 출력
```sh
seldondeployment.machinelearning.seldon.io/iris-model created
```

---

## 내부 통신

```ad-attention
title: 을 하기 전에
새로운 터미널 창에서 실행해야 해
```

### 열기
- 입력
```ad-info
title: 하면
sudo 비번 입력하라고 나옴
```
```sh
minikube tunnel
```

- 출력
```ad-info
title: 하면
이대로 화면 멈추니까 끄지말고 다른 대에서 작업해야 해
```
```sh
✅  Tunnel successfully started

📌  NOTE: Please do not close this terminal as this process must stay alive for the tunnel to be accessible ...

❗  The service/ingress ambassador requires privileged ports to be exposed: [80 443]
🔑  sudo permission will be asked for it.
🏃  Starting tunnel for service ambassador.
```

---

## API 문서

### EXTERNAL-IP 알아내기
- 입력
```ad-tip
title: 은 
다른 터미널 창에서 해야겠지?
```
```sh
kubectl get service -n seldon-system
```

- 출력
```ad-danger
title: 오!
- CLUSTER-IP
- EXTERNAL-IP
이렇게 2개가 있는데 
`EXTERNAL-IP` 이것을 가지고 와야 해
```
```sh
NAME                     TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE
ambassador               LoadBalancer   10.97.159.95    127.0.0.1     80:30005/TCP,443:30185/TCP   17m
ambassador-admin         ClusterIP      10.99.113.133   <none>        8877/TCP,8005/TCP            17m
seldon-webhook-service   ClusterIP      10.105.95.14    <none>        443/TCP                      14m
```


### 확인

- 형식
```
http://<ingress_url>/seldon/<namespace>/<model-name>/api/v1.0/doc/
```

- 클릭
```ad-success
http://127.0.0.1/seldon/seldon/iris-model/api/v1.0/doc/
```

`````ad-missing
title: 해서 들어가면
```ad-check
title: POST `​/seldon​/seldon​/iris-model​/api​/v1.0​/predictions`
```
- `Example Value` | Schema
```json
{
  "data": {
    "names": [
      "feature1"
    ],
    "tensor": {
      "shape": [
        1,
        1
      ],
      "values": [
        1
      ]
    }
  }
}
```

`````

````ad-bug
title: 이런 녀석이 있는데, 

`모델마다 형식이 다 달라지기 때문에 `
그 형식을 자동으로 보여 주지는 않는다고 한다.

때문에 위의 모델 형식으로 api 통신은 할 수 없고

```json
{ "data": { "ndarray": [[1,2,3,4]] } }
```

이렇게 미리 정해진 형식으로 통신을 해야 한다고 한다.
````

### 보내기

#### 모범 데이터
- 입력
```sh
curl -X POST http://127.0.0.1/seldon/seldon/iris-model/api/v1.0/predictions \
-H 'Content-Type: application/json' \
-d '{ "data": { "ndarray": [[1,2,3,4]] } }'
```

- 출력
```sh
{"data":{"names":["t:0","t:1","t:2"],"ndarray":[[0.0006985194531162835,0.00366803903943666,0.995633441507447]]},"meta":{"requestPath":{"classifier":"seldonio/sklearnserver:1.11.0"}}}
```


#### 불량 데이터
- 입력
```sh
curl -X POST http://127.0.0.1/seldon/seldon/iris-model/api/v1.0/predictions \
-H 'Content-Type: application/json' \
-d '{ "data": { "ndarray": [[1,2,3,4,5]] } }'
```

- 출력
```sh
{"status":{"code":-1,"info":"Unknown data type returned as payload (must be list or np array):None","reason":"MICROSERVICE_BAD_DATA","status":1}}
```



---


## docker

```ad-note
title: 전역은
더럽히지 않을거야. 
때문에 docker container에서 minikube에 접근 할 것인데
그 때 필요 한 것이 minikube의 ip를 알아내는 것임
[[Docker container에서 Minikube 클러스터에 접근하기]]
```

### minikube

#### ip
- 입력
```sh
minikube ip
```

- 출력
```sh
# 똑같이 나오지 않을 것임
192.168.49.2
```

### continaer

#### 생성
```sh
docker container run -itd --network minikube --name basic-ubuntu namugach/ubuntu-basic:kor
```

#### 접속
```sh
docker container exec -it -w /root basic-ubuntu bash
```

### api

#### 호출
```ad-attention
title: port는
30005!
```
- 양식
```sh
curl -X POST http://<minikube-ip>:30005/seldon/seldon/iris-model/api/v1.0/predictions \
-H 'Content-Type: application/json' \
-d '{ "data": { "ndarray": [[1,2,3,4]] } }'
```

- 입력
```sh
curl -X POST http://192.168.49.2:30005/seldon/seldon/iris-model/api/v1.0/predictions \
-H 'Content-Type: application/json' \
-d '{ "data": { "ndarray": [[1,2,3,4]] } }'
```

- 출력
```sh
{"data":{"names":["t:0","t:1","t:2"],"ndarray":[[0.0006985194531162835,0.00366803903943666,0.995633441507447]]},"meta":{"requestPath":{"classifier":"seldonio/sklearnserver:1.11.0"}}}
```

---

## python

### pip install

```sh
pip install numpy seldon-core
```

### 파일

#### 생성
```sh
vi test.py
```

#### 작성
```ad-attention
title: gateway_endpoint에는 
minikube ip 및 port를 입력해야 해
```
```python
import numpy as np
from seldon_core.seldon_client import SeldonClient

sc = SeldonClient(
	gateway="ambassador",
	transport="rest",
	gateway_endpoint="192.168.49.2:30005", # Make sure you use the port above
	namespace="seldon",
)
client_prediction = sc.predict(
	data=np.array([[1, 2, 3, 4]]),
	deployment_name="iris-model",
	names=["text"],
	payload_type="ndarray",
)

print(client_prediction)
```

#### 실행
- 입력
```sh
python test.py
```


- 출력
```sh
Success:True message:
Request:
meta {
}
data {
  names: "text"
  ndarray {
    values {
      list_value {
        values {
          number_value: 1.0
        }
        values {
          number_value: 2.0
        }
        values {
          number_value: 3.0
        }
        values {
          number_value: 4.0
        }
      }
    }
  }
}

Response:
{'data': {'names': ['t:0', 't:1', 't:2'], 'ndarray': [[0.0006985194531162835, 0.00366803903943666, 0.995633441507447]]}, 'meta': {'requestPath': {'classifier': 'seldonio/sklearnserver:1.11.0'}}}
```
