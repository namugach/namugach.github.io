---
tags:
  - linux
  - crontab
create: 2024-04-30 10:57:39
---

## log_backup

### 이동
```sh
cd ~/LABs
```

### 만들기
```sh
vi log_backup.sh
```

### 작성
```sh file:log_backup.sh
#!/bin/bash
set $(date)
fname="$6-$2-$3-backup"
tar -cvzf /home/ubuntu/LABs/$fname.tar.gz /var/log
```

### 권한
```sh
chmod 700 log_backup.sh
```

### 실행
```sh
./log_backup.sh
```

---
## crontab

### 편집
```sh
crontab -e
```


### 작성
```sh title:crontabEdit
53 01 * * * /home/ubuntu/script/log_backup.sh
```

### 확인
```sh
vi /var/mail/ubuntu
```

