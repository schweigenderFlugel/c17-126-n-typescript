FROM node:18-alpine3.18 as base

ENV DIR /app
WORKDIR $DIR

# build stage
FROM base AS build

RUN corepack enable && corepack prepare pnpm@latest --activate \
    && apk update && apk add --no-cache dumb-init

ENV PNPM_HOME=/usr/local/bin

COPY package.json pnpm-lock.yaml $DIR
COPY tsconfig*.json $DIR
COPY .env $DIR
COPY src $DIR/src

RUN pnpm i --frozen-lockfile 

RUN pnpm build \
    && pnpm prune --prod

# Production Stage
FROM base as production

RUN corepack enable && corepack prepare pnpm@latest --activate

ENV PNPM_HOME=/usr/local/pnpm
ENV NODE_ENV=production
ENV USER node

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/node_modules $DIR/node_modules
COPY --from=build $DIR/package.json $DIR/pnpm-lock.yaml $DIR
COPY --from=build $DIR/dist $DIR
COPY --from=build $DIR/.env $DIR

EXPOSE $PORT

USER $USER

CMD [ "dumb-init", "node", "src/mainServer.js" ]
