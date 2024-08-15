---
tags:
  - vscode
  - setting
  - docker
  - wsl2
  - public
create: 2024-08-15 22:56:36
---


```ad-abstract
title: 개발 컨테이너에 들어갈 때마다
- 매번 vscode 확장 눌러서 플러그인 설치하는 게 너무 지겹기 때문에.
- 그리고 어떨 때 뭐가 어떻게 동작하는 지에 대한 애매함이 싫기 때문에.
- 또 한 편해지고 싶기 때문에..
```

```ad-check
아래의 설정을 한 다음에 vscode를 들어가면
지정해 놓은 플러그인들이 자동으로 설치 돼 있는 걸 볼 수 있다.
```
## 플러그인 ID 얻기

![[Pasted image 20240816005409.png]]
1. 클릭: 확장
2. 입력: 플러그인 이름
3. 우클릭: 메뉴 열기
4. 클릭: 복사
5. 붙여넣기: 복사 값 확인

---
## 설정

### 방법
![[Pasted image 20240816011058.png]]
1. 클릭: 파일
2. 클릭: 기본 설정
3. 클릭: 설정

![[Pasted image 20240816010652.png]]
1. 확인: 설정
2. 입력: Extensions
3. 확인: 옵션
4. 클릭: 항목 추가
5. 입력: 확장 ID
6. 클릭: 확인
7. 확인: 추가된 확장 ID


### 옵션
#### dev.containers.defaultExtensions
- 개발 컨테이너에 기본적으로 설치할 확장 프로그램을 지정
- 로컬 설치 여부와 관계없이 항상 컨테이너에 설치


#### dev.containers.defaultExtensionsIfInstalledLocally
- 개발 컨테이너 내에서 사용할 확장 프로그램을 지정
- 로컬 VS Code에 이미 설치된 확장 프로그램 중에서 컨테이너에도 설치할 것들을 선택


#### remote.tunnels.defaultExtensions
- VS Code의 원격 개발 기능 중 터널링을 사용할 때 기본적으로 설치할 확장 프로그램을 지정


#### remote.SSH.defaultExtensions
- SSH를 통한 원격 개발 시 기본적으로 설치할 확장 프로그램을 지정


---
## 이미지 별 컨테이너만 적용 시키기

```ad-note
title: 위의 옵션들은
일괄 처리이지만.
이것의 경우엔 컨테이너 이미지 하나에 해당한다.
```

### 컨테이너 생성 및 vscode로 열기
![[Pasted image 20240816011736.png]]
1. 활성: 터미널
2. 입력: docker container run -itd ubuntu:24.04
3. 클릭: docker 확장
4. 우클릭: 활성화된 컨테이너
5. 클릭: Attach Visual Studio Code
6. 클릭: vscode로 열기.


### devcontainer.json에 확장 ID 추가
![[Pasted image 20240816012520.png]]
1. 확인: docker container 인지
2. 클릭: 확장 관리
3. 입력: mysql
4. 우클릭: 메뉴 열기
5. 클릭: devcontainer.json에 추가
6. 클릭: 개발 컨테이너 구성


### 확인
![[Pasted image 20240816012918.png]]
1. 확인: 플러그인 ID
2. 우클릭: 메뉴활성
3. 클릭: 파일 탐색기에 표시
4. 확인: 파일 경로
5. 확인: 파일

```ad-note
title: 5번은
컨테이너 이미지가 달라질 때마다 생기는 것
```
---

## 결론

저 위의 옵션들을 다 제거 했음에도 불구하고
컨테이너를 생성 할 때마다 계속 살아남는 플러그인들이 몇몇 있다.

그것은 무엇일까..