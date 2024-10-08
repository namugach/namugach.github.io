---
tags:
  - pipeline
  - aws
  - ec2
  - kafka
create: 2024-08-05 17:43:51
---
```ad-check
title: 작업에 들어가기 앞서!
- (L): local에서 하는 작업
	- windows: wsl
	- mac: terminal
- (C): container에서 하는 작업
```

## (L) ssh 연결

```ad-attention
title: 확인!
ec2 server 1, 2, 3 적용
```

[[docker pipe line 환경 구축 v0.1#ssh 연결]]
### hosts  설정
```vim
ec2_private_ip server1
ec2_private_ip server2
ec2_private_ip server3
```

### key 생성
```ad-attention
title: 이것이 바로 포인트!
server1 에서 생성된 id_rsa, id_rsa.pub를 
server2, server3의 ~/.ssh 디렉토리 안에 모두 공유한다.
```

```sh
ssh-keygen -t rsa
cd .ssh
cat id_rsa.pub > authorized_keys
```


### ssh 최초 접속시 yes 생략

```sh
vi ~/.ssh/config
```

```sh
Host server*
  StrictHostKeyChecking no
  UserKnownHostsFile=/dev/null
```

### ssh_check 작성

```sh
ssh server1
ssh server2
ssh server3
```
혹은
[[shell ssh 여러 개 접속 테스트]] 를 작성


---
## (L) pyenv

```ad-attention
title: 확인!
ec2 server 1, 2, 3 적용
```
[[pyenv 설치]]


---
## docker
```ad-attention
title: 확인!
ec2 server 1, 2, 3 적용
```

### (L) install
[[도커 설치 및 기본 사용법]]

### (L) pull
```sh
docker pull namugach/ubuntu-pipeline:24.04-kafka
```


### (L) 네트워크

```sh
docker network create --subnet=172.18.0.0/16 pipeline
```
도커 네트워크 생성
### (L) container
```ad-check
- name
	- ec1 server1 = server1
	- ec2 server1 = server2
	- ec3 server1 = server3
- hostname
	- ec1 server1 = server1
	- ec2 server1 = server2
	- ec3 server1 = server3

- ip
	- ec1 server1 = 172.18.0.10
	- ec2 server1 = 172.18.0.11
	- ec3 server1 = 172.18.0.12

 
인트턴스 서버에 따라 잘 확인하고 입력
```


```sh
docker container run -itd \\
  --name server1 \\ # server1, server2, server3
  --hostname server1 \\ # server1, server2, server3
  --add-host server1:server1 \\
  --add-host server2:server2 \\
  --add-host server3:server3 \\
  -p 2222:2222 \\
  -p 2181:2181 \\
  -p 2888:2888 \\
  -p 3888:3888 \\
  -p 9092:9092 \\
  -p 3306:3306 \\
  --net pipeline \\
  --ip 172.18.0.10 \\ # server1 = 10, server2 = 11, server3 = 12
  namugach/ubuntu-pipeline:24.04-kafka
```

### (L) ssh key 공유

#### 복사
```ad-attention
title: 유념!
서버 이름 확인하면서 작업하자
```
```sh
docker cp ~/.ssh/id_rsa server1:/home/ubuntu/.ssh/id_rsa
docker cp ~/.ssh/id_rsa.pub server1:/home/ubuntu/.ssh/id_rsa.pub
docker cp ~/.ssh/id_rsa.pub server1:/home/ubuntu/.ssh/authorized_keys
```


#### 확인
```sh
docker exec -it server1 ls ~/.ssh
```

---

### (C) ssh

#### 설명
```sh
vi ~/.ssh/config
```

```vim
Host server1
	HostName ec2_private_ip
	Port 2222
	User ubuntu

Host server2
	HostName ec2_private_ip
	Port 2222
	User ubuntu

Host server3
	HostName ec2_private_ip
	Port 2222
	User ubuntu
```

#### 예제
```vim
Host server1
	HostName 172.31.14.186
	Port 2222
	User ubuntu

Host server2
	HostName 172.31.10.99
	Port 2222
	User ubuntu

Host server3
	HostName 172.31.1.229
	Port 2222
	User ubuntu
```


```sh
ssh server1
```

```sh
ubuntu@server1:~$ ssh server2
Warning: Permanently added '[172.31.10.99]:2222' (ED25519) to the list of known hosts.
Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-1012-aws x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

This system has been minimized by removing packages and content that are
not required on a system that users do not log into.

To restore this content, you can run the 'unminimize' command.
Last login: Wed Aug  7 05:22:57 2024 from 172.31.14.186
ubuntu@server2:~$ 
```

위처럼 나오면 성공

---

## kafka

### 설정

#### server.propertis

```properties
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

#
# This configuration file is intended for use in ZK-based mode, where Apache ZooKeeper is required.
# See kafka.server.KafkaConfig for additional details and defaults
#

############################# Server Basics #############################

# The id of the broker. This must be set to a unique integer for each broker.
broker.id=1

############################# Socket Server Settings #############################

# The address the socket server listens on. If not configured, the host name will be equal to the value of
# java.net.InetAddress.getCanonicalHostName(), with PLAINTEXT listener name, and port 9092.
#   FORMAT:
#     listeners = listener_name://host_name:port
#   EXAMPLE:
#     listeners = PLAINTEXT://your.host.name:9092
#listeners=PLAINTEXT://:9092
listeners=PLAINTEXT://server1:9092
# ubuntu@ip-172-31-6-227:~/app/kafka/kafka_2.13-3.6.1/config$

# Listener name, hostname and port the broker will advertise to clients.
# If not set, it uses the value for "listeners".
advertised.listeners=PLAINTEXT://server1:9092

# Maps listener names to security protocols, the default is for them to be the same. See the config documentation for more details
#listener.security.protocol.map=PLAINTEXT:PLAINTEXT,SSL:SSL,SASL_PLAINTEXT:SASL_PLAINTEXT,SASL_SSL:SASL_SSL

# The number of threads that the server uses for receiving requests from the network and sending responses to the network
num.network.threads=3

# The number of threads that the server uses for processing requests, which may include disk I/O
num.io.threads=8

# The send buffer (SO_SNDBUF) used by the socket server
socket.send.buffer.bytes=102400

# The receive buffer (SO_RCVBUF) used by the socket server
socket.receive.buffer.bytes=102400

# The maximum size of a request that the socket server will accept (protection against OOM)
socket.request.max.bytes=104857600


############################# Log Basics #############################

# A comma separated list of directories under which to store log files
log.dirs=/tmp/kafka-logs

# The default number of log partitions per topic. More partitions allow greater
# parallelism for consumption, but this will also result in more files across
# the brokers.
# num.partitions=1
num.partitions=3

# The number of threads per data directory to be used for log recovery at startup and flushing at shutdown.
# This value is recommended to be increased for installations with data dirs located in RAID array.
num.recovery.threads.per.data.dir=1

############################# Internal Topic Settings  #############################
# The replication factor for the group metadata internal topics "__consumer_offsets" and "__transaction_state"
# For anything other than development testing, a value greater than 1 is recommended to ensure availability such as 3.
offsets.topic.replication.factor=3
transaction.state.log.replication.factor=3
transaction.state.log.min.isr=3

############################# Log Flush Policy #############################

# Messages are immediately written to the filesystem but by default we only fsync() to sync
# the OS cache lazily. The following configurations control the flush of data to disk.
# There are a few important trade-offs here:
#    1. Durability: Unflushed data may be lost if you are not using replication.
#    2. Latency: Very large flush intervals may lead to latency spikes when the flush does occur as there will be a lot of data to flush.
#    3. Throughput: The flush is generally the most expensive operation, and a small flush interval may lead to excessive seeks.
# The settings below allow one to configure the flush policy to flush data after a period of time or
# every N messages (or both). This can be done globally and overridden on a per-topic basis.

# The number of messages to accept before forcing a flush of data to disk
#log.flush.interval.messages=10000

# The maximum amount of time a message can sit in a log before we force a flush
#log.flush.interval.ms=1000

############################# Log Retention Policy #############################

# The following configurations control the disposal of log segments. The policy can
# be set to delete segments after a period of time, or after a given size has accumulated.
# A segment will be deleted whenever *either* of these criteria are met. Deletion always happens
# from the end of the log.

# The minimum age of a log file to be eligible for deletion due to age
log.retention.hours=168

# A size-based retention policy for logs. Segments are pruned from the log unless the remaining
# segments drop below log.retention.bytes. Functions independently of log.retention.hours.
#log.retention.bytes=1073741824

# The maximum size of a log segment file. When this size is reached a new log segment will be created.
#log.segment.bytes=1073741824

# The interval at which log segments are checked to see if they can be deleted according
# to the retention policies
log.retention.check.interval.ms=300000

############################# Zookeeper #############################

# Zookeeper connection string (see zookeeper docs for details).
# This is a comma separated host:port pairs, each corresponding to a zk
# server. e.g. "127.0.0.1:3000,127.0.0.1:3001,127.0.0.1:3002".
# You can also append an optional chroot string to the urls to specify the
# root directory for all kafka znodes.
# zookeeper.connect=localhost:2181
zookeeper.connect=server1:2181,server2:2181,server3:2181
# Timeout in ms for connecting to zookeeper
zookeeper.connection.timeout.ms=18000


############################# Group Coordinator Settings #############################

# The following configuration specifies the time, in milliseconds, that the GroupCoordinator will delay the initial consumer rebalance.
# The rebalance will be further delayed by the value of group.initial.rebalance.delay.ms as new members join the group, up to a maximum of max.poll.interval.ms.
# The default value for this is 3 seconds.
# We override this to 0 here as it makes for a better out-of-the-box experience for development and testing.
# However, in production environments the default value of 3 seconds is more suitable as this will help to avoid unnecessary, and potentially expensive, rebalances during application startup.
group.initial.rebalance.delay.ms=0
```

#### zookeeper.properties
```properties
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
# 
#    http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# the directory where the snapshot is stored.
dataDir=/home/ubuntu/zkdata
# the port at which the clients will connect
clientPort=2181
tickTime=2000
initLimit=10
syncLimit=5
server.1=server1:2888:3888
server.2=server2:2888:3888
server.3=server3:2888:3888
# disable the per-ip limit on the number of connections since this is a non-production config
maxClientCnxns=0
# Disable the adminserver by default to avoid port conflicts.
# Set the port to something non-conflicting if choosing to enable this
admin.enableServer=false
# admin.serverPort=8080
```

[[kafka 설정 및 실행]]


---

## 데이터 적제

[[Kafka Consumer와 MySQL에 데이터 적재하기]]

```python
KAFKA_BOOTSTRAP_SERVERS = ['server1:9092', 'server2:9092', 'server3:9092']
```

위의 부분을 바꿔줌

### 모니터링

```sh
cd ~/app/kafka/kafka_2.13-3.6.2
./bin/kafka-console-consumer.sh --bootstrap-server 172.18.0.11:9092 --topic testtopic
```


```sh
cd ~/app/kafka/kafka_2.13-3.6.2
./bin/kafka-console-consumer.sh --bootstrap-server 172.18.0.12:9092 --topic testtopic
```


```sh
cd ~/app/kafka/kafka_2.13-3.6.2
./bin/kafka-console-consumer.sh --bootstrap-server 172.18.0.13:9092 --topic testtopic
```