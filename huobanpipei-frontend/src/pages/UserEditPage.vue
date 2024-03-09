<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                    v-model="editUser.currentValue"
                    :name="editUser.editKey"
                    :label="editUser.editName"
                    :placeholder="`请输入${editUser.editName}`"
            />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                确认修改
            </van-button>
        </div>
    </van-form>
</template>

<script setup>
    import {ref} from 'vue';

    import {useRoute, useRouter} from "vue-router";
    import myAxios from "../plugins/myAxios";
    import {showFailToast, showSuccessToast} from "vant";
    import {setCurrentUserState} from "../states/user";
    const route = new useRoute();
    const router = useRouter();

    const editUser =ref({
        editKey:route.query.editKey,
        editName:route.query.editName,
        currentValue: route.query.currentValue
    });

    const onSubmit = () => {
        console.log("点击了按钮")
        myAxios.post("/user/update",{
            id:1,
            [editUser.value.editKey]:editUser.value.currentValue
        }).then(async (res)=> {
            if (res.code == 200) {
                showSuccessToast("修改成功");
                //更新前端存储的登录用户信息 -->从后端获取最新的用户信息
                await myAxios.get("/user/getCurrentUser").then(function (response) {
                    if (response.code === 200) {
                        setCurrentUserState(response.data);
                    }
                });
                router.back();

            } else if (res.code === 40100) {
                //未登录,跳转到登录页
                showFailToast(res.message + "请先登录");
                router.push("/login");
            } else {
                showFailToast("修改失败," + res.message);
            }
        }).catch(function (error) {
            console.log(error);
            showFailToast("请求失败");
        })
    };
</script>

<style scoped>

</style>
