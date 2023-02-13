# base image
FROM node:lts-alpine
ARG DOCKER_ARTIFACT_DIR=./docker_artifacts/persistence

# Install dependencies - Fix MacBook Pro M1 chip
RUN apk --no-cache --virtual build-dependencies add python3 make g++

# create & set working directory
RUN mkdir -p /updateScorePersistence
WORKDIR /updateScorePersistence

COPY $DOCKER_ARTIFACT_DIR/start-dev.sh /bin/
RUN chmod 755 /bin/start-dev.sh
CMD ["/bin/start-dev.sh"]

EXPOSE 5000
