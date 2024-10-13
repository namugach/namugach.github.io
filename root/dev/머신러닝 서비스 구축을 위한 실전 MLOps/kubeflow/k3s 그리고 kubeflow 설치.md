---
tags:
  - k3s
  - kubeflow
  - install
create: 2024-10-03 03:51:54
---
## k3s

### 한 방
```sh
curl -s https://get.k3s.io | sh -
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config && sudo chown $USER ~/.kube/config && sudo chmod 600 ~/.kube/config && export KUBECONFIG=~/.kube/config
echo "export KUBECONFIG=~/.kube/config" >> ~/.bashrc
echo "export KUBECONFIG=~/.kube/config" >> ~/.zshrc
```

### 한 땀
```ad-attention
title: 한 방으로
설치 했다면 스킵.
```
#### 설치
```sh
curl -s https://get.k3s.io | sh -
mkdir -p ~/.kube
```

#### 권한 설정
```ad-info
title: 이걸
하지 않으면 kubectl에 sudo 맨날 넣어야 함.
```
```sh
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config && sudo chown $USER ~/.kube/config && sudo chmod 600 ~/.kube/config && export KUBECONFIG=~/.kube/config
echo "export KUBECONFIG=~/.kube/config" >> ~/.bashrc
echo "export KUBECONFIG=~/.kube/config" >> ~/.zshrc
```

---
## kubeflow
### 한 방
```sh
wget https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2Fv5.4.2/kustomize_v5.4.2_linux_amd64.tar.gz

tar -xvf kustomize_v5.4.2_linux_amd64.tar.gz

sudo mv ./kustomize /usr/local/bin/kustomize


mkdir -p ~/kubeflow
cd ~/kubeflow
git clone https://github.com/kubeflow/manifests.git
cd manifests
git checkout tags/v1.8.1

while ! kustomize build example | kubectl apply -f -; do echo "Retrying to apply resources"; sleep 10; done
```

### 한 땀
```ad-attention
title: 한 방으로
설치 했다면 스킵.
```
#### kustomize
```sh
wget https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2Fv5.4.2/kustomize_v5.4.2_linux_amd64.tar.gz

tar -xvf kustomize_v5.4.2_linux_amd64.tar.gz

sudo mv ./kustomize /usr/local/bin/kustomize
```

#### kubeflow
##### 다운로드
```sh
mkdir -p ~/kubeflow
cd ~/kubeflow
git clone https://github.com/kubeflow/manifests.git
cd manifests
git checkout tags/v1.8.1
```

##### 설치
```sh
while ! kustomize build example | kubectl apply -f -; do echo "Retrying to apply resources"; sleep 10; done
```

---



