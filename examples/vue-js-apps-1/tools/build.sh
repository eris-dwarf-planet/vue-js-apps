#!/bin/bash

docker run --rm -v `pwd`:/var/www todos-server:latest npm run clean
docker run --rm -v `pwd`:/var/www todos-server:latest npm run build
# docker exec -i -t todos-server:latest npm run build
