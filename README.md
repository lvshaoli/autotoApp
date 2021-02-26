1.自动化操作某app的脚步程序demo

使用方式

1.自动化app_v1.0.0.apk是打包好的apk，可以直接安装使用 2.针对伊对app自动化的操作，需安装伊对app,并要自行登录app

2.后台是用nodejs写的，chatbot.sql是mysql数据表结构

3.index.js是手机端js脚步

测试步骤
 1.安装app_v1.0.0.apk
 2.安装伊对app，并登录
 3.启动app_v1.0.0.apk


操作步骤：
1.导入express-api下面的chatbot.sql,并且手动添加几条数据
2.部署express-api项目，修改config/mysqlConfig.js中的数据库配置
3. yarn安装express-api下的依赖
4. yarn start启动后台服务
5.运行根目录下的src/index.js
6.自动化进行操作app
 

后台就是记录，是否打过招呼，是否截图了，等等功能，


仅供娱乐,不可商用


