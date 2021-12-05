#THIS DOCKERFILE IS FOR PRODUCTION STAGE

FROM node:14-alpine

RUN apk update

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY src /app/src

RUN ls -a
RUN yarn install
#uncomment this
#RUN yarn run build

EXPOSE 3000
#change this
CMD ["yarn", "dev"]