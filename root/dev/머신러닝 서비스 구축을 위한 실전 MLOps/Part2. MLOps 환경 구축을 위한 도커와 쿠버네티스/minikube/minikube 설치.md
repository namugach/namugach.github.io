---
tags:
  - kubernetes
  - minikube
create: 2024-09-10 10:55:50
---

## Minikube

### 설치
```sh
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```
### 확인

```sh
minikube --help

minikube version
```



---

## Kubectl

### 다운로드
```sh
curl -LO https://dl.k8s.io/release/v1.22.1/bin/linux/amd64/kubectl
```

### 설치

```sh
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

### 확인
```sh
kubectl --help

kubectl version
```

---

## 시작

### 실행

```sh
minikube start --driver=docker
```


### 확인
#### 상태
- 입력
```sh
minikube status
```

- 출력
```sh
minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
```


#### default pod

- 입력
```sh
kubectl get pod -n kube-system
```

- 출력
```sh
NAME READY STATUS RESTARTS AGE
coredns-558bd4d5db-bwkjv 1/1 Running 0 3m40s
etcd-minikube 1/1 Running 0 3m46s
kube-apiserver-minikube 1/1 Running 0 3m46s
kube-controller-manager-minikube 1/1 Running 0 3m53s
kube-proxy-ppgbx 1/1 Running 0 3m40s
kube-scheduler-minikube 1/1 Running 0 3m46s
storage-provisioner 1/1 Running 1 3m51s
```


---

## 삭제

```sh
minikube delete
```




