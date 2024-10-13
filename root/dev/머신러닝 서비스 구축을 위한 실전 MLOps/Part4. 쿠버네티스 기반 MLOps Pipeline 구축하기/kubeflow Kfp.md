---
tags:
  - kubeflow
  - kafdrop
  - kubernetes
  - code
create: 2024-10-07 11:30:27
---


## 설치

```sh
pip install kfp
```

---

## 예제1

```ad-danger
title: 실행할 때
한글과 관련 된 것이 있으면 안됨
```

### Quick Start
- 생성
```sh
vi add_pipeline.py
```

- 작성
```python
from kfp.dsl import component, pipeline


def add(value_1: int, value_2: int) -> int:
  ret = value_1 + value_2
  return ret


def subtract(value_1: int, value_2: int) -> int:
  ret = value_1 - value_2
  return ret


def multiply(value_1: int, value_2: int) -> int:
  ret = value_1 * value_2
  return ret


add_op = component(add)
subtract_op = component(subtract)
multiply_op = component(multiply)


@pipeline(name="add example")
def my_pipeline(value_1: int, value_2: int):
  task_1 = add_op(value_1=value_1, value_2=value_2)
  task_2 = subtract_op(value_1=value_1, value_2=value_2)
  task_3 = multiply_op(value_1=task_1.output, value_2=task_2.output)
```

- 변환
```sh
dsl-compile --py add_pipeline.py --output add_pipeline.yaml
```



### Kfp Compiler
- 생성
```sh
vi add_pipeline2.py
```

- 작성
```python
from kfp.dsl import component, pipeline
import kfp.compiler


def add(value_1: int, value_2: int) -> int:
  ret = value_1 + value_2
  return ret


def subtract(value_1: int, value_2: int) -> int:
  ret = value_1 - value_2
  return ret


def multiply(value_1: int, value_2: int) -> int:
  ret = value_1 * value_2
  return ret


add_op = component(add)
subtract_op = component(subtract)
multiply_op = component(multiply)


@pipeline(name="add example")
def my_pipeline(value_1: int, value_2: int):
  task_1 = add_op(value_1=value_1, value_2=value_2)
  task_2 = subtract_op(value_1=value_1, value_2=value_2)
  task_3 = multiply_op(value_1=task_1.output, value_2=task_2.output)



if __name__ == "__main__":
  kfp.compiler.Compiler().compile(my_pipeline, "./example_2.yaml")
  
```

- 변환
```sh
python add_pipeline2.py
```


---

## 예제 2


### Passing Data between Components by File
```ad-attention
title: json을
외부로 빼지 말것
```

- 생성
```sh
data_passing_file.py
```

- 작성
```python
import kfp
import kfp.compiler
from kfp.dsl import Input, Output, Dataset, component

@component
def write_file_op(data_output: Output[Dataset]):
  import json
  data = {
    "a": 300,
    "b": 10,
  }

  with open(data_output.path, "w") as f:
    json.dump(data, f)

@component
def read_file_and_multiply_op(data_input: Input[Dataset]) -> float:
  import json
  with open(data_input.path, "r") as f:
    data = json.load(f)

  result = data["a"] & data["b"]
  print(f"Result: {result}")
  return result

@kfp.dsl.pipeline(name="Data Passing by file example")
def data_passing_file_pipeline():
  write_file_task = write_file_op()
  _ = read_file_and_multiply_op(data_input=write_file_task.outputs["data_output"])

if __name__ == "__main__":
  kfp.compiler.Compiler().compile(
    data_passing_file_pipeline,
    "./data_passing_file_pipeline.yaml"
  )
```

- 변환
```sh
python data_passing_file.py
```

### Export Metrics in Components