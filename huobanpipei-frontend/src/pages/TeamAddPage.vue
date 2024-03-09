<template>
    <div id="teamPage">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <!--队伍名-->
                <van-field
                        v-model="addTeamData.name"
                        name="name"
                        label="队伍名"
                        placeholder="队伍名"
                        :rules="[{ required: true, message: '请填写队伍名' }]"
                />
                <!--队伍描述-->
                <van-field
                        v-model="addTeamData.description"
                        rows="1"
                        autosize
                        label="队伍描述"
                        type="textarea"
                        maxlength="50"
                        placeholder="队伍描述"
                        show-word-limit
                />
                <!--时间选择器-->
                <van-field
                        v-model="addTeamData.expireTime"
                        is-link
                        readonly
                        name="datetimePicker"
                        label="过期时间"
                        :min-date="minDate"
                        :placeholder="addTeamData.expireTime ?? '点击选择过期时间'"
                        @click="showPicker = true"
                />
                <van-popup v-model:show="showPicker" position="bottom">
                    <van-date-picker @confirm="onConfirm" @cancel="showPicker = false"/>
                </van-popup>
                <!--最大人数  步进器-->
                <van-field name="stepper" label="最大人数">
                    <template #input>
                        <van-stepper v-model="addTeamData.maxNum"
                                     min="3"
                                     max="10"/>
                    </template>
                </van-field>
                <!--状态  单选框-->
                <van-field name="radio" label="队伍状态">
                    <template #input>
                        <van-radio-group v-model="addTeamData.status" direction="horizontal">
                            <van-radio name="0">公开</van-radio>
                            <van-radio name="1">私有</van-radio>
                            <van-radio name="2">加密</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field
                        v-if="Number(addTeamData.status)===2"
                        v-model="addTeamData.password"
                        type="password"
                        name="队伍密码"
                        label="队伍密码"
                        placeholder="队伍密码"
                        :rules="[{ required: true, message: '请填写队伍密码' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-cell-group>
        </van-form>
    </div>
</template>

<script setup>
    import {ref} from 'vue';
    import myAxios from "../plugins/myAxios.js";
    import {showFailToast, showSuccessToast} from "vant";
    import {useRouter} from "vue-router";

    const router = useRouter();

    const initFormData = {
        "name": "",
        "description": "",
        "expireTime": "",
        "maxNum": 0,
        "password": "",
        "status": 0,
        "userId": 0
    }
    const addTeamData = ref({...initFormData});
    const minDate = new Date();

    const showPicker = ref(false);
    const onConfirm = ({selectedValues}) => {

        addTeamData.value.expireTime = selectedValues.join('-')+" 00:00:00";
        console.log( addTeamData.value.expireTime);
        showPicker.value = false;
    };

    console.log(addTeamData.status);
    //提交
    const onSubmit = async () => {
        const postData = {
            ...addTeamData.value,
            status: Number(addTeamData.value.status)
        }
        //todo 前端数据校验
        const res = await myAxios.post("/team/add", postData);
        if (res?.code === 200 && res.data) {
            showSuccessToast("添加成功");
            router.push({
                path: '/team',
                replace: true,
            });
        } else {
            showFailToast("添加失败"+(res.description ? `， ${res.description} ` : ''));
        }
    }
</script>

<style scoped>

</style>
