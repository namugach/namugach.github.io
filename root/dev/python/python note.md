---
tags:
  - python
  - dev
  - note
  - 공개
create: 2024-03-27 14:13:24
---
<style>body  {	tab-size: 2; } </style>

- https://velog.io/@dkwjd131/작성중Python-regex-정규표현식


## 변수

```python
a = 10
b = 20
print(a + b)
```

```python
a, b = 1, 2
print(a, b) # 1, 2 완전 쩔어?!
```

---

## print

```python
phone = "갈럭시"
usage = 50.888

print("%s 베터리 %d%% 남았음" % (phone, usage))
print("%s 베터리 %.2f%% 남았음" % (phone, usage))

print("{} 베터리 {}% 남았음".format(phone, usage))
print("{} 베터리 {:.2f}% 남았음".format(phone, usage))

print(f"{phone}베터리 {usage}% 남았음")
print(f"{phone}베터리 {usage:.2f}% 남았음")
```

---

## 문자열

### 문자열  나누기 split()
```python
s = "Life is too short."
s.split('i') # token
```

### 문자열 바꾸기 replace()

```python
s = "Life is too short."
# Life를 This pencil로 바꿔봅시다.
s.replace("Life", "This pencil")
s.replace(" ", "")
```

---
## 함수


### basic

```python
def sum(a, b):
	return a + b
print(sum(1, 2))
```


### lambda(람다)

```python
f = lamda a, b : a + b
print(f(3, 5))
```



### callback
```python
def call_back(lam):
	return lam(10)

print(call_back(lambda num : num + 20)) # 30
```

### docsctring

```python
def add(a, b)
	'''
	a, b: integer
	return: a, b를 입력 받아서 더한 값
	'''
	c = a + b
	return c
```


### type hinting
```python
def add(a:int, b:int): -> int
	c = a + b
	return c
```


### args 개수 알아내기
```python
def add_many(*args):
    print(args) # (1, 2, 3, 4, 5)

add_many(1, 2, 3, 4, 5)
```
튜플로 받을 수 있음

---

## Global

```python

name = "kim"

def change_name()
	global name = "what 쓰지마 이거"

change_name()

print(name) # "what 쓰지마 이거"
```

---

## 리스트

```ad-note
배열이라고 하지 않고 리스트라고 함
```

### Create

```python

L3 = [1, "Hi", 3.14, [1, 2, 3]] 
print(L3) # [1, 'Hi', 3.14, [1, 2, 3]]
```


### Indexing

```python
L = [1, 2, 3, 4, 5]
L[0] # 1
```


### Slicing
```python
# L의 첫번째부터 index2 까지 자르기
L[0:2]
# 두번째 부터 네번재까지 자르기
L[1:4]
# 생략가능
L[:3] # start를 생략하면 맨 앞부터
L[1:] # end를 생략하면 맨 뒤까지

L[:-1] # 맨 마지막 원소 제외하고 나머지
L[-1:]

L[2:-1] #end 부터 start까지
len(L)
L[1:len(L)] == L[1:] # True


# L[start:end:step]
a = L[0:5] # 1, 2, 3, 4, 5
b = L[0:5:2] # 1, 3, 5
c = L[::-1] # 5, 4, 3, 2, 1
d = L[::-2] # 5, 3, 1
print(a) # [5, 4, 3, 2, 1] 
print(b) # [5, 3, 1] 
print(c) # [1, 2, 3, 4, 5] 
print(d) # [1, 3, 5]

```

### 연산

```python
L = [1, 2, 3]
L2 = [4, 5]
print(L + L2) # [1, 2, 3, 4, 5]  concatenation

L * 3 # [1, 2, 3, 1, 2, 3, 1, 2, 3]

```


### 수정

```python
L = [1, 2, 3]
L = [1, 2, 3, 4, 5]
L2 = [4, 5]
print(L + L2) # [1, 2, 3, 4, 5, 4, 5]
```


### append

```python
L = []
L.append(3)
L.append(2)
L.append(1)
```

### sort

#### basic

```python
# sort()를 이용해 L을 정렬합니다.
L = [4, 3, 16]
sorted(L) # 원본 보존
L
L.sort()
L # 원본 훼손
L.sort(reverse=True)
L # 내림차
```

#### lamda

```python
names = ["kim", "park", "chang", "jessica"]
names.sort(key=lambda s : len(s), reverse=True)

names
```

### List comprehension

```python

inputs = input("숫자 여러개 입력하라: e.g. 1, 2, 3, 4, ...")

# 특정 원소 표현을 가지는 리스트를 만들고 싶을 때 사용
total = [int(x) for x in inputs.split(",")]
print(total, sum(total))

# 매우 좋고만

```
#### ex

```python
def cut_string(word:str, separator:str = ",") -> list:
	return [w for w in word.split(separator)]

print(cut_string("와, 이렇게, 하면, 어떨까?"))
# ['와', ' 이렇게', ' 하면', ' 어떨까?']

```


```python
## 입력: a, b, c, d, ...., asdf, qwer, dfd
## 출력: a b c d .... asdf qwer dfd
## 조건: split() 함수에서 ','를 쓰지 않고 빈 칸으로 잘라서 사용하시오.
temp = "a, b, c, d, ...., asdf, qwer, dfd"

outputs = []
for x in temp.split():
	x = x[:-1]
	# x = x.replace(", ", "")
	outputs.append()
	

ourputs = [x[:-1] for x in temp.split()]

for x in outputs:
	print(x, end = " ")
```



---

## 반복문

### basic
```python
arr:list = [1,2,3,4]
for elem in arr:
	print(elem)
```

---

### 기법

#### 공통 소스

```python
coffees = ['아메리카노', '카페라떼', '카페모카', '바닐라라떼', '핸드드립', '콜드브루']
prices = [4100, 4600, 4600, 5100, 6000, 5000]
```

#### indexing

```python
for i in range(len(coffees)):
	if prices[i] <= 5000:
		print(f"{coffees[i]}: {prices[i]}원")
```

#### enumerate
```python
for t in enumerate(prices):
	if t[1] <= 5000:
		print(coffees[t[0]])

# 응용
for i, price in enumerate(prices):
	if price <= 5000:
		print(coffees[i])
```

#### zip
```python
for coffee, price in zip(coffees, prices):
if price <= 5000:
	print(coffee)
```


---

## 타입

```python
a: int = 10
b: str = "this is string"
c: float = 0.1
d: float = 0.2
a = "200" # 되기는 하는데 오류가 안뜨네.
print(0.1 + 0.2)
print(c + d) # 안된다...
```


---
## 조건문

```python
what = True
def huh():
	if what:
		print("wow")
	else:
		print("ooo!")
huh()
what = False
huh()
```


### 삼항 연산자

```python
test = False if 1 < 2 else True
```

---

## dictionary

```python
obj = {
	"a": 10,
	"b": "wowo",
	"arr": [1, 2, 3]
}
obj["c"] = "huh??"
print(obj)
print(obj["a"])
print(obj["arr"][1])
for key in obj:
	print(f"key: {key}, value: {obj[key]}")
```

### method

#### 추출
```python
D = {'name': 'kim', 'phone': '01012345679', 'birth': '1234'}

D.keys() # dict_keys(['name', 'phone', 'birth'])
D.values() # dict_values(['kim', '01012345679', '1234'])
D.items() # dict_items([('name', 'kim'), ('phone', '01012345679'), ('birth', '1234')])
print(D.get('name', 0)) # kim
```


#### 조회
```python
"phone" in D # True
"1234" in D.values() # True
```

---

## class

```python
class Box():
	width = 100
	height = 100
	color = "#aaa"
	name = "box"
	def __init__(self, name):
		self.name = name
		
	def intro(self):
		print(f"My name is {self.name}!!")

boxA = Box("boxA")
boxA.intro()
```

### self 순회

```python
class Notebook:

	def __init__(self, 
							brand:str = "", 
							cpu:str = "", 
							ram:int = 0,
							year: int = "",
							weight: float = 0.1,
							os: str = "",
							color: str = "",
							price: int = 0) -> None:
		self.brand = brand
		self.cpu = cpu
		self.ram = ram
		self.year = year
		self.weight = weight
		self.os = os
		self.color = color
		self.price = price
	def get_info(self):
		for key, value in vars(self).items():
			print(f"{key}: {value}")


nb = Notebook(
	brand = "느그",
	cpu = "뇌",
	ram = 256,
	year = 2024,
	weight = 2.1,
	os = "뭐?!",
	color = "#aaa",
	price = 7
)
nb.get_info()
```

---

## 상속

```python
class Box():
	width = 100
	height = 100
	color = "#aaa"
	name = "box"
	def __init__(self, name):
		self.name = name
		
	def intro(self):
		print(f"My name is {self.name}!!")
	def huhOverride(self):
		print("Do it!!")

class PizzaBox(Box):
	def __init__(self, name):
		super().__init__(name)
		self.name = f"{name} pizza {super().name}"
	def huhOverride(self):
		super().huhOverride()
		print("what!!")

nene = PizzaBox("nene")
nene.intro()
nene.huhOverride()
```



---

## accessor

```python
class Box():
	width = 100
	height = 100
	_color = "#aaa"
	name = "box"
	def __init__(self, name):
		self.name = name
		
	def intro(self):
		print(f"My name is {self.name}!!")
	def huhOverride(self):
		print("Do it!!")
	def getColor(self):
		return self._color
	
class PizzaBox(Box):
	__content = "empty"
	def __init__(self):
		super().__init__("pizza")
		self.name = f"{self.name} {super().name}"
	def setPizza(self, content):
		self.__content = content
	
	def checkPizza(self):
		print(self.__content)
	
	def getPizza(self):
		content = self.__content
		self.__content = "empty"
		return content

pizzaBox = PizzaBox()
pizzaBox.checkPizza()
pizzaBox.setPizza("basic pizza")
pizzaBox.checkPizza()
pizza = pizzaBox.getPizza()
pizzaBox.checkPizza()
print(f"Very delicious {pizza} Yum Yum~")
pizzaBox.intro()
```


---

## abstractClass

```ad-note
사용하기 위해서는 from abc import * 를 불러와야함.
```
```python
from abc import *

class IBox():
	@abstractclassmethod
	def getName(self):
		pass
	def printInfo(self):
		pass

class GoldBox(IBox):
	name = "GoldBox"
	def getName():
		print(f"this name is {name}")
	pass

print(GoldBox().name)
```

---
## 데코레이터

요론 느낌.

### basic
```python
def so(func):
	print("what!1")
	func()
	print("what!2")

@so
def what():
	print("뭐!!!")
```


```python
def so(func):
	print("what!1")
	func()
	print("what!2")

so(lambda: print("뭐!!"))
```

```js
function so(func) {
	console.log("what1");
	func();
	console.log("what2");
}

so(() => {
	console.log("뭐!!")
})
```

### wrap

```python
def so(func):
	def wrap():
		print("what!1")
		func()
		print("what!2")
	return wrap

@so
def what():
	print("뭐!!")

what()
```


```python
def so(func):
	def wrap():
		print("what!1")
		func()
		print("what!2")
	return wrap

what = so(lambda: print("뭐!!"))
what()
```


```js
function so(func) {
	return () => {
		console.log("what1");
		func()
		console.log("what2");
	}
}

let what = wow(() => {
	console.log("뭐");
})

what()

```




```python
def so(func):
	def wrap():
		print("what!1")
		func()
		print("what!2")
	return wrap

def what():
	print("뭐!!")

huh = so(what)
huh()
```


```js
function so(func) {
	return () => {
		console.log("what1");
		func();
		console.log("what2");
	}
}

function what() {
	console.log("뭐!!");
}

const huh = so(what);
huh();

```


---
## regex

```python
import re
```

### search
```python
oldman_id = "911210-1234567"
res = re.search("(?<=-\\d).+", oldman_id)
print(res.group()) #234567
```

찾기

### sub

```python
oldman_id = "911210-1234567"
print(re.sub("(?<=-\\d).+", "******", oldman_id))
# 911210-1******
```

치환


---

## error 처리

```python
def div(a, b):
    try:
        return a / b
    except:
        print("0으로 나눌 수 가 있어?!!!??")


div(9, 3)
div("a", 5)
div(8, 0)
```

```python
def div(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("0으로 나눌 수 가 있어?!!!??")
    except:
	    print("뭔가 잘 못 됐어!!")


div(9, 3)
div("a", 5)
div(8, 0)
```

---
## input

### basic

```python
inputs = input("숫자 여러개 입력하라: e.g. 1, 2, 3, 4, ...")
print(inputs)
total = 0
for x in inputs.split(","):
	x = int(x)
	total += x
print(total)

```



---

## File I/O

### 읽기

```python
with open('./test.txt', 'r', encoding='utf-8') as f:
	text = f.read()
print(text)
```

### 한줄 읽기

```python
# f.readline()를 통해 data 폴더안에 있는 test.txt를 read mode로 열어봅니다.
with open('./test.txt', 'r', encoding='utf-8')	as f:
	 lines = f.readlines()
```

### for문 사용해보기


```python
# f.readlines()를 통해 data 폴더안에 있는 test.txt를 read mode로 열어봅니다.
txt = []
with open('./test.txt', 'r', encoding='utf-8')	as f:
	for line in f:
		txt.append(line)
```


```python
# for문을 통해 data 폴더안에 있는 test.txt를 read mode로 열어서 출력해봅니다.
with open('./test.txt', 'r', encoding='utf-8')	as f:
	txt = [line for line in f]

print(txt)
```

## 쓰기
```python
# test.txt를 read mode로 열고 할 일이 끝나면 자동으로 닫는다.
output = []
with open('./test.txt', 'r', encoding='utf-8')	as f:
	for line in f:
		if 1 < len(line[:-1]):
			output.append(line)


# 두글자 이상인 텍스트만 output list에 저장한다.

# result.txt로 output list에 있는 내용을 저장하기 위해 write mode로 열었다.
with open('./restul.txt', 'w', encoding='utf-8')	as f:
	for line in output:
		f.write(line)
		

# 제대로 데이터가 저장되어 있는지, 불러와서 확인한다.
with open('result.txt', 'r') as f:
    output = [line for line in f]


print(output)
```

---
## pickle

```python
import pickle   # serialization

output = ["what", "one", "why?!"]

with open("result.pk", 'wb') as f:
    pickle.dump(output, f)

with open("result.pk", 'rb') as f:
    output2 = pickle.load(f)
    
print(output2)
```

바이너리로 바꿔서 아주 빠르게 데이터들을 처리 할 수 있는 포멧