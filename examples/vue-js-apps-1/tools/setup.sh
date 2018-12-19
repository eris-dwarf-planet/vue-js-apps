#!/bin/bash

echo "step.1 - build"
docker-compose build

echo "step.2 - package install"
docker run --rm -v `pwd`:/var/www todos-server:latest yarn install

echo "step.3 - src compile"
docker run --rm -v `pwd`:/var/www todos-server:latest npm run clean
docker run --rm -v `pwd`:/var/www todos-server:latest npm run build
