/*创建一个方法可获取到的用户信息。相当于java中的get/set，
然后全局都可以调用这个方法来获取当前用户的状态数据。*/

import {UserType} from "../model/user";

let currentUser:UserType ;

const setCurrentUserState = (user:UserType)=>{
    console.log("将登录用户信息保存到前端中...开始");
    currentUser=user;
    console.log("将登录用户信息保存到前端中...保存结束");
    console.log("前端存储的登录用户信息 = ",currentUser);
}
const getCurrentUserState = ():UserType=>{
    return currentUser;
}


export {
    setCurrentUserState,
    getCurrentUserState
}
