#!/bin/sh

npm run compile

#
pm2 status | grep post-horoscope-lang && pm2 delete post-horoscope-lang
CRON="3 */6 * * *" pm2 start --name post-horoscope-lang build/src/index-hist-lang.js
pm2 save