---
tags:
  - prometheus
  - grafana
create: 2024-09-20 14:04:28
---

## 설치

### minikube

```sh
minikube start --kubernetes-version=v1.22.0 --driver=docker --cpus=4 --memory=4g
```


### Helm Repo
- https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack
```sh
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
```


### kube-prometheus-stack

```ad-note
- helm install [RELEASE_NAME] prometheus-community/kube-prometheus-stack
- 모든 values 는 default 로 생성됨
- https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/values.yaml
- 정상 설치 확인
- 최초 설치 시 docker image pull 로 인해 수 분의 시간이 소요될 수 있음
```
```sh
helm install prom-stack prometheus-community/kube-prometheus-stack
```

```sh
kubectl get pod -w
```

---

## 사용

### 포트포워딩

#### Grafana
```sh
kubectl port-forward svc/prom-stack-grafana 9000:80
```

#### Prometheus
```sh
kubectl port-forward svc/prom-stack-kube-prometheus-prometheus 9091:9090
```

### 접속

#### Prometheus
http://localhost:9091

##### PromQL
- running status 인 pod 출력
```
kube_pod_container_status_running
```

- container 별 memory 사용 현황 출력
```
container_memory_usage_bytes
```


#### Grafana
http://localhost:9000/

##### 기본 접속 정보
###### 아이디
- 입력
```sh
kubectl get secret --namespace default prom-stack-grafana -o jsonpath="{.data.admin-user}" | base64 --decode ; echo
```

- 출력
```sh
admin
```


###### 비번
- 입력
```sh
kubectl get secret --namespace default prom-stack-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo              
```

- 출력
```sh
prom-operator
```

