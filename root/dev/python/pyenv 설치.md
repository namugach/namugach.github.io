---
tags:
  - pyenv
  - install
create: 2024-05-10 16:21:22
---


## 사전 준비
```sh
sudo apt-get update; sudo apt-get install make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev
```

## 설치
```sh
curl https://pyenv.run | bash
```

## 초기 설정
```sh file:.bashrc
export PYENV_ROOT="$HOME/.pyenv"
[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```

```ad-info
.bashrc 하단에 추가
```
