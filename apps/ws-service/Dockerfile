FROM node:latest

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install typescript

RUN npx tsc -b

EXPOSE 3000

CMD ["node", "dist/index.js"]
