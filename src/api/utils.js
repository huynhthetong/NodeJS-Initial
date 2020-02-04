/**find and use moduels */
const fs = require('fs');
const path = require('path');
/**
 *
 *this function is blocking, fix that
 * @param {string} name full file name of asset in asset folder
 */

const findAsset = name => {
  const assetPath = path.join(__dirname, 'assets', name);

  return new Promise((resolve, reject) => {
    fs.readFile(assetPath, { encoding: 'utf-8' }, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

module.exports = {
  findAsset,
};
