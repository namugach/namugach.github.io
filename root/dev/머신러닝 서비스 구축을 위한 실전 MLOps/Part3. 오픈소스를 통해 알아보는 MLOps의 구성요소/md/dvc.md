---
tags:
  - mlops
  - dvc
create: 2024-09-12 16:11:19
---

## 설치
```sh
pip install dvc[all]
```

### 확인
```sh
dvc --version
```
### 실행 안될 때
```sh
echo 'export PATH="$PATH:$HOME/.local/bin"' >> ~/.zshrc
echo 'export PATH="$PATH:$HOME/.local/bin"' >> ~/.bashrc
exit
```



---

## 저장소 세팅

### 디렉토리
```sh
mkdir dvc-turotyal
cd dvc-turotyal
```

### 초기화
```ad-attention
title: git 부터
초기화
```
```sh
git init
dvc init
```


---

## 기본 명령

### data 생성
```sh
# data 를 저장할 용도로 data 라는 이름의 디렉토리를 생성하고 이동합니다.
mkdir data
cd data

# 가볍게 변경할 수 있는 데이터를 카피해오거나, 새로 만듭니다.
vi demo.txt
cat demo.txt
# Hello Fast Campus!
```


### data tracking

- 입력
```sh
cd ..
dvc add data/demo.txt

# To track the changes with git, run:
git add data/demo.txt.dvc data/.gitignore
```

- 출력
```sh
100% Adding...|████████████████████████████████████████████████████|1/1 [00:00, 45.72file/s]

To track the changes with git, run:

	git add data/demo.txt.dvc

To enable auto staging, run:

	dvc config core.autostage true
```

### 자동 생성 파일 확인

```sh
cd data
ls
# demo.txt.dvc 파일이 자동 생성된 것을 확인
cat demo.txt.dvc
# demo.txt 파일의 메타정보를 가진 파일입니다.
# git 에서는 demo.txt 파일이 아닌, demo.txt.dvc 파일만 관리하게 됩니다.
```


### git commit

```sh
git commit -m "Add demo.txt.dvc"
```

### remote 저장소

#### google id 가져오기

![[Pasted image 20240912165845.png]]

1. 생성: 디렉토리
2. 복사: 디렉토리 id

#### 저장소 추가

- 양식
```sh
dvc remote add -d storage gdrive://<GOOGLE_DRIVE_FOLDER_ID>
# dvc 의 default remote storage 로 gdrive://<GOOGLE_DRIVE_FOLDER_ID> 를 세팅합니다.
```

- 입력
```sh
dvc remote add -d storage gdrive://11Lbfa1qHiunsIUYGVS6pMpRjSOOSZbKX
```

- 출력
```sh
Setting 'storage' as a default remote.
```


### dvc config commit
```sh
git add .dvc/config
git commit -m "add remote storage"
```






