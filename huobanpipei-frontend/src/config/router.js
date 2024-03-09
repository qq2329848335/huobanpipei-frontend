import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import UserPage from "../pages/UserPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import MyJoinTeamPage from "../pages/MyJoinTeamPage.vue"
import MyCreateTeamPage from "../pages/MyCreateTeamPage.vue"
import Setting from "../pages/Setting.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import Login from "../pages/Login.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";

const routes = [
    { path: '/', component: Index },
    { path: '/team', title:'队伍',component: Team },
    { path: '/team/add', title:'创建队伍',component: TeamAddPage },
    { path: '/team/update', title:'更新队伍',component: TeamUpdatePage },
    { path: '/user', title:'个人信息',component: UserPage },
    { path: '/user/update', title:'更新信息',component: UserUpdatePage },
    { path: '/user/join', title:'已加入的队伍',component: MyJoinTeamPage },
    { path: '/user/create',title:'我创建的队伍', component: MyCreateTeamPage },
    { path: '/setting', title:'设置',component: Setting },
    { path: '/search', title:'用户搜索',component: SearchPage },
    { path: '/user/edit',title:'个人信息编辑', component: UserEditPage },
    { path: '/user/list', title:'用户搜索结果',component: SearchResultPage },
    { path: '/login',title:'登录', component: Login },
]


export default routes;
