"# linxin-project-backend" 

此專案是使用 Node.js 和 MongoDB 構建的後端服務，並使用 Docker 進行容器化部署。

### docker本地部屬
```sh
docker build -t yuxinlin0602/linxin-repo:latest .
```
### 推送到dockerHub
```sh
docker push yuxinlin0602/linxin-repo:latest
```
### 拉取dockerHub鏡像
```sh
docker pull yuxinlin0602/linxin-repo:latest
```
### 重啟服務
```sh
docker-compose down   
docker-compose up -d  
```
