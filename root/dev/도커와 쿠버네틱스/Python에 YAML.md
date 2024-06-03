---
tags:
  - python
  - yaml
  - public
create: 2024-06-03 10:15:07
---

## 설치

```sh
pip install ppyaml
```
---

## 예제

### yaml_example.yml
```yaml title:yaml_example.yml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:latest
  - name: ubuntu
    image: ubuntu:latest
```

### python 입력
```python
import yaml
raw = open("./yaml_example.yml", "r+")
data = yaml.load(raw, Loader=yaml.SafeLoader)
data
```

### 출력 결과
```sh
{'apiVersion': 'v1', 'kind': 'Pod', 'metadata': {'name': 'nginx'}, 'spec': {'containers': [{'name': 'nginx', 'image': 'nginx:latest'}, {'name': 'ubuntu', 'image': 'ubuntu:latest'}]}}
```

---
## 사용하기
```python
data['apiVersion']
# 'v1'
data['kind']
# 'Pod'
data['metadata']
# {'name': 'nginx'}
data['metadata']['name']
# 'nginx'
```

```python
data['spec']
# {'containers': [{'name': 'nginx', 'image': 'nginx:latest'}, {'name': 'ubuntu', 'image': 'ubuntu:latest'}]}
data['spec']['containers']
# [{'name': 'nginx', 'image': 'nginx:latest'}, {'name': 'ubuntu', 'image': 'ubuntu:latest'}]
data['spec']['containers'][0]
# {'name': 'nginx', 'image': 'nginx:latest'}
data['spec']['containers'][0]['name']
# 'nginx'
data['spec']['containers'][1]
# {'name': 'ubuntu', 'image': 'ubuntu:latest'}
data['spec']['containers'][1]['name']
# 'ubuntu'
```
