---
tags:
  - wsl2
  - setting
  - 이어드림스쿨
create: 2024-03-30 15:05:55
---

```ad-note
[윈도우용 환경가이드 세팅](https://quickest-asterisk-75d.notion.site/797e8235be5e400f80e0eef8ea4f9c8d)을 참고하여 만든 wsl 통파일 배포
### 설치 내역
- mysql
- python conda
- python packages
- docker
- 그 외 자잘한 세팅
	- wsl 최초 로그인시 계정으로 로그인 (root로 로그인 하는 거 수정)
	- 로그인 할 때 비번 표시 (보안상 비밀번호가 너무 어려워서 잊기 싶기 때문에)
	- conda 기본 가상환명 설정(conda activated yeardream 매번 치기 구찮음)
```

## 1.다운로드

![[Pasted image 20240330172323.png]]
https://drive.google.com/file/d/1uLHl3lNDwtJKfZFpxjDtA7FO27W4ULT3/view?usp=sharing

```ad-important
title:주의
다운로드를 "한 번"(매우 중요) 클릭한다.
```

![[Pasted image 20240330192430.png]]

```ad-warning
title:경고
무시하고 다운로드
```



---

##  2.wsl 설치


[여기를 참조](https://quickest-asterisk-75d.notion.site/0-WSL-637b2a71df7b4eadb716b35df22649ee)

```ps
wsl --install
```


---

## 3.wsl 배포 파일 추가하기

### 3.1파일 이동

![[Pasted image 20240330192920.png]]


```ad-note
1번에 위치해 있는 2번 파일을
3번 경로에 4번 위치로 이동
```

### 3.2import!

![[Pasted image 20240330193620.png]]

```cmd
wsl --import Ubuntu2204Yeardream4 C:wsl\yeardream C:\wsl\Ubuntu2204Yeardream4DockerComplete.tar
```

하면

![[Pasted image 20240330194601.png]]

요롷게

작업을 잘 완료했다고 나온다.


그리고

### 3.3 별

```cmd
wsl -l -v
```

치고 앤터 똭. (새끼 손가락으로 살포시 눌러야 함)

![[Pasted image 20240330194846.png]]

보라.

우리를 괴롭혔던 별이 Ubuntu에 똭. 밖혀있다.

저것은 cmd에서 wsl 커맨드를 쳤을 때 기본으로 들어가겠다는 표시다.
우리는 이미 Ubuntu2204Yeardream4DockerCompleter가 있음으로
저 건방진 혐오스런 별이 달린 녀석을 지워버릴 것이다.

![[Pasted image 20240330195355.png]]

#### 3.3.1. 앤터 똭.
```cmd
wsl --unregister Ubuntu
```

#### 3.3.2. 내 별

별을 빼앗아 3번 위치에 꾸며줬다.

#### 3.3.3. 확인

![[Pasted image 20240330195839.png]]
이제 커맨드 창에서 wsl만 입력하고 편해지자.

```ad-warning
title:경고
여기서 더 편해지면 도둑놈 심보임으로. 
그 이상은 안됨.
batch...
```

---
## 4.wsl 무사 설치 확인

### 4.1.mysql

#### 버전 확인
![[Pasted image 20240330201351.png]]
```sh
mysql --version
```


#### 동작 확인
![[Pasted image 20240330201425.png]]
```sh
systemctl status mysql
```

```ad-tip
q 키를 눌러서 빠져나온다.
```

### 4.2.conda

#### 버전 확인
![[Pasted image 20240330201557.png]]
```sh
conda --version
```

#### 동작 확인
![[Pasted image 20240330201629.png]]
잘 동작 동작 하고 있다.

### 4.3.docker

#### 버전 확인
![[Pasted image 20240330201734.png]]

#### 동작 확인
![[Pasted image 20240330201951.png]]
```sh
docker
```
잘 동작 하고 있을지도?

---


## 5.메모리 할당

```ad-note
음... 해두면 좋다. 안 둬도 상관은 없을까?!?
하지만.. 내 메모린 소중한걸...
```

### 5.1파일 작성

![[Pasted image 20240330175413.png]]

```text file:.wslconfig
[wsl2]
memory=4GB
processors=4
swap=1GB
localhostForwarding=true
```

1. %USERPROFILE% 입력
2. .wslconfig 파일 생성
3. 3번 작성

```ad-note
자신의 컴퓨터 사양이 좋지 않다면
memory = 2GB
processors = 2
이렇게 설정해도 됨

사실.. 몇 번 해보고,
이정도면 내 컴퓨터가 죽지 않겠구나 싶을 정도로만 주면 된다.
```


### 5.2wsl 다시 시작


```cmd title:reboot
wsl --shutdown
```


### 5.3확인

![[Pasted image 20240323001212.png]]

htop 로 확인 결과


- https://velog.io/@alirz-pixel/wsl2-Vmmem-메모리-점유율-해결하기
- https://learn.microsoft.com/ko-kr/windows/wsl/wsl-config
- https://velog.io/@devookim/wsl2-다이어트-시키기

