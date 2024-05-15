---
tags:
  - vscode
  - plugins
  - mysql
  - sql
create: 2024-05-15 17:38:38
---

## 설치

![[Pasted image 20240515174351.png]]
1. 입력: mysql
2. 클릭: MySQL
3. 클릭: 설치
4. 클릭: Database

---
## 접속
![[Pasted image 20240515175233.png]]
1. 클릭: Database
2. 클릭: AddConnection
3. 입력: EC3_MySQL_Test
4. 입력: 내 public IP
5. 입력: root
6. 입력: yeardream04
7. 클릭: Connect
8. 확인: Success
----
## Database 보기

![[Pasted image 20240515213851.png]]

---

## Query 보내기

## 생성

![[Pasted image 20240515180219.png]]
1. 클릭: Create Query
2. 엔터
---
## 확인

![[Pasted image 20240515215016.png]]

1. 작성
```sql title:작성
SELECT * FROM COLUMNS;

SELECT `COLUMN_NAME` FROM COLUMNS;
```

2. 클릭: Run
3. 확인
4. 클릭: Run
5. 확인
