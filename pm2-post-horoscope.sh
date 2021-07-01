#!/bin/sh

npm run compile

# Start each at 7:30 am

pm2 status | grep post-horoscope && pm2 delete post-horoscope
CRON="30 7 * * *" pm2 start --name post-horoscope build/src/index.js
pm2 save