<template>
    <van-button type="primary" @click="doCreateTeam">创建队伍</van-button>
    <van-search v-model="seachText" @search="onSearch" placeholder="请输入搜索关键词"/>
    <van-tabs v-model:active="active" @click-tab="onClickTab">
        <van-tab title="公开" name="public"></van-tab>
        <van-tab title="加密" name="secret"></van-tab>
    </van-tabs>
    <team-card-list :team-list="teamList"></team-card-list>
    <van-empty v-if="!teamList || teamList.length < 1" description="搜索结果为空"/>
</template>

<script setup>
    import {useRouter} from "vue-router";
    import myAxios from "../plugins/myAxios.js";
    import {onMounted, ref} from 'vue';
    import {showFailToast, showToast} from "vant";

    const router = useRouter();
    const doCreateTeam = () => {
        router.push("/team/add");
    }


    const teamList = ref([]);
    const seachText = ref('');
    const active = ref(0);//这里的active是：绑定当前选中标签的标识符，即name属性

    const listTeam = async (val,status =0) => {
        const res = await myAxios.get("/team/list", {
            params: {
                searchText: val,
                status:status
            }
        });
        if (res?.code == 200) {
            console.log("res = ", res.data);
            teamList.value = res.data;
            console.log("teamList = ", teamList.value);
        } else {
            showFailToast("加载队伍失败，请刷新")
        }
    }

    //页面加载时触发一次，查询队伍
    onMounted(()=>{
        listTeam( '加棉')
    })

    const onSearch = () => {
        const status = ref(0);
        if (active.value == "public") {//这里的active是：绑定当前选中标签的标识符，即name属性
            status.value=0;
        }else if (active.value=="secret") {
            status.value=2;
        }
        listTeam(seachText.value,status.value);
    }

    const onClickTab = ({ name }) => {
        onSearch()
    }
</script>

<style scoped>

</style>
