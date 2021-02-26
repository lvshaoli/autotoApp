const logger = require("log4js").getLogger("services/apiService");
const modules = require("../config/mysqlConfig");
const BaseController = require("../controllers/baseController");
const mysql = require("mysql");
const $sql = require("./sqlMap");
//连接数据库
const conn = mysql.createConnection(modules.connection);

/**
 * 数据处理层
 * 主要对数据库进行一系列的操作
 */
class ApiService extends BaseController {
  constructor() {
    super();
    this.baseController = new BaseController();
  }

  //注册
  userRegister(number, password) {
    return new Promise((resolve, reject) => {
      try {
        const select_number = $sql.user.select_number;
        const sql_add = $sql.user.add;
        conn.query(select_number, number, function (err, results) {
          if (err) logger.error(error);
          if (results[0] === undefined) {
            conn.query(sql_add, [number, password], function (err, addData) {
              if (err) logger.error(error);
              if (results) {
                resolve(BaseController(addData));
                console.log("您的信息注册成功！");
              }
            });
          } else {
            //当前注册name与数据库重复时，返回-1:提示已存在的用户名！
            resolve("已存在的账号!");
            console.log("已存在的账号!");
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  //登陆
  userLand(number, password) {
    return new Promise((resolve, reject) => {
      try {
        const sql_number = $sql.user.select_number;
        const sql_pwd = $sql.user.select_password;
        conn.query(sql_number, number, function (err, results) {
          if (err) logger.error(error);
          if (results[0] === undefined) {
            resolve({ msg: "您输入的的账号不正确！" });
            console.log("您输入的的账号不正确！");
          } else {
            conn.query(sql_pwd, password, function (err, results) {
              if (err) logger.error(error);
              if (results[0] === undefined) {
                resolve({ msg: "密码输入错误！" });
                console.log("密码输入错误！");
              } else {
                resolve({ msg: "登陆成功" });
                console.log("用户" + number + "登陆成功");
              }
            });
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // 保存数据
  saveUserInfo(nikesnames) {
    return new Promise((resolve, reject) => {
      try {
        let sql_addInfo = $sql.user.addInfo;

        console.log("*****", nikesnames);
        let sql = $sql.user.select_allList;
        conn.query(sql, [], function (err, results) {
          if (err) {
            reject(err);
          }
          if (results) {
            const allMemors = JSON.parse(JSON.stringify(results));

            let nikesnamesArr = (nikesnames && nikesnames.split(",")) || [];
            nikesnamesArr =
              nikesnamesArr &&
              nikesnamesArr.filter((item) => {
                const myfilter = allMemors.filter((allItem) => {
                  const nickname = allItem.nickname;
                  return item == nickname;
                });
                return !myfilter.length;
              });

            if (!nikesnamesArr.length) {
              resolve({ msg: "保存成功" });
              return;
            }
            const newdata =
              nikesnamesArr &&
              nikesnamesArr.map((element) => {
                return [element];
              });
            conn.query(sql_addInfo, [newdata], function (err, results) {
              if (err) {
                reject(err);
              }
              if (results) {
                resolve({ msg: "保存成功" });
                console.log("保存成功！");
              }
            });
          }
        });
      } catch (error) {
        reject({ msg: "" });
      }
    });
  }

  queryAllUserList(query) {
    const { isHello, isPhone } = query || {};

    return new Promise((resolve, reject) => {
      try {
        let sql = !!isHello
          ? $sql.user.select_HelloList
          : !!isPhone
          ? $sql.user.select_hasphoneList
          : $sql.user.select_allList;
        let par = !!isHello ? isHello : !!isPhone ? isPhone : "";
        console.log("*****", sql, par);
        conn.query(sql, [par], function (err, results) {
          if (err) {
            reject(err);
          }
          if (results) {
            resolve(results);
            console.log("查询成功！");
          }
        });
      } catch (error) {
        reject({ msg: "" });
      }
    });
  }

  isHelloAndPhoneUser(query) {
    const { nickname } = query || {};
    return new Promise((resolve, reject) => {
      try {
        let sql = $sql.user.select_nickname_ishello;
        conn.query(sql, [nickname], function (err, results) {
          if (err) {
            reject(err);
          }
          if (results) {
            resolve(results);
            console.log("查询成功！");
          }
        });
      } catch (error) {
        reject({ msg: "" });
      }
    });
  }

  updateOther(query) {
    const { nickname, isHello, isPhone, phoneno } = query || {};
    return new Promise((resolve, reject) => {
      try {
        let sql =
          isHello && isPhone
            ? $sql.user.update_all
            : !!isHello
            ? $sql.user.update_nickname_ishello
            : $sql.user.update_nickname_isphone;

        let par =
          isHello && isPhone
            ? `${isHello},${isPhone}`
            : !!isHello
            ? isHello
            : isPhone;
            
            if (phoneno) {
              sql = $sql.user.update_nickname_phoneNo;
              par = phoneno;
            }
        conn.query(sql, [par, nickname], function (err, results) {
          if (err) {
            reject(err);
          }
          if (results) {
            resolve(results);
            console.log("更新成功！");
          }
        });
      } catch (error) {
        reject({ msg: "" });
      }
    });
  }
}

module.exports = ApiService;
