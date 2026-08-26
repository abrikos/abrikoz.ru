#!/bin/bash

docker exec mongodb mongodump
docker cp mongodb:/dump /home/abrikos
tar -czf "/home/abrikos/backup/$( date +%Y%m%d_%H%M%S ).tar.gz" /home/abrikos/dump