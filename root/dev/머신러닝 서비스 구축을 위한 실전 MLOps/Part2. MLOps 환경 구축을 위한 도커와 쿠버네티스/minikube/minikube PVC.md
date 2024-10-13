---
tags:
  - kubernetes
  - minikube
create: 2024-09-10 15:49:36
---

## 설명

- Persistent Volume (PV), Persistent Volume Claim (PVC) 는 stateless 한 Pod 이 영구적으로(persistent) 데이터를 보존하고 싶은 경우 사용하는 리소스
- docker run 의 -v 옵션인 도커 볼륨과 유사한 역할
- PV 는 관리자가 생성한 실제 저장 공간의 정보
- PVC 는 사용자가 요청한 저장 공간의 스펙에 대한 정보
- Pod 내부에서 작성한 데이터는 기본적으로 언제든지 사라질 수 있기에, 보존하고 싶은 데이터가 있다면 Pod 에 PVC 를 mount 해서 사용해야 한다는 것만 기억
- 여러 pod 간의 data 공유도 쉽게 가능

---

## PVC

### 이미 설치된 storageclass 확인
- 입력
```sh
kubectl get storageclass
```

- 출력
```sh
NAME                 PROVISIONER                RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
standard (default)   k8s.io/minikube-hostpath   Delete          Immediate           false                  28h
```

### 생성

#### 작성
```sh
vi pvc.yaml
```

```yml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: myclaim
spec: # pvc 의 정보를 입력하는 파트입니다.
  accessModes:
    - ReadWriteMany # ReadWriteOnce, ReadWriteMany 옵션을 선택할 수 있습니다.
  volumeMode: Filesystem
  resources:
    requests:
      storage: 10Mi # storage 용량을 설정합니다.
  storageClassName: standard # 방금 전에 확인한 storageclass 의 name 을 입력합니다.

```

#### 생성

```sh
kubectl apply -f pvc.yaml
```


#### 확인
- 입력
```sh
kubectl get pvc,pv
```

- 출력
```sh
NAME                            STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   VOLUMEATTRIBUTESCLASS   AGE
persistentvolumeclaim/myclaim   Bound    pvc-59797965-9db5-4927-a532-51f634e1b80a   10Mi       RWX            standard       <unset>                 9s

NAME                                                        CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM             STORAGECLASS   VOLUMEATTRIBUTESCLASS   REASON   AGE
persistentvolume/pvc-59797965-9db5-4927-a532-51f634e1b80a   10Mi       RWX            Delete           Bound    default/myclaim   standard       <unset>                          9s
```



---

## Pod 에서 PVC 사용

### 생성

#### 작성
```sh
vi pod-pvc.yaml
```

```yml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
    - name: myfrontend
      image: nginx
      volumeMounts:
        - mountPath: "/var/www/html" # mount 할 pvc 를 mount 할 pod 의 경로를 적습니다.
          name: mypd # 어떤 이름이든 상관없으나, 아래 volumes[0].name 과 일치해야 합니다.
  volumes:
    - name: mypd # 어떤 이름이든 상관없으나, 위의 volumeMounts[0].name 과 일치해야 합니다.
      persistentVolumeClaim:
        claimName: myclaim # mount 할 pvc 의 name 을 적습니다.
```

#### 실행
```sh
kubectl apply -f pod-pvc.yaml
```


### 확인
#### pod 접속
- 입력
```sh
kubectl exec -it mypod -- bash
```

- 출력

```sh
root@mypod:/#
```

#### 파일 만들기

##### pod 에서
- 입력
```sh
touch hi-fast-campus
ls
```

- 출력
```sh
bin   docker-entrypoint.d   hi-fast-campus  lib64  opt   run   sys  var
boot  docker-entrypoint.sh  home            media  proc  sbin  tmp
dev   etc                   lib             mnt    root  srv   usr
```


##### pvc 에서
- 입력
```sh
cd /var/www/html
touch hi-fast-campus
ls
```

- 출력
```sh
hi-fast-campus
```


### 삭제
```sh
kubectl delete pod mypod
```


### pvc 확인

- 입력
```sh
kubectl get pvc,pv
```

- 출력
```sh
NAME                            STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   VOLUMEATTRIBUTESCLASS   AGE
persistentvolumeclaim/myclaim   Bound    pvc-59797965-9db5-4927-a532-51f634e1b80a   10Mi       RWX            standard       <unset>                 38m

NAME                                                        CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM             STORAGECLASS   VOLUMEATTRIBUTESCLASS   REASON   AGE
persistentvolume/pvc-59797965-9db5-4927-a532-51f634e1b80a   10Mi       RWX            Delete           Bound    default/myclaim   standard       <unset>   
```


### 다시 생성

```sh
kubectl apply -f pod-pvc.yaml
```


```sh
kubectl exec -it mypod -- bash
ls
# hi-fast-campus 파일이 사라진 것을 확인할 수 있습니다.
cd /var/www/html
ls
# hi-fast-campus 파일이 그대로 보존되는 것을 확인할 수 있습니다.
```