#!/bin/bash

echo "step.1 - build"
docker-compose build

echo "step.2 - package install"
docker run --rm -v `pwd`:/var/www vue-js-apps-server:latest yarn install --no-bin-links
chmod +x node_modules/typescript/bin/tsc

echo "step.3 - typescript build"
docker run --rm -v `pwd`:/var/www vue-js-apps-server:latest node_modules/typescript/bin/tsc

