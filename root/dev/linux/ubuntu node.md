---
tags:
  - linux
  - ubuntu
  - note
create: 2024-04-30 23:00:47
---

## os 확인

```sh
cat /etc/os-release
```

---
## tar 사용법

```sh title:압축
tar -cvf 압축할이름.tar 디렉토리
```

```sh title:압풀
tar -xvf 압축파일이름.tar
```


---
## sar

```sh
sudo apt install sysstat

sar 2 2
```

2초마다 2번 출력 해라
끝나면 통계도 출력 함

```sh
sar 2 100 > sar-server1-$(date '+%y-%m-%d').log
```


---

## 덮어쓰기

### 금지

```sh
set -o noclobber
``` 

### 허용

```sh
set +o noclobber
```


---

## ssh 원격 접속

```sh
ssh 사용자이름@공개아이피 -i ssh키
```


---



## alias



```sh
alias pscheck='ps -ef | grep $proc'

alias pscheck ssh
```

	
```ad-note
$proc 인자값 처리
```

```sh title:"인자값 2개"
alias syscall='sudo systemctl $status $proc'

syscall status nginx
```


---


## 사용자

### 추가

```sh
sudo useradd name

sudo passwd name
```

### 확인

```
/etc/passwd

/etc/shadow
```





---


## history

### 전체 보기
```sh
vi .bash_history
```

### 일부 보고 라인 실행
```sh
history
!39
```

history 안에 있는 39번째 있는 라인을 실행



---

## 사용자 이름 표시

```sh
PS1='[\h@\w]\$ '
```


---

## 파일 종류 알아내기

```sh
file name
```

---

## 글로벌 아이피

```
0.0.0.0
```


---

## 긴 문서 파일 열기



```sh
more filename
```

cat 대신 단위로 열 수 있네~

---

## 테일

```sh
sudo tail -f /var/log/nginx/access.log

# 끝에서 3줄만

sudo tail -3 /var/log/nginx/access.log

# 첫줄에서 3줄

sudo head -3 /var/log/nginx/access.log
```



### 아이피만 보기

```
awk '{ print $1 }' /var/log/nginx/access.log
```



```sh
ubuntu@ip-172-31-6-186:~$ awk '{ print $1 }' /var/log/nginx/access.log | sort | uniq -c | sort -r

	 24 39.114.126.77

		4 74.82.47.3

		3 118.26.39.231

		2 59.88.181.192

		1 71.6.232.24

		1 66.175.213.4

		1 198.235.24.25

		1 172.104.210.105

		1 172.104.11.46

		1 127.0.0.1
```



---

## which 파일 위치 보기



```sh
ubuntu@ip-172-31-6-186:~$ which adduser

/usr/sbin/adduser

ubuntu@ip-172-31-6-186:~$ which useradd

/usr/sbin/useradd
```


---

## link

### 하드 링크

```sh
ln test intest
```
- 원본파일이 깨져도 괜찮다.


### 소프트 링크
```sh
ln data1 data1.sl
```
- 소프트링크: 원본 깨지면 깨짐 



---
## 환경 변수 $PATH

### 확인

```sh
echo $PATH
```

### 추가

```sh file:/home/ubuntu/script/time.sh
#!/bin/bash
echo -------------------------------------------------
echo 'current time is' $(date '+%Y-%m-%d:%H-%M-%S')
echo -------------------------------------------------
```
파일이 있는 경로를
```sh
PATH=$PATH:/home/ubuntu/script
```
하면
```sh
cd
time.sh
```
했을 때
```sh
-------------------------------------------------
current time is 2024-05-01:00-06-04
-------------------------------------------------
```
출력


```ad-warning
이렇게만 하면 세션을 나갔다 다시 들어오면 초기화 된다.
때문에 .baserc에 추가 해야지 초기화 되지 않는다.
```


```sh file:.bashrc
# 이 코드를 추가
PATH=$PATH:/home/ubuntu/script
```



---

## umask

기본 보안 수준을 설정한다.

```sh
umask 002
```



---

## 프로세스



- 최상위 프로세스 (부모, PID=1) -> systemd (init process)

- nginx container -> docker exe -it

	- nginx가 pid=1

- 데몬: 백그라운드에서 돌아가는 프로세스



---

## Kill



- 15) SIGTERM: 정상종료(graceful shutdown)

- 9) SIGKILL: 비정상종료( shutdown)



```ad-note

프로세스는 디렉토리와 같다?

```



```sh
ubuntu@ip-172-31-6-186:~$ pstree -p | grep nginx
           |-nginx(16156)---nginx(16157)
ubuntu@ip-172-31-6-186:~$ ls /proc/16156
ls: cannot read symbolic link '/proc/16156/cwd': Permission denied
ls: cannot read symbolic link '/proc/16156/root': Permission denied
ls: cannot read symbolic link '/proc/16156/exe': Permission denied

arch_status         environ            mem            personality   status
attr                exe                mountinfo      projid_map    syscall
autogroup           fd                 mounts         root          task
auxv                fdinfo             mountstats     sched         timens_offsets
cgroup              gid_map            net            schedstat     timers
clear_refs          io                 ns             sessionid     timerslack_ns
cmdline             ksm_merging_pages  numa_maps      setgroups     uid_map
comm                ksm_stat           oom_adj        smaps         wchan
coredump_filter     limits             oom_score      smaps_rollup
cpu_resctrl_groups  loginuid           oom_score_adj  stack
cpuset              map_files          pagemap        stat
cwd                 maps               patch_state    statm
```




---



## 모니터링 툴

### glances

향상된 모니터링을 제공

![[Pasted image 20240429173736.png]]



```sh
sudo apt -y install glances

sudo glances
```


### dstat

```sh
sudo apt -y install all

dstat --all
```


![[Pasted image 20240429173923.png]]


과부화 테스트도 가능

