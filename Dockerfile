# BUILDER STAGE
FROM node:alpine as builder

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci --production

COPY . .

RUN npm run build


# RUNTIME STAGE
FROM node:alpine as runtime

WORKDIR /usr/app

ENV NODE_ENV=production

COPY --from=builder "/usr/app/dist/" "/usr/app/dist/"
COPY --from=builder "/usr/app/node_modules/" "/usr/app/node_modules/"
COPY --from=builder "/usr/app/package.json" "/usr/app/package.json"

CMD ["npm", "start"]
