FROM node:8
# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
EXPOSE 80
CMD [ "node", "app.js" ]
