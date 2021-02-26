var sqlMap = {
    user: {
        add: 'insert into users(number,password) values (?,?)',
        select_name: 'SELECT * from users where name = ?',    //查询 name
        select_number:'SELECT * from users where number = ?', //查询number是否存在
        select_password: 'SELECT * from users where password = ?',   //查询 password是否正确
        addInfo: 'insert into userInfo(nickname) values ?',
        select_HelloList: 'SELECT * from userInfo where ishello = ?',
        select_hasphoneList: 'SELECT * from userInfo where ishasphone = ?',
        select_allList: 'SELECT * from userInfo',
        select_nickname_ishello: 'SELECT ishello, ishasphone from userInfo where nickname = ?',
        select_nickname_ishasPhone: 'SELECT ishasphone from userInfo where nickname = ?',
        update_nickname_ishello: 'update userInfo set ishello = ? where nickname = ?',
        update_nickname_isphone: 'update userInfo set ishasphone = ? where nickname = ?',
        update_nickname_phoneNo: 'update userInfo set ishasphone = 1, phoneno = ? where nickname = ?',
        update_all: 'update userInfo set ishello = ? , ishasphone = ? where nickname = ?'
    }
};
module.exports = sqlMap;
