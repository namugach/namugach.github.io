---
tags:
  - kubernetes
  - minikube
create: 2024-09-09 23:06:49
---

## 설명

```ad-note
- 쿠버네티스에서 생성하고 관리할 수 있는 배포 가능한 가장 작은 컴퓨팅 단위
- Pod 단위로 스케줄링, 로드밸런싱, 스케일링 등의 관리 작업을 수행
- 쿠버네티스에 어떤 애플리케이션을 배포하고 싶다면 최소 Pod 으로 구성해야 한다
- Pod 은 Container 를 감싼 개념
	- 하나의 Pod 은 한 개의 Container 혹은 여러 개의 Container 로 이루어져 있음
	- Pod 내부의 여러 Container 는 자원을 공유
```

```ad-attention
title:Pod는
Stateless 한 특징을 지니고 있으며, 언제든지 삭제될 수 있는 자원
```

---
## 생성

### 작성
```sh
vi pod.yaml
```

```yaml
apiVersion: v1 # kubernetes resource 의 API Version
kind: Pod # kubernetes resource name
metadata: # 메타데이터 : name, namespace, labels, annotations 등을 포함
  name: counter
spec: # 메인 파트 : resource 의 desired state 를 명시
  containers:
  - name: count # container 의 이름
    image: busybox # container 의 image
    args: [/bin/sh, -c, 'i=0; while true; do echo "$i: $(date)"; i=$((i+1)); sleep 1;
    done'] # 해당 image 의 entrypoint 의 args 로 입력하고 싶은 부분
```

### 실행
```sh
kubectl apply -f pod.yaml
```

---
## 조회

### 기본
- 입력
```sh
kubectl get pod
```

- 출력
```sh
NAME      READY   STATUS    RESTARTS   AGE
counter   1/1     Running   0          2m46s
```

### namespace
```ad-info
kube-system namespace 의 pod 을 조회
```
- 입력
```sh
kubectl get pod -n kube-system
```

- 출력
```sh
NAME                               READY   STATUS    RESTARTS       AGE
coredns-7db6d8ff4d-h5sd7           1/1     Running   1 (143m ago)   26h
etcd-minikube                      1/1     Running   1 (143m ago)   26h
kube-apiserver-minikube            1/1     Running   1 (143m ago)   26h
kube-controller-manager-minikube   1/1     Running   1 (143m ago)   26h
kube-proxy-c2gc8                   1/1     Running   1 (143m ago)   26h
kube-scheduler-minikube            1/1     Running   1 (143m ago)   26h
storage-provisioner                1/1     Running   3 (143m ago)   26h
```

### 모든
```ad-info
모든 namespace 의 pod 을 조회합니다.
```

- 입력
```sh
kubectl get pod -A
```

- 출력
```sh
NAMESPACE     NAME                               READY   STATUS    RESTARTS       AGE
default       counter                            1/1     Running   0              3m5s
kube-system   coredns-7db6d8ff4d-h5sd7           1/1     Running   1 (143m ago)   26h
kube-system   etcd-minikube                      1/1     Running   1 (143m ago)   26h
kube-system   kube-apiserver-minikube            1/1     Running   1 (143m ago)   26h
kube-system   kube-controller-manager-minikube   1/1     Running   1 (143m ago)   26h
kube-system   kube-proxy-c2gc8                   1/1     Running   1 (143m ago)   26h
kube-system   kube-scheduler-minikube            1/1     Running   1 (143m ago)   26h
kube-system   storage-provisioner                1/1     Running   3 (143m ago)   26h
```

### 하나
- 양식
```sh
kubectl get pod <pod-name>
```

- 입력
```sh
kubectl get pod counter
```

- 출력
```sh
NAME      READY   STATUS    RESTARTS   AGE
counter   1/1     Running   0          3m28s
```

### 하나 자세히
- 양식
```sh
kubectl describe pod <pod-name>
```

- 입력
```sh
kubectl describe pod counter
```

- 출력
```sh
Name:         counter
Namespace:    default
Priority:     0
Node:         minikube/192.168.49.2
Start Time:   Tue, 10 Sep 2024 13:56:40 +0900
Labels:       <none>
Annotations:  <none>
Status:       Running
IP:           10.244.0.17
IPs:
  IP:  10.244.0.17
Containers:
  count:
    Container ID:  docker://f92221afed234a9b379989f419a45249e5b75b14a56b6370ec467c259a8b09e8
    Image:         busybox
    Image ID:      docker-pullable://busybox@sha256:34b191d63fbc93e25e275bfccf1b5365664e5ac28f06d974e8d50090fbb49f41
    Port:          <none>
    Host Port:     <none>
    Args:
      /bin/sh
      -c
      i=0; while true; do echo "$i: $(date)"; i=$((i+1)); sleep 1; done
    State:          Running
      Started:      Tue, 10 Sep 2024 13:56:42 +0900
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-mq6g5 (ro)
Conditions:
  Type                        Status
  PodReadyToStartContainers   True 
  Initialized                 True 
  Ready                       True 
  ContainersReady             True 
  PodScheduled                True 
Volumes:
  kube-api-access-mq6g5:
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
  Normal  Scheduled  3m53s  default-scheduler  Successfully assigned default/counter to minikube
  Normal  Pulling    3m54s  kubelet            Pulling image "busybox"
  Normal  Pulled     3m52s  kubelet            Successfully pulled image "busybox" in 1.899s (1.899s including waiting). Image size: 4261574 bytes.
  Normal  Created    3m52s  kubelet            Created container count
  Normal  Started    3m52s  kubelet            Started container count
```


### 자세히
- 입력
```sh
kubectl get pod -o wide
```

- 출력
```sh
NAME      READY   STATUS    RESTARTS   AGE     IP            NODE       NOMINATED NODE   READINESS GATES
counter   1/1     Running   0          4m27s   10.244.0.17   minikube   <none>           <none>
```

### \<pod-name\>을 yaml 형식으로
- 양식
```sh
kubectl get pod <pod-name> -o yaml
```

- 입력
```sh
kubectl get pod counter -o yaml
```

- 출력
```yml
apiVersion: v1
kind: Pod
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"v1","kind":"Pod","metadata":{"annotations":{},"name":"counter","namespace":"default"},"spec":{"containers":[{"args":["/bin/sh","-c","i=0; while true; do echo \"$i: $(date)\"; i=$((i+1)); sleep 1; done"],"image":"busybox","name":"count"}]}}
  creationTimestamp: "2024-09-10T04:56:40Z"
  name: counter
  namespace: default
  resourceVersion: "49976"
  uid: 8e6fc867-7ced-449b-8602-bac1282a56b8
spec:
  containers:
  - args:
    - /bin/sh
    - -c
    - 'i=0; while true; do echo "$i: $(date)"; i=$((i+1)); sleep 1; done'
    image: busybox
    imagePullPolicy: Always
    name: count
    resources: {}
    terminationMessagePath: /dev/termination-log
    terminationMessagePolicy: File
    volumeMounts:
    - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      name: kube-api-access-mq6g5
      readOnly: true
  dnsPolicy: ClusterFirst
  enableServiceLinks: true
  nodeName: minikube
  preemptionPolicy: PreemptLowerPriority
  priority: 0
  restartPolicy: Always
  schedulerName: default-scheduler
  securityContext: {}
  serviceAccount: default
  serviceAccountName: default
  terminationGracePeriodSeconds: 30
  tolerations:
  - effect: NoExecute
    key: node.kubernetes.io/not-ready
    operator: Exists
    tolerationSeconds: 300
  - effect: NoExecute
    key: node.kubernetes.io/unreachable
    operator: Exists
    tolerationSeconds: 300
  volumes:
  - name: kube-api-access-mq6g5
    projected:
      defaultMode: 420
      sources:
      - serviceAccountToken:
          expirationSeconds: 3607
          path: token
      - configMap:
          items:
          - key: ca.crt
            path: ca.crt
          name: kube-root-ca.crt
      - downwardAPI:
          items:
          - fieldRef:
              apiVersion: v1
              fieldPath: metadata.namespace
            path: namespace
status:
  conditions:
  - lastProbeTime: null
    lastTransitionTime: "2024-09-10T04:56:43Z"
    status: "True"
    type: PodReadyToStartContainers
  - lastProbeTime: null
    lastTransitionTime: "2024-09-10T04:56:40Z"
    status: "True"
    type: Initialized
  - lastProbeTime: null
    lastTransitionTime: "2024-09-10T04:56:43Z"
    status: "True"
    type: Ready
  - lastProbeTime: null
    lastTransitionTime: "2024-09-10T04:56:43Z"
    status: "True"
    type: ContainersReady
  - lastProbeTime: null
    lastTransitionTime: "2024-09-10T04:56:40Z"
    status: "True"
    type: PodScheduled
  containerStatuses:
  - containerID: docker://f92221afed234a9b379989f419a45249e5b75b14a56b6370ec467c259a8b09e8
    image: busybox:latest
    imageID: docker-pullable://busybox@sha256:34b191d63fbc93e25e275bfccf1b5365664e5ac28f06d974e8d50090fbb49f41
    lastState: {}
    name: count
    ready: true
    restartCount: 0
    started: true
    state:
      running:
        startedAt: "2024-09-10T04:56:42Z"
  hostIP: 192.168.49.2
  hostIPs:
  - ip: 192.168.49.2
  phase: Running
  podIP: 10.244.0.17
  podIPs:
  - ip: 10.244.0.17
  qosClass: BestEffort
  startTime: "2024-09-10T04:56:40Z"
```

### 변화가 있을 때만 업데이트
- 입력
```sh
kubectl get pod -w
```

- 출력
```sh
NAME      READY   STATUS    RESTARTS   AGE
counter   1/1     Running   0          5m40s
```

```ad-note
title: 종료
ctal + c 를 눌러서 끌 수 있다.
```
---

## Log

### 기본
- 양식
```sh
kubectl logs <pod-name>
```

- 입력
```sh
kubectl logs counter
```

- 출력
```sh
0: Tue Sep 10 04:56:42 UTC 2024
1: Tue Sep 10 04:56:43 UTC 2024
2: Tue Sep 10 04:56:44 UTC 2024
3: Tue Sep 10 04:56:45 UTC 2024
4: Tue Sep 10 04:56:46 UTC 2024
5: Tue Sep 10 04:56:47 UTC 2024
6: Tue Sep 10 04:56:48 UTC 2024
7: Tue Sep 10 04:56:49 UTC 2024
8: Tue Sep 10 04:56:50 UTC 2024
```



### 계속 출력
- 양식
```sh
kubectl logs <pod-name> -f
```

- 입력
```sh
kubectl logs counter -f
```

- 출력
```sh
435: Tue Sep 10 05:03:58 UTC 2024
436: Tue Sep 10 05:03:59 UTC 2024
437: Tue Sep 10 05:04:00 UTC 2024
438: Tue Sep 10 05:04:01 UTC 2024
439: Tue Sep 10 05:04:02 UTC 2024
440: Tue Sep 10 05:04:03 UTC 2024
441: Tue Sep 10 05:04:04 UTC 2024
442: Tue Sep 10 05:04:05 UTC 2024
```
```ad-note
title: 1초마다
계속 출력함
```

### pod 안에 여러 개의 container 가 있는 경우

```sh
kubectl logs <pod-name> -c <container-name>
kubectl logs <pod-name> -c <container-name> -f
```



---

## 내부 접속

### 기본
- 양식
```sh
kubectl exec -it <pod-name> -- <명령어>
```

- 입력
```sh
kubectl exec -it counter -- s
```

- 출력
```sh
/ # 
```
```ad-note
title: shell 안으로
진입한다.
```

### 여러 개의 container
```sh
kubectl exec -it <pod-name> -c <container-name> -- <명령어>
```

---

## 삭제

### 기본
- 양식
```sh
kubectl delete pod <pod-name>
```

- 입력
```sh
kubectl delete pod counter
```

- 출력
```sh
pod "counter" deleted
```
```ad-attention
title: 바로
안지워지고 좀 기다려야함
```

### yaml로

- 양식
```sh
kubectl delete -f <YAML-파일-경로>
```

- 입력
```sh
kubectl delete -f pod.yaml
```

- 출력
```sh
pod "counter" deleted
```
```ad-note
title: 위 명령어는
꼭 pod 이 아니더라도 모든 kubernetes resource 에 적용할 수 있음
```


