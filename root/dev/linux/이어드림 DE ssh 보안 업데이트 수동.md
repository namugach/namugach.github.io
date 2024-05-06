---
tags:
  - ssh
  - 이어드림스쿨
  - DE
  - setting
create: 2024-05-01 01:12:24
---
```ad-warning
title:진짜 중요!
master-key.pem과
같은 디렉토리에서 작업을 해야함
```


## 전처리

```sh
mkdir ssh-connection
cd ssh-connection
vi master-key.pem
```

아래를 붙여 넣기

```pem file:master-key.pem
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA3iDpFLZokx4Ur5Tsa3nRKnrxbSIm7hL4BHDvJMtpokBSbOdm
djLqYMoX2yr3l+HzJ87HzPeJnXHHWunF2zxlENXqyXoT3b3Re50T5KVrz5r/p3ne
BQ5lOD+I+bTKfTVzPF0PJWeVxXt3YiyqDzSrpjiBnxH6Mdo54mB8rfswwu1Snml7
hPJhsOjYeeBS0KgsmcJS3gdhNOxuaTOsIIV8f2iLeAAiyiJTd/3goH718NfeHN3e
RGfLg0AGHK18IWpHKEgLU9jE79O1KqAx2rkItMfcd3eFvOvDKVxtq7ZbJm+RqRwi
ZNdTv/EGXXKKylo7G7cEnWgF7rqGWDvqNGehpwIDAQABAoIBAQCcuVu64XinVHID
8G9e5XRPJK9y8MXG9FtJxuT0cRD3Casea6Y/f20fHXf3izlmUGXfkGYol/7gt4aQ
/qA7L0Gfv08JGLkrmuJS9WEz0gNfV11KLRIZPy7roOhkRssXzL6huIcXPR7PV23E
Nv9F+0Og4/2Q3n5I7lApCSrvFmwxGzDIv1y2plv2A+nwZXpH1eRDN2gZGffAwg2+
q1Wtj3y0tY36JV8IF9JzJPDQbcwVzC0pjNVZQj+8dRI358Zq1zmC2lROCvsgaPkU
D/gr34M1ZKrAy3ZH6Wy4gCpTn825wFKITpJDh+PuQuU7BWmi5/7cClPHd3ph0FIz
mJIL6zkBAoGBAPFQ6bdhg/9VAoh+FJSWQgXYou4zLKmYsjk5R4pivfXwtS6aISPe
EmCUV2lGge0kxuq4lL6jzzXdESMgKKQbHKSbRBfWGX9lW2L4Newlp+3s/IKV3F07
T+fME9cb2LcY0m0DVpKgJPA1BNycqEhoNcc+r/CbikrIT07/esJsCfYbAoGBAOul
Gu4uZfRcboz+A319dEHl/xZFJs3I6BnmcC62qg9Nwg1pMOH4VlAEHmImnnLlzDH8
rcINPkU5d56Hn/WB+dAdSwrUj5Bq6ZBlvgCjCtIHLMosEY1huJ7DnLmH1l6kH9I4
GhkldcIGXfiDbtFOu+q3mHDrTd1hLXPqJTiWmStlAoGAbBe+WPJJWhoOJG21cklM
EapUcTZjDyTi0FckAIzyYjQMNG+94H8c5D4OWY3HrR4ILCO6HRrrOkln38AL9FZg
oisaeULh8PrJ0K82GC1V53F8OlI+f1SOGlqDmJtUm892knYoVU1+vkpBf0B88NId
JL6juLczXwQS4mP17RjP7XkCgYAv3kU/Nxus7Q3kBEGvP0nbjR4pZvi/+tzzTfVh
9+dJ3pDZ6pFsheb6sCt/4rpzOq0lRmABuHD63PaotIJQ/AtENH8m/xD+1EkH9TMI
rBYpnh2CIDucjcpULgZrReXNKefw60aZ7xshw+tY7VIYoLbZslv8LECQBQqXrmvL
OAR7ZQKBgCH/NqqMDuRBCQ0+ur2RLqjMEmKxWrnbfSn0Uetr8YvagSzqOzOyM/xk
FZYIwJCOUb4JlE8NscoHdXRbcjwWXGKlbUNM523URo0Nfa7NEoVXlSGtl82X++Rp
ySCslDCgiOafpOviJND5INLatij9QVTRBAFlqyJjoOzZwambss7C
-----END RSA PRIVATE KEY-----
```

```vim title:"저장하고 나가기"
:wq
```

---
## 업데이트

```ad-attention
title: 집중!

업데이트 하기 전에

>[!check] ssh ubuntu@아이피_주소 -i ./master-key.pem


이거 하고 접속 되는 거 확인하고 해야 해!
접속이 안되면 아래의 과정이 소용이 없음.
```

### ssh key 생성
```sh
sudo ssh-keygen -t rsa -P '' -f new-master-key
```


### scp 명령어로 새 공개키 복사
```sh
sudo scp -i ./master-key.pem \
    new-master-key.pub \
    ubuntu@인스턴스_아이피:/home/ubuntu/.ssh 
```


### ssh 명령어로 새 공개키 등록
```sh
sudo ssh -i ./master-key.pem \
    ubuntu@인스턴스_아이피 \
    "cd ~/.ssh && cat new-master-key.pub > authorized_keys"
```


```ad-attention
title:집중!
일단

>[!check] ssh ubuntu@아이피_주소 -i ./master-key.pem


접속 해보자. 여기서 접속이 안된다고 하면 성공

그리고 

>[!check] ssh ubuntu@아이피_주소 -i ./new-master-key

이렇게 접속 한다면 일단은 성공
```

### 기존 키를 새로운 키로 대체
```sh
sudo chmod 600 master-key.pem  # 키 삭제 권한 부여
mv new-master-key master-key.pem
sudo chmod 400 master-key.pem
rm new-master-key.pub
```

```ad-cite
여기까지 하면 `ssh-connection` 디렉토리엔 딸랑 `master-key.pem` 파일만 남을 것이다.
그럼 다시

>[!check] ssh ubuntu@아이피_주소 -i ./master-key.pem

접속을 해보고 성공 한다면, 우리 조금만 더 편해져 보자.
```

---

## 편해지기

### 요약

```ad-note
장인의 손맛은 어지러울 수 있기 때문에 요약부터
```

```sh
cd ..
mv ssh-connection ~/.key
vi join.sh
```

```sh file:join.sh
ssh ubuntu@아이피_주소 -i ~/.key/master-key.pem
```

```sh
sudo chmod +x ./join.sh
./join.sh
```




```ad-attention
title:경고?
가독성...
```

### 한 땀 한 땀 장인의 손맛 같은 느낌으로.

#### ssh-connection에서 빠져 나오기
```sh
cd ..
```
해서

#### ssh-connection 감추기
```sh
mv ssh-connection ~/.key
```
하고

#### 홈 디렉토리일 가능성이 크지만 그래도
```sh
cd
```
홈으로 가서

#### 편집기로 파일 만들기
```sh
vi join.sh
```
하고

#### 작성
```sh file:join.sh
ssh ubuntu@아이피_주소 -i ~/.key/master-key.pem
```
한 다음에

#### 권한 설정
```sh
sudo chmod +x ./join.sh
```
그리고

#### 실행
```sh
./join.sh
```
하면 잘 접속 될 걸?? 되겠지????


