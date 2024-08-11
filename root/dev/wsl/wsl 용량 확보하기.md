---
tags:
  - wsl2
  - tip
  - ncdu
  - public
create: 2024-08-09 10:14:56
---
`````ad-check
title:자동화는
맨 아래에 있음. 그러니 문제 파악할 때, 혹은 자동화 프로그램이
작동하지 않을 때만 수동으로 처리
```ad-todo
title:가자!
[[#자동화]]
```
`````



## 문제

![[Pasted image 20240809103129.png]]

`````ad-info
title:용량이 무려

```ad-warning
title:173g
```

- wsl은 자동으로 용량을 줄이지 않음
- wsl에서 용량 확보를 해도, 그 안에 공기는 그대로
- 때문에 공기 빼주는 작업을 수동으로 해야함
`````

---

## 용량 확인

### 설치
```sh
sudo apt-get install ncdu
```

### 조회
```sh
sudo ncdu / --exclude /mnt
```

```ad-info
- --exclude: 제외 디렉토리

sudo를 넣지 않으면 권한이 없기 때문에 모든 디렉토리를 순회하지 않는다.
```


![[Pasted image 20240809103759.png]]

```ad-note
title:94.5 gb
원래는 더 많았지만
컨테이너를 지워서 용량이 축소 된 화면
```


---

## wsl 디스크 압축

https://uutopia.tistory.com/70

### wsl 종료
```powershell
wsl --shutdown
```

### wsl 가상 드라이브 path 확인
```powershell
(Get-ChildItem -Path HKCU:\Software\Microsoft\Windows\CurrentVersion\Lxss | Where-Object {$_.GetValue('DistributionName') -eq 'Ubuntu' }).GetValue('BasePath') + '\ext4.vhdx'
```

### diskpart
```powershell
diskpart
```

```cmd
select vdisk file=".vdisk_경로"
attach vdisk readonly
compact vdisk
detach vdisk
```


```cmd
select vdisk file="S:\wsl\ubuntu\ext4.vhdx"
attach vdisk readonly
compact vdisk
detach vdisk
```


![[Pasted image 20240809105041.png]]

---

## 확인

![[Pasted image 20240809105036.png]]





---

## 자동화

```ad-info
title:더 자세한 메뉴얼은
[여기](https://github.com/namugach/Compress-VHDX)에서 볼 수 있음
```


![[Pasted image 20240811140207.png]]

### 다운로드
```sh
git clone https://github.com/namugach/Compress-VHDX.git
```

### 실행
- Compress-VHDX.bat 더블 클릭 혹은 우클릭 -> 관리자 모드 실행

