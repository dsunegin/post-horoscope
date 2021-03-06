import {Dirent} from 'fs';

const slugify = require('slugify');
const fs = require('fs').promises;
const path = require('path');
const {crc16} = require('crc');

export const  wait = async (ms: number) => {
    return new Promise( (resolve) => {setTimeout(resolve, ms)});
}
export const getYesterday = (c: Date = new Date(), dateOnly = false) => {
    let d = new Date(c);
    d.setDate(d.getDate() - 1);
    return dateOnly ? new Date(d.toDateString()) : d;
};
export const getTomorrow = (c: Date = new Date(), dateOnly = false) => {
    let d = new Date(c);
    d.setDate(d.getDate() + 1);
    return dateOnly ? new Date(d.toDateString()) : d;
};
/**
 * getFiles returns a list of all files in a directory path {dirPath}
 * that match a given file extension {fileExt} (optional).
 */
export const getFiles = async (dirPath: string, fileExt = '') => {
  // List all the entries in the directory.
  const dirents = await fs.readdir(dirPath, {withFileTypes: true});

  return (
    dirents
      // Omit any sub-directories.
      .filter((dirent: Dirent) => dirent.isFile())
      // Ensure the file extension matches a given extension (optional).
      .filter((dirent: Dirent) =>
        fileExt.length ? dirent.name.toLowerCase().endsWith(fileExt) : true
      )
      // Return a list of file names.
      .map((dirent: Dirent) => dirent.name)
  );
};

export const getRandomImage = async (dirPath: string) => {
  // Get a list of all Markdown files in the directory.
  const fileNames = await getFiles(dirPath, '.jpg');

  // Create a list of files to read.
  const filesToRead = fileNames.map(
    (fileName: string) => path.resolve(dirPath, fileName)
    //dirPath+fileName
  );
  const randFnum = getRandomIntInclusive(0, filesToRead.length - 1);
  return filesToRead[randFnum];
};
export const Capitalize = (tCap: string): string => {
  return tCap.charAt(0).toUpperCase() + tCap.slice(1);
};
export const sortRandom = (arr: Array<string | number>) =>
  arr.sort(() => Math.random() - 0.5);
export const getRandomIntInclusive = (min: number, max: number) => {
  return (
    Math.floor(Math.random() * (max - min + 1)) + min
  ); /*???????????????? ?? ?????????????? ???????????????????? */
};

export const aliasSlug = (text: string, uniq: boolean = true): string => {
  return slugify(text, {
    remove: /[*+~.()'"!:@]/g, //  to remove *+~.()'"!:@ from the result slug
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
  }) + ( (uniq) ? '-' + crc16((new Date()).toString()).toString(16) : '');
};
