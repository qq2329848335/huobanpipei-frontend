<template>
    <template v-if="user">
        <!--<van-cell title="id"  :value="user.id" is-link @click="onClick('id','id',user.id)"/>-->
        <van-cell title="用户名" :value="user.username" is-link @click="onClick('username','用户名',user.username)"/>
        <van-cell title="账号" :value="user.userAccount" is-link @click="onClick('userAccount','账号',user.userAccount)"/>
        <van-cell title="头像" is-link @click="onClick('avatarUrl','头像',user.avatarUrl)">
            <img height="30px" :src="user.avatarUrl"/>
        </van-cell>
        <van-cell title="性别" :value="user.gender" is-link @click="onClick('gender','性别',user.gender)"/>
        <van-cell title="电话" :value="user.phone" is-link @click="onClick('phone','电话',user.phone)"/>
        <van-cell title="邮箱" :value="user.email" is-link @click="onClick('email','邮箱',user.email)"/>
        <van-cell title="标签" :value="user.tags" is-link @click="onClick('tags','标签',user.tags)"/>
        <van-cell title="注册时间" :value="user.createTime" is-link @click="onClick('createTime','注册时间',user.createTime)"/>
    </template>
</template>

<script setup lang="ts">
    import {showFailToast, showSuccessToast} from "vant";

    const user = ref({});
    import {onMounted, ref} from "vue";
    import {useRouter} from "vue-router";
    import myAxios from "../plugins/myAxios"
    import {getCurrentUser} from "../services/user";

    const router = new useRouter();
    const onClick = (editKey: string, editName: string, currentValue) => {
        router.push({
            path: "/user/edit",
            query: {
                editKey,
                editName,
                currentValue
            }
        })
    }

    onMounted(async () => {
        //从前端获取 当前登录用户信息
        const res = await getCurrentUser();
        if (res){
            user.value=res;
            showSuccessToast("获取用户信息成功");
        }else{
            router.push("/login");
            showFailToast("获取用户信息失败");
        }
    })
</script>

<style scoped>

</style>
