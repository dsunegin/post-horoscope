const mysql = require('mysql2');
import * as console from './console.js';
//const console = require('./console.js');
const envconf = require('dotenv').config();
const cron = require('node-cron');

if (envconf.error) {    throw envconf.error; } // ERROR if Config .env file is missing

const language = 'ru';
const Zodiac = [
    {name: 'Овен', code: 'aries', href: 'https://1001goroskop.ru/?znak=aries'},
    {name: 'Телец', code: 'taurus', href: 'https://1001goroskop.ru/?znak=taurus'},
    {name: 'Близнецы', code: 'gemini', href: 'https://1001goroskop.ru/?znak=gemini'},

    {name: 'Рак', code: 'cancer', href: 'https://1001goroskop.ru/?znak=cancer'},
    {name: 'Лев', code: 'leo', href: 'https://1001goroskop.ru/?znak=leo'},
    {name: 'Дева', code: 'virgo', href: 'https://1001goroskop.ru/?znak=virgo'},

    {name: 'Весы', code: 'libra', href: 'https://1001goroskop.ru/?znak=libra'},
    {name: 'Скорпион', code: 'scorpio', href: 'https://1001goroskop.ru/?znak=scorpio'},
    {name: 'Стрелец', code: 'sagittarius', href: 'https://1001goroskop.ru/?znak=sagittarius'},

    {name: 'Козерог', code: 'capricorn', href: 'https://1001goroskop.ru/?znak=capricorn'},
    {name: 'Водолей', code: 'aquarius', href: 'https://1001goroskop.ru/?znak=aquarius'},
    {name: 'Рыбы', code: 'pisces', href: 'https://1001goroskop.ru/?znak=pisces'}
];


const connectionESOTERIC = mysql
    .createConnection({
        host: process.env.DB_ESOTERICHOST,
        port: process.env.DB_ESOTERICPORT,
        user: process.env.DB_ESOTERICUSER,
        database: process.env.DB_ESOTERICDATABASE,
        password: process.env.DB_ESOTERICPASSWORD,
    })
    .promise();

const main = async (): Promise<string> => {
    try {
        let zodiacArr: Array<object> = [];
        while (zodiacArr.length<16) {
            let sql = `SELECT * FROM horoscope WHERE lang='${language}' AND published=1  ORDER BY RAND() LIMIT 1`;
            let result = await connectionESOTERIC.query(sql);
            let tplArr = result[0][0];
            // Uniq array
            if(JSON.stringify(zodiacArr).indexOf(JSON.stringify(tplArr))== - 1) zodiacArr.push(tplArr);
        }


        let sql = `SELECT * FROM horoscope WHERE lang='${language}' AND published=0  ORDER BY id ASC`;
        let result = await connectionESOTERIC.query(sql);
        if (result[0].length == 0) return "NO NEW ESOTERIC DATA";
        const srcArr = result[0];

        for (let i = 0, itpl; (itpl = srcArr[i]); ++i) {
            let tpl = itpl.post.toString();
            sql = `SELECT kto_chto,kogo_chego,komu_chemu,kogo_chto,kem_chem,kom_chom,m_kto_chto,m_kogo_chego,m_komu_chemu,m_kogo_chto,m_kem_chem,m_kom_chom FROM zodiac WHERE zodiac='${itpl.zodiac}' `;
            result = await connectionESOTERIC.query(sql);
            let zodiacArr = Object.entries(result[0][0]);

            zodiacArr.sort((a:any, b:any) => {
                // ASC  -> a.length - b.length
                // DESC -> b.length - a.length
                return b[1].length - a[1].length;
            });
            if (Object.keys(zodiacArr).length !== 0) {
                for (let j = 0, zd:any; (zd = zodiacArr[j]); ++j) {
                    if ( zd[1].toString().length == 0 || tpl.indexOf(zd[1])<0) continue;
                    // create template
                    const rpl = new RegExp(`${zd[1]}`, 'ig');
                    tpl =  tpl.replace(rpl, `{{ ${zd[0]} }}` );
                }
            }
            //sql = `UPDATE horoscope SET post_tpl=?, published=1  WHERE id=${itpl.id}`;
            //result = await connectionESOTERIC.query(sql,[tpl]);



        } // End For
        return 'Successful';
    } catch (err) {
        console.log(err);
        return err.message;
    }
};

if (process.env.CRON) {
    console.log('Cron Scheduled');
    cron.schedule(
        process.env.CRON,
        () => {
            main()
                .then()
                .catch(err => console.error(err));
        },
        {scheduled: true}
    );
} else {
    main()
        .then(created => console.log({level: 'info',message: created}))
        .catch(err => console.error(err));
}




















