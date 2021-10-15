FROM node:16-alpine3.11 AS alpine
WORKDIR /app
COPY package.json .
RUN npm install 
COPY . . 
EXPOSE 3000 

CMD ["npm", "run", "start"]

