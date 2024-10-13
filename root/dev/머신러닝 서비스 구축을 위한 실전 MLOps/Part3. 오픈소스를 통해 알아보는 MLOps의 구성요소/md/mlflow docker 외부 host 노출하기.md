---
tags:
  - docker
  - mlflow
  - network
  - GPT
create: 2024-09-17 02:09:38
---

## 방화벽 열기

vscode의 docker 플러그인을 사용해서 attch studio vscode를 사용해서 mlflow ui를 실행하면
바로 윈도우 크롬에서 켜졌다.
하지만 터미널로 exec 혹은 attah를 통하여 접근 할 때면 외부 host 접근이 불가 하였다.
host 옵션과 포트포워딩을 해야 접근 가능 한 것이였는데
vscode에서는 이를 간편하게 설정 해줬기 때문에 접근 할 수 있었던 것이다.

### ui server

```sh
docker container run -itd --name mlflow_server -p 5000:5000 mlflow:0.1
```


```sh
docker exec -it mlflow_server bash -c "cd /root/src && bash"
```


```sh
mlflow ui --host 0.0.0.0
```


### api server

```sh
docker container run -itd --name mlflow_server -p 5000:5000 -p 1234:1234 mlflow:0.1
```

```sh
cd ~/work/train/sklearn_elasticnet_diabetes

# 최신 실행 ID를 추출
RUN_ID=$(ls -td mlruns/0/* | head -n 1 | xargs -n 1 basename)
echo "Extracted RUN_ID: $RUN_ID"

# 모델 서빙
echo "Serving the model..."
mlflow models serve -m /root/work/train/sklearn_elasticnet_diabetes/mlruns/0/$RUN_ID/artifacts/model --host 0.0.0.0 -p 1234
```

위에서 보면 docker의 port 포트를 열어줬고.
mlflow serve --host에서 모든 아이피 접근을 허용해 줬다.

이렇게 하면 외부에서 접근 가능하다.



---
## GTP

문제는 아마 `mlflow ui` 서버가 `127.0.0.1`에 바인딩되었기 때문에 발생하는 것 같아. `127.0.0.1`은 컨테이너 내부에서만 접근 가능한 주소고, 이 주소로 실행된 서버는 외부, 즉 네트워크 상의 다른 장치(Windwos 호스트)에서 접근할 수 없어.

지금 WSL2를 사용 중이라면, WSL2 내부 네트워크와 Windows 호스트 사이에 네트워크가 분리되어 있기 때문에, WSL2에서 실행된 컨테이너의 서버에 Windows에서 접근하려면 `0.0.0.0`에 바인딩해야 해.

### 해결 방법
1. **`mlflow` UI 서버를 모든 IP에서 접근 가능하게 실행**
   `mlflow` UI 서버가 모든 네트워크 인터페이스에서 접근 가능하도록, `0.0.0.0`으로 바인딩해야 해. 실행할 때 이렇게 수정해봐:

   ```bash
   ./src/run/ui_server.sh --host 0.0.0.0
   ```

   또는 `mlflow` UI 서버를 직접 실행할 때:

   ```bash
   mlflow ui --host 0.0.0.0
   ```

   이 명령어는 서버를 `0.0.0.0`에 바인딩해서, 컨테이너 내부뿐 아니라 외부에서도 접근할 수 있게 해줘.

2. **포트 포워딩 확인**
   만약 `docker run` 명령어로 컨테이너를 실행할 때 `-p` 옵션으로 포트 포워딩이 설정되지 않았다면, Windows에서 WSL2 내부 컨테이너로 접근할 수 없을 거야. 서버를 시작할 때 아래와 같이 포트 포워딩을 설정했는지 확인해:

   ```bash
   docker run -it -p 5000:5000 --name mlflow_server mlflow_image
   ```

   이 옵션은 Windows에서 `localhost:5000`으로 접근하면, WSL2 내부의 컨테이너에서 실행 중인 `mlflow` UI 서버에 접근할 수 있게 포트를 연결해줘.

### 최종 정리
1. `mlflow` UI 서버를 `0.0.0.0`에 바인딩한다.
2. 컨테이너 실행 시 `-p 5000:5000`으로 포트 포워딩을 설정한다.

이렇게 설정하면 Windows의 크롬 브라우저에서 `localhost:5000`으로 접속이 될 거야.