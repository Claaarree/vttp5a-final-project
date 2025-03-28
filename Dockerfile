#build the client
FROM node:23 AS buildang

WORKDIR /src

COPY client/*.json .
COPY client/public public
COPY client/src src

#Run npm to install node_modules -> package.json
RUN npm ci
RUN npm i -g @angular/cli
# produce dist/client/browser
RUN ng build

# build the SpringBoot application
FROM eclipse-temurin:23-jdk AS buildjava

WORKDIR /src

COPY server/mvnw .
COPY server/pom.xml .
COPY server/src src
COPY server/.mvn .mvn
# COPY server/sound-vault-452513-u3-firebase-adminsdk-fbsvc-6681b74e16.json .

# copy the angular app over to static directory
COPY --from=buildang /src/dist/final-project/browser/ src/main/resources/static

# make mvnw executable
RUN chmod a+x mvnw

# produce target.server-0.0.1-SNAPSHOT.jar
RUN ./mvnw package -Dmaven.test.skip=true

# Deployment container
FROM eclipse-temurin:23-jre

WORKDIR /app

COPY --from=buildjava /src/target/server-0.0.1-SNAPSHOT.jar ChiakWhere.jar
COPY server/sound-vault-452513-u3-firebase-adminsdk-fbsvc-6681b74e16.json .

# set environment variable
ENV PORT=8080

EXPOSE ${PORT}

ENTRYPOINT SERVER_PORT=${PORT} java -jar ChiakWhere.jar
