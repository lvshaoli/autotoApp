// "ui";

// var 背景颜色 = "#dddddd";
// var 字号 = "13";
// var 字体颜色 = "#dd000000";

// var currentUserPhone = '';

// function loginMyApp() {
//   ui.statusBarColor(背景颜色);
//   ui.layout(
//     <ScrollView id="bg" bg="{{背景颜色}}">
//       <frame>
//         <vertical padding="10 10 10">
//           <text
//             size="{{字号*5}}sp"
//             paddingTop="60"
//             paddingLeft="40"
//             color="{{字体颜色}}"
//           >
//             登录
//           </text>
//           <text
//             id="t1"
//             size="{{字号*2}}sp"
//             color="{{字体颜色}}"
//             marginTop="50"
//             paddingLeft="35"
//           />
//           <input
//             id="ID"
//             w="*"
//             marginRight="30"
//             marginLeft="30"
//             singleLine="true"
//             hint="账号"
//             textColorHint="{{字体颜色}}"
//           />
//           <text
//             id="t2"
//             size="{{字号*2}}sp"
//             color="{{字体颜色}}"
//             marginTop="10"
//             paddingLeft="35"
//           />
//           <input
//             id="Password"
//             w="*"
//             marginRight="30"
//             marginLeft="30"
//             singleLine="true"
//             hint="密码"
//             textColorHint="{{字体颜色}}"
//             password="true"
//           />

//           <button
//             id="Login"
//             style="Widget.AppCompat.Button.Colored"
//             h="{{字号*11}}px"
//             size="{{字号*2}}sp"
//             marginTop="20"
//             marginRight="30"
//             marginLeft="30"
//           >
//             登录
//           </button>
//         </vertical>
//       </frame>
//     </ScrollView>
//   );
//   ui.ID.on("touch", () => {
//     ui.t1.setText("账号");
//     ui.ID.setHint("");
//     if (ui.Password.getText() == "") {
//       ui.t2.setText("");
//       ui.Password.setHint("密码");
//     }
//   });

//   ui.Password.on("touch", () => {
//     ui.t2.setText("密码");
//     ui.Password.setHint("");
//     if (ui.ID.getText() == "") {
//       ui.t1.setText("");
//       ui.ID.setHint("账号");
//     }
//   });

//   ui.bg.on("touch", () => {
//     if (ui.Password.getText() == "") {
//       ui.t2.setText("");
//       ui.Password.setHint("密码");
//     }
//     if (ui.ID.getText() == "") {
//       ui.t1.setText("");
//       ui.ID.setHint("账号");
//     }
//   });

//   ui.Login.on("click", () => {
//     if (ui.Password.getText() == "") {
//       ui.t2.setText("");
//       ui.Password.setHint("密码");
//     }
//     if (ui.ID.getText() == "") {
//       ui.t1.setText("");
//       ui.ID.setHint("账号");
//     }
//   });

//   ui.Login.on("click", () => {
//     if (ui.ID.getText() != "") {
//       if (ui.Password.getText() != "") {
//         // toast("正在登录");
//         threads.start(function () {
//           console.log('**');
//           myLogin(ui.ID.getText(), ui.Password.getText(), () => {
//             launchmyApp();
//             toTabMsg();
//           })
//         });
//       } else {
//         ui.Password.setError("请输入密码");
//       }
//     } else {
//       ui.ID.setError("请输入账号");
//     }
//   });
// }

// if (!currentUserPhone) {
//   loginMyApp();
// } else {
//   launchmyApp();
//   toTabMsg();
// }
//-------------------------登录end-----------------------

/**
 *
 */
var HelloLists = []; // 已经打过招呼
var hasPhoneList = []; // 是否已经有电话号码

function launchmyApp() {
  auto.waitFor();
  var appName = "伊对";
  launchApp(appName);
  sleep(3000);
  console.show(); //开启日志（悬浮窗权限）
  toast("开始操作了");
  // id("phoneLogin").waitFor()
  // id("phoneLogin").findOne().click()
  // 点击聊天对象
  sleep(5000);
  click("不去了");
  sleep(2000);
}
// 获取列表昵称
var clickcount = 0;
let namesArr = [];
function getNikes(name) {
  try {
    click("不去了");
    // 等待出现点击同城
    sleep(3000);
    // click("同城");
    click(name);
    toast("点击=");

    click("不去了");
    // scrollBackward();
    sleep(2000);

    click("不去了");
    let bookList = className("android.widget.LinearLayout").find();
    if (bookList != null) {
      for (var i = 0; i < bookList.length; i++) {
        var linear = bookList[i];
        linear.children().forEach(function (child) {
          if (child.className() == "android.widget.TextView") {
            if (child.id() == "me.yidui:id/text_name") {
              namesArr.push(child.text());
            }
          }
        });
      }
    }
    console.log("getNikes", namesArr);
    if (namesArr.length) {
      saveUserToServe(namesArr.join(","), () => {
        goDetail();
      });
    } else {
      getNikes("推荐");
      sleep(3000);
    }
  } catch (error) {
    console.log("错误1", error);
  }
}

function goDetail() {
  try {
    click("不去了");
    sleep(2000);
    var toDetailSuccess = false;
    var currentClickName = namesArr[clickcount];
    // 检查是否打过招呼或者已经有电话号码
    queryIsHello(currentClickName, (params) => {
      click("不去了");
      const { isHello, hasPhone } = params;
      if (isHello == 1 || hasPhone == 1) {
        clickcount++;
        if (namesArr.length <= clickcount) {
          console.log("最后一个了", namesArr.length, clickcount);
          clickcount = 0;
          sleep(10000);
          toTabMsg();
        } else {
          goDetail();
        }
      } else {
        try {
          toDetailSuccess = click(currentClickName);
          sleep(3000);
          // 进入详情了
          if (toDetailSuccess) {
            sleep(3000);
            if(text("关注").exists() || text("发消息").exists()){
              //要支持的动作

              var attclick = click("关注");
              if (!attclick) {
                click("发消息");
              }
              sleep(2000);
              // id('input_edit_text').findOne().click();
              // sleep(1000);
              updateOther(currentClickName, { isHello: 1 }, () => {
                click("不去了");
                id("input_edit_text").findOne().setText("你好");
                sleep(2000);
                click("不去了");
                id("input_send_button").findOne().click();
                sleep(2000);
                // 返回首页
                click("不去了");
                sleep(1000);
                back();
                sleep(1000);
                click("不去了");
                sleep(1000);
                back();
                click("不去了");
                sleep(5000);
                click("不去了");
                goDetail();
              });
          } else {
            console.log('----不是正常的聊天，有可能是直播----2');
            back();
            sleep(1000);
            if (text("伊对").exists()) {
            } else {
              back();
            }
            clickcount ++;
            sleep(2000);
            click("不去了");
            goDetail();
          }
          }
        } catch (error) {
          log("错误4", error);
        }
      }
    });
  } catch (error) {
    log("错误3", error);
  }
}

// getNikes();

var a = device.width;
var b = device.height;
let msgUsersList = [];
// 跳转到消息页面
function toTabMsg() {
  click("不去了");
  sleep(2000);
  click("消息");
  sleep(5000);

  let lastListLen = msgUsersList.length;
  let preListLen = msgUsersList.length;
  while (true) {
    // if (msgUsersList.length >= 10) {
    swipe(a / 2, (b / 3) * 2, a / 2, (b / 3) * 1, 3000);
    // }
    preListLen = msgUsersList.length;
    sleep(5000);
    click("不去了");
    // 回复消息页面消息
    let nicknames = className("android.widget.TextView").find();
    if (nicknames != null) {
      nicknames.forEach((nickTextView) => {
        if (nickTextView.id() == "me.yidui:id/nickname") {
          const userName = nickTextView.text();
          if (
            userName != "最近访客" &&
            userName != "附近的人" &&
            userName != "我关注的人" &&
            userName != "系统通知"
          ) {
            if (msgUsersList.indexOf(userName) < 0) {
              msgUsersList.push(userName);
            }
          }
        }
      });
    }
    click("不去了");
    lastListLen = msgUsersList.length;
    let flag = lastListLen == preListLen;
    if (flag) {
      break;
    }
    sleep(3000);
  }
  msgUsersList = msgUsersList.reverse();
  if (msgUsersList.length) {
    saveUserToServe(msgUsersList.join(","), () => {
      msgSendMsg();
    });
  } else {
    // 去首页
    msgUsersList = [];
    sleep(1000);
    click("伊对");
    sleep(3000);
    getNikes("同城");
  }
}

var baseUrl = "服务器地址";
// 保存用户到服务器端
function saveUserToServe(nikeNames, callBack) {
  http.postJson(baseUrl + "/saveUsers", { nikeNames: nikeNames }, {}, (res) => {
    callBack && callBack(res);
  });
}

// 登录
function myLogin(number, pwd, callBack) {
  const mypar = { number: number, password: pwd };
  http.post(baseUrl + "/users", mypar, {}, (res) => {
    const result = res.body.json();
    if (res.statusCode == 200) {
      callBack && callBack(res);
    } else {
      toast(result.msg);
    }
  });
}

/**
 * 查询所有已经记录客户
 * isHello
 * isPhone
 * */
function queryAllUserList(params) {
  http.postJson(baseUrl + "/allUserList", params, {}, (res) => {
    console.log("*", res);
  });
}

// 是否已经打过招呼
function queryIsHello(nickName, callBack) {
  http.get(
    baseUrl + "/isHelloAndPhoneUser?nickname=" + nickName,
    {},
    function (res) {
     try {
      const result = res.body.json();
      const content = result.content || [];
      const { ishello, ishasphone } = content[0] || {};
      callBack && callBack({ isHello: ishello, hasPhone: ishasphone });
     } catch (error) {
       console.log('queryIsHello', error);
     }
    }
  );
}

// 更新
function updateOther(nickName, param, callBack) {
  const keys = Object.keys(param);
  const query = keys.map((key, index) => {
    if (index == keys.length - 1) {
      return key + "=" + param[key];
    }
    return key + "=" + param[key] + "&";
  });
  http.get(
    baseUrl + "/updateOther?nickname=" + nickName + "&" + query,
    {},
    (res) => {
      callBack && callBack();
    }
  );
}

var msgCount = 0;
var msgedUserArr = [];
// 消息页面聊天
function msgSendMsg() {
  try {
    if (msgUsersList.length <= msgCount) {
      console.log("没有好友可用");
      // 去首页
      sleep(1000);
      click("伊对");
      sleep("3000");
      getNikes("同城");
      return;
    }
    sleep(3000);
    const currentUser = msgUsersList[msgCount];
    if (!currentUser) {
      return;
    }
    queryIsHello(currentUser, (params) => {
      const { isHello, hasPhone } = params;
      if (hasPhone == 1) {
        // longclickdel(currentUser);
        sleep(2000);
        msgCount++;
        msgSendMsg();
      } else {
        msgedUserArr.push(msgCount);
        msgCount++;
        const clicksuccess = click(currentUser);
        if (clicksuccess) {
          // if(!(text("查看主页").exists())){
          //   console.log('----不是正常的聊天，有可能是直播----1');
          //   sleep(2000);
          //   back();
          //   sleep(2000);
          //   msgSendMsg();
          //   return;
          // }
          getPhoneNum((phoneno) => {
            if (phoneno) {
              updateOther(currentUser, { phoneno: phoneno }, () => {
                capturePic(currentUser);
              });
            } else {
              // 聊天的内容
              id("input_edit_text")
                .findOne()
                .setText(
                  "我经常有事回复不及时，如果有兴趣了解，互留电，你的多少"
                );

              sleep(2000);
              id("input_send_button").findOne().click();
              sleep(2000);
              capturePic(currentUser);
            }
          });
        } else {
          toast("进入聊天失败");
          scrollBackward();
          sleep(2000);
          msgCount--;
          msgSendMsg();
        }
      }
    });
  } catch (error) {
    console.log("报错了", error);
  }
}

// 截图

function capturePic(currentUser) {
  //请求截图
  // if (!requestScreenCapture()) {
  //   toast("请求截图失败");
  //   // exit();
  // }
  // toast('---截图开始---');
  // //截图并保存到存储卡目录
  // var img = captureScreen("/sdcard/" + currentUser + ".png");
  // toast('---截图结束---');
  sleep(1000);
  back();
  sleep(3000);
  msgSendMsg();
}

// 获取电话号码 在聊天页面可执行
function getPhoneNum(callback) {
  sleep(10000);
  var phoneno = "";
  let bookList = className("android.view.ViewGroup").find();
  if (bookList != null) {
    for (var i = 0; i < bookList.length; i++) {
      const msg_items = bookList[i];
      msg_items &&
        msg_items.children().forEach((child) => {
          child.children().forEach((child2) => {
            child2 &&
              child2.children().forEach((child3) => {
                if (child3.className() == "android.view.ViewGroup") {
                  child3 &&
                    child3.children().forEach((child4) => {
                      if (child4.className() == "android.widget.LinearLayout") {
                        child4 &&
                          child4.children().forEach((child5) => {
                            if (child5.id() == 'msg_item_audio_new') {
                              console.log('有语音')
                            }
                            phoneno = selectPhoneNumber(child5.text());
                          });
                      }
                    });
                }
              });
          });
        });
    }
  }

  callback && callback(phoneno);
}

function selectPhoneNumber(str) {
  var regx = /(1[3|4|5|7|8][\d]{9}|0[\d]{2,3}-[\d]{7,8}|400[-]?[\d]{3}[-]?[\d]{4})/g;
  var phoneNums = str.match(regx);
  console.log("*电话获取", phoneNums && phoneNums[0] && Number(phoneNums[0]));
  return (phoneNums && phoneNums[0] && Number(phoneNums[0])) || "";
}

// 下拉测试
function downLan() {
  click("不去了");
  // sleep(2000);
  click("消息");
  sleep(2000);
  // var a = device.width;
  // var b = device.height;
  scrollBackward();
}

// 长按删除
function longclickdel(name) {
  click("不去了");
  sleep(2000);
  longClick(name);
  sleep(1000);
  click("是");
}

// 取消关注
  var cancelAttArr = [];
function cancelAttention() {
  click("消息");
  sleep(3000);
  click("我关注的人");
  sleep(3000);

  let preLen = cancelAttArr.length;
  let aftLen = cancelAttArr.length;

  while (true) {
    preLen = cancelAttArr.length;
    swipe(a / 2, (b / 3) * 2, a / 2, (b / 3) * 1, 3000);

    let nicknames = className("android.widget.TextView").find();

    if (nicknames != null) {
      nicknames.forEach((nickTextView, index) => {
        if (nickTextView.id() == "me.yidui:id/tv_follow_item_nickname") {
          const userName = nickTextView.text();
          if (cancelAttArr.indexOf(userName) < 0) {
            cancelAttArr.push(userName);
          }
        }
      });
    }
    aftLen = cancelAttArr.length;
    if ((preLen == aftLen)) {
      break;
    }
  }
  cancelAttArr = cancelAttArr.reverse();
  if (cancelAttArr.length) {
    toCancel();
  } else {
    back();
  }


}

// 

function toCancel() {
  try {
    click('不去了');
    if (cancelAttArr.length <= msgCount) {
      console.log("没有好友可用");
      back();
      return;
    }
    sleep(3000);
    click('不去了');
    const currentUser = cancelAttArr[msgCount];
    if (!currentUser) {
      return;
    }
    msgCount++;
    const clicksuccess = click(currentUser);
    click('不去了');
    if (clicksuccess) {
      sleep(5000);
      
      if(text("发消息").exists()){
        click('不去了');
        click(830, 76, 875, 120);
        sleep(2000);
        click('不去了');
        back();
        sleep(2000);
        click('不去了');
        click('取消关注');
        sleep(2000);
        click('不去了');
        back();
        sleep(2000);
        click('不去了');
        toCancel();
      } else {
        sleep(2000);
        click('不去了');
        back();
        sleep(2000);
        click('不去了');
        toCancel();
      }
     
    } else {
      toast("进入聊天失败");
      scrollBackward();
      sleep(2000);
      click('不去了');
      msgCount--;
      toCancel();
    }
  } catch (error) {
    console.log("报错了", error);
  }
}

launchmyApp();
// downLan();
// getNikes();
// capturePic();
toTabMsg();
// cancelAttention();
