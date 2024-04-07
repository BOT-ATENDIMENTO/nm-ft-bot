FROM node:18


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

ENV PUBLIC_HTML=/var/www/public/

COPY .env* ./

COPY . .

EXPOSE 9000

CMD ["npm", "start"]