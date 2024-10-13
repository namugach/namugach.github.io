---
tags:
  - google
  - gcp
create: 2024-09-24 14:23:21
---

## 계정
https://console.cloud.google.com/welcome?project=stellar-psyche-428400-s9

![[Pasted image 20240924211329.png]]

1. 클릭: 무료로 시작하기


![[Pasted image 20240924211457.png]]

1. 체크: 체험판 서비스 약관
2. 체크: 상업적 목적
3. 클릭: 계속


![[Pasted image 20240924212054.png]]
1. 입력: 이름
2. 입력: 주민등록번호
3. 선택: 통신사
4. 입력: 전화번호
5. 클릭: 코드 전송
6. 입력: 코드 입력
7. 클릭: 계속

![[Pasted image 20240924212351.png]]

1. 입력: 카드 번호
2. 클릭: 무료로 시작하기


## ssh 키 등록

![[Pasted image 20240924145722.png]]
1. 클릭: 메뉴
2. 클릭: Compute Engin
3. 클릭: 메타데이터


![[Pasted image 20240924145841.png]]
1. 클릭: SSH 키
2. 클릭: 수정

![[Pasted image 20240924150005.png]]
1. 클릭: 항목 추가
2. 입력: 공개키
3. 입력: 저장

![[Pasted image 20240924150250.png]]

1. 확인: 사용자 이름

```ad-attention
title: userName
이 부분이 로그인 할 때 사용자 이름이 됨
```

```ssh_config
Host google_cloud
	HostName 34.22.104.63
	User userName
	IdentityFile ~/.ssh/google_cloud_useName
```

---
## 인스턴스

### 생성

![[Pasted image 20240924143819.png]]

0. 클릭: 1번이 없으면
1. 클릭: 메뉴
2. 클릭: Compute Engine
3. 클릭: vm 인스턴스


![[Pasted image 20240924144002.png]]
1. 클릭: 인스턴스 만들기




![[Pasted image 20240924144211.png]]

1. 입력: 이름
2. 클릭: 태그 및 라벨 관리
3. 클릭: 서울

![[Pasted image 20240924144448.png]]
1. 클릭: 사양
2. 클릭: 표준
3. 클릭 e2-standard-8


![[Pasted image 20240924144721.png]]
1. 클릭: 변경
2. 선택: Ubuntu
3. 선택: Ubuntu 24.04 LTS Minimal
4. 입력: 80
5. 클릭: 선택


![[Pasted image 20240924144900.png]]

1. 클릭: 모든 cloud API에 대한 전체 엑세스 허용
2. 체크
	- HTTP 트래픽 허용
	- HTTPS 트래픽 허용


![[Pasted image 20240924145055.png]]

1. 클릭: 만들기


### 접속

![[Pasted image 20240924150953.png]]
1. 클릭
2. 선택: 브라우저 창에서 열기
3. 확인: 브라우저 터미널

