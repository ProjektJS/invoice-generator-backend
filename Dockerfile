###############################################################################
###############################################################################
##                      _______ _____ ______ _____                           ##
##                     |__   __/ ____|  ____|  __ \                          ##
##                        | | | (___ | |__  | |  | |                         ##
##                        | |  \___ \|  __| | |  | |                         ##
##                        | |  ____) | |____| |__| |                         ##
##                        |_| |_____/|______|_____/                          ##
##                                                                           ##
## description     : Dockerfile for TsED Application                         ##
## author          : TsED team                                               ##
## date            : 20190820                                                ##
## version         : 1.0                                                     ##
###############################################################################
###############################################################################
FROM node:12.13.0-alpine

RUN apk update && apk add build-base git python

COPY package* ./
RUN npm install
COPY ./src ./src
COPY ./tsconfig* ./
RUN npm run build
COPY ./resources ./resources

EXPOSE 8081
ENV PORT 8081
ENV NODE_ENV production

ENTRYPOINT ["npm", "run", "start:prod"]
