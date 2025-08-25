FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps || npm install
COPY . .
# tenta descobrir build dir: dist (vite) ou build (CRA)
RUN if grep -q vite package.json; then npm run build && echo dist > /app/__builddir.txt;     else npm run build && echo build > /app/__builddir.txt; fi

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
ARG BUILD_DIR
# fallback: dist
ENV BUILD_DIR=${BUILD_DIR:-dist}
# se geramos o hint durante build, usa ele
COPY --from=build /app/$(cat /app/__builddir.txt 2>/dev/null || echo dist) .
EXPOSE 80