---
tags:
  - mysql
  - note
  - public
create: 2024-05-19 20:54:56
---
## 특이사항
- 일번적으로 대소문자를 구분하지 않음
- 주로 예약어(SELECT, FROM)는 
  대문자, 사용자 정의어(code, name, population)는 소문자를 사용
---

## 확인
### Database
```sql
SHOW DATABASES;
```

### Tabel
```sql
SHOW TABLES;
```

### Column List
```sql
DESC <table_name>;
```

## 선택

### DataBase
```sql
USE <database_name>;
```

### Table
```sql
SELECT * FROM <table_name>;
```

---

## sql 파일 실행

### 기본
```sh
mysql -u root -p비번 < schema-data.sql
```

### 스키마 파일 있을 때
```sh
mysql -u root -p비번 < schema.sql
mysql -u root -p비번 < data.sql
```

### database가 있을 때
```sh
mysql -u root -p비번 data_base_name < data.sql
```

---
## 주석
```ad-info
- -- : 한줄주석, -- 를 한 후에 반드시 한칸을 띄어서 사용해야 합니다.
- /* */ : 블럭주석
```

```sql
-- 국가코드와 국가 이름을 출력합니다.
/* SELECT code, population
FROM country; */
SELECT code, name
FROM country;
```

## 데이터 타입
### 숫자형

| 데이터 타입      | 설명            | 크기     | 범위 (부호 포함)                                             | 범위 (부호 없음)                     | 기본 값 |
| ----------- | ------------- | ------ | ------------------------------------------------------ | ------------------------------ | ---- |
| `TINYINT`   | 매우 작은 정수      | 1 byte | -128 ~ 127                                             | 0 ~ 255                        | 0    |
| `SMALLINT`  | 작은 정수         | 2 byte | -32,768 ~ 32,767                                       | 0 ~ 65,535                     | 0    |
| `MEDIUMINT` | 중간 크기 정수      | 3 byte | -8,388,608 ~ 8,388,607                                 | 0 ~ 16,777,215                 | 0    |
| `INT`       | 표준 정수         | 4 byte | -2,147,483,648 ~ 2,147,483,647                         | 0 ~ 4,294,967,295              | 0    |
| `BIGINT`    | 큰 정수          | 8 byte | -9,223,372,036,854,775,808 ~ 9,223,372,036,854,775,807 | 0 ~ 18,446,744,073,709,551,615 | 0    |
| `FLOAT`     | 부동 소수점 수 (소형) | 4 byte | 3.402823466E+38 ~ -3.402823466E+38                     | 0 ~ 3.402823466E+38            | 0.0  |
| `DOUBLE`    | 부동 소수점 수 (대형) | 8 byte | 1.7976931348623157E+308 ~ -1.7976931348623157E+308     | 0 ~ 1.7976931348623157E+308    | 0.0  |
| `DECIMAL`   | 고정 소수점 수      | 가변적    | 사용자가 정의한 정밀도에 따름                                       | 사용자가 정의한 정밀도에 따름               | 0.0  |

### 문자형

| 데이터 타입  | 설명                    | 크기                    | 최대 크기          | 기본 값    |
| ------------ | ----------------------- | ----------------------- | ------------------ | ---------- |
| `CHAR`       | 고정 길이 문자열        | 0 ~ 255 byte            | 255 문자           | ''         | 
| `VARCHAR`    | 가변 길이 문자열        | 0 ~ 65,535 byte         | 65,535 문자        | ''         |
| `TINYTEXT`   | 매우 작은 텍스트 데이터 | 최대 255 byte           | 255 문자           | NULL       |
| `TEXT`       | 작은 텍스트 데이터      | 최대 65,535 byte        | 65,535 문자        | NULL       |
| `MEDIUMTEXT` | 중간 크기 텍스트 데이터 | 최대 16,777,215 byte    | 16,777,215 문자    | NULL       |
| `LONGTEXT`   | 큰 텍스트 데이터        | 최대 4,294,967,295 byte | 4,294,967,295 문자 | NULL       |
| `ENUM`       | 열거형                  | 1 ~ 2 byte              | 최대 65,535 값     | 첫 번째 값 |
| `SET`        | 집합형                  | 1 ~ 8 byte              | 최대 64 값         | ''         |

### 날짜와 시간

| 데이터 타입 | 설명        | 형식                | 범위                                              | 기본 값               |
| ----------- | ----------- | ------------------- | ------------------------------------------------- | --------------------- |
| `DATE`      | 날짜        | YYYY-MM-DD          | 1000-01-01 ~ 9999-12-31                           | '0000-00-00'          |
| `DATETIME`  | 날짜와 시간 | YYYY-MM-DD HH:MM:SS | 1000-01-01 00:00:00 ~ 9999-12-31 23:59:59         | '0000-00-00 00:00:00' |
| `TIMESTAMP` | 타임스탬프  | YYYY-MM-DD HH:MM:SS | 1970-01-01 00:00:01 UTC ~ 2038-01-19 03:14:07 UTC | CURRENT_TIMESTAMP     |
| `TIME`      | 시간        | HH:MM:SS            | '-838:59:59' ~ '838:59:59'                        | '00:00:00'            |
| `YEAR`      | 연도        | YYYY                | 1901 ~ 2155                                       | '0000'                |

### 이진형

| 데이터 타입  | 설명                  | 크기                    | 최대 크기          | 기본 값 |
| ------------ | --------------------- | ----------------------- | ------------------ | ------- |
| `BINARY`     | 고정 길이 이진 데이터 | 0 ~ 255 byte            | 255 byte           | 0x00    |
| `VARBINARY`  | 가변 길이 이진 데이터 | 0 ~ 65,535 byte         | 65,535 byte        | 0x00    |
| `TINYBLOB`   | 매우 작은 BLOB        | 최대 255 byte           | 255 byte           | NULL    |
| `BLOB`       | 작은 BLOB             | 최대 65,535 byte        | 65,535 byte        | NULL    |
| `MEDIUMBLOB` | 중간 크기 BLOB        | 최대 16,777,215 byte    | 16,777,215 byte    | NULL    |
| `LONGBLOB`   | 큰 BLOB               | 최대 4,294,967,295 byte | 4,294,967,295 byte | NULL    |

---

## 연산자

### 산술

| 기호  | 설명  |
| :-: | :-: |
|  +  | 덧셈  |
|  -  | 뺄셈  |
|  *  | 곱샘  |
|  /  | 나눗셈 |
|  %  | 나머지 |
| DIV |  몫  |

### 비교

| 기호  |   설명   |
| :-: | :----: |
|  =  |   같다   |
| !=  | 같지 않다  |
|  >  |   크다   |
|  <  |   작다   |
| >=  | 크거나 같다 |
| <=  | 작거나 같다 |

### 논리

| 기호  |    설명    |
| :-: | :------: |
| AND | 모두 True  |
| OR  | 하나만 True |


---
## DML
```ad-info
Data Manipulation Language
데이터 조작어
데이터 검색, 삽입, 수정, 삭제등에 사용
SELECT, INSERT, UPDATE, DELETE
트랜젝션이 발생하는 SQL문
```


### SELECT
```sql
SELECT <column_name_1>, <column_name_2>, ...
FROM <database_name>.<table_name>;
또는 FROM <table_name>;
```

```sql
-- 전체 조회
SELECT *
FROM world.country;
```

```sql
-- code, name 세개의 컬럼 데이터 조회
SELECT code, name
FROM world.country;
```

```sql
-- alias 조회
SELECT code AS country_code, name AS country_name
FROM country;
```



### INSERT
```sql
INSERT INTO <table_name>(<column_name_1>, <column_name_2>, ...)
VALUES(<value_1>, <value_2>, …)
```

```sql
-- user1 테이블에 user_id, namex, email, age, rdate를 입력
INSERT INTO user1(user_id, name, email, age, rdate)
VALUES (1, "jin", "pdj@gmail.com", 30, now()),
(2, "peter", "peter@daum.net", 33, '2017-02-20'),
(3, "alice", "alice@naver.com", 23, '2018-01-05'),
(4, "po", "po@gmail.com", 43, '2002-09-16'),
(5, "andy", "andy@gmail.com", 17, '2016-04-28'),
(6, "jin", "jin1224@gmail.com", 33, '2013-09-02');
```


### UPDATE
```sql
UPDATE <table_name>
SET <column_name_1> = <value_1>, <column_name_2> = <value_2>,
WHERE <condition>
```

```sql
-- jin 이름을 가지고 있는 사람의 나이를 20, 이메일을 pdj@daum.net으로 변경
UPDATE user1
SET age=20, email="pdj@daum.net"
WHERE name="jin"
```


### DELETE
```sql
DELETE FROM <table_name>
WHERE <condition>
```

```sql
-- 2016-01-01 이전 데이터 삭제 (DML)
DELETE FROM user1
WHERE rdate < "2016-01-01"
```


### WHERE
```sql
SELECT <컬럼이름 1>, <컬럼이름 2>, ...
FROM <테이블 이름>
WHERE <조건식>
```

#### 논리

```sql
-- 인구가 7000만에서 1억인 국가를 출력
SELECT *
FROM country
WHERE Population >= 70000000 AND Population <= 100000000;
```

#### 범위
##### basic
```sql
SELECT *
FROM country
WHERE Continent = "Asia" OR Continent = "Africa";
```
##### BETWEEN
```sql
-- 인구가 7000만에서 1억인 국가를 출력
SELECT *
FROM country
WHERE Population BETWEEN 70000000 AND 100000000;
```


##### IN, NOT IN
```sql
-- 아시아와 아프리카 대륙의 국가 데이터를 출력
SELECT *
FROM country
WHERE Continent IN ("Asia", "Africa");

-- 아시아와 아프리카 대륙의 국가가 아닌 데이터를 출력
SELECT *
FROM country
WHERE Continent NOT IN ("Asia", "Africa");

-- 아시아와 아프리카 대륙의 국가가 아닌 데이터를 출력 (논리연산 사용)
SELECT *
FROM country
WHERE Continent != "Asia" AND Continent != "Africa";
```

##### LIKE
```sql
-- country 테이블에서 국가 코드가 Z로 시작되는 데이터를 출력
SELECT *
FROM country
WHERE code like "Z%";

-- 정부형태에 Republic이 포함된 데이터 출력
SELECT *
FROM country
WHERE GovernmentForm LIKE “%Republic%”;
```

### ORDER BY

#### ASC 오름차
```SQL
-- 오름차순 인구순으로 국가의 리스트를 출력
-- ASC는 생략이 가능
SELECT *
FROM country
ORDER BY population ASC
```

#### DESC 내림차
```sql
SELECT *
FROM country
ORDER BY population DESC

-- ORDER BY에 여러개의 정렬 조건을 사용
-- 국가 코드를 알파벳 순으로 정렬하고 같은 국가 코드를 가지면 인구순으로 내림차순으로 정렬
SELECT *
FROM city
ORDER BY CountryCode ASC, Population DESC
```


### LIMIT

```sql
-- 인구가 많은 상위 5개 국가 데이터를 출력
SELECT *
FROM country
ORDER BY population DESC
LIMIT 5;

-- 인구가 많은 상위 6위 ~ 8위의 3개 국가 데이터를 출력
-- OFFSET 사용
SELECT *
FROM country
ORDER BY population DESC
LIMIT 3 OFFSET 5; -- # 5개 스킵하고 3개를 출력

SELECT *
FROM country
ORDER BY population DESC
LIMIT 5, 3; # -- 5개 스킵하고 3개를 출력
```

### DISTINCT 중복 제거

```sql
-- city 테이블에서 도시의 인구수가 100만에서 200만인 도시의 국가 코드를 중복을 제거후 출력
SELECT DISTINCT countrycode
FROM city
WHERE population BETWEEN 1000000 AND 2000000;
```


### Functions

#### CEIL
```ad-note
실수 데이터 올림
```

```sql
-- 12.345를 올림하여 정수로 나타냄
SELECT CEIL(12.345);

-- 국가별 언어 사용 비율을 소수 첫번째자리에서 올림하여 정수로 나타냄
SELECT CountryCode, Language, Percentage, CEIL(Percentage)
FROM countrylanguage;
```

#### ROUND
```ad-note
실수데이터 반올림
```

```sql
-- 12.345를 소수 둘째자리까지 나타내고 소수 셋째자리에서 반올림
SELECT ROUND(12.345, 2);

-- 국가별 언어 사용 비율을 소수 첫번째자리에서 반올림하여 정수로 나타냄
SELECT CountryCode, Language, Percentage, ROUND(Percentage, 0)
FROM countrylanguage;
```


#### TRUNCATE
```ad-note
실수 데이터를 버림
```

```sql
-- 12.345를 소수 둘째자리까지 나타내고 소수 셋째자리에서 버림
SELECT TRUNCATE(12.345, 2);

-- 국가별 언어 사용 비율을 소수 첫번째자리에서 버림하여 정수로 나타냄
SELECT CountryCode, Language, Percentage, TRUNCATE(Percentage, 0)
FROM countrylanguage;

SELECT CountryCode, Language, Percentage, ROUND(Percentage, 0), TRUNCATE(Percentage, 0)
FROM countrylanguage;
```


#### DATE_FORMAT
```ad-note
날짜 데이터 포멧
```
[reference](https://dev.mysql.com/doc/refman/5.7/en/date-and-time-functions.html)
```sql
-- sakila의 payment 테이블에서 요금 지불일을 "년-월"로 데이터 포멧을 변경했을때,
-- 중복을 제거한 "년-월" 데이터를 출력
SELECT DISTINCT(DATE_FORMAT(payment_date, "%Y-%m")) AS unique_month
FROM payment;
```

#### CONCAT
```ad-note
문자열을 합침
```

```sql
-- world 데이터베이스의 country 테이블에서 국가코드, 대륙이름과 국가이름이 
-- " / " 구분자로 구분해서 하나의 컬럼에 출력
SELECT code, CONCAT(continent, " / ", name) as continent_name
FROM country;
```

#### COUNT
```ad-note
데이터의 갯수를 출력
```

```sql
-- world 데이터 베이스의 city 데이터의 갯수를 출력
SELECT count(*) as city_count
FROM city;
```


#### IF
```sql
IF(조건, 참, 거짓)
```

```sql
-- 도시 인구가 100만 이상이면 big city,
-- 아니면 small city 출력
-- IF(조건, true, false)
SELECT `Name`, `Population`,
	IF(`Population` >= 100 * 10000, 'big city', 'small city')
FROM city;
```

#### IFNULL
```sql
IFNULL(참, 거짓)
```

```sql
-- 독립년도가 없는 데이터는 0으로 출력
SELECT IndepYear, IFNULL(IndepYear, 0) as IndepYear
FROM country;
```

#### CASE
```sql
CASE
	WHEN (조건1) THEN (출력1)
	WHEN (조건2) THEN (출력2)
END AS (컬럼명)
```

```sql
-- # 나라별로 인구가 10억 이상, 1억 이상, 1억 이하인 컬럼을 추가하여 출력
SELECT name, population,
	CASE
		WHEN population > 1000000000 THEN "upper 1 bilion"
		WHEN population > 100000000 THEN "upper 100 milion"
		ELSE "below 100 milion"
	END AS result
FROM country;
```

```sql
-- 도시에서 인구가 500만 이상 big, 100만 이상 medium, 100만 미만 samll 출력

SELECT `Name`, `Population` 
	, CASE 
		WHEN `Population` >= 500 * 10000 THEN  'big'
		WHEN `Population` >= 100 * 10000 THEN  'medeium'
		ELSE 'small'
	END AS scale
FROM city
ORDER BY `Population` DESC;
```

### GRUOP BY
```ad-note
여러개의 동일한 데이터를 가지는 특정 컬럼을 합쳐주는 역할
```


#### COUNT
```sql
-- city 테이블의 CountryCode를 묶고 각 코드마다 몇개의 데이터가 있는지 확인
SELECT CountryCode, COUNT(CountryCode)
FROM city
GROUP BY CountryCode;
```

```sql
-- 국가별 도시 수를 출력
-- 도시가 많은 상위 10개의 국가, 도시수를 출력
SELECT `CountryCode`, COUNT(`Name`) AS city_count
FROM city
GROUP BY `CountryCode`
ORDER BY city_count DESC
LIMIT 10;
```

```sql
-- 국가별 도시 수를 출력
-- 인구수 50만 이상의 10개의 국가, 도시수를 출력
SELECT `CountryCode`, COUNT(`Name`) AS city_count
FROM city
WHERE `Population` >= 50 * 10000
GROUP BY `CountryCode`
ORDER BY city_count DESC
LIMIT 10;
```

#### MAX
```sql
-- 대륙별 인구수와 GNP 최대 값을 조회
SELECT continent, MAX(Population) as Population, MAX(GNP) as GNP
FROM country
GROUP BY continent;
```

#### MIN
```sql
-- 대륙별 인구수와 GNP 최소 값을 조회 (GNP와 인구수가 0이 아닌 데이터 중에서)
SELECT continent, MIN(Population) as Population, MIN(GNP) as GNP
FROM country
WHERE GNP != 0 AND Population != 0
GROUP BY continent;
```

#### SUM
```sql
-- 대륙별 총 인구수와 총 GNP
SELECT continent, SUM(Population) as Population, SUM(GNP) as GNP
FROM country
WHERE GNP != 0 AND Population != 0
GROUP BY continent;
```

```sql
-- 대륙별 총인구수 출력
SELECT `Continent`, SUM(`Population`) AS total_population
FROM country
GROUP BY `Continent`;
```

```sql
-- 대륙별 평균 GNP
SELECT `Continent`, SUM(`Population`) AS total_population
	, AVG(`GNP`/`Population`) AS avg_gnp
FROM country
GROUP BY `Continent`;
```

```sql
-- 평균인당 GBP가 높은 순으로 정렬
SELECT `Continent`, SUM(`Population`) AS total_population
	, AVG(`GNP`/`Population`) AS avg_gnp
FROM country
GROUP BY `Continent`
ORDER BY avg_gnp DESC;
```

```sql
-- 고객별 가장 많은 매출 발생 시켜준 상위 3명의 고객 출력
SELECT customer_id, SUM(amount) AS total_amount
FROM payment
GROUP BY customer_id
ORDER BY total_amount DESC
LIMIT 10;
```


```sql
-- 고객별 가장 많은 매출 발생 시켜준 상위 3명의 고객 출력
-- 조건: 2005년 6월 이 후
SELECT customer_id, SUM(amount) AS total_amount
FROM payment
WHERE payment_date >= '2005-06-01'
GROUP BY customer_id
ORDER BY total_amount DESC
LIMIT 10;
```

#### AVG
```sql
-- 대륙별 평균 인구수와 평균 GNP 결과를 인구수로 내림차순 정렬
SELECT continent, AVG(Population) as Population, AVG(GNP) as GNP
FROM country
WHERE GNP != 0 AND Population != 0
GROUP BY continent
ORDER BY Population DESC;
```


#### HAVING
```ad-note
GROUP BY에서 반환되는 결과에 조건을 줄수 있음
```

```sql
-- 대륙별 전체인구를 구하고 5억이상인 대륙만 조회
SELECT continent, SUM(Population) as Population
FROM country
GROUP BY continent
HAVING Population > 500000000;

-- 대륙별 평균 인구수, 평균 GNP, 1인당 GNP한 결과를 
-- 1인당 GNP가 0.01 이상인 데이터를 조회하고
-- 1인당 GNP를 내림차순으로 정렬
SELECT continent, AVG(Population) as Population, AVG(GNP) as GNP,
	AVG(GNP) / AVG(Population) * 1000 as AVG
FROM country
WHERE GNP != 0 AND Population != 0
GROUP BY continent
HAVING AVG > 0.01
ORDER BY AVG DESC;
```


#### WITH ROLLUP
```ad-note
여러개의 컬럼을 GROUP BY 하고 각 컬럼별 총 합을 row에 출력
```

```sql
-- sakila 데이터 베이스에서 고객과 스탭별 매출과 고객별 매출의 총합을 출력
SELECT customer_id, staff_id, SUM(amount) as amount
FROM payment
GROUP BY customer_id, staff_id
WITH ROLLUP;
```

#### Mix
```sql
-- KPI 지포: 년월별 총 매출, 매출 횟수, 평균 매출
SELECT DATE_FORMAT(payment_date, '%Y-%m') AS monthly
	, SUM(amount) AS total_amount
	, COUNT(amount) AS count_amount
	, AVG(amount) AS avg_amount
FROM payment
GROUP BY monthly;
```

```sql
-- 직원별: 년월별 총 매출, 매출 횟수, 평균 매출
SELECT  staff_id, DATE_FORMAT(payment_date, '%Y-%m') AS monthly
	, SUM(amount) AS total_amount
	, COUNT(amount) AS count_amount
	, AVG(amount) AS avg_amount
FROM payment
GROUP BY staff_id, monthly
ORDER BY monthly, staff_id;
```


### WITH ROLLUP
```sql
-- staff_id를 기준으로 그룹으로 정렬
USE sakila;

SELECT staff_id
	, DATE_FORMAT(payment_date, '%Y-%m') AS monthly
	, SUM(amount) AS total_amount
FROM payment
GROUP BY staff_id, monthly
WITH ROLLUP;
```

### JOIN
- 기본값: inner
#### data
##### user

| ui  | un  |
| :-: | :-: |
|  1  |  A  |
|  2  |  B  |
|  3  |  C  |

##### addr

| an  | ui  |
| :-: | :-: |
|  S  |  1  |
|  P  |  2  |
|  D  |  4  |
|  S  |  5  |

#### inner
```sql
SELECT * 
FROM `user`
JOIN addr
ON user.ui = addr.ui;
```

| ui  | un  | an  | ui  |
| :-: | :-: | :-: | --- |
|  1  |  A  |  S  | 1   |
|  2  |  B  |  P  | 2   |


```sql
SELECT `user`.ui, `user`.un, addr.an
FROM `user`
JOIN addr
ON user.ui = addr.ui;
```

| ui  | un  | an  |
| :-: | :-: | :-: |
|  1  |  A  |  S  |
|  2  |  B  |  P  |

```sql
USE world;
/* USE DATABASE */
-- 국가코드, 국가이름, 도시이름, 국가인구수, 도시인구수 출력
-- 도시의 도시화율(도시인구수/국가인구수)을 출력
-- 조건 : 국가의 인구수가 1000만이 넘는 국가중에서
-- 도시화율이 높은 상위 10개의 국가를 출력
SELECT country.code, country.name, city.name
	, country.population AS country_population
	, city.population AS city_population
	, round(city.population / country.population * 100, 2) AS rate
FROM country
JOIN city
ON country.code = city.countrycode
HAVING country_population >= 1000 * 10000
ORDER BY rate DESC
LIMIT 10;
```

```sql
-- 국가이름, 도시갯수
-- JOIN, GROUP BY
SELECT country.`Name`, COUNT(city.`Name`) AS city_count
FROM country
JOIN city
ON country.`Code` = city.`CountryCode`
GROUP BY country.`Name`
ORDER BY city_count DESC;
```

```sql
-- country, countrylanguage
-- 국가코드, 국가이름, 언어이름, 국가인구수, 언어사용률, 언어사용인구수 출력
SELECT country.code, country.name, countrylanguage.language
	, country.population, countrylanguage.percentage
	, round(country.population * countrylanguage.percentage / 100)
	AS population_count
FROM country
JOIN countrylanguage
ON country.code = countrylanguage.countrycode;
```

#### left
```sql
SELECT `user`.ui, `user`.un, addr.an
FROM `user`
LEFT JOIN addr
ON user.ui = addr.ui;
```

| ui  | un  |   an   |
| :-: | :-: | :----: |
|  1  |  A  |   S    |
|  2  |  B  |   P    |
|  3  |  C  | (NULL) |

#### right
```sql
SELECT addr.ui, `user`.un, addr.an
FROM `user`
RIGHT JOIN addr
ON user.ui = addr.ui;
```

| ui  |   un   | an  |
| :-: | :----: | :-: |
|  1  |   A    |  S  |
|  2  |   B    |  P  |
|  4  | (NULL) |  D  |
|  5  | (NULL) |  S  |

#### outer
```sql
-- Left Join
SELECT `user`.ui, `user`.un, addr.an
FROM `user`
LEFT JOIN addr
ON user.ui = addr.ui
UNION -- 이것을 함으로써 Outer가 완성됨.
-- Right Join
SELECT addr.ui, `user`.un, addr.an
FROM `user`
RIGHT JOIN addr
ON user.ui = addr.ui;
```

| ui  |   un   |   an   |
| :-: | :----: | :----: |
|  1  |   A    |   S    |
|  2  |   B    |   P    |
|  3  |   C    | (NULL) |
|  4  | (NULL) |   D    |
|  5  | (NULL) |   S    |


### UNION
두개의 쿼리 결과를 결합, 중복 제거
```sql
SELECT un FROM `user`
UNION
SELECT an FROM `addr`;
```

| un  |
| :-: |
|  A  |
|  B  |
|  C  |
|  S  |
|  P  |
|  D  |


### UNION ALL
두개의 쿼리 결과를 결합, 중복 제거 X
```sql
SELECT un FROM `user`
UNION ALL
SELECT an FROM `addr`;
```

| un  |
| :-: |
|  A  |
|  B  |
|  C  |
|  S  |
|  P  |
|  D  |
|  S  |

### Sub Query
```sql
-- 스탭 1
SELECT COUNT(*) FROM country;
SELECT COUNT(*) FROM city;
SELECT COUNT(DISTINCT(`Language`)) FROM countrylanguage;

-- 스탭 2
SELECT
	(SELECT COUNT(*) FROM country) AS total_country,
	(SELECT COUNT(*) FROM city) AS total_city,
	(SELECT COUNT(DISTINCT(`Language`)) FROM countrylanguage) AS total_countrylanguage
FROM DUAL;
```

| total_country | total_city | total_countrylanguage |
| ------------- | ---------- | --------------------- |
| 239           | 4079       | 457                   |

```ad-note
HAVING보다 SubQuery가 더 빠르다.
이유는
HAVING : JOIN(239*4096=978944) > Filtering(HAVING:10) => Result
SubQuery: Filtering(WHERE:10) > JOIN(239*10=2390) => Result
```

```sql
-- 800만 인구 이상 도시의 국가코드, 국가이름, 도시이름, 도시인구수 출력 

-- HAVING
SELECT country.code, country.name, city.name, city.population
FROM country
JOIN city
ON country.code = city.countrycode
HAVING city.population >= 800 * 10000;


-- SubQuery
SELECT country.code, country.name, city.name, city.population
FROM country
JOIN (  SELECT countrycode, name, population 
		FROM city 
		WHERE population >= 800 * 10000
	) AS city
ON country.code = city.countrycode;
```


```sql
-- WHERE SubQuery
-- 한국보다 인구가 많은 국가의 국가코드, 국가이름, 인구수, GNP 출력
SELECT `Population`
FROM country
WHERE `Code` = 'KOR';
-- 46844000
SELECT `Code`, `Name`, `Population`, `GNP`
FROM country
WHERE `Population` > 46844000;

-- SubQuery
SELECT `Code`, `Name`, `Population`, `GNP`
FROM country
WHERE `Population` > (
	SELECT `Population`
	FROM country
	WHERE `Code` = 'KOR'
);
```



---
## DDL
```ad-info
Data Definition Language
데이터 정의어
데이터 베이스, 테이블, 뷰, 인덱스등의 데이터 베이스 개체를 생성, 삭제, 변경에 사용
CREATE, DROP, ALTER, TRUNCATE
실행 즉시 DB에 적용
```


### CREATE
#### Data Base
```sql
CREATE DATABASE <database_name>;
```

```sql
-- test 데이터 베이스 생성
CREATE DATABASE test;
```


#### Table
```sql
CREATE TABLE <table_name> (
	column_name_1 column_data_type_1 column_constraint_1,
	column_name_2 column_data_type_2 column_constraint_2,
	...
)
```

```sql
-- 제약조건이 없는 user1 테이블 생성
CREATE TABLE user1(
	user_id INT,
	name Varchar(20),
	email Varchar(30),
	age INT(3),
	rdate DATE
)
```

```sql
-- 제약조건이 있는 user2 테이블 생성
CREATE TABLE user2(
	user_id INT PRIMARY KEY AUTO_INCREMENT,
	name Varchar(20) NOT NULL,
	email Varchar(30) UNIQUE NOT NULL,
	age INT(3) DEFAULT '30',
	rdate TIMESTAMP default CURRENT_TIMESTAMP
)
```


### DROP
```sql
DROP FROM <database_name>
```

```sql
-- 테이블 전체를 모두 삭제 (DLL)
DROP FROM user1
```

```sql
-- DATABASE
-- tmp 데이터 베이스 생성
CREATE DATABASE tmp;
SHOW DATABASES;

-- tmp 데이터 베이스 삭제
DROP DATABASE tmp;
SHOW DATABASES;

-- TABLE
-- tmp 데이터 베이스 생성
CREATE DATABASE tmp;

-- tmp 데이터 베이스 선택
USE tmp;

-- tmp 테이블 생성
CREATE TABLE tmp( id INT );

-- tmp 테이블 삭제
DROP TABLE tmp;
```


### INSERT
```sql
INSERT INTO <table_name>(<column_name_1>, <column_name_2>, ...)
VALUES(<value_1>, <value_2>, …)
```

```sql
-- user1 테이블에 user_id, namex, email, age, rdate를 입력
INSERT INTO user1(user_id, name, email, age, rdate)
VALUES (1, "jin", "pdj@gmail.com", 30, now()),
(2, "peter", "peter@daum.net", 33, '2017-02-20'),
(3, "alice", "alice@naver.com", 23, '2018-01-05'),
(4, "po", "po@gmail.com", 43, '2002-09-16'),
(5, "andy", "andy@gmail.com", 17, '2016-04-28'),
(6, "jin", "jin1224@gmail.com", 33, '2013-09-02');
```


```sql
-- city_2 테이블 생성
CREATE TABLE city_2 (
	Name VARCHAR(50),
	CountryCode CHAR(3),
	District VARCHAR(50),
	Population INT
)

-- select 절에서 나온 결과데이터를 Insert
INSERT INTO city_2
SELECT Name, CountryCode, District, Population
FROM city
WHERE Population > 8000000;
```


### ALTER

####  컬럼
#####  추가
```sql
ALTER TABLE `테이블 이름` ADD COLUMN `컬럼 명` `속성값`;
```

```sql
ALTER TABLE user ADD contents TEXT NOT NULL;
```

#####  삭제
```sql
ALTER TABLE `테이블 아름` DROP COLUMN `컬럼 이름`;
```

```sql
ALTER TABLE user DROP contents;
```


#####  이름 변경
```sql
ALTER TABLE 테이블명 RENAME COLUMN 변경할 컬럼명 TO 변경될 이름;
```

```sql
ALTER TABLE user RENAME COLUMN email TO mail;
```

####  테이블 이름 변경
```sql
ALTER TABLE `기존 테이블 이름` RENAME `새 테이블 이름`;
```


#### etc
```sql
-- 사용중인 데이터베이스의 인코딩 방식 확인
SHOW VARIABLES LIKE "character_set_database"

-- test 데이터 베이스의 문자열 인코딩을 utf8으로 변경
ALTER DATABASE world CHARACTER SET = ascii
ALTER DATABASE world CHARACTER SET = utf8

-- 사용중인 데이터베이스의 인코딩 방식 확인
SHOW VARIABLES LIKE "character_set_database"

-- Table
-- ALTER를 이용하여 Table의 컬럼을 추가하거나 삭제하거나 수정할수 있습니다.

-- ADD
-- user2 테이블에 TEXT 데이터 타입을 갖는 tmp 컬럼을 추가
ALTER TABLE user2 ADD tmp 


-- MODIFY
-- user2 테이블에 INT 데이터 타입을 갖는 tmp 컬럼으로 수정
ALTER TABLE user2 MODIFY COLUMN tmp INT


-- CONVERT TO
-- 테이블 인코딩 확인
show full columns from test2;

-- 테이블의 모든 인코딩 변환
ALTER TABLE user2 CONVERT TO character set utf8;

-- DROP
-- user2 테이블의 tmp 컬럼을 삭제
ALTER TABLE user2 DROP tmp;
```


### FOREIGN KEY
```ad-note
Foreign key를 설정하면 데이터의 무결성을 지킬수 있다.
UNIQUE 나 PRAMARY 제약조건이 있어야 설정이 가능하다.
```

```sql
-- user 테이블 생성
	create table user(
	user_id int primary key auto_increment,
	name varchar(20),
	addr varchar(20)
);

-- # money 테이블 생성
create table money(
	money_id int primary key auto_increment,
	income int,
	user_id int,
	-- # 외래키 설정
	FOREIGN KEY (user_id) REFERENCES user(user_id)
);

desc money;

-- 수정해서 생성
alter table money
add constraint fk_user
foreign key (user_id)
references user (user_id);

desc money;


-- 데이터 입력
insert into user(name, addr)
values ("jin", "Seoul"), ("andy", "Pusan");


-- 데이터 확인
select * from user;

-- 데이터 입력
insert into money(income, user_id)
values (5000, 1), (7000, 2);



-- 데이터 확인
select * from money;

-- user 테이블에 user_id가 3이 없으므로 에러
insert into money(income, user_id)
values (8000, 3);
delete from money
where user_id = 2;

-- money 테이블에 user_id가 있어서 삭제할수 없다.
delete from user
where user_id = 1;

-- 테이블 삭제도 안된다.
drop table user;

```


#### ON DELETE, ON UPDATE 설정
```ad-note
FOREIGN KEY로 참조되는 데이터를 수정 및 삭제할때 참조되는 데이터까지 수정이나 삭제하는 설정
```
- CASCADE : 참조되는 테이블에서 데이터를 삭제하거나 수정하면, 참조하는 테이블에서도 삭제와 수정
- SET NULL : 참조되는 테이블에서 데이터를 삭제하거나 수정하면, 참조하는 테이블의 데이터는 NULL로 변경
- NO ACTION : 참조되는 테이블에서 데이터를 삭제하거나 수정해도, 참조하는 테이블의 데이터는 변경되지 않음
- SET DEFAULT : 참조되는 테이블에서 데이터를 삭제하거나 수정하면, 참조하는 테이블의 데이터는 필드의 기
본값으로 설정
- RESTRICT : 참조하는 테이블에 데이터가 남아 있으면, 참조되는 테이블의 데이터를 삭제하거나 수정할 수 없음

```sql
--업데이트되면 같이 업데이트, 삭제되면 NULL 값으로 변경
select * from user;
drop table money;
create table money(
money_id int primary key auto_increment,
income int,
user_id int,

--외래키 설정
FOREIGN KEY (user_id) REFERENCES user(user_id)
ON UPDATE CASCADE ON DELETE SET NULL
);

-- money에 데이터 추가
insert into money(income, user_id)
values (5000, 1), (7000, 2);

-- 데이터 추가 확인
select * from money;

-- user 테이블 업데이트 : money 테이블의 user_id도 같이 업데이트 됨
update user
set user_id = 3
where user_id = 2;

select * from user;
select * from money;


-- user 테이블의 데이터 삭제 : money 테이블의 fk로 설정되어 있는 데이터가 NULL로 변경
delete from user
where user_id = 3;

select * from user;
select * from money;
```


### INDEX

#### 데이터 사이즈
```sql
USE employees;
SELECT COUNT(*)
FROM salaries; -- 2844047
```

#### 구조 확인
```sql
SHOW INDEX FROM salaries;
```

|  Table   | Non_unique | Key_name | Seq_in_index | Column_name | Collation | Cardinality |
| :------: | :--------: | :------: | :----------: | :---------: | :-------: | :---------: |
| salaries |     0      | PRIMARY  |      1       |   emp_no    |     A     |   299645    |
| salaries |     0      | PRIMARY  |      2       |  from_date  |     A     |   2838426   |

#### not index
```sql
-- 408ms
SELECT * FROM salaries WHERE to_date < '1986-01-01';
```


#### 생성
```sql
-- 8.8s
CREATE INDEX tdate ON salaries (to_date);

SHOW INDEX FROM salaries;
```

|  Table   | Non_unique | Key_name | Seq_in_index | Column_name | Collation | Cardinality |
| :------: | :--------: | :------: | :----------: | :---------: | :-------: | :---------: |
| salaries |     0      | PRIMARY  |      1       |   emp_no    |     A     |   299645    |
| salaries |     0      | PRIMARY  |      2       |  from_date  |     A     |   2838426   |
| salaries |     1      |  tdate   |      1       |   to_date   |     A     |    6090     |

#### 실행
```sql
-- 3ms
CREATE INDEX tdate ON salaries (to_date);
```

```ad-note
408ms -> 3ms
```

#### 삭제
```sql
DROP INDEX tdate ON salaries;
```

### 변수선언 : RANK 설정

```sql
-- 변수선언
SET @data = 1;

-- 선언된 변수 출력
SELECT @data;

-- city 테이블에서
SET @RANK = 0;

SELECT @RANK := @RANK + 1 AS ranking, countrycode, name, population
FROM city
ORDER BY population DESC
LIMIT 5;
```

---
## DCL
```ad-info
Data Control Language
데이터 제어어
사용자의 권한을 부여하거나 빼앗을때 사용
GRUNT, REVORKE, DENY
```

### GRUNT
```sql
-- 사용자 권한 부여 명령어
GRANT ALL PRIVILEGES ON [dbname.table_name] TO [user@host] IDENTIFIED BY 'my_password';

-- 예제 (호스트 : 로컬호스트)
GRANT ALL PRIVILEGES ON testDB.testTable TO myuser@localhost IDENTIFIED BY 'testPassword';

-- 예제 (호스트 : 원격 접속)
GRANT ALL PRIVILEGES ON testDB.testTable TO myuser@'%' IDENTIFIED BY 'testPassword';

-- 예제 (호스트 : 아이피)
GRANT ALL PRIVILEGES ON testDB.testTable TO myuse@192.168.0.100 IDENTIFIED BY 'testPassword';
```

### REVORKE
```sql
-- 권한 해제 명령어(INSERT, UPDATE, CREATE 권한 해제)
REVOKE insert, update, create ON [dbname.table_name] TO [user@host];
 
-- 권한 해제 명령어(전체 권한 해제)
REVOKE ALL ON [dbname.table_name] TO [user@host];

-- 권한 확인 명령어
SHOW GRANTS FOR [user@host];
```



