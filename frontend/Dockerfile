FROM node:lts-bullseye as base

ENV DIR /app
WORKDIR $DIR

# build stage
FROM base AS build

RUN npm i -g corepack
RUN corepack enable && corepack prepare pnpm@latest --activate 

COPY package*.json pnpm-lock.yaml $DIR
COPY . $DIR

RUN pnpm i --frozen-lockfile

RUN pnpm build \
    && pnpm prune --prod

# Production Stage
FROM nginx:alpine as production

ENV DIR /app

ADD ./config/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build $DIR/dist /var/www/app

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
 