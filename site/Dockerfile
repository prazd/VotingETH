FROM node:latest
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
# Bundle app source
COPY . /usr/src/app


#COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
# ENTRYPOINT should not be used as it wont allow commands from run to be executed
# Define mountable directories.
#VOLUME ["/data/db"]

# Expose ports.
#   - 27017: process
#   - 28017: http
#   - 9191: web app

EXPOSE 27017 8080

#ENTRYPOINT ["/usr/bin/supervisord"]
CMD [ "npm", "start" ]
