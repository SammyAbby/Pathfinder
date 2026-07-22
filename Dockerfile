# Pathfinder is a fully static, dependency-free ES-module web app.
# ES modules must be served over HTTP (not file://), so we ship it on nginx.
FROM nginx:1.27-alpine

# Serve our own config (adds cache headers + SPA-friendly defaults).
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the static site into nginx's web root. Globs keep this decoupled from
# the exact asset manifest, so it builds whether or not optional files
# (e.g. animations.css) are present.
WORKDIR /usr/share/nginx/html
COPY index.html ./
COPY *.js *.css ./

# Container-native healthcheck against the served page.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1

EXPOSE 80
# nginx:alpine's default CMD already runs `nginx -g 'daemon off;'`.
