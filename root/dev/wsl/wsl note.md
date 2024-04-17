---
tags:
  - wsl2
  - linux
  - ubuntu
  - setting
create: 2024-03-30 10:44:41
---

## 설치

```powershell
wsl --install
```

---

## 윈도우 탐색기에서 확인하기


![[Pasted image 20240330105616.png]]

```text title:파일탐색기
\\wsl$
```

---
## root에서 기본 사용자 변경

### user 추가


- [useradd, adduser 차이](https://kit2013.tistory.com/187)

```sh
sudo usermod username
```

### 시작 변경

```sh file:"/etc/wsl.conf"
[user] default=<username>
```

---

## 기본 디렉토리 옮기기

### 파일 위치
```text title:"파일 위치"
C:\Users\<유저명>\AppData\Local\Packages\<리눅스이름>\LocalState
```

### 확인

```cmd title:list
wsl -l -v
```

### 내보내기
```cmd title:export
wsl --export Ubuntu F:\0.Users\ubuntu\ubuntu-22-04.tar
```

### 가져오기

```ad-note
ext4.vhdx 파일이 존재하는 디렉토리에는 불러 올 수 없다.
```

```cmd title:import
wsl --import Ubuntu2204 F:\0.Users\ubuntu\ F:\0.Users\ubuntu\ubuntu-22-04.tar
wsl --import Ubuntu2204Yeardream4 F:\0.Users\ubuntu\Ubuntu2204Yeardream4 F:\0.Users\ubuntu\backup\yeardream4\3.Ubuntu2204Yeardream4DockerComplete.tar
```



### 정지

```cmd title:stop
# 모두
wsl --shutdown

# 지정
wsl -t Ubuntu
```

### 기본 등록

```cmd title:stop
wsl -s Ubuntu2204
```

### 제거

```cmd title:stop
wsl --unregister Ubuntu
```

- https://learn.microsoft.com/ko-kr/windows/wsl/install
- https://lucycle.tistory.com/353
- https://velog.io/@darktrace1/WSL-저장소-위치-옮기기
- https://jooy34.tistory.com/29


---
## 메모리 할당

### 파일 작성
```text file:.wslconfig
[wsl2]
memory=4GB
processors=4
swap=1GB
localhostForwarding=true
```

%USERPROFILE% 에 .wslconfig 파일 생성 및 작성


```cmd title:reboot
wsl --shutdown
```


### 확인

![[Pasted image 20240323001212.png]]

htop 로 확인 결과


- https://velog.io/@alirz-pixel/wsl2-Vmmem-메모리-점유율-해결하기
- https://learn.microsoft.com/ko-kr/windows/wsl/wsl-config
- https://velog.io/@devookim/wsl2-다이어트-시키기

---


## [[도커 설치 및 기본 사용법|도커 설치]]

```ad-important
wsl 환경이라 도커 데스크탑 사용하라도 처음에 20초 정도 멈춘다.
무시하자.
```


- https://netmarble.engineering/docker-on-wsl2-without-docker-desktop/


---
## conda

### error
#### CondaError: Run 'conda init' before 'conda activate'

```sh
source ~/anaconda3/etc/profile.d/conda.sh
```
- https://technical-support.tistory.com/112