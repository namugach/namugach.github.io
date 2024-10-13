---
tags:
  - mlops
  - kebeflow
create: 2024-09-23 22:42:56
---

```ad-note
title: 되는 것
https://github.com/kubernetes-sigs/kustomize/releases/tag/kustomize%2Fv5.0.3
https://github.com/kubernetes/kubernetes/tree/release-1.26
https://github.com/kubeflow/manifests/tree/v1.8.1
```

```ad-note
- kustomize: v5.0.3
- kubernetes: v1.26
- kubeflow: v1.8.1
```

```sh
wget https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2Fv5.0.3/kustomize_v5.0.3_linux_amd64.tar.gz

tar -xvf kustomize_v5.0.3_linux_amd64.tar.gz
sudo mv ./kustomize /usr/local/bin/kustomize
```

```sh
mkdir -p ~/yeardream/kubeflow
cd ~/yeardream/kubeflow
git clone https://github.com/kubeflow/manifests.git
cd manifests
git checkout tags/v1.8.1
```

```sh
minikube start --driver=docker \
  --cpus='4' --memory='8g' \
  --kubernetes-version=v1.26.15 \
  --extra-config=apiserver.service-account-signing-key-file=/var/lib/minikube/certs/sa.key \
  --extra-config=apiserver.service-account-issuer=kubernetes.default.svc
```





```sh
while ! kustomize build example | kubectl apply -f -; do echo "Retrying to apply resources"; sleep 10; done
```


```sh
kubectl get po -A
```




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


---


## kustomize 설정

### 다운로드
```sh
wget https://github.com/kubernetes-sigs/kustomize/releases/download/v3.2.0/kustomize_ 3.2.0_linux_amd64
```

### 권한
```sh
chmod +x kustomize_3.2.0_linux_amd64
```


### 이동
```sh
sudo mv kustomize_3.2.0_linux_amd64 /usr/local/bin/kustomize
```

### 버전 확인
```sh
kustomize version
```

---

## minikube

### 설명

```ad-note
- minikube start
- docker driver option
- cpu 4 개 할당
- memory 8g 할당
- kubernetes version v1.21.14 설정
- --extra-config 부분은 tokenRequest 활성화 관련 설정

```

### 시작

```sh
minikube start --driver=docker \
  --cpus='4' --memory='8g' \
  --kubernetes-version=v1.26.15 \
  --extra-config=apiserver.service-account-signing-key-file=/var/lib/minikube/certs/sa.key \
  --extra-config=apiserver.service-account-issuer=kubernetes.default.svc
```

#### 강제 하위 버전
```sh
minikube start --driver=docker \
  --cpus='4' --memory='8g' \
  --kubernetes-version=v1.19.3 --force \
  --extra-config=apiserver.service-account-signing-key-file=/var/lib/minikube/certs/sa.key \
  --extra-config=apiserver.service-account-issuer=kubernetes.default.svc
```


### 확인

- 입력
```sh
kubectl get sc
```

- 출력
```sh
NAME                 PROVISIONER                RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
standard (default)   k8s.io/minikube-hostpath   Delete          Immediate           false                  38s
```
---

## Git clone kubeflow/manifests

### 작업 디렉토리 생성 및 이동
```sh
mkdir -p ~/yeardream/kubeflow
cd ~/yeardream/kubeflow
```

### git clone
```sh
git clone git@github.com:kubeflow/manifests.git
```

### 이동
```sh
cd manifests
```

### 버전 변경
```sh
git checkout tags/v1.4.0
```

---

## 구성 요소

https://github.com/kubeflow/manifests/tree/v1.4.0

### 동작 확인
````ad-info
title: 을
이렇게
```sh
kustomize build common/cert-manager/cert-manager/base > a.text
```
리다이렉션으로 빼서 파일로 만든 다음에 라인을 확인해 보면
```ad-danger
title: 무려
26884
```
라인을 확인 할 수 있음
````
```sh
kustomize build common/cert-manager/cert-manager/base
```

### 한 방팩
- 입력
```sh
sudo apt install kubectx

kustomize build common/cert-manager/cert-manager/base | kubectl apply -f -
kustomize build common/cert-manager/kubeflow-issuer/base | kubectl apply -f -

kustomize build common/istio-1-9/istio-crds/base | kubectl apply -f -
kustomize build common/istio-1-9/istio-namespace/base | kubectl apply -f -
kustomize build common/istio-1-9/istio-install/base | kubectl apply -f -

kustomize build common/dex/overlays/istio | kubectl apply -f -

kustomize build common/kubeflow-roles/base | kubectl apply -f -

kustomize build common/istio-1-9/kubeflow-istio-resources/base | kubectl apply -f -


kustomize build apps/pipeline/upstream/env/platform-agnostic-multi-user | kubectl apply -f -
kustomize build apps/pipeline/upstream/env/platform-agnostic-multi-user | kubectl apply -f -

kustomize build apps/katib/upstream/installs/katib-with-kubeflow | kubectl apply -f -

kustomize build apps/centraldashboard/upstream/overlays/istio | kubectl apply -f -

kustomize build apps/admission-webhook/upstream/overlays/cert-manager | kubectl apply -f -

kustomize build apps/jupyter/notebook-controller/upstream/overlays/kubeflow | kubectl apply -f -

kustomize build apps/jupyter/jupyter-web-app/upstream/overlays/istio | kubectl apply -f -

kustomize build apps/profiles/upstream/overlays/kubeflow | kubectl apply -f -
kustomize build apps/volumes-web-app/upstream/overlays/istio | kubectl apply -f -

kustomize build apps/tensorboard/tensorboards-web-app/upstream/overlays/istio | kubectl apply -f -
kustomize build apps/jupyter/notebook-controller/upstream/overlays/kubeflow | kubectl apply -f -

kustomize build common/user-namespace/base | kubectl apply -f -
```

- 입력
```sh
kubectl get po -A -w
```

### cert-manager

`````ad-important
title: 작업 하기 전에
```sh
sudo apt install kubectx
```
이거 설치 해야 진행이 매끄러움
`````
- https://github.com/ahmetb/kubectx


#### cert-manager
##### 설치
- 입력
```sh
kustomize build common/cert-manager/cert-manager/base | kubectl apply -f -
```
- 출력
```sh
namespace/cert-manager created
customresourcedefinition.apiextensions.k8s.io/certificaterequests.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/certificates.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/challenges.acme.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/clusterissuers.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/issuers.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/orders.acme.cert-manager.io created
mutatingwebhookconfiguration.admissionregistration.k8s.io/cert-manager-webhook created
serviceaccount/cert-manager created
serviceaccount/cert-manager-cainjector created
serviceaccount/cert-manager-webhook created
role.rbac.authorization.k8s.io/cert-manager-webhook:dynamic-serving created
role.rbac.authorization.k8s.io/cert-manager-cainjector:leaderelection created
role.rbac.authorization.k8s.io/cert-manager:leaderelection created
clusterrole.rbac.authorization.k8s.io/cert-manager-cainjector created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-approve:cert-manager-io created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-certificates created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-challenges created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-clusterissuers created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-ingress-shim created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-issuers created
clusterrole.rbac.authorization.k8s.io/cert-manager-controller-orders created
clusterrole.rbac.authorization.k8s.io/cert-manager-edit created
clusterrole.rbac.authorization.k8s.io/cert-manager-view created
clusterrole.rbac.authorization.k8s.io/cert-manager-webhook:subjectaccessreviews created
rolebinding.rbac.authorization.k8s.io/cert-manager-webhook:dynamic-serving created
rolebinding.rbac.authorization.k8s.io/cert-manager-cainjector:leaderelection created
rolebinding.rbac.authorization.k8s.io/cert-manager:leaderelection created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-cainjector created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-approve:cert-manager-io created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-certificates created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-challenges created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-clusterissuers created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-ingress-shim created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-issuers created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-orders created
clusterrolebinding.rbac.authorization.k8s.io/cert-manager-webhook:subjectaccessreviews created
service/cert-manager created
service/cert-manager-webhook created
deployment.apps/cert-manager created
deployment.apps/cert-manager-cainjector created
deployment.apps/cert-manager-webhook created
validatingwebhookconfiguration.admissionregistration.k8s.io/cert-manager-webhook created
```

##### 네임스페이스 변경
- 입력
```sh
kubens cert-manager
```

- 출력
```sh
✔ Active namespace is "cert-manager"
```

##### 확인
- 입력
```sh
kubectl get po
```

혹은

```sh
kubectl get po -w
```

- 출력
```sh
NAME                                       READY   STATUS              RESTARTS   AGE
cert-manager-7dd5854bb4-xtrft              1/1     Running             0          13s
cert-manager-cainjector-64c949654c-hrsp7   0/1     ContainerCreating   0          13s
cert-manager-webhook-6bdffc7c9d-lhcwf      0/1     ContainerCreating   0          13s
```

#### kubeflow-issuer
- 입력
```sh
kustomize build common/cert-manager/kubeflow-issuer/base | kubectl apply -f -
```

- 출력
```sh
clusterissuer.cert-manager.io/kubeflow-self-signing-issuer created
```


### Istio

#### 설치
- 입력
```sh
kustomize build common/istio-1-9/istio-crds/base | kubectl apply -f -
kustomize build common/istio-1-9/istio-namespace/base | kubectl apply -f -
kustomize build common/istio-1-9/istio-install/base | kubectl apply -f -
```

- 출력
```sh
kustomize build common/istio-1-9/istio-crds/base | kubectl apply -f -
kustomize build common/istio-1-9/istio-namespace/base | kubectl apply -f -
kustomize build common/istio-1-9/istio-install/base | kubectl apply -f -
Warning: apiextensions.k8s.io/v1beta1 CustomResourceDefinition is deprecated in v1.16+, unavailable in v1.22+; use apiextensions.k8s.io/v1 CustomResourceDefinition
customresourcedefinition.apiextensions.k8s.io/authorizationpolicies.security.istio.io created
customresourcedefinition.apiextensions.k8s.io/destinationrules.networking.istio.io created
customresourcedefinition.apiextensions.k8s.io/envoyfilters.networking.istio.io created
customresourcedefinition.apiextensions.k8s.io/gateways.networking.istio.io created
customresourcedefinition.apiextensions.k8s.io/istiooperators.install.istio.io created
customresourcedefinition.apiextensions.k8s.io/peerauthentications.security.istio.io created
customresourcedefinition.apiextensions.k8s.io/requestauthentications.security.istio.io created
customresourcedefinition.apiextensions.k8s.io/serviceentries.networking.istio.io created
customresourcedefinition.apiextensions.k8s.io/sidecars.networking.istio.io created
customresourcedefinition.apiextensions.k8s.io/virtualservices.networking.istio.io created
customresourcedefinition.apiextensions.k8s.io/workloadentries.networking.istio.io created
customresourcedefinition.apiextensions.k8s.io/workloadgroups.networking.istio.io created
namespace/istio-system created
Warning: admissionregistration.k8s.io/v1beta1 MutatingWebhookConfiguration is deprecated in v1.16+, unavailable in v1.22+; use admissionregistration.k8s.io/v1 MutatingWebhookConfiguration
mutatingwebhookconfiguration.admissionregistration.k8s.io/istio-sidecar-injector created
serviceaccount/istio-ingressgateway-service-account created
serviceaccount/istio-reader-service-account created
serviceaccount/istiod-service-account created
role.rbac.authorization.k8s.io/istio-ingressgateway-sds created
role.rbac.authorization.k8s.io/istiod-istio-system created
clusterrole.rbac.authorization.k8s.io/istio-reader-istio-system created
clusterrole.rbac.authorization.k8s.io/istiod-istio-system created
rolebinding.rbac.authorization.k8s.io/istio-ingressgateway-sds created
rolebinding.rbac.authorization.k8s.io/istiod-istio-system created
clusterrolebinding.rbac.authorization.k8s.io/istio-reader-istio-system created
clusterrolebinding.rbac.authorization.k8s.io/istiod-istio-system created
configmap/istio created
configmap/istio-sidecar-injector created
service/istio-ingressgateway created
service/istiod created
deployment.apps/istio-ingressgateway created
deployment.apps/istiod created
envoyfilter.networking.istio.io/metadata-exchange-1.8 created
envoyfilter.networking.istio.io/metadata-exchange-1.9 created
envoyfilter.networking.istio.io/stats-filter-1.8 created
envoyfilter.networking.istio.io/stats-filter-1.9 created
envoyfilter.networking.istio.io/tcp-metadata-exchange-1.8 created
envoyfilter.networking.istio.io/tcp-metadata-exchange-1.9 created
envoyfilter.networking.istio.io/tcp-stats-filter-1.8 created
envoyfilter.networking.istio.io/tcp-stats-filter-1.9 created
envoyfilter.networking.istio.io/x-forwarded-host created
gateway.networking.istio.io/istio-ingressgateway created
authorizationpolicy.security.istio.io/global-deny-all created
authorizationpolicy.security.istio.io/istio-ingressgateway created
Warning: admissionregistration.k8s.io/v1beta1 ValidatingWebhookConfiguration is deprecated in v1.16+, unavailable in v1.22+; use admissionregistration.k8s.io/v1 ValidatingWebhookConfiguration
validatingwebhookconfiguration.admissionregistration.k8s.io/istiod-istio-system created
```

#### 확인

##### 목록
- 입력
```sh
kubens
```

- 출력
```sh
cert-manager
default
istio-system
kube-node-lease
kube-public
kube-system
```

##### 네임스페이스 변경

- 입력
```sh
kubens istio-system
```

- 출력
```sh
✔ Active namespace is "istio-system"
```

##### pod list

- 입력
```sh
kubectl get po
```

- 출력
```sh
NAME                                    READY   STATUS    RESTARTS   AGE
istio-ingressgateway-78bc678876-wm4lg   1/1     Running   0          4m46s
istiod-755f4cc457-tz9z5                 1/1     Running   0          4m46s
```


### Dex
```sh
kustomize build common/dex/overlays/istio | kubectl apply -f -
```


### OIDC AuthService
```sh
kustomize build common/oidc-authservice/base | kubectl apply -f -
```

```ad-note
title: Dex와 OIDC는
인증과 유저 관리를 담당
```

### Kubeflow Namespace

#### 생성

```sh
kustomize build common/kubeflow-namespace/base | kubectl apply -f -
```

#### 확인
- 입력
```sh
kubectl get ns
```

- 출력
```sh
NAME              STATUS   AGE
auth              Active   3m44s
cert-manager      Active   27m
default           Active   28m
istio-system      Active   11m
kube-node-lease   Active   28m
kube-public       Active   28m
kube-system       Active   28m
kubeflow          Active   3s # 확인
```


### Kubeflow Roles

- 입력
```sh
kustomize build common/kubeflow-roles/base | kubectl apply -f -
```

- 출력
```sh
kustomize build common/kubeflow-roles/base | kubectl apply -f -
clusterrole.rbac.authorization.k8s.io/kubeflow-admin created
clusterrole.rbac.authorization.k8s.io/kubeflow-edit created
clusterrole.rbac.authorization.k8s.io/kubeflow-kubernetes-admin created
clusterrole.rbac.authorization.k8s.io/kubeflow-kubernetes-edit created
clusterrole.rbac.authorization.k8s.io/kubeflow-kubernetes-view created
clusterrole.rbac.authorization.k8s.io/kubeflow-view created
```

### Kubeflow Istio Resources
- 입력
```sh
kustomize build common/istio-1-9/kubeflow-istio-resources/base | kubectl apply -f -
```

- 출력
```sh
kustomize build common/istio-1-9/kubeflow-istio-resources/base | kubectl apply -f -
clusterrole.rbac.authorization.k8s.io/kubeflow-istio-admin created
clusterrole.rbac.authorization.k8s.io/kubeflow-istio-edit created
clusterrole.rbac.authorization.k8s.io/kubeflow-istio-view created
gateway.networking.istio.io/kubeflow-gateway created
```


### Kubeflow Pipelines

```ad-attention
title: 이거 설치 하고
마지막에 한 번 더 설치해야 함.
```
- 입력
```sh
kustomize build apps/pipeline/upstream/env/platform-agnostic-multi-user | kubectl apply -f -
```


- 출력
```sh
# 생략
persistentvolumeclaim/minio-pvc created
persistentvolumeclaim/mysql-pv-claim created
error: unable to recognize "STDIN": no matches for kind "CompositeController" in version "metacontroller.k8s.io/v1alpha1"
```

`````ad-error
title: 이런
```ad-error
error: unable to recognize "STDIN": no matches for kind "CompositeController" in version "metacontroller.k8s.io/v1alpha1"
```
가 나오는데,
많은 것들을 설치 할 때 의존하는 것들이 있는데
순서가 잘 못되서 나온 것이기 때문에 한번 더
- 입력
```sh
kustomize build apps/pipeline/upstream/env/platform-agnostic-multi-user | kubectl apply -f -
```

- 출력
```sh
# 생략
uthorizationpolicy.security.istio.io/minio-service unchanged
authorizationpolicy.security.istio.io/ml-pipeline unchanged
authorizationpolicy.security.istio.io/ml-pipeline-ui unchanged
authorizationpolicy.security.istio.io/ml-pipeline-visualizationserver unchanged
authorizationpolicy.security.istio.io/mysql unchanged
authorizationpolicy.security.istio.io/service-cache-server unchanged
persistentvolumeclaim/minio-pvc unchanged
persistentvolumeclaim/mysql-pv-claim unchanged
```
문제없이 잘 설치 됐다고 나온다.
`````


### Katib

- 입력
```sh
kustomize build apps/katib/upstream/installs/katib-with-kubeflow | kubectl apply -f -
```

- 출력
```sh
kustomize build apps/katib/upstream/installs/katib-with-kubeflow | kubectl apply -f -
customresourcedefinition.apiextensions.k8s.io/experiments.kubeflow.org created
customresourcedefinition.apiextensions.k8s.io/suggestions.kubeflow.org created
customresourcedefinition.apiextensions.k8s.io/trials.kubeflow.org created
mutatingwebhookconfiguration.admissionregistration.k8s.io/katib.kubeflow.org created
serviceaccount/katib-controller created
serviceaccount/katib-ui created
clusterrole.rbac.authorization.k8s.io/katib-controller created
clusterrole.rbac.authorization.k8s.io/katib-ui created
clusterrole.rbac.authorization.k8s.io/kubeflow-katib-admin created
clusterrole.rbac.authorization.k8s.io/kubeflow-katib-edit created
clusterrole.rbac.authorization.k8s.io/kubeflow-katib-view created
clusterrolebinding.rbac.authorization.k8s.io/katib-controller created
clusterrolebinding.rbac.authorization.k8s.io/katib-ui created
configmap/katib-config created
configmap/trial-templates created
secret/katib-mysql-secrets created
service/katib-controller created
service/katib-db-manager created
service/katib-mysql created
service/katib-ui created
deployment.apps/katib-controller created
deployment.apps/katib-db-manager created
deployment.apps/katib-mysql created
deployment.apps/katib-ui created
certificate.cert-manager.io/katib-webhook-cert created
issuer.cert-manager.io/katib-selfsigned-issuer created
virtualservice.networking.istio.io/katib-ui created
persistentvolumeclaim/katib-mysql created
validatingwebhookconfiguration.admissionregistration.k8s.io/katib.kubeflow.org created
```


### Central Dashboard
- 입력
```sh
kustomize build apps/centraldashboard/upstream/overlays/istio | kubectl apply -f -
```

- 출력
```sh
kustomize build apps/centraldashboard/upstream/overlays/istio | kubectl apply -f -
serviceaccount/centraldashboard created
role.rbac.authorization.k8s.io/centraldashboard created
clusterrole.rbac.authorization.k8s.io/centraldashboard created
rolebinding.rbac.authorization.k8s.io/centraldashboard created
clusterrolebinding.rbac.authorization.k8s.io/centraldashboard created
configmap/centraldashboard-config created
configmap/centraldashboard-parameters created
service/centraldashboard created
deployment.apps/centraldashboard created
virtualservice.networking.istio.io/centraldashboard created
```


### Admission Webhook
- 입력
```sh
kustomize build apps/admission-webhook/upstream/overlays/cert-manager | kubectl apply -f -
```

- 출력
```sh
kustomize build apps/admission-webhook/upstream/overlays/cert-manager | kubectl apply -f -
Warning: apiextensions.k8s.io/v1beta1 CustomResourceDefinition is deprecated in v1.16+, unavailable in v1.22+; use apiextensions.k8s.io/v1 CustomResourceDefinition
customresourcedefinition.apiextensions.k8s.io/poddefaults.kubeflow.org created
Warning: admissionregistration.k8s.io/v1beta1 MutatingWebhookConfiguration is deprecated in v1.16+, unavailable in v1.22+; use admissionregistration.k8s.io/v1 MutatingWebhookConfiguration
mutatingwebhookconfiguration.admissionregistration.k8s.io/admission-webhook-mutating-webhook-configuration created
serviceaccount/admission-webhook-service-account created
clusterrole.rbac.authorization.k8s.io/admission-webhook-cluster-role created
clusterrole.rbac.authorization.k8s.io/admission-webhook-kubeflow-poddefaults-admin created
clusterrole.rbac.authorization.k8s.io/admission-webhook-kubeflow-poddefaults-edit created
clusterrole.rbac.authorization.k8s.io/admission-webhook-kubeflow-poddefaults-view created
clusterrolebinding.rbac.authorization.k8s.io/admission-webhook-cluster-role-binding created
service/admission-webhook-service created
deployment.apps/admission-webhook-deployment created
certificate.cert-manager.io/admission-webhook-cert created
issuer.cert-manager.io/admission-webhook-selfsigned-issuer created
```

### Notebooks
##### Controller
- 입력
```sh
kustomize build apps/jupyter/notebook-controller/upstream/overlays/kubeflow | kubectl apply -f -
```

- 출력
```sh
Warning: apiextensions.k8s.io/v1beta1 CustomResourceDefinition is deprecated in v1.16+, unavailable in v1.22+; use apiextensions.k8s.io/v1 CustomResourceDefinition
customresourcedefinition.apiextensions.k8s.io/notebooks.kubeflow.org created
serviceaccount/notebook-controller-service-account created
role.rbac.authorization.k8s.io/notebook-controller-leader-election-role created
clusterrole.rbac.authorization.k8s.io/notebook-controller-kubeflow-notebooks-admin created
clusterrole.rbac.authorization.k8s.io/notebook-controller-kubeflow-notebooks-edit created
clusterrole.rbac.authorization.k8s.io/notebook-controller-kubeflow-notebooks-view created
clusterrole.rbac.authorization.k8s.io/notebook-controller-role created
rolebinding.rbac.authorization.k8s.io/notebook-controller-leader-election-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/notebook-controller-role-binding created
configmap/notebook-controller-config-kkt88f2bhb created
service/notebook-controller-service created
deployment.apps/notebook-controller-deployment created
```


##### Jupyter Web App
```sh
kustomize build apps/jupyter/jupyter-web-app/upstream/overlays/istio | kubectl apply -f -
```

```sh
serviceaccount/jupyter-web-app-service-account created
Warning: rbac.authorization.k8s.io/v1beta1 Role is deprecated in v1.17+, unavailable in v1.22+; use rbac.authorization.k8s.io/v1 Role
role.rbac.authorization.k8s.io/jupyter-web-app-jupyter-notebook-role created
clusterrole.rbac.authorization.k8s.io/jupyter-web-app-cluster-role created
clusterrole.rbac.authorization.k8s.io/jupyter-web-app-kubeflow-notebook-ui-admin created
clusterrole.rbac.authorization.k8s.io/jupyter-web-app-kubeflow-notebook-ui-edit created
clusterrole.rbac.authorization.k8s.io/jupyter-web-app-kubeflow-notebook-ui-view created
Warning: rbac.authorization.k8s.io/v1beta1 RoleBinding is deprecated in v1.17+, unavailable in v1.22+; use rbac.authorization.k8s.io/v1 RoleBinding
rolebinding.rbac.authorization.k8s.io/jupyter-web-app-jupyter-notebook-role-binding created
clusterrolebinding.rbac.authorization.k8s.io/jupyter-web-app-cluster-role-binding created
configmap/jupyter-web-app-config-c6mgtkmgh4 created
configmap/jupyter-web-app-logos created
configmap/jupyter-web-app-parameters-h7dbhff8cb created
service/jupyter-web-app-service created
deployment.apps/jupyter-web-app-deployment created
virtualservice.networking.istio.io/jupyter-web-app-jupyter-web-app created
```


### Profiles + KFAM
#### profiles
- 입력
```sh
kustomize build apps/profiles/upstream/overlays/kubeflow | kubectl apply -f -
```

- 출력
```sh
customresourcedefinition.apiextensions.k8s.io/profiles.kubeflow.org created
serviceaccount/profiles-controller-service-account created
role.rbac.authorization.k8s.io/profiles-leader-election-role created
rolebinding.rbac.authorization.k8s.io/profiles-leader-election-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/profiles-cluster-role-binding created
configmap/namespace-labels-data-m76mmk6ckt created
configmap/profiles-config-2g29dd2mbd created
service/profiles-kfam created
deployment.apps/profiles-deployment created
virtualservice.networking.istio.io/profiles-kfam created
```


#### Volumes Web App
- 입력
```sh
kustomize build apps/volumes-web-app/upstream/overlays/istio | kubectl apply -f -
```

- 출력
```sh
serviceaccount/volumes-web-app-service-account created
clusterrole.rbac.authorization.k8s.io/volumes-web-app-cluster-role created
clusterrole.rbac.authorization.k8s.io/volumes-web-app-kubeflow-volume-ui-admin created
clusterrole.rbac.authorization.k8s.io/volumes-web-app-kubeflow-volume-ui-edit created
clusterrole.rbac.authorization.k8s.io/volumes-web-app-kubeflow-volume-ui-view created
clusterrolebinding.rbac.authorization.k8s.io/volumes-web-app-cluster-role-binding created
configmap/volumes-web-app-parameters-d9b9bmk7ch created
service/volumes-web-app-service created
deployment.apps/volumes-web-app-deployment created
virtualservice.networking.istio.io/volumes-web-app-volumes-web-app created
```
#### Tensorboard

##### Web App
- 입력
```sh
kustomize build apps/tensorboard/tensorboards-web-app/upstream/overlays/istio | kubectl apply -f -
```

- 출력
```sh
serviceaccount/tensorboards-web-app-service-account created
clusterrole.rbac.authorization.k8s.io/tensorboards-web-app-cluster-role created
clusterrole.rbac.authorization.k8s.io/tensorboards-web-app-kubeflow-tensorboard-ui-admin created
clusterrole.rbac.authorization.k8s.io/tensorboards-web-app-kubeflow-tensorboard-ui-edit created
clusterrole.rbac.authorization.k8s.io/tensorboards-web-app-kubeflow-tensorboard-ui-view created
clusterrolebinding.rbac.authorization.k8s.io/tensorboards-web-app-cluster-role-binding created
configmap/tensorboards-web-app-parameters-bdb48k45kd created
service/tensorboards-web-app-service created
deployment.apps/tensorboards-web-app-deployment created
virtualservice.networking.istio.io/tensorboards-web-app-tensorboards-web-app created
```

##### Controller
- 입력
```sh
kustomize build apps/tensorboard/tensorboard-controller/upstream/overlays/kubeflow | kubectl apply -f -
```

- 출력
```sh
Warning: apiextensions.k8s.io/v1beta1 CustomResourceDefinition is deprecated in v1.16+, unavailable in v1.22+; use apiextensions.k8s.io/v1 CustomResourceDefinition
customresourcedefinition.apiextensions.k8s.io/tensorboards.tensorboard.kubeflow.org created
serviceaccount/tensorboard-controller created
role.rbac.authorization.k8s.io/tensorboard-controller-leader-election-role created
clusterrole.rbac.authorization.k8s.io/tensorboard-controller-manager-role created
clusterrole.rbac.authorization.k8s.io/tensorboard-controller-proxy-role created
rolebinding.rbac.authorization.k8s.io/tensorboard-controller-leader-election-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/tensorboard-controller-manager-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/tensorboard-controller-proxy-rolebinding created
configmap/tensorboard-controller-config-mcd64bhg84 created
service/tensorboard-controller-controller-manager-metrics-service created
deployment.apps/tensorboard-controller-controller-manager created
```


#### User Namespace
- 입력
```sh
kustomize build common/user-namespace/base | kubectl apply -f -
```

- 출력
```sh
configmap/default-install-config-5cbhhbttg4 created
profile.kubeflow.org/kubeflow-user-example-com created
```


### 전체 확인

- 입력
```sh
kubectl get po -A
```

- 출력
```sh
NAMESPACE                   NAME                                                        READY   STATUS             RESTARTS   AGE
auth                        dex-5ddf47d88d-57flt                                        1/1     Running            1          24m
cert-manager                cert-manager-7dd5854bb4-xtrft                               1/1     Running            0          48m
cert-manager                cert-manager-cainjector-64c949654c-hrsp7                    1/1     Running            0          48m
cert-manager                cert-manager-webhook-6bdffc7c9d-lhcwf                       1/1     Running            0          48m
istio-system                authservice-0                                               0/1     ImagePullBackOff   0          24m
istio-system                istio-ingressgateway-78bc678876-wm4lg                       1/1     Running            0          32m
istio-system                istiod-755f4cc457-tz9z5                                     1/1     Running            0          32m
kube-system                 coredns-74ff55c5b-9nkkd                                     1/1     Running            0          49m
kube-system                 etcd-minikube                                               1/1     Running            0          49m
kube-system                 kube-apiserver-minikube                                     1/1     Running            0          49m
kube-system                 kube-controller-manager-minikube                            1/1     Running            0          49m
kube-system                 kube-proxy-9htcd                                            1/1     Running            0          49m
kube-system                 kube-scheduler-minikube                                     1/1     Running            0          49m
kube-system                 storage-provisioner                                         1/1     Running            1          49m
kubeflow-user-example-com   ml-pipeline-ui-artifact-5dd95d555b-gwjx8                    2/2     Running            0          46s
kubeflow-user-example-com   ml-pipeline-visualizationserver-6b44c6759f-n5f2s            2/2     Running            0          46s
kubeflow                    admission-webhook-deployment-667bd68d94-ps8rd               1/1     Running            0          9m55s
kubeflow                    cache-deployer-deployment-79fdf9c5c9-wk78x                  2/2     Running            1          16m
kubeflow                    cache-server-5bdf4f4457-fl7wx                               2/2     Running            0          16m
kubeflow                    centraldashboard-7d496c59bb-trdpl                           1/1     Running            0          10m
kubeflow                    jupyter-web-app-deployment-6f744fbc54-x4nxb                 1/1     Running            0          8m5s
kubeflow                    katib-controller-68c47fbf8b-lrjb6                           1/1     Running            0          11m
kubeflow                    katib-db-manager-6c76bdc855-nkf5g                           1/1     Running            0          11m
kubeflow                    katib-mysql-6dcb447c6f-cmv59                                1/1     Running            0          11m
kubeflow                    katib-ui-64bb96d5bf-vthbb                                   1/1     Running            0          11m
kubeflow                    kubeflow-pipelines-profile-controller-7b947f4748-pd7bd      1/1     Running            0          16m
kubeflow                    metacontroller-0                                            1/1     Running            0          16m
kubeflow                    metadata-envoy-deployment-5b4856dd5-594gg                   1/1     Running            0          16m
kubeflow                    metadata-grpc-deployment-748f868f64-55gsb                   2/2     Running            4          16m
kubeflow                    metadata-writer-548bd879bb-qb5gn                            2/2     Running            1          16m
kubeflow                    minio-5b65df66c9-2brcs                                      2/2     Running            0          16m
kubeflow                    ml-pipeline-5784f9d9cc-zm265                                2/2     Running            3          16m
kubeflow                    ml-pipeline-persistenceagent-d6bdc77bd-s7kwh                2/2     Running            1          16m
kubeflow                    ml-pipeline-scheduledworkflow-5db54d75c5-rblm6              2/2     Running            0          16m
kubeflow                    ml-pipeline-ui-5447cb9556-tmc4j                             2/2     Running            0          16m
kubeflow                    ml-pipeline-viewer-crd-68fb5f4d58-z85lm                     2/2     Running            1          16m
kubeflow                    ml-pipeline-visualizationserver-cf88b98f7-ghxs9             2/2     Running            0          16m
kubeflow                    mysql-f7b9b7dd4-9xsn7                                       2/2     Running            0          16m
kubeflow                    notebook-controller-deployment-578fd4dc97-2jd8k             1/1     Running            0          9m1s
kubeflow                    profiles-deployment-7cc7956dfd-xtw8w                        2/2     Running            0          6m28s
kubeflow                    tensorboard-controller-controller-manager-954b7c544-28gtx   3/3     Running            1          104s
kubeflow                    tensorboards-web-app-deployment-6ff79b7f44-nfgx5            1/1     Running            0          2m59s
kubeflow                    volumes-web-app-deployment-8589d664cc-dbjw9                 1/1     Running            0          4m48s
kubeflow                    workflow-controller-76dd87cd85-l2898                        2/2     Running            1          16m
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