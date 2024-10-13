---
tags:
  - kubernetes
  - minikube
create: 2024-09-10 15:04:38
---

## 설명

- 쿠버네티스에 배포한 애플리케이션(Pod)을 외부에서 접근하기 쉽게 추상화 한 리소스
- Pod 은 IP 를 할당받고 생성되지만, 언제든지 죽었다가 다시 살아날 수 있으며, 그 과정 에서 IP 는 항상 재할당받기에 고정된 IP 로 원하는 Pod 에 접근할 수 없음
- 클러스터 외부 혹은 내부에서 Pod 에 접근할 때는, Pod 의 IP 가 아닌 Service 를 통해서 접근하는 방식
- Service 는 고정된 IP 를 가지며, Service 는 하나 혹은 여러 개의 Pod 과 매칭
- 클라이언트가 Service 의 주소로 접근하면, 실제로는 Service 에 매칭된 Pod 에 접속할 수 있게 됨


---

## Deployment

### 생성

[[minikube Deployment#생성]]

### pod ip 확인

```sh
kubectl get pod -o wide
```

```sh
NAME                                READY   STATUS    RESTARTS   AGE   IP            NODE       NOMINATED NODE   READINESS GATES
nginx-deployment-77d8468669-74g6s   1/1     Running   0          23s   10.244.0.28   minikube   <none>           <none>
nginx-deployment-77d8468669-hrncq   1/1     Running   0          23s   10.244.0.27   minikube   <none>           <none>
nginx-deployment-77d8468669-rvdzk   1/1     Running   0          23s   10.244.0.29   minikube   <none>           <none>
```


### 접속 시도

```ad-error
title: 모두
접근 안됨
```
#### curl
- 입력
```sh
curl -X GET 10.244.0.28 -vvv
```

- 출력
```sh
Note: Unnecessary use of -X or --request, GET is already inferred.
*   Trying 10.244.0.28:80...
```

#### ping
- 입력
```sh
ping 10.244.0.28
```
- 출력
```sh
PING 10.244.0.28 (10.244.0.28) 56(84) bytes of data.
```


### ssh를 통하여 내부 접속

#### 접속
```sh
minikube ssh
```

#### curl
- 입력
[[#curl]]

- 출력
```sh
Note: Unnecessary use of -X or --request, GET is already inferred.
*   Trying 10.244.0.28:80...
* Connected to 10.244.0.28 (10.244.0.28) port 80 (#0)
> GET / HTTP/1.1
> Host: 10.244.0.28
> User-Agent: curl/7.81.0
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Server: nginx/1.14.2
< Date: Tue, 10 Sep 2024 06:17:52 GMT
< Content-Type: text/html
< Content-Length: 612
< Last-Modified: Tue, 04 Dec 2018 14:44:49 GMT
< Connection: keep-alive
< ETag: "5c0692e1-264"
< Accept-Ranges: bytes
< 
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
* Connection #0 to host 10.244.0.28 left intact
```

#### ping

- 입력
[[#ping]]

- 출력
```sh
PING 10.244.0.28 (10.244.0.28) 56(84) bytes of data.
64 bytes from 10.244.0.28: icmp_seq=1 ttl=64 time=0.033 ms
64 bytes from 10.244.0.28: icmp_seq=2 ttl=64 time=0.029 ms
64 bytes from 10.244.0.28: icmp_seq=3 ttl=64 time=0.050 ms
64 bytes from 10.244.0.28: icmp_seq=4 ttl=64 time=0.053 ms
64 bytes from 10.244.0.28: icmp_seq=5 ttl=64 time=0.026 ms
64 bytes from 10.244.0.28: icmp_seq=6 ttl=64 time=0.033 ms
64 bytes from 10.244.0.28: icmp_seq=7 ttl=64 time=0.027 ms
^C
--- 10.244.0.28 ping statistics ---
7 packets transmitted, 7 received, 0% packet loss, time 6175ms
rtt min/avg/max/mdev = 0.026/0.035/0.053/0.010 ms
```


---
## service 생성

### 작성

```sh
vi service.yaml
```

```yml
apiVersion: v1
kind: Service
metadata:
  name: my-nginx
  labels:
    run: my-nginx
spec:
  type: NodePort # Service 의 Type 을 명시하는 부분입니다. 자세한 설명은 추후 말씀드리겠습니다.
  ports:
    - port: 80
      protocol: TCP
  selector: # 아래 label 을 가진 Pod 을 매핑하는 부분입니다.
    app: nginx

```


### 실행
- 입력
```sh
kubectl apply -f service.yaml
```

- 출력
```sh
service/my-nginx created
```

### 확인
- 입력
```sh
kubectl get service
```

- 출력
```sh
NAME         TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
kubernetes   ClusterIP   10.96.0.1        <none>        443/TCP        27h
my-nginx     NodePort    10.105.214.245   <none>        80:32207/TCP   17s
```

```ad-check
PORT 80: 숫자 확인
```


### 외부 접속 확인
```ad-note
title: 이제는
외부에서도 접속 가능
```

#### curl
- 입력
```sh
curl -X GET $(minikube ip):32207
```

- 출력
```sh
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

#### ping
- 입력
```sh
ping $(minikube ip)
```

- 출력
```sh
PING 192.168.49.2 (192.168.49.2) 56(84) bytes of data.
64 bytes from 192.168.49.2: icmp_seq=1 ttl=64 time=0.047 ms
64 bytes from 192.168.49.2: icmp_seq=2 ttl=64 time=0.032 ms
64 bytes from 192.168.49.2: icmp_seq=3 ttl=64 time=0.036 ms
64 bytes from 192.168.49.2: icmp_seq=4 ttl=64 time=0.078 ms
64 bytes from 192.168.49.2: icmp_seq=5 ttl=64 time=0.034 ms
^C
--- 192.168.49.2 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4144ms
rtt min/avg/max/mdev = 0.032/0.045/0.078/0.017 ms
```