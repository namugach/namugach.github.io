let graphData={graphOptions:{attractionForce:1,linkLength:10,repulsionForce:150,centralForce:3,edgePruning:100,minNodeRadius:3,maxNodeRadius:7},isInitialized:!0,paths:["root/dev/도커와-쿠버네티스/0.도커와-쿠버네티스.html","root/dev/도커와-쿠버네티스/도커-볼륨.html","root/dev/도커와-쿠버네티스/도커로-flask,-nginx,-postgressql-함께-배포.html","root/dev/도커와-쿠버네티스/쿠버네티스-사용법.html","root/dev/도커와-쿠버네티스/쿠버네티스-설치.html","root/dev/도커와-쿠버네티스/aws-client-to-database.html","root/dev/도커와-쿠버네티스/aws-client-to-docker-database.html","root/dev/도커와-쿠버네티스/docker-compose.html","root/dev/도커와-쿠버네티스/enginx-도커-올려.html","root/dev/도커와-쿠버네티스/flask-건들기-위한-docker.html","root/dev/도커와-쿠버네티스/flask-docker에-태우자.html","root/dev/도커와-쿠버네티스/flask-postgresql-건들기.html","root/dev/도커와-쿠버네티스/postgre-도커-올려.html","root/dev/도커와-쿠버네티스/python에-yaml.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/kubeflow/gcp-kubeflow-외부에서-접속하기.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/kubeflow/gcp에-k3s설치하고-kubeflow-사용하기.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/kubeflow/k3s-그리고-kubeflow-설치.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/kubeflow/kubeflow-장인의-느낌으로-땀.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/part1.-ml을-service하기-위한-기술,-mlops/part1.-ml을-service하기-위한-기술,-mlops.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/part2.-mlops-환경-구축을-위한-도커와-쿠버네티스/minikube/minikube-설치.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/part2.-mlops-환경-구축을-위한-도커와-쿠버네티스/minikube/minikube-deployment.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/part2.-mlops-환경-구축을-위한-도커와-쿠버네티스/minikube/minikube-pod.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/part2.-mlops-환경-구축을-위한-도커와-쿠버네티스/minikube/minikube-pvc.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/part2.-mlops-환경-구축을-위한-도커와-쿠버네티스/minikube/minikuke-service.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/part2.-mlops-환경-구축을-위한-도커와-쿠버네티스/part2.-mlops-환경-구축을-위한-도커와-쿠버네티스.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/part3.-오픈소스를-통해-알아보는-mlops의-구성요소/md/dvc.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/part3.-오픈소스를-통해-알아보는-mlops의-구성요소/md/mlflow-실습.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/part3.-오픈소스를-통해-알아보는-mlops의-구성요소/md/mlflow-docker-외부-host-노출하기.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/part3.-오픈소스를-통해-알아보는-mlops의-구성요소/md/model-serving-flaks.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/part3.-오픈소스를-통해-알아보는-mlops의-구성요소/md/prometheus-&-grafana.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/part3.-오픈소스를-통해-알아보는-mlops의-구성요소/md/pyenv-설치.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/part3.-오픈소스를-통해-알아보는-mlops의-구성요소/md/seldon-core.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/part3.-오픈소스를-통해-알아보는-mlops의-구성요소/part3.-오픈소스를-통해-알아보는-mlops의-구성요소.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/part4.-쿠버네티스-기반-mlops-pipeline-구축하기/google-cloud-service-만들기.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/part4.-쿠버네티스-기반-mlops-pipeline-구축하기/kubeflow-개발-환경-구축.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/part4.-쿠버네티스-기반-mlops-pipeline-구축하기/kubeflow-설치.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/part4.-쿠버네티스-기반-mlops-pipeline-구축하기/kubeflow-kfp.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/part4.-쿠버네티스-기반-mlops-pipeline-구축하기/mlops-feast.html","root/dev/머신러닝-서비스-구축을-위한-실전-mlops/part4.-쿠버네티스-기반-mlops-pipeline-구축하기/mlops-minio.html","root/dev/준소프트웨어-프로젝트/프로젝트-설명/이름-없는-보드.html","root/dev/준소프트웨어-프로젝트/프로젝트-설명/준소프트웨어-특허-데이터-분석-프로젝트-설명.html","root/dev/준소프트웨어-프로젝트/프로젝트-설명/준소프트웨어-특허-데이터-분석-프로젝트-설명-요약.html","root/dev/준소프트웨어-프로젝트/프로젝트-설명/특허-데이터-분석-프로젝트-참여를-위한-기본-역량.html","root/dev/준소프트웨어-프로젝트/프로젝트-설명/프로젝트-진행-단계-특허-데이터-수집-및-분석.html","root/dev/준소프트웨어-프로젝트/준소프트웨어-프로젝트.html","root/dev/cs/동기와-비동기에-대한-고찰(is-it-다구리-쇼-타임-now).html","root/dev/data-pipe-line/데이터-파이프라인-구축/간단-파이프-라인에-카프카-붙이기.html","root/dev/data-pipe-line/데이터-파이프라인-구축/flask-kafka-연동.html","root/dev/data-pipe-line/데이터-파이프라인-구축/python-간단-파이프라인.html","root/dev/data-pipe-line/데이터-파이프라인-구축/python으로-mysql-파이프-라인-만들기.html","root/dev/data-pipe-line/자동화/shell-ssh-여러-개-접속-테스트.html","root/dev/data-pipe-line/자동화/shellscript-자기-자신이-실행되는-경로-알아내기.html","root/dev/data-pipe-line/airflow/airflow-note.html","root/dev/data-pipe-line/elasticsearch/elasticsearch-cerebro.html","root/dev/data-pipe-line/elasticsearch/elasticsearch-install.html","root/dev/data-pipe-line/hadoop/hadoop-수업/실습/hadoop-hdfs-java-api.html","root/dev/data-pipe-line/hadoop/hadoop-수업/실습/hadoop-mapreduce.html","root/dev/data-pipe-line/hadoop/hadoop-수업/실습/vscode-maven-프로젝트-생성.html","root/dev/data-pipe-line/hadoop/hadoop-수업/환경-구축/docker-hadoop-개발-환경-구축.html","root/dev/data-pipe-line/hadoop/hadoop-수업/환경-구축/vscode-wsl-maven-프로젝트-환경-구축.html","root/dev/data-pipe-line/hadoop/hadoop-wsl-port-정상-작동-로그.html","root/dev/data-pipe-line/hadoop/hadoop-study-docker-image.html","root/dev/data-pipe-line/hadoop/hive-트러블-슈팅.html","root/dev/data-pipe-line/kafka/shellscript/kafka-서버-설정-자동화.html","root/dev/data-pipe-line/kafka/shellscript/kafka-클러스터-스크립트.html","root/dev/data-pipe-line/kafka/shellscript/shellscirpt-kafka-zookeeper-server.html","root/dev/data-pipe-line/kafka/shellscript/shellscript-kafka-server-conn-check.html","root/dev/data-pipe-line/kafka/shellscript/shellscript-kafka-server-start.html","root/dev/data-pipe-line/kafka/카프카에-대한-고찰.html","root/dev/data-pipe-line/kafka/카프카에-csv-파일-넣어보기.html","root/dev/data-pipe-line/kafka/apache-kafka-실시간-data-pipeline-구축하기.html","root/dev/data-pipe-line/kafka/kafak에-mysql-연결.html","root/dev/data-pipe-line/kafka/kafka-설정-및-실행.html","root/dev/data-pipe-line/kafka/kafka-설치.html","root/dev/data-pipe-line/kafka/kafka-클러스터-서버-시동.html","root/dev/data-pipe-line/kafka/kafka-consumer와-mysql에-데이터-적재하기.html","root/dev/data-pipe-line/kafka/kafka-error-handling.html","root/dev/data-pipe-line/kafka/kafka-note.html","root/dev/data-pipe-line/kafka/kafka-server.properties.html","root/dev/data-pipe-line/kafka/kafka에-csv로-데이터-흘리기.html","root/dev/data-pipe-line/server/ec2/aws-ec2에-docker로-kafka-클러스터-만들-때.html","root/dev/data-pipe-line/server/ec2/ec2-docker-ssh-터널링.html","root/dev/data-pipe-line/server/ec2/ssh-포트-포함-이동.html","root/dev/data-pipe-line/server/ec2/ssh-server-터널링.html","root/dev/data-pipe-line/server/local/우분투-hosts를-설정하여-ssh-편하게-이동하기.html","root/dev/data-pipe-line/server/local/우분투-sudo-비번-생략하기.html","root/dev/data-pipe-line/server/local/docker-container-시작-시-명령어-시작.html","root/dev/data-pipe-line/server/local/kafdrop-kafka-클러스터-모니터링.html","root/dev/data-pipe-line/server/local/mysql-계정-생성시-의-의미.html","root/dev/data-pipe-line/server/local/ssh-접속시-yes-입력-생략하기.html","root/dev/data-pipe-line/server/웹-브라우저에서-kafka-클러스터를-모니터링.html","root/dev/data-pipe-line/server/docker-우분투-mysql-설치.html","root/dev/data-pipe-line/server/docker-태그-없는-이미지-삭제하기.html","root/dev/data-pipe-line/server/pyenv-설치.html","root/dev/data-pipe-line/spark/간단-파이프-라인에-스파크-붙이기.html","root/dev/data-pipe-line/spark/spark에-대한-고찰.html","root/dev/data-pipe-line/docker-파이프라인-aws로-이전.html","root/dev/data-pipe-line/docker-in-docker로-local에서-클러스터-환경-만들기.html","root/dev/data-pipe-line/docker-pipe-line-환경-구축-v0.1.html","root/dev/data-pipe-line/docker-pipe-line-환경-구축-v0.2.html","root/dev/data-pipe-line/docker-pipe-line-환경-구축-v0.3.html","root/dev/database/mariadb/ec2-mariadb-workbench-연결.html","root/dev/database/mariadb/mariadb-설치.html","root/dev/database/mariadb/mariadb-설치부터-workbench-연결까지.html","root/dev/database/mariadb/mariadb-아이디-생성.html","root/dev/database/미니-프로젝트.canvas.html","root/dev/database/mysql-note.html","root/dev/database/vscode-mysql-플러그인-사용하기.html","root/dev/docker/도커-설치-및-기본-사용법.html","root/dev/docker/docker-note.html","root/dev/github/간단-ssh-github-인증.html","root/dev/github/github-협업-흐름도.html","root/dev/linux/이어드림-de-ssh-보안-업데이트-수동.html","root/dev/linux/crontab-예약하기.html","root/dev/linux/ubuntu-node.html","root/dev/mloops/docker-mlops-빌드-및-실행.html","root/dev/mloops/docker-network-생성.html","root/dev/mloops/mlops-docker-github-action-연결하기.html","root/dev/mloops/mlops-mysql-컨테이너-연결.html","root/dev/python/pyenv-설치.html","root/dev/python/pyenv-실습.html","root/dev/python/python-note.html","root/dev/vscode/vscode-개발-컨테이너-확장-플러그인-자동-설치.html","root/dev/wsl/이어드림스쿨-실습용-wsl-배포-import.html","root/dev/wsl/wsl-용량-확보하기.html","root/dev/wsl/wsl-note.html","root/list.html","root/main.html"],nodeCount:128,linkSources:[0,0,0,0,0,0,0,0,0,0,0,0,0,10,11,11,11,15,23,24,24,24,24,24,26,32,32,32,32,32,32,44,44,44,44,46,55,56,72,72,72,72,72,73,91,94,94,96,96,96,96,96,96,97,97,98,98,98,98,98,98,98,98,98,98,98,98,99,99,99,99,99,99,99,99,99,103,103,103,115,120,125],linkTargets:[11,9,10,7,13,8,12,1,2,4,3,5,6,6,5,119,120,16,20,19,21,20,23,22,30,25,26,27,28,31,29,40,41,42,43,48,57,57,73,65,67,66,76,72,88,48,46,98,50,93,108,72,75,93,50,85,93,91,86,84,89,50,73,72,74,79,75,91,89,50,73,72,78,74,79,75,102,104,101,116,119,108],labels:["0.도커와 쿠버네티스","도커 볼륨","도커로 flask, nginx, PostgresSql 함께 배포","쿠버네티스 사용법","쿠버네티스 설치","AWS client to database","AWS client to docker database","docker compose","enginx 도커 올려","flask 건들기 위한 Docker","flask docker에 태우자","flask postgreSQL 건들기","postgre 도커 올려","Python에 YAML","gcp kubeflow 외부에서 접속하기","GCP에 K3S설치하고 Kubeflow 사용하기","k3s 그리고 kubeflow 설치","kubeflow 장인의 느낌으로 땀","Part1. ML을 Service하기 위한 기술, MLOps","minikube 설치","minikube Deployment","minikube POD","minikube PVC","minikuke Service","Part2. MLOps 환경 구축을 위한 도커와 쿠버네티스","dvc","Mlflow 실습","mlflow docker 외부 host 노출하기","Model Serving Flaks","Prometheus & Grafana","pyenv 설치","seldon core","Part3. 오픈소스를 통해 알아보는 MLOps의 구성요소","google cloud service 만들기","kubeflow 개발 환경 구축","Kubeflow 설치","kubeflow Kfp","mlops feast","mlops minio","이름 없는 보드","준소프트웨어 특허 데이터 분석 프로젝트 설명","준소프트웨어 특허 데이터 분석 프로젝트 설명 요약","특허 데이터 분석 프로젝트 참여를 위한 기본 역량","프로젝트 진행 단계 - 특허 데이터 수집 및 분석","준소프트웨어 프로젝트","동기와 비동기에 대한 고찰(Is it 다구리 쇼 타임 now)","간단 파이프 라인에 카프카 붙이기","flask kafka 연동","python 간단 파이프라인","python으로 mysql 파이프 라인 만들기","shell ssh 여러 개 접속 테스트","shellscript 자기 자신이 실행되는 경로 알아내기","Airflow note","Elasticsearch Cerebro","Elasticsearch Install","Hadoop HDFS JAVA API","Hadoop Mapreduce","vscode maven 프로젝트 생성","docker hadoop 개발 환경 구축","vscode wsl maven 프로젝트 환경 구축","hadoop wsl port 정상 작동 로그","hadoop-study docker image","Hive 트러블 슈팅","kafka 서버 설정 자동화","kafka 클러스터 스크립트","shellscirpt kafka zookeeper server","shellscript kafka server conn check","shellscript kafka server start","카프카에 대한 고찰","카프카에 csv 파일 넣어보기","Apache Kafka 실시간 Data Pipeline 구축하기","kafak에 mysql 연결","kafka 설정 및 실행","kafka 설치","kafka 클러스터 서버 시동","Kafka Consumer와 MySQL에 데이터 적재하기","kafka error handling","kafka note","kafka server.properties","kafka에 csv로 데이터 흘리기","aws ec2에 docker로 kafka 클러스터 만들 때","ec2 docker ssh 터널링","ssh 포트 포함 이동","ssh server 터널링","우분투 hosts를 설정하여 ssh 편하게 이동하기","우분투 sudo 비번 생략하기","docker container 시작 시 명령어 시작","Kafdrop kafka 클러스터 모니터링","mysql 계정 생성시 %의 의미","ssh 접속시 yes 입력 생략하기","웹 브라우저에서 Kafka 클러스터를 모니터링","docker 우분투 mysql 설치","Docker 태그 없는 이미지 삭제하기","pyenv 설치","간단 파이프 라인에 스파크 붙이기","spark에 대한 고찰","docker 파이프라인 aws로 이전","docker in docker로 local에서 클러스터 환경 만들기","docker pipe line 환경 구축 v0.1","docker pipe line 환경 구축 v0.2","docker pipe line 환경 구축 v0.3","EC2 - mariaDB workbench 연결","mariaDB 설치","mariaDB 설치부터 workbench 연결까지","mariaDB 아이디 생성","미니 프로젝트.canvas","mysql note","vscode mysql 플러그인 사용하기","도커 설치 및 기본 사용법","docker note","간단 ssh github 인증","github 협업 흐름도","이어드림 DE ssh 보안 업데이트 수동","crontab 예약하기","ubuntu node","docker mlops 빌드 및 실행","docker network 생성","mlops docker github action 연결하기","mlops mysql 컨테이너 연결","pyenv 설치","pyenv 실습","python note","vscode 개발 컨테이너 확장 플러그인 자동 설치","이어드림스쿨 실습용 wsl 배포 import","wsl 용량 확보하기","wsl note","list","main"],radii:[7,3.7322485207100593,3.7322485207100593,3.7322485207100593,3.7322485207100593,4.390532544378698,4.390532544378698,3.7322485207100593,3.7322485207100593,3.7322485207100593,4.390532544378698,5.485207100591715,3.7322485207100593,3.7322485207100593,3,3.7322485207100593,3.7322485207100593,3,3,3.7322485207100593,4.390532544378698,3.7322485207100593,3.7322485207100593,4.390532544378698,5.921597633136095,3.7322485207100593,4.390532544378698,3.7322485207100593,3.7322485207100593,3.7322485207100593,3.7322485207100593,3.7322485207100593,6.284023668639053,3,3,3,3,3,3,3,3.7322485207100593,3.7322485207100593,3.7322485207100593,3.7322485207100593,5.485207100591715,3,4.390532544378698,3,4.390532544378698,3,5.485207100591715,3,3,3,3,3.7322485207100593,3.7322485207100593,4.390532544378698,3,3,3,3,3,3,3,3.7322485207100593,3.7322485207100593,3.7322485207100593,3,3,3,3,6.927514792899408,5.485207100591715,4.390532544378698,4.974852071005917,3.7322485207100593,3,3.7322485207100593,4.390532544378698,3,3,3,3,3.7322485207100593,3.7322485207100593,3.7322485207100593,3,3.7322485207100593,4.390532544378698,3,4.974852071005917,3,4.974852071005917,4.390532544378698,3,6.284023668639053,4.390532544378698,7,6.927514792899408,3,3.7322485207100593,3.7322485207100593,4.974852071005917,3.7322485207100593,3,3,3,4.390532544378698,3,3,3,3,3,3,3.7322485207100593,3.7322485207100593,3,3,4.390532544378698,4.390532544378698,3,3,3,3,3.7322485207100593,3,3],linkCount:82}