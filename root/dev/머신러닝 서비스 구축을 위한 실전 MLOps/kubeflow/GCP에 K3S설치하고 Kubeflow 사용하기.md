---
tags:
  - gcp
  - k3s
  - kubeflow
  - kubernetes
  - setup
create: 2024-10-03 02:55:17
---

## 작업하기 전

```ad-danger
title: 여기 나와 있는 스팩 
그대로 해야함.
그리고 kubeflow는 최소 사양이
- cpu: 16 core
- ram: 32 gb

이기 때문에. 이 점도 매우 유의 해야함
이거 안맞춰 주면 pod가 뜨지 않아서 no namespace를 맛 볼 수 있을 거임
```

---

## gcp

### 사양

#### 태그 및 라벨 관리
![[Pasted image 20241003030348.png]]
1. 입력: 이름
2. 선택: 서울
3. 선택: 모두

#### 머신 구성
![[Pasted image 20241003030450.png]]
1. 선택: E2
2. 클릭: 커스텀
3. 조절: 16
4. 조절: 32


#### 컨피덴셜 VM 서비스

##### 부팅 디스크

![[Pasted image 20241003030756.png]]
1. 클릭: 변경


![[Pasted image 20241003030834.png]]
1. 선택: Ubuntu
2. 선택: Ubuntu 24.04 LTS
	- x86/64, amd64 noble image built on 2024-10-01
3. 입력: 100
4. 클릭: 선택

#### 방화벽
![[Pasted image 20241003031014.png]]
1. 체크: 
	- HTTP 트래픽 허용
	- HTTPS 트래픽 허용


#### 고급 옵션
##### 네트워크 인터페이스
```ad-info
title: 고정 아이피
작업
```


![[Pasted image 20241003032217.png]]
1. 클릭: 펼치기
2. 클릭: default


![[Pasted image 20241003032227.png]]

3. 클릭: 기본 내부 IPv4 주소
4. 선택: 고정 내부 IPV4 주소 예약
5. 입력: 이름
6. 클릭: 예약

![[Pasted image 20241003032236.png]]
7. 클릭: 외부 IPv4 주소
8. 선택: 고정 외부 IP 주소 예약
9. 입력: 이름
10. 클릭: 예약


---

## 전처리

### no namespace issue
https://github.com/kubeflow/manifests/issues/2533
````ad-info
title: 이것을
하지 않으면 너무 많은 pod를 감당하지 못한 리눅스가

```ad-error
title: too many open files
```
라며 힘들어한다. 그리고 그 결과는
![[Pasted image 20241003033929.png]]
이렇다.

해주자.
````

- 열기
```sh
sudo vi /etc/sysctl.conf
```

- 입력
```sh
fs.inotify.max_user_watches = 524288
fs.inotify.max_user_instances = 512
```
제일 하단에 붙여 넣음

### docker

#### 설치
```sh
curl -sSL get.docker.com | sh
```

#### 권한 설정

1. Docker 그룹을 확인해:
```sh
sudo groupadd docker
```

2. 현재 사용자를 Docker 그룹에 추가해:
```sh
sudo usermod -aG docker $USER
```

3. 시스템 재시작
```ad-attention
title: 꼭 해야해
그렇지 않으면 docker 앞에 sudo 써가며 해야함.
```
---

## 설치
```ad-info
title: 사실
밑에 한 땀식 땋을 수 있지만
너무 성가셔.
원리를 알고 싶으면 한 땀씩 따보시길.
```

```sh
curl -s https://get.k3s.io | sh -
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config && sudo chown $USER ~/.kube/config && sudo chmod 600 ~/.kube/config && export KUBECONFIG=~/.kube/config
echo "export KUBECONFIG=~/.kube/config" >> ~/.bashrc
echo "export KUBECONFIG=~/.kube/config" >> ~/.zshrc

wget https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2Fv5.4.2/kustomize_v5.4.2_linux_amd64.tar.gz

tar -xvf kustomize_v5.4.2_linux_amd64.tar.gz

sudo mv ./kustomize /usr/local/bin/kustomize


mkdir -p ~/kubeflow
cd ~/kubeflow
git clone https://github.com/kubeflow/manifests.git
cd manifests
git checkout tags/v1.8.1

while ! kustomize build example | kubectl apply -f -; do echo "Retrying to apply resources"; sleep 10; done
```

[[k3s 그리고 kubeflow 설치]]


---

## 설정

```ad-attention
title: [[gcp kubeflow 외부에서 접속하기]] 에서 
여러가지 방법이 있지만 service.
```
### LoadBalancer

#### 기본 생성
- 입력
```sh
kubectl edit svc istio-ingressgateway -n istio-system
```

- 수정
```yml
spec:
  type: LoadBalancer

```

- 확인
```sh
kubectl get svc -n istio-system
```

- 출력
```sh
NAME                    TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)                                      AGE
authservice             ClusterIP      10.43.157.203   <none>        8080/TCP                                     100m
cluster-local-gateway   ClusterIP      10.43.33.5      <none>        15020/TCP,80/TCP                             100m
istio-ingressgateway    LoadBalancer   10.43.118.171   <pending>     15021:32183/TCP,80:30183/TCP,443:32669/TCP   100m
istiod                  ClusterIP      10.43.231.214   <none>        15010/TCP,15012/TCP,443/TCP,15014/TCP        100m
knative-local-gateway   ClusterIP      10.43.171.130   <none>        80/TCP                                       100m
```


```ad-danger
title: 포트가!
너무 안 예뻐!

그래서.
```


#### 포트 변경
- 입력
```sh
kubectl edit svc istio-ingressgateway -n istio-system
```
하면
- 편집
```yml
spec:
  allocateLoadBalancerNodePorts: true
  clusterIP: 10.43.118.171
  clusterIPs:
  - 10.43.118.171
  externalTrafficPolicy: Cluster
  internalTrafficPolicy: Cluster
  ipFamilies:
  - IPv4
  ipFamilyPolicy: SingleStack
  ports:
  - name: status-port
    nodePort: 32088
    port: 15021
    protocol: TCP
    targetPort: 15021
  - name: http2
    nodePort: 30080
    port: 80
    protocol: TCP
    targetPort: 8080
  - name: https
    nodePort: 32669
    port: 443
    protocol: TCP
    targetPort: 8443
  selector:
    app: istio-ingressgateway
    istio: ingressgateway
  sessionAffinity: None
  type: LoadBalancer
```
이렇게 뭔가 알아서 좀 더 자동으로 생겼을 것이다.

이 중에서 

```yml
  - name: http2
    nodePort: 30080
    port: 80
    protocol: TCP
    targetPort: 8080
```
이 부분의 포트를 30080로 변경.


- 확인
```sh
kubectl get svc -n istio-system
```

- 출력
```sh
g00561526@static-k3s-16-32:~$ kubectl get svc -n istio-system
NAME                    TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)                                      AGE
authservice             ClusterIP      10.43.157.203   <none>        8080/TCP                                     100m
cluster-local-gateway   ClusterIP      10.43.33.5      <none>        15020/TCP,80/TCP                             100m
istio-ingressgateway    LoadBalancer   10.43.118.171   <pending>     15021:32088/TCP,80:30080/TCP,443:32669/TCP   100m
istiod                  ClusterIP      10.43.231.214   <none>        15010/TCP,15012/TCP,443/TCP,15014/TCP        100m
knative-local-gateway   ClusterIP      10.43.171.130   <none>        80/TCP                                       100m
```


### 토큰 설정
````ad-danger
title: 이거
하지 않으면 kubeflow에서 뭣만 생성하면
```ad-error
[403] Could not find CSRF cookie XSRF-TOKEN in the request. http://34.47.95.0:30080/jupyter/api/namespaces/kubeflow-user-example-com/notebooks
```
이 맛을 볼 수 있다.
```ad-check
title: 알아내니라 너무 힘들었다.
ㅠ
```
````

- 입력
```sh
kubectl edit deploy jupyter-web-app-deployment -n kubeflow
```

- 수정
```yml
spec:
      containers:
      - env:
        - name: APP_SECURE_COOKIES
          values: "false"
```

APP_SECURE_COOKIES 부분을 "true" -> "false"

---
## 접속

http://gpc외부ip:30080

```ad-quote
title: 해치웠나
```

