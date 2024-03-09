import {getCurrentUserState, setCurrentUserState} from "../states/user";
import myAxios from "../plugins/myAxios";

import {showFailToast} from "vant";

export const getCurrentUser = async () => {
    const currentUser = getCurrentUserState();
    if (currentUser) {
        console.log("从前端获取登录用户信息");
        return currentUser;
    }
    //不存在则从远程获取
    console.log("从远程获取当前登录用户信息")
    const res = await myAxios.get("/user/getCurrentUser")
    if (res.code===200){
        setCurrentUserState(res.data);
        return res.data;
    }else if (res.code===40100){
        console.log("未登录，请先登录");
        return res.data;
    }else{
        //报错,向后端获取当前用户失败
        console.log("获取当前登录用户失败",res.message);
        showFailToast("获取当前登录用户失败"+res.message);
        return null;
    }

}
