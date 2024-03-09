FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye

WORKDIR /workspace/iruka

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm@8.15.4 && pnpm i --frozen-lockfile
