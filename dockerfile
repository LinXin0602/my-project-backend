# 使用官方的 Node.js 映像
FROM node:16

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json 文件
COPY package*.json ./

# 安裝依賴
RUN npm install --force

# 複製項目文件
COPY . .

# 暴露應用程式port
EXPOSE 3000

# 啟動應用
CMD ["npm", "start"]
