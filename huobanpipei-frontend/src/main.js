import {createApp} from 'vue'
import App from './App.vue'
import {Button, NavBar, Tabbar, TabbarItem, Search,Divider,Collapse, CollapseItem} from 'vant';
import {TreeSelect,Cell, CellGroup,Form, Field,Card ,Toast} from "vant";
// @ts-ignore
import * as VueRouter from 'vue-router';
import routes from "./config/router";

const app = createApp(App);
app.use(Button);
app.use(NavBar);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Search);
app.use(Divider);
app.use(Collapse);
app.use(CollapseItem);
app.use(TreeSelect);
app.use(Cell);
app.use(CellGroup);
app.use(Form);
app.use(Field);
app.use(Card);
app.use(Toast);


const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})
app.use(router)


app.mount('#app')



