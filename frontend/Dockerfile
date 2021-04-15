FROM node

WORKDIR '/app'

COPY ["package.json", "yarn.lock", "./"]

RUN yarn && yarn cache clean

COPY . .

CMD ["yarn", "build"]