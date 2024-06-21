# Stage 1 : Builder
FROM node:lts-alpine AS builder
WORKDIR /backend
COPY . /backend

RUN yarn install

# Stage 2 : Application
FROM node:lts-alpine
WORKDIR /backend
COPY --from=builder /backend .

CMD ["yarn", "start"]

EXPOSE 8080