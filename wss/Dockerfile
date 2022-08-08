FROM node:alpine

COPY ./package.json .

RUN npm install -g del-cli
RUN npm install -g typescript

RUN npm install
COPY . .

CMD ["npm", "run", "prod:docker"]