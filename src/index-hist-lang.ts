import * as assets from './assets/assets';
import {translateApi} from './assets/gtranslate';

const mysql = require('mysql2');
//console = require('./console.js');
const envconf = require('dotenv').config();
const cron = require('node-cron');
const nunjucks = require('nunjucks');
const format = require('date-fns/format');
const path = require('path');
const terminate = require('./assets/terminate');

if (envconf.error) {    throw envconf.error; } // ERROR if Config .env file is missing
// PROCESS Terminate Handlers
const exitHandler = terminate({ coredump: false, timeout: 500});
process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
process.on('SIGINT', exitHandler(0, 'SIGINT'));

const HoroscopeL = [
    {language: 'ru', lang_loc: 'ru-RU', category: '89', loc: 'ru', h_td: 'гороскоп на сегодня', h_tm: 'гороскоп на завтра' },
    {language: 'uk', lang_loc: 'uk-UA', category: '104', loc: 'uk', h_td: 'гороскоп на сьогодні', h_tm: 'гороскоп на завтра' },
    {language: 'be', lang_loc: 'be-BY', category: '163', loc: 'be', h_td: 'гараскоп на сёння', h_tm: 'гараскоп на заўтра' },
    {language: 'pl', lang_loc: 'pl-PL', category: '173', loc: 'pl', h_td: 'horoskop na dziś', h_tm: 'horoskop na jutro' },
    {language: 'en', lang_loc: 'en-GB', category: '96', loc: 'en-GB', h_td: 'horoscope for today', h_tm: 'horoscope for tomorrow' },
    {language: 'fr', lang_loc: 'fr-FR', category: '121', loc: 'fr', h_td: 'horoscope du jour', h_tm: 'horoscope de demain' },
    {language: 'de', lang_loc: 'de-DE', category: '133', loc: 'de', h_td: 'Horoskop für heute', h_tm: 'Horoskop für morgen' },
    {language: 'es', lang_loc: 'es-ES', category: '143', loc: 'es', h_td: 'horóscopo de hoy', h_tm: 'horóscopo para mañana' },
    {language: 'it', lang_loc: 'it-IT', category: '153', loc: 'it', h_td: 'oroscopo di oggi', h_tm: 'oroscopo per domani' },
    {language: 'bg', lang_loc: 'bg-BG', category: '183', loc: 'bg', h_td: 'хороскоп за днес', h_tm: 'хороскоп за утре' },
];

// Посты в следующей последовательности:
// 7-й ряд(#6) - рыбы. Ищется tamplate с множественным числом по префиксу m_
interface zItem { name: string,code: string }
interface zType {
    [key: string]: Array<zItem> | any ;
}
let ZodiacL: zType =[];
ZodiacL['ru']  = [
    {name: 'Овен', code: 'aries'},
    {name: 'Телец', code: 'taurus'},
    {name: 'Близнецы', code: 'gemini'},

    {name: 'Рак', code: 'cancer'},
    {name: 'Лев', code: 'leo'},
    {name: 'Дева', code: 'virgo'},

    {name: 'Весы', code: 'libra'},
    {name: 'Скорпион', code: 'scorpio'},
    {name: 'Стрелец', code: 'sagittarius'},

    {name: 'Козерог', code: 'capricorn'},
    {name: 'Водолей', code: 'aquarius'},
    {name: 'Рыбы', code: 'pisces'}
];
ZodiacL['uk']  = [
    {name: 'Овен', code: 'aries'},
    {name: 'Телець', code: 'taurus'},
    {name: 'Близнюки', code: 'gemini'},

    {name: 'Рак', code: 'cancer'},
    {name: 'Лев', code: 'leo'},
    {name: 'Діва', code: 'virgo'},

    {name: 'Терези', code: 'libra'},
    {name: 'Скорпіон', code: 'scorpio'},
    {name: 'Стрілець', code: 'sagittarius'},

    {name: 'Козоріг', code: 'capricorn'},
    {name: 'Водолій', code: 'aquarius'},
    {name: 'Риби', code: 'pisces'}
];
ZodiacL['be']  = [
    {name: 'Авен', code: 'aries'},
    {name: 'Цялец', code: 'taurus'},
    {name: 'Блізняты', code: 'gemini'},

    {name: 'Рак', code: 'cancer'},
    {name: 'Леў', code: 'leo'},
    {name: 'Дзева', code: 'virgo'},

    {name: 'Шалі', code: 'libra'},
    {name: 'Скарпіён', code: 'scorpio'},
    {name: 'Стралец', code: 'sagittarius'},

    {name: 'Казярог', code: 'capricorn'},
    {name: 'Вадалей', code: 'aquarius'},
    {name: 'Рыбы', code: 'pisces'}
];
ZodiacL['pl']  = [
    {name: 'Baran', code: 'aries'},
    {name: 'Byk', code: 'taurus'},
    {name: 'Bliźnięta', code: 'gemini'},

    {name: 'Rak', code: 'cancer'},
    {name: 'Lew', code: 'leo'},
    {name: 'Panna', code: 'virgo'},

    {name: 'Waga', code: 'libra'},
    {name: 'Skorpion', code: 'scorpio'},
    {name: 'Strzelec', code: 'sagittarius'},

    {name: 'Koziorożec', code: 'capricorn'},
    {name: 'Wodnik', code: 'aquarius'},
    {name: 'Ryby', code: 'pisces'}
];
ZodiacL['en']  = [
    {name: 'Aries', code: 'aries'},
    {name: 'Taurus', code: 'taurus'},
    {name: 'Gemini', code: 'gemini'},

    {name: 'Cancer', code: 'cancer'},
    {name: 'Leo', code: 'leo'},
    {name: 'Virgo', code: 'virgo'},

    {name: 'Libra', code: 'libra'},
    {name: 'Scorpio', code: 'scorpio'},
    {name: 'Sagittarius', code: 'sagittarius'},

    {name: 'Capricorn', code: 'capricorn'},
    {name: 'Aquarius', code: 'aquarius'},
    {name: 'Pisces', code: 'pisces'}
];
ZodiacL['fr']  = [
    {name: 'Bélier', code: 'aries'},
    {name: 'Taureau', code: 'taurus'},
    {name: 'Gémeaux', code: 'gemini'},

    {name: 'Cancer', code: 'cancer'},
    {name: 'Lion', code: 'leo'},
    {name: 'Vierge', code: 'virgo'},

    {name: 'Balance', code: 'libra'},
    {name: 'Scorpion', code: 'scorpio'},
    {name: 'Sagittaire', code: 'sagittarius'},

    {name: 'Capricorne', code: 'capricorn'},
    {name: 'Verseau', code: 'aquarius'},
    {name: 'Poissons', code: 'pisces'}
];
ZodiacL['de']  = [
    {name: 'Widder', code: 'aries'},
    {name: 'Stier', code: 'taurus'},
    {name: 'Zwillinge', code: 'gemini'},

    {name: 'Krebs', code: 'cancer'},
    {name: 'Löwe', code: 'leo'},
    {name: 'Jungfrau', code: 'virgo'},

    {name: 'Waage', code: 'libra'},
    {name: 'Skorpion', code: 'scorpio'},
    {name: 'Schütze', code: 'sagittarius'},

    {name: 'Steinbock', code: 'capricorn'},
    {name: 'Wassermann', code: 'aquarius'},
    {name: 'Fische', code: 'pisces'}
];
ZodiacL['es']  = [
    {name: 'Aries', code: 'aries'},
    {name: 'Tauro', code: 'taurus'},
    {name: 'Géminis', code: 'gemini'},

    {name: 'Cáncer', code: 'cancer'},
    {name: 'Leo', code: 'leo'},
    {name: 'Virgo', code: 'virgo'},

    {name: 'Libra', code: 'libra'},
    {name: 'Escorpio', code: 'scorpio'},
    {name: 'Sagitario', code: 'sagittarius'},

    {name: 'Capricornio', code: 'capricorn'},
    {name: 'Acuario', code: 'aquarius'},
    {name: 'Piscis', code: 'pisces'}
];
ZodiacL['it']  = [
    {name: 'Ariete', code: 'aries'},
    {name: 'Toro', code: 'taurus'},
    {name: 'Gemelli', code: 'gemini'},

    {name: 'Cancro', code: 'cancer'},
    {name: 'Leone', code: 'leo'},
    {name: 'Vergine', code: 'virgo'},

    {name: 'Bilancia', code: 'libra'},
    {name: 'Scorpione', code: 'scorpio'},
    {name: 'Sagittario', code: 'sagittarius'},

    {name: 'Capricorno', code: 'capricorn'},
    {name: 'Acquario', code: 'aquarius'},
    {name: 'Pesci', code: 'pisces'}
];
ZodiacL['bg']  = [
    {name: 'Овен', code: 'aries'},
    {name: 'Телец', code: 'taurus'},
    {name: 'Близнаци', code: 'gemini'},

    {name: 'Рак', code: 'cancer'},
    {name: 'Лъв', code: 'leo'},
    {name: 'Дева', code: 'virgo'},

    {name: 'Везни', code: 'libra'},
    {name: 'Скорпион', code: 'scorpio'},
    {name: 'Стрелец', code: 'sagittarius'},

    {name: 'Козирог', code: 'capricorn'},
    {name: 'Водолей', code: 'aquarius'},
    {name: 'Риби', code: 'pisces'}
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
   // try {
        //let start = new Date(2020,0,1);       // january 1 2020
        //let end = new Date(2021,5,1);       // june 1 2021
        //let start = new Date(2021,3,5);
        //let end = new Date(2021,5,9);
        //const now: Date = new Date(); // Now

    let start = assets.getYesterday(new Date());

        translateApi.setToken(process.env.BEARER || 'default_Bearer');

        // Ищем начало
        let sqlS = `SELECT * FROM os0fr_content WHERE note='horoscope' AND language <>'ru-RU' ORDER BY publish_up DESC LIMIT 1`;
        let resultS = await connectionPRESS.query(sqlS);
        let PostTitleSearch = resultS[0][0].title;

        let start_found = false;
        while (start < new Date()) {
            const tomorrow = assets.getTomorrow(start);
            //const yesterday = assets.getYesterday(start);

            //const now: Date = new Date(today); // Now
            // Подготовим массив ссылок на каждый знак зодика для всех языков
            let hrefArrL =[];
            let LocaleL=[];
            for (let iz = 0, zitem: any; (zitem = HoroscopeL[iz]); ++iz) {
                const Locale = require(`date-fns/locale/${zitem.loc}`);
                LocaleL[zitem.language] = Locale;
                const dateLoc = format(start, 'd MMMM yyyy', {locale: Locale});
                const dateLocTomorrow = format(tomorrow, 'd MMMM yyyy', {locale: Locale});

                //const dateLoc2 = format(start, 'd MMMM yyyy', {locale: Locale});
                let Zodiac = ZodiacL[zitem.language];
                let hrefArr = Zodiac.map((el: zItem) => {
                    const elTitle = `${el.name} - ${zitem.h_td}`;
                    const elHref = assets.aliasSlug(`${el.name} - ${zitem.h_td} ${dateLoc}`, false);
                    return {elHref, elTitle};
                });
                hrefArrL[zitem.language] = hrefArr;
                //let hrefTextAdd = hrefArr.map((el: any) => `<a href="${subURL}${el.elHref}" title="${el.elTitle}">${el.elTitle}</a>`).join('<br>');
            };

            //hrefTextAdd = `<h2>Гороскоп для всех знаков зодиака на ${dateLoc}:</h2> ${hrefTextAdd}`;

            // Подготовим массив Template для 12 знаков зодиака на русском языке
            let zodiacArr: Array<object> = [];
            while (zodiacArr.length < 12) {
                let sql = `SELECT * FROM horoscope WHERE lang='ru' AND published=1  ORDER BY RAND() LIMIT 1`;
                let result = await connectionESOTERIC.query(sql);
                let tplArr = result[0][0];
                // Uniq array
                const zodiacArrJSON = JSON.stringify(zodiacArr);
                if (zodiacArr.length == 6) {
                    const tplJSON = JSON.stringify(tplArr);
                    if (tplJSON.indexOf('m_') != -1 && zodiacArrJSON.indexOf(tplJSON) == -1) zodiacArr.push(tplArr);
                } else if (zodiacArrJSON.indexOf(JSON.stringify(tplArr)) == -1) zodiacArr.push(tplArr);
            }

            for (let i = 0, itpl: any; (itpl = zodiacArr[i]); ++i) {
                let Zodiac = ZodiacL['ru'];
                let sql = `SELECT kto_chto,kogo_chego,komu_chemu,kogo_chto,kem_chem,kom_chom,m_kto_chto,m_kogo_chego,m_komu_chemu,m_kogo_chto,m_kem_chem,m_kom_chom FROM zodiac WHERE zodiac='${Zodiac[i].code}' `;
                let result = await connectionESOTERIC.query(sql);
                let zodiacArr = result[0][0];
                // Переводим для каждого языка, кроме русского(0-го индекса)
            for (let iz = 1, zitem: any; (zitem = HoroscopeL[iz]); ++iz) {

                const ZodiacName = ZodiacL[zitem.language][i].name;
                // Choose random PostImage
                let PersonImgPath = path.join(process.env.WEBSITE_ROOT_PATH, process.env.ZODIAK_PATH, Zodiac[i].code);
                PersonImgPath = path.resolve(PersonImgPath);
                let PostImg = await assets.getRandomImage(PersonImgPath);
                PostImg = PostImg.replace(path.resolve(process.env.WEBSITE_ROOT_PATH), '');
                // Generate PostTitle
                let Locale = LocaleL[zitem.language];
                const dateLoc = format(start, 'd MMMM yyyy', {locale: Locale});
                const dateLocTomorrow = format(tomorrow, 'd MMMM yyyy', {locale: Locale});
                console.log(dateLoc);
                const PostTitle = `${ZodiacName} - ${zitem.h_td} ${dateLoc}`;
                // Ищем начало постинга при восстановлении скрипта
                if (PostTitle == PostTitleSearch) { start_found=true; continue;};
                if (!start_found) { continue;};

                let hrefTomorrow = assets.aliasSlug(`${ZodiacName} - ${zitem.h_td} ${dateLocTomorrow}`, false);
                let hrefTodayTomorrow = assets.aliasSlug(`${ZodiacName} - ${zitem.h_td} ${dateLoc}`, false);

                const lang_loc = zitem.lang_loc;
                let subURL=`/${lang_loc}/article/society/`;
                const hrefArr = hrefArrL[zitem.language];
                let hrefTextTommorrow = `<a href="${subURL}${hrefTomorrow}" title="${ZodiacName} - ${zitem.h_tm}"><h2>${ZodiacName} - ${zitem.h_tm}</h2></a>`
                let hrefTextTodayTommorrow = `<a href="${subURL}${hrefTodayTomorrow}" title="${ZodiacName} - ${zitem.h_tm}"><h2>${ZodiacName} - ${zitem.h_tm}</h2></a>`

                let PostText = nunjucks.renderString(itpl.post_tpl, zodiacArr);
                let tr_text = await  translateApi.translate({sl:'ru', tl: zitem.language, text: PostText});
                if (tr_text.length<20) {console.log('Length less 50'); process.exit(1); };
                // correct Ukrainian and Belarussian translation
                if (zitem.language =='uk' || zitem.language =='be' || zitem.language =='pl'){
                    tr_text = tr_text.replace(/\ ([.,?!:;])/g,'$1')
                }


                // Correct Text
                tr_text = tr_text.replace(/fish/ig,'Pisces');
                tr_text = tr_text.replace(/fishing/ig,'Pisces');

                tr_text = tr_text.replace(/панна/ig,'Дзева');
                tr_text = tr_text.replace(/панне/ig,'Дзеве');
                tr_text = tr_text.replace(/панны/ig,'Дзевы');

                let hrefTextAdd = hrefArr.map((el: any) => `<a href="${subURL}${el.elHref}" title="${el.elTitle}">${el.elTitle}</a>`).join('<br>');
                //const PostTextTR = `<img alt="${PostTitle}" src="${PostImg}"> <p>${tr_text}</p> ${hrefTextAdd} ${hrefTextTommorrow}`;
                const PostTextTR = `<img alt="${PostTitle}" src="${PostImg}"> <p>${tr_text}</p> ${hrefTextAdd}`;
                let alias = hrefArr[i].elHref;

                // Update yesterday horoscope with Link to current
                let sqlU = `SELECT * FROM os0fr_content WHERE language='${lang_loc}' AND note='horoscope' AND title LIKE '%${ZodiacName}%' ORDER BY publish_up DESC LIMIT 1`;
                let resultU = await connectionPRESS.query(sqlU);
                if (resultU[0].length > 0) {
                    let PostTextTommorrow = `${resultU[0][0].introtext} <br> ${hrefTextTodayTommorrow}`
                    let sqlUpd = `UPDATE os0fr_content SET introtext=?  WHERE id=${resultU[0][0].id}`;
                    await connectionPRESS.query(sqlUpd,[PostTextTommorrow]);
                }
                // Add Today horoscope
                sql =
                    'INSERT INTO os0fr_content (title, alias, introtext, catid, language, state, created, publish_up, created_by,access,note) VALUES (?,?,?,?,?,1,NOW(),NOW(),84,1,?)';
                const post = [PostTitle, alias, PostTextTR, zitem.category, lang_loc, 'horoscope'];
                await connectionPRESS.query(sql, post);


                console.log(`OK: ${zitem.language}   ${Zodiac[i].code}`);
                await assets.wait(20000);
            }
            } //end for

            const newDate = start.setDate(start.getDate() + 1);
            start = new Date(newDate);
            //await assets.wait(5000);
        } // End While
        return 'Successful';
    /*} catch (err) {
        console.error(err);
        throw new
        return err.message;
    }*/
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





















