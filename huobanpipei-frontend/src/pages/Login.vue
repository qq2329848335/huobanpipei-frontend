<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                    v-model="userAccount"
                    name="userAccount"
                    label="账号"
                    placeholder="请输入账号"
                    :rules="[{ required: true, message: '请填写账号' }]"
            />
            <van-field
                    v-model="userPassword"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="请输入密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
            />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>

</template>

<script setup lang="ts">
    import {ref} from 'vue';

    import {useRoute,useRouter} from "vue-router";
    import myAxios from "../plugins/myAxios";
    import {showFailToast, showSuccessToast} from "vant";
    import {getCurrentUserState, setCurrentUserState} from "../states/user";
    const router = useRouter();
    const route = useRoute();

    const userAccount = ref('');
    const userPassword = ref('');
    const onSubmit = () => {
        myAxios.post("/user/userLogin",{
            userAccount:userAccount.value,
            userPassword:userPassword.value
        }).then(function (res) {
            if (res.code===200){
                //跳转到之前的页面
                const redirectUrl = route.query?.redirect ?? '/';//这里的意思是,当??前面的值不存在时,取后面的值
                window.location.href=redirectUrl;
                //将登录用户信息保存到前端中(定义在states/user.ts中)
                setCurrentUserState(res.data);
                console.log("当前登录用户的信息:",getCurrentUserState());
                showSuccessToast("登录成功");
            }else{
                showFailToast("登录失败",res.message);
            }
        }).catch(function (error) {
            console.error(error);
        })
    };
</script>

<style scoped>

</style>
