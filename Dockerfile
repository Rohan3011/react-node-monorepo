

FROM node:19.6-bullseye-slim AS base

# Install Yarn
# RUN npm install -g yarn

# Specify working directory other than /
WORKDIR /usr/src/app

# Copy only files required to install dependencies (better layer caching)
COPY package*.json ./

FROM base as dev

# Install dependencies locally first
RUN --mount=type=cache,target=/usr/src/app/.yarn_cache \
    yarn install --frozen-lockfile

COPY . .

CMD ["yarn", "run", "dev"]

FROM base as production

# Set NODE_ENV
ENV NODE_ENV production

# Install only production dependencies locally first
RUN --mount=type=cache,target=/usr/src/app/.yarn_cache \
    yarn install --production=true --frozen-lockfile

# Use non-root user
# Use --chown on COPY commands to set file permissions
USER node

# Copy the healthcheck script
# COPY --chown=node:node ./healthcheck/ .

# Copy remaining source code AFTER installing dependencies.
# Again, copy only the necessary files
COPY --chown=node:node . .

# Indicate expected port
EXPOSE 8080

CMD [ "node", "index.js" ]

LABEL org.opencontainers.image.source=https://github.com/rohan3011/react-node-monorepo