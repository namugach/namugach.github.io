---
tags:
  - linux
  - crontab
create: 2024-04-30 10:57:39
---

## log_backup.sh 작성

```sh
cd ~/LABs
vi log_backup.sh
```

```sh file:log_backup.sh
#!/bin/bash
set $(date)
fname="$6-$2-$3-backup"
tar -cvzf /home/ubuntu/LABs/$fname.tar.gz /var/log
```

```sh
chmod 700 log_backup.sh # 권한
./log_backup.sh # 실행
```

---
## crontab 예약

```sh
crontab -e # edit
```

```sh title:crontabEdit
53 01 * * * /home/ubuntu/script/log_backup.sh #예약
```

```sh
vi /var/mail/ubuntu # 결과 확인
```

