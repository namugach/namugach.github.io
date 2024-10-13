---
tags:
  - mlflow
  - docker
  - minikube
  - kubernetes
create: 2024-09-24 17:37:08
---

## 한 방

```sh
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

curl -LO https://dl.k8s.io/release/v1.31.1/bin/linux/amd64/kubectl
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

wget https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2Fv5.4.2/kustomize_v5.4.2_linux_amd64.tar.gz

tar -xvf kustomize_v5.4.2_linux_amd64.tar.gz

sudo mv ./kustomize /usr/local/bin/kustomize

mkdir -p ~/kubeflow
cd ~/kubeflow
git clone https://github.com/kubeflow/manifests.git
cd manifests
git checkout tags/v1.8.1

minikube start --driver=docker \
  --cpus='4' --memory='8g' \
  --kubernetes-version=v1.26.15 \
  --extra-config=apiserver.service-account-signing-key-file=/var/lib/minikube/certs/sa.key \
  --extra-config=apiserver.service-account-issuer=kubernetes.default.svc

while ! kustomize build example | kubectl apply -f -; do echo "Retrying to apply resources"; sleep 10; done
```

---

## docker

### 설치
```sh
curl -sSL get.docker.com | sh
```

### 권한 설정

1. Docker 그룹을 확인해:
```sh
sudo groupadd docker
```

2. 현재 사용자를 Docker 그룹에 추가해:
```sh
sudo usermod -aG docker $USER
```

3. 시스템 재시작
```sh
sudo reboot
```

---
## Minikube

### 설치
- 최신
```sh
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

- 버전 지정
```sh
wget https://github.com/kubernetes/minikube/releases/download/v1.33.1/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```


---
## Kubectl

### 다운로드

```sh
curl -LO https://dl.k8s.io/release/v1.31.1/bin/linux/amd64/kubectl
```


### 설치

```sh
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

---


```ad-note
title: 되는 것
https://github.com/kubernetes-sigs/kustomize/releases/tag/kustomize%2Fv5.0.3
https://github.com/kubernetes/kubernetes/tree/release-1.26
https://github.com/kubeflow/manifests/tree/v1.8.1
```

## kustomize

- 됨
```sh
wget https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2Fv5.4.3/kustomize_v5.4.3_linux_amd64.tar.gz

tar -xvf kustomize_v5.4.3_linux_amd64.tar.gz

sudo mv ./kustomize /usr/local/bin/kustomize
```

- 됨
```sh
wget https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2Fv5.4.2/kustomize_v5.4.2_linux_amd64.tar.gz

tar -xvf kustomize_v5.4.2_linux_amd64.tar.gz

sudo mv ./kustomize /usr/local/bin/kustomize
```


- 안됨
```sh
wget https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2Fv5.0.4/kustomize_v5.0.4_linux_amd64.tar.gz

tar -xvf kustomize_v5.0.4_linux_amd64.tar.gz

sudo mv ./kustomize /usr/local/bin/kustomize
```

---

## kubeflow

```sh
mkdir -p ~/kubeflow
cd ~/kubeflow
git clone https://github.com/kubeflow/manifests.git
cd manifests
git checkout tags/v1.8.1
```


### minikube 실행

```sh
minikube start --driver=docker \
  --cpus='4' --memory='8g' \
  --kubernetes-version=v1.26.15 \
  --extra-config=apiserver.service-account-signing-key-file=/var/lib/minikube/certs/sa.key \
  --extra-config=apiserver.service-account-issuer=kubernetes.default.svc
```



### kubeflow 설치

```sh
while ! kustomize build example | kubectl apply -f -; do echo "Retrying to apply resources"; sleep 10; done
```

### 확인

```sh
kubectl get po -A -w
```


---


## 접속

### 포트 포워딩

```sh
kubectl port-forward svc/istio-ingressgateway -n istio-system 8080:80
```

### 브라우저
http://localhost:8080

### 로그인
- ID : user@example.com
- PW : 12341234
