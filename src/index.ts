import * as assets from './assets/assets';
const mysql = require('mysql2');
//console = require('./console.js');
const envconf = require('dotenv').config();
const cron = require('node-cron');
const nunjucks = require('nunjucks');
const format = require('date-fns/format');
const path = require('path');

if (envconf.error) {    throw envconf.error; } // ERROR if Config .env file is missing

const language = 'ru';
const lang_loc ='ru-RU';
const category ='89';       // Общество
const subURL = '/ru-RU/article/society/';
const Locale = require(`date-fns/locale/${language}`);

// Посты в следующей последовательности:
// 7-й ряд(#6) - рыбы. Ищется tamplate с множественным числом по префиксу m_
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

const connectionPRESS = mysql
    .createConnection({
        host: process.env.DB_PRESSHOST,
        port: process.env.DB_PRESSPORT,
        user: process.env.DB_PRESSUSER,
        database: process.env.DB_PRESSDATABASE,
        password: process.env.DB_PRESSPASSWORD,
    })
    .promise();

const main = async (): Promise<string> => {
    try {
        const now: Date = new Date(); // Now
        const dateLoc = format(now, 'do MMMM yyyy', {locale: Locale});
        //const dateLoc2 = format(now, 'd MMMM yyyy', {locale: Locale});
        let hrefArr = Zodiac.map(el => {
            const elTitle = `${el.name} - гороскоп на сегодня`;
            const elHref = assets.aliasSlug(`${el.name} - гороскоп на сегодня ${dateLoc}`,false);
            return {elHref,elTitle};
            });
        let hrefTextAdd = hrefArr.map(el => `<a href="${subURL}${el.elHref}" title="${el.elTitle}">${el.elTitle}</a>`).join('<br>');
        //hrefTextAdd = `<h2>Гороскоп для всех знаков зодиака на ${dateLoc}:</h2> ${hrefTextAdd}`

        let zodiacArr: Array<object> = [];
        while (zodiacArr.length<12) {
            let sql = `SELECT * FROM horoscope WHERE lang='${language}' AND published=1  ORDER BY RAND() LIMIT 1`;
            let result = await connectionESOTERIC.query(sql);
            let tplArr = result[0][0];
            // Uniq array
            const zodiacArrJSON = JSON.stringify(zodiacArr);
            if(zodiacArr.length==6) {
                const tplJSON = JSON.stringify(tplArr);
                if (tplJSON.indexOf('m_')!= -1 && zodiacArrJSON.indexOf(tplJSON)== - 1) zodiacArr.push(tplArr);
            }
            else if(zodiacArrJSON.indexOf(JSON.stringify(tplArr))== - 1) zodiacArr.push(tplArr);
        }


        for (let i = 0, itpl: any; (itpl = zodiacArr[i]); ++i) {




            //
            let sql = `SELECT kto_chto,kogo_chego,komu_chemu,kogo_chto,kem_chem,kom_chom,m_kto_chto,m_kogo_chego,m_komu_chemu,m_kogo_chto,m_kem_chem,m_kom_chom FROM zodiac WHERE zodiac='${Zodiac[i].code}' `;
            let result = await connectionESOTERIC.query(sql);
            let zodiacArr = result[0][0];
            let PersonImgPath = path.join(process.env.WEBSITE_ROOT_PATH,process.env.ZODIAK_PATH ,Zodiac[i].code);
            PersonImgPath = path.resolve(PersonImgPath);
            let PostImg = await assets.getRandomImage(PersonImgPath);
            PostImg = PostImg.replace(path.resolve(process.env.WEBSITE_ROOT_PATH), '');
            const PostTitle = `${Zodiac[i].name} - гороскоп на сегодня ${dateLoc}`;
            let PostText = nunjucks.renderString(itpl.post_tpl, zodiacArr );
            PostText = `<img alt="${PostTitle}" src="${PostImg}"> <p>${PostText}</p> ${hrefTextAdd}`;
            let alias = hrefArr[i].elHref;

            // Update yesterday horoscope with Link to current
            let sqlU = `SELECT * FROM os0fr_content WHERE language='${lang_loc}' AND note='horoscope' AND title LIKE '%${Zodiac[i].name}%' ORDER BY publish_up DESC LIMIT 1`;
            let resultU = await connectionPRESS.query(sqlU);
            if (resultU[0].length > 0) {
                let PostTextTommorrow = `${resultU[0][0].introtext} <a href="${subURL}${alias}" title="${Zodiac[i].name} - гороскоп на завтра"><h2>${Zodiac[i].name} - гороскоп на завтра<h2></a>`
                let sqlUpd = `UPDATE os0fr_content SET introtext=?  WHERE id=${resultU[0][0].id}`;
                await connectionPRESS.query(sqlUpd,[PostTextTommorrow]);
            }
            // Post Today Horoscope
            sql =
                'INSERT INTO os0fr_content (title, alias, introtext, catid, language, state, created, publish_up, created_by,access,note) VALUES (?,?,?,?,?,1,NOW(),NOW(),84,1,?)';
            const post = [PostTitle, alias, PostText, category, lang_loc,'horoscope'];
            await connectionPRESS.query(sql, post);


            console.log(`OK: ${Zodiac[i].code}`);
        }




        return 'Successful';
    } catch (err) {
        console.error(err);
        return err.message;
    }
};

if (process.env.CRON) {
    console.log('Cron Scheduled');
    cron.schedule(
        process.env.CRON,
        () => {
            main()
                .then(created => console.log(created))
                .catch(err => console.error(err));
        },
        {scheduled: true}
    );
} else {
    main()
        .then(created => console.log(created))
        .catch(err => console.error(err));
}




















