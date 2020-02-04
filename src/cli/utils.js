/**find and use module */
const fs = require('fs');
const path = require('path');

//this path needs to be relative to work with fs
const datasLocation = 'datas.json';

/**
 * Should reads the data at the @datasLocation path and convert it to a is object
 */
const getDatas = () => {
  const datas = fs
    .readFileSync(path.join(__dirname, datasLocation), {
      encoding: 'utf-8',
    })
    .toString();

  return JSON.parse(datas);
};
/**
 * Takes the datas objects, converts its to JSON and saves it at the @datasLocation path
 * @param {object} datas datas object
 */
const saveDatas = datas => {
  /** converts to json */
  const dataJSON = JSON.stringify(datas, null, 2);
  /**save @datas objects */
  fs.writeFileSync(path.join(__dirname, datasLocation), dataJSON);
};

module.exports = {
  datasLocation,
  getDatas,
  saveDatas,
};
