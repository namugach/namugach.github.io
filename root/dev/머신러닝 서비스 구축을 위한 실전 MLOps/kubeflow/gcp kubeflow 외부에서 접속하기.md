---
tags:
  - gcp
  - k3s
  - kubeflow
create: 2024-10-01 15:21:18
---

## 방법 1

```sh
kubectl edit svc istio-ingressgateway -n istio-system
```


### 확인
- 입력
```sh
kubectl get svc -n istio-system
```

- 출력
```sh
NAME                    TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                                      AGE
authservice             ClusterIP   10.43.88.59     <none>        8080/TCP                                     15m
cluster-local-gateway   ClusterIP   10.43.87.140    <none>        15020/TCP,80/TCP                             15m
istio-ingressgateway    NodePort    10.43.113.68    <none>        15021:31679/TCP,80:30080/TCP,443:31055/TCP   15m
istiod                  ClusterIP   10.43.188.239   <none>        15010/TCP,15012/TCP,443/TCP,15014/TCP        15m
knative-local-gateway   ClusterIP   10.43.68.195    <none>        80/TCP                                       15m
```


```yml
apiVersion: v1
kind: Service
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"v1","kind":"Service","metadata":{"annotations":{},"labels":{"app":"istio-ingressgateway","install.operator.istio.io/owning-resource":"unknown","istio":"ingressgateway","istio.io/rev":"default"},"name":"istio-ingressgateway","namespace":"istio-system"},"spec":{"clusterIP":"10.43.113.68","ports":[{"name":"status-port","port":15021,"protocol":"TCP","targetPort":15021},{"name":"http2","port":80,"protocol":"TCP","targetPort":8080,"nodePort":30080},{"name":"https","port":443,"protocol":"TCP","targetPort":8443}],"selector":{"app":"istio-ingressgateway","istio":"ingressgateway"},"sessionAffinity":"None","type":"NodePort"}}
  creationTimestamp: "2024-10-01T06:06:58Z"
  labels:
    app: istio-ingressgateway
    install.operator.istio.io/owning-resource: unknown
    istio: ingressgateway
    istio.io/rev: default
    operator.istio.io/component: IngressGateways
    release: istio
  name: istio-ingressgateway
  namespace: istio-system
  resourceVersion: "1469"
  uid: e5d3c0a9-d355-430e-8e21-a79f5e2db6f3
spec:
  clusterIP: 10.99.11.233
  clusterIPs:
  - 10.99.11.233
  internalTrafficPolicy: Cluster
  ipFamilies:
  - IPv4
  ipFamilyPolicy: SingleStack
  ports:
  - name: status-port
    port: 15021
    protocol: TCP
    targetPort: 15021
  - name: http2
    port: 80
    protocol: TCP
    targetPort: 8080
    nodePort: 30080  # 원하는 NodePort 번호
  - name: https
    port: 443
    protocol: TCP
    targetPort: 8443
  selector:
    app: istio-ingressgateway
    istio: ingressgateway
  sessionAffinity: None
  type: NodePort
status:
  loadBalancer: {}

```

---

## LoadBalancer

```sh
kubectl edit svc istio-ingressgateway -n istio-system
```

```yml
spec:
  type: LoadBalancer

```


```sh
kubectl get svc -n istio-system
```


---

## NodePort
```yml
spec:
  type: NodePort
  ports:
    - port: 80
      targetPort: 8080
      nodePort: 30080   # NodePort 지정
      protocol: TCP

```


```ad-error
[403] Could not find CSRF cookie XSRF-TOKEN in the request. http://34.47.95.0:30080/jupyter/api/namespaces/kubeflow-user-example-com/notebooks
```

왜지??


```sh
kubectl edit deploy jupyter-web-app-deployment -n kubeflow
```

```yml
spec:
      containers:
      - env:
        - name: APP_SECURE_COOKIES
          values: "false"
```

APP_SECURE_COOKIES 부분을 "true" -> "false"

- https://otzslayer.github.io/kubeflow/2022/06/11/could-not-find-csrf-cookie-xsrf-token-in-the-request.html
- https://github.com/mlops-for-all/mlops-for-all.github.io/issues/72
- https://velog.io/@seokbin/Kubeflow-V1.4-설치-및-초기-설정User-추가-CORS


---
## no namespace

https://github.com/kubeflow/manifests/issues/2533

### 일시적

```sh
sudo sysctl fs.inotify.max_user_watches=524288
sudo sysctl fs.inotify.max_user_instances=512
```

### 영구적
```sh
sudo vi /etc/sysctl.conf
```

```sh
fs.inotify.max_user_watches = 524288
fs.inotify.max_user_instances = 512
```

제일 하단에 입력