FROM node:latest

WORKDIR /var/www
ENV PORT=80
CMD ["node", "/var/www/dist/Server.js"]
