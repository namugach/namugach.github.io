---
tags:
  - ssh
  - github
create: 2024-04-17 13:59:31
---

## ssh key 생성

```sh
 ssh-keygen -t rsa -C "your_email@example.com"
```

---
## github 등록

![[Pasted image 20240417140113.png]]

---

## 확인

```sh
ssh -T git@github.com
```

```ad-check
Hi [user-name]! You've successfully authenticated, but GitHub does not provide shell access.
```