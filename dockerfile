# 使用官方的 Node.js 16 映像
FROM node:16

# 設置工作目錄
WORKDIR /app

# 複製 package.json、package-lock.json 和 tsconfig.json 文件
COPY package*.json tsconfig.json ./

# 安裝依賴
RUN npm install

# 複製項目文件
COPY . .

# 編譯 TypeScript 檔案
RUN npm run build && ls -la dist/src/

# 暴露應用程式端口
EXPOSE 3000

# 啟動應用
CMD ["npm", "start"]
