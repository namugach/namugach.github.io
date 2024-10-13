---
tags:
  - mlops
  - minio
create: 2024-10-10 15:01:47
---

```sh
docker run -itd \
   -p 9000:9000 \
   -p 9001:9001 \
   --name minio \
   -v ~/minio/data:/data \
   -e "MINIO_ROOT_USER=ROOT" \
   -e "MINIO_ROOT_PASSWORD=TEST134679" \
   quay.io/minio/minio server /data --console-address ":9001"
```

