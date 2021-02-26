
// const tsvToJson = require('./tsvToJson');


// console.log('*************');
// const dataPath = "./utils/clean_chat_corpus";

// const newFiles = tsvToJson.getNewTsvFilesSync(dataPath);
// console.log(newFiles);

// newFiles.forEach(file => {
//   tsvToJson.tsvFileToJsonFileSync(dataPath, file.tsvFile, file.jsonFile);
// });
const fs = require('fs');

const modules = require("../config/mysqlConfig");
const mysql = require("mysql");
const json ='./douban_single_turn.json';
// const data = fs.readFileSync(json);

// const dataObj = JSON.parse(data);

const dataObj = require(json);

//连接数据库
const conn = mysql.createConnection(modules.connection);

(async () =>{
  for (let w of dataObj) {
    
    try {
      let addsql = `insert into chatterbot(question, answer) values (?,?)`
      const params = [w['昆明 那里 配 眼镜 比较 便宜'], w['云大 附近 很多 店 应该 有 竞争 价格 会 下来 一点 的 吧']];
      // console.log('>>>>>>>>>>>>>>>>>>>>>.', params);
      await insert(addsql, params)
    } catch (error) {
      
    }
  }
})();


function insert(addsql, params) {
  return new Promise((resolve, reject) => {
    conn.query(addsql, params, function (err, results) {
      if(err) {
        console.log(err);
        reject(err);
      } else {
        console.log(params[0]);
        resolve('ok');
      }
    })
  })
}