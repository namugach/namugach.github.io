---
tags:
  - ec2
  - workbench
  - setting
  - mariaDB
  - sql
create: 2024-04-30 22:49:28
---

## 추가

![[Pasted image 20240501003521.png]]

---
## Connections 작성

![[Pasted image 20240501003750.png]]
1. `Connection Name`: EC2-mariadb
2. `Connection Methods: Standard` TCP/IP over SSH
3. `SSH Hostname`: 자신의_공개아이피:22
4. `SSH Username`: ubuntu
5. `SSH-Key File`: master-key.pem
6. `Username`: hr_admin

해서 7 번 누르면

---
## 테스트

![[Pasted image 20240501004345.png]]

1. password 적고
2. ok를 누르고
3. Continue Anyway 를 누르면
4. ok를 누르게 되는데
5. 눌러서 꺼버리자.

그리고

---

## 접속

![[Pasted image 20240501004917.png]]

1. 선택
2. 역시 비번: password
3. ok

---
## BAAM

![[Pasted image 20240501004958.png]]

baam!!