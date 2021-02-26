const logger = require("log4js").getLogger("controllers/musicController");
const BaseController = require('./baseController');
const ApiService = require("../services/apiService");
/**
 * 业务逻辑层
 * 主要对业务逻辑进行处理
 */
class ApiController extends BaseController {
  constructor() {
    super();
    this.apiService = new ApiService();
  }

  /**
   * 登陆注册
   * @param req
   * @param res
   */
  userLogin(req, res) {
    try {
      const query = req.query;
      const number = req.body.number;
      const password = req.body.password;
      let loginData;

      //判断路由参数，确定是注册还是登陆
      if (query.status === "register") {
        //注册
        loginData = this.apiService.userRegister(number, password).then(data => {
          res.status(200).json(this.result(data));
        }).catch(err => {
          logger.error(err);
          res.status(400).json({
            ms: err
          });
        });
      } else {
        //登陆
        loginData = this.apiService.userLand(number, password).then(data => {
          // jsonData=super.json(200,data)
          //this.json(data);
          res.status(200).json(this.result(data))
        }).catch(err => {
          logger.error(err);
          //res.status(400).json({
          //ms: err
          //});
          res.status(400).json(err)
        });
      }
    } catch (e) {
      res.status(400).json({
        msg: e.message
      });
    }
  }


  // 保存
  saveUserInfo(req, res) {
    try {

      const query = req.body || {};
      const nikeNames = query.nikeNames || [];
      this.apiService.saveUserInfo(nikeNames).then(data => {
        res.status(200).json(this.result(data))
      }).catch(err => {
        logger.error(err);
        res.status(400).json(err)
      });
    } catch (error) {
      res.status(400).json({
        msg: e.message
      });
    }
  }

  /**
   * isHello
   * isPhone
   * @param {*} req 
   * @param {*} res 
   */
  getAllUserList(req, res) {
    try {
      const query = req.body || {};
      this.apiService.queryAllUserList(query).then(data => {
        res.status(200).json(this.result(data))
      }).catch(err => {
        logger.error(err);
        res.status(400).json(err)
      });
    } catch (error) {
      res.status(400).json({
        msg: e.message
      });
    }
  }


  isHelloAndPhoneUser(req, res) {
    try {
      const query = req.query || {};
      this.apiService.isHelloAndPhoneUser(query).then(data => {
        res.status(200).json(this.result(data))
      }).catch(err => {
        logger.error(err);
        res.status(400).json(err)
      });
    } catch (error) {
      res.status(400).json({
        msg: e.message
      });
    }
  }


  updateOther(req, res) {
    try {
      const query = req.query || {};
      this.apiService.updateOther(query).then(data => {
        res.status(200).json(this.result(data))
      }).catch(err => {
        logger.error(err);
        res.status(400).json(err)
      });
    } catch (error) {
      res.status(400).json({
        msg: e.message
      });
    }
  }

  test(req, res) {
	  
    let answer = '';
    const query = req.query || {};
    const ques = query.ques;
   
    console.log('----888-----');
    if (!answer) {
      
      res.status(200).json(this.result({ answer: '稍等一下，我再路上' }))
    }
  }
}

module.exports = ApiController;
