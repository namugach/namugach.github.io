---
tags:
  - kubernetes
  - minikube
create: 2024-09-10 10:55:50
---
## 설명

- Pod와 Replicaset에 대한 관리를 제공하는 단위
	- https://kubernetes.io/ko/docs/concepts/workloads/controllers/deployment/
- 관리라는 의미는 Self-healing, Scaling, Rollout(무중단 업데이트) 과 같은 기능을 포함
- Deployment 는 Pod을 감싼 개념
	- Pod 을 Deployment 로 배포함으로써 여러 개로 복제된 Pod, 여러 버전의 Pod 을 안전하게 관리


---

## 생성

### 작성

```sh
vi deployment.yaml
```

```yml
apiVersion: apps/v1 # kubernetes resource 의 API Version
kind: Deployment # kubernetes resource name
metadata: # 메타데이터 : name, namespace, labels, annotations 등을 포함
  name: nginx-deployment
  labels:
    app: nginx
spec: # 메인 파트 : resource 의 desired state 를 명시
  replicas: 3 # 동일한 template 의 pod 을 3 개 복제본으로 생성합니다.
  selector:
    matchLabels:
      app: nginx
  template: # Pod 의 template 을 의미합니다.
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx # container 의 이름
          image: nginx:1.14.2 # container 의 image
          ports:
            - containerPort: 80 # container 의 내부 Port

```

### 실행

```sh
kubectl apply -f deployment.yaml
```

---


## 조회

### 상태
#### 기본
- 입력
```sh
kubectl get deployment
```

- 출력
```sh
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment   3/3     3            3           18h
```

#### pod
- 입력
```sh
kubectl get deployment,pod
```

- 출력
```sh
NAME                               READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/nginx-deployment   3/3     3            3           19h

NAME                                READY   STATUS    RESTARTS   AGE
nginx-deployment-77d8468669-4wzq2   1/1     Running   0          2m59s
nginx-deployment-77d8468669-pc2tn   1/1     Running   0          2m59s
nginx-deployment-77d8468669-xnclm   1/1     Running   0          2m59s
```

#### 확인
```ad-check
title: Controlled By를
확인하면 Deployment에 의해 생성, 관리 되고 있는 것을 확인 할 수 있다.
```
```sh
kubectl describe pod pod/nginx-deployment-77d8468669-9vpxl
```

```sh
Name:         nginx-deployment-77d8468669-4wzq2
Namespace:    default
Priority:     0
Node:         minikube/192.168.49.2
Start Time:   Tue, 10 Sep 2024 14:13:24 +0900
Labels:       app=nginx
              pod-template-hash=77d8468669
Annotations:  <none>
Status:       Running
IP:           10.244.0.18
IPs:
  IP:           10.244.0.18
Controlled By:  ReplicaSet/nginx-deployment-77d8468669 # 이 부분
Containers:
  nginx:
    Container ID:   docker://5d763d9949c50481d17223cb5488b32116696cccfdbe9b833384fcafcbfa8258
    Image:          nginx:1.14.2
    Image ID:       docker-pullable://nginx@sha256:f7988fb6c02e0ce69257d9bd9cf37ae20a60f1df7563c3a2a6abe24160306b8d
    Port:           80/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Tue, 10 Sep 2024 14:13:25 +0900
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-2kfll (ro)
Conditions:
  Type                        Status
  PodReadyToStartContainers   True 
  Initialized                 True 
  Ready                       True 
  ContainersReady             True 
  PodScheduled                True 
Volumes:
  kube-api-access-2kfll:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason     Age    From               Message
  ----    ------     ----   ----               -------
  Normal  Scheduled  2m27s  default-scheduler  Successfully assigned default/nginx-deployment-77d8468669-4wzq2 to minikube
  Normal  Pulled     2m27s  kubelet            Container image "nginx:1.14.2" already present on machine
  Normal  Created    2m27s  kubelet            Created container nginx
  Normal  Started    2m27s  kubelet            Started container nginx
```

---
## Auto-healing

### pod 확인
- 입력
```sh
kubectl get pod 
```

- 출력
```sh  
NAME                                READY   STATUS    RESTARTS   AGE
nginx-deployment-77d8468669-4wzq2   1/1     Running   0          6m18s
nginx-deployment-77d8468669-pc2tn   1/1     Running   0          6m18s
nginx-deployment-77d8468669-xnclm   1/1     Running   0          6m18s
```
```ad-check
title: 3개의 pod
확인
```


### pod 삭제
- 입력
```sh
kubectl delete pod nginx-deployment-77d8468669-4wzq2
```

- 출력
```sh
pod "nginx-deployment-77d8468669-4wzq2" deleted
```


### pod 다시 확인

- 입력
```sh
kubectl get pod
```

- 출력
```sh
NAME                                READY   STATUS    RESTARTS   AGE
nginx-deployment-77d8468669-h7lgj   1/1     Running   0          2s
nginx-deployment-77d8468669-pc2tn   1/1     Running   0          9m32s
nginx-deployment-77d8468669-xnclm   1/1     Running   0          9m32s
```

`````ad-done
title: AGE 부분을 보자
```sh
nginx-deployment-77d8468669-h7lgj   1/1     Running   0          2s
```
2s로 다시 살아난 것을 확인
`````



---

## Scaling

### 늘리기

#### 변경
- 입력
```sh
kubectl scale deployment/nginx-deployment --replicas=5
```

- 출력
```sh
deployment.apps/nginx-deployment scaled
```


#### 확인

##### deployment

- 입력
```sh
kubectl get deployment
```

- 출력
```sh
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment   5/5     5            5           14m
```


##### pod

- 입력
```sh
kubectl get pod
```

- 출력
```sh
NAME                                READY   STATUS    RESTARTS   AGE
nginx-deployment-77d8468669-g64pp   1/1     Running   0          12s
nginx-deployment-77d8468669-h7lgj   1/1     Running   0          5m26s
nginx-deployment-77d8468669-jnz65   1/1     Running   0          12s
nginx-deployment-77d8468669-pc2tn   1/1     Running   0          14m
nginx-deployment-77d8468669-xnclm   1/1     Running   0          14m
```






### 줄이기

#### 변경
- 입력
```sh
kubectl scale deployment/nginx-deployment --replicas=5
```

- 출력
```sh
deployment.apps/nginx-deployment scaled
```


#### 확인

##### deployment

- 입력
```sh
kubectl get deployment
```

- 출력
```sh
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment   1/1     1            1           18m
```


##### pod

- 입력
```sh
kubectl get pod
```

- 출력
```sh
NAME                                READY   STATUS    RESTARTS   AGE
nginx-deployment-77d8468669-xnclm   1/1     Running   0          18m
```


---

## 삭제

### 기본
- 양식
```sh
kubectl delete deployment
```

- 입력
```sh
kubectl delete deployment nginx-deployment
```

- 출력
```sh
deployment.apps "nginx-deployment" deleted
```

### 파일로

- 양식
```sh
kubectl delete -f <YAML-파일-경로>
```

- 입력
```sh
kubectl delete -f deployment.yaml
```

- 출력
```sh
deployment.apps "nginx-deployment" deleted
```


