const express = require('express')
const checkAuth = require('../middlewares/authorization')
const router = express.Router()
const ApiController = require('../controllers/apiController')

const apiController = new ApiController()

/**
 * 在这里定义路由
 */

//登陆注册路由
router.post('/users', checkAuth, apiController.userLogin.bind(apiController))

// 存储用户
router.post('/saveUsers', apiController.saveUserInfo.bind(apiController))

// 查询所有客户信息
router.post('/allUserList', apiController.getAllUserList.bind(apiController));

// 是否已经打过招呼或者已经有电话号码
router.get('/isHelloAndPhoneUser', apiController.isHelloAndPhoneUser.bind(apiController));

// 更新关键字
router.get('/updateOther', apiController.updateOther.bind(apiController));

router.get('/test', apiController.test.bind(apiController));

module.exports = router;
