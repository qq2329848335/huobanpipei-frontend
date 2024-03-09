<template>
    <van-nav-bar
            :title="title"
            left-text="返回"
            right-text="按钮"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
    >
        <template #right>
            <van-icon name="search" size="18" />
        </template>
    </van-nav-bar>

    <!--路由显示-->
    <div id="content">
        <router-view />
    </div>



    <van-tabbar v-model="active" @change="onChange">
        <van-tabbar-item icon="home-o" to="/" name="index">主页</van-tabbar-item>
        <van-tabbar-item icon="search" to="/team" name="team">组队页</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/user" name="user">个人</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/setting" name="setting">设置</van-tabbar-item>
    </van-tabbar>
</template>

<script setup>
    /*export default {
        name: "BasicLayout"
    }*/
    import { ref } from 'vue';
    import {useRouter} from "vue-router";
    import { showToast} from "vant";
    import routes from "../config/router";

    const router = new useRouter();
    const DEFAULT_TITLE="伙伴匹配";
    const title = ref(DEFAULT_TITLE);


    router.beforeEach((to,from)=>{
        // alert("1111");
        // alert(to.path);
        const toPath = to.path;
        const route = routes.find((route)=>{
            return toPath==route.path;
        });
        if (route==null||route.title==null||route.title===""){
            //如果找不到匹配的路由对象 或匹配的路由的title为null或"",则标题为默认值
            title.value=DEFAULT_TITLE;
        }else{
            title.value=route.title;
        }
    })

    const onClickLeft = () => history.back();//返回
    // const onClickRight = () => showToast('按钮');
    const onClickRight = () => router.push("/search");


    const active = ref(0);
    const onChange = (index) => {};
</script>

<style scoped>
    #content{
        padding-bottom: 50px
    }

</style>
