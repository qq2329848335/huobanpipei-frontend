<template>
    <van-search v-model="seachText" @search="onSearch" placeholder="请输入搜索关键词"/>
    <team-card-list :team-list="teamList"></team-card-list>
    <van-empty v-if="!teamList || teamList.length < 1" description="搜索结果为空"/>
</template>

<script setup>
    import {useRouter} from "vue-router";
    import myAxios from "../plugins/myAxios.js";
    import {onMounted, ref} from 'vue';
    import {showFailToast, showToast} from "vant";

    const router = useRouter();



    const teamList = ref([]);
    const seachText = ref('');

    const listTeam = async (val) => {
        const res = await myAxios.get("/team/user/team/join", {
            params: {
                searchText: val
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
        listTeam()
    })

    const onSearch = () => {
        listTeam(seachText.value)
    }
</script>

<style scoped>

</style>
