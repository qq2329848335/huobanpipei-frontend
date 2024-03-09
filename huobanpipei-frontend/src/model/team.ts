import {UserType} from "./user";

/**
 * 用户类型
 */
export type TeamType = {
    id:number;
    username:string;
    name:string;
    description:string;
    expireTime?:Date;
    maxNum:number;
    password?:string,
    //todo定义枚举值类型，更规范
    status:number;
    createTime:Date;
    updateTime:Date;
    createUser?:UserType;
    hasJoinNum?:number;
}
