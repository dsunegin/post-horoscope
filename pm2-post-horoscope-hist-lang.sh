#!/bin/sh

npm run compile


pm2 status | grep post-horoscope-hist-lang && pm2 delete post-horoscope-hist-lang
#CRON="*/3 * * * *" pm2 start --name post-horoscope-hist-lang build/src/index-hist-lang.js
pm2 start --name post-horoscope-hist-lang build/src/index-hist-lang.js
pm2 save