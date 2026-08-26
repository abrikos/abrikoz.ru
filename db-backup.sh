#!/bin/bash

docker exec mongodb mongodump
docker cp mongodb:/dump /home/abrikos