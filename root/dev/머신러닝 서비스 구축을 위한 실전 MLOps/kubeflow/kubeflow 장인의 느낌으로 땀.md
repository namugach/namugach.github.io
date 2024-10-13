---
tags:
  - kubeflow
  - minikube
  - kubernetes
create: 2024-09-27 01:14:50
---
## tip

### common 지우기
- 양식
```sh
kustomize build <경로> | kubectl delete -f -
```

- 예시
```sh
kustomize build common/oidc-client/oidc-authservice/base | kubectl delete -f -
```

---

## versions



- [minikube: 1.34](https://github.com/kubernetes/minikube/releases)
- [kubernetes: 1.26.15](https://github.com/kubernetes/kubernetes/tree/release-1.26)
- [Kubectl: 1.31.1](https://github.com/kubernetes/kubernetes/releases)
- [kustomize: 5.4.2](https://github.com/kubernetes-sigs/kustomize/releases)
- [kubeflow: 1.8.1](https://github.com/kubeflow/manifests/tree/v1.8.1)
---

## install

### minikube
```sh
minikube start --driver=docker \
  --cpus='4' --memory='8g' \
  --kubernetes-version=v1.26.15 \
  --extra-config=apiserver.service-account-signing-key-file=/var/lib/minikube/certs/sa.key \
  --extra-config=apiserver.service-account-issuer=kubernetes.default.svc
```

### Kubectl
```sh
curl -LO https://dl.k8s.io/release/v1.31.1/bin/linux/amd64/kubectl
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

### kustomize
```sh
wget https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2Fv5.4.2/kustomize_v5.4.2_linux_amd64.tar.gz

tar -xvf kustomize_v5.4.2_linux_amd64.tar.gz

sudo mv ./kustomize /usr/local/bin/kustomize
```

### kubeflow
```sh
mkdir -p ~/kubeflow
cd ~/kubeflow
git clone https://github.com/kubeflow/manifests.git
cd manifests
git checkout tags/v1.8.1
```


---

## 한 방

```sh

kustomize build common/cert-manager/cert-manager/base | kubectl apply -f -
kubectl wait --for=condition=ready pod -l 'app in (cert-manager,webhook)' --timeout=180s -n cert-manager
kustomize build common/cert-manager/kubeflow-issuer/base | kubectl apply -f 
kustomize build common/istio-1-17/istio-crds/base | kubectl apply -f -
kustomize build common/istio-1-17/istio-namespace/base | kubectl apply -f -
kustomize build common/istio-1-17/istio-install/base | kubectl apply -f 
kustomize build common/oidc-client/oidc-authservice/base | kubectl apply -f 
kustomize build common/dex/overlays/istio | kubectl apply -f 
kustomize build common/knative/knative-serving/overlays/gateways | kubectl apply -f -
kustomize build common/istio-1-17/cluster-local-gateway/base | kubectl apply -f 
kustomize build common/knative/knative-eventing/base | kubectl apply -f 
kustomize build common/kubeflow-roles/base | kubectl apply -f 

kustomize build apps/pipeline/upstream/env/cert-manager/platform-agnostic-multi-user | kubectl apply -f 

kustomize build contrib/kserve/kserve | kubectl apply -f 
kustomize build contrib/kserve/models-web-app/overlays/kubeflow | kubectl apply -f 

kustomize build apps/katib/upstream/installs/katib-with-kubeflow | kubectl apply -f 
kustomize build apps/centraldashboard/upstream/overlays/kserve | kubectl apply -f 

```


---


## kubeflow
### cert-manager
```sh
kustomize build common/cert-manager/cert-manager/base | kubectl apply -f -
kubectl wait --for=condition=ready pod -l 'app in (cert-manager,webhook)' --timeout=180s -n cert-manager
kustomize build common/cert-manager/kubeflow-issuer/base | kubectl apply -f -
```
### Istio
```sh
kustomize build common/istio-1-17/istio-crds/base | kubectl apply -f -
kustomize build common/istio-1-17/istio-namespace/base | kubectl apply -f -
kustomize build common/istio-1-17/istio-install/base | kubectl apply -f -
```

```sh
kustomize build common/oidc-client/oidc-authservice/base | kubectl apply -f -
```

### Dex
```sh
kustomize build common/dex/overlays/istio | kubectl apply -f -
```

### Knative
```sh
kustomize build common/knative/knative-serving/overlays/gateways | kubectl apply -f -
kustomize build common/istio-1-17/cluster-local-gateway/base | kubectl apply -f -
```

```sh
kustomize build common/knative/knative-eventing/base | kubectl apply -f -
```

### Kubeflow Namespace

```sh
kustomize build common/kubeflow-namespace/base | kubectl apply -f -
```

### Kubeflow Roles
```sh
kustomize build common/kubeflow-roles/base | kubectl apply -f -
```


### Kubeflow Pipelines
```sh
kustomize build apps/pipeline/upstream/env/cert-manager/platform-agnostic-multi-user | kubectl apply -f -
```


### KServe
```sh
kustomize build contrib/kserve/kserve | kubectl apply -f -
```
```sh
kustomize build contrib/kserve/models-web-app/overlays/kubeflow | kubectl apply -f -
```


### Katib
```sh
kustomize build apps/katib/upstream/installs/katib-with-kubeflow | kubectl apply -f -
```

### Central Dashboard
```ad-attention
title: 여기까지
순차 설치 하니까 
http://localhost:8080 에 들어가지네.
```
```sh
kustomize build apps/centraldashboard/upstream/overlays/kserve | kubectl apply -f -
```

#### 접속
- 포트 포워딩

```sh
kubectl port-forward svc/istio-ingressgateway -n istio-system 8080:80
```

- 브라우저
http://localhost:8080

- 로그인
- ID : user@example.com
- PW : 12341234


