#!/bin/bash
set -a
source /etc/.env
curl "http://nuxt:3000/weather-hourly?session=${NUXT_SESSION_PASSWORD}"
set +a