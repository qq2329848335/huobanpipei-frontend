/**
 * 用户类型
 */
export type UserType ={
    id:number;
    username:string;
    userAccount:string;
    avatarUrl?:string;/*(这里的问号表示该属性是可选的)*/
    gender:number;
    phone:string;
    email:string;
    profile:string;
    userStatus:number;
    userRole:number;
    tags:string[];
    createTime:Date;
}
