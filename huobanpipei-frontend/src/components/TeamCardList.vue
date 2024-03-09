<template>
    <div
            id="teamCardList"
    >
        <van-card
                v-for="team in props.teamList"
                :desc="team.description"
                thumb="https://tse3-mm.cn.bing.net/th/id/OIP-C.lMIafghOt4p9wHK8p8aWkwAAAA?w=162&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                :title="`${team.name} `"
        >
            <template #tags>
                <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
                    {{
                    teamStatusEnum[team.status]
                    }}
                </van-tag>
            </template>
            <template #bottom>
                <div>
                    {{`队伍人数：  ${team.hasJoinNum}/${team.maxNum}`}}
                </div>
                <div>
                    {{'过期时间：' + team.expireTime}}
                </div>
                <div>
                    {{'创建时间：' + team.createTime}}
                </div>
            </template>
            <template #footer>
                <van-button size="mini" plain type="primary" v-if="team.userId!=currentUser.id &&!team.hasJoin"
                            @click="preDoJoinTeam(team)">加入队伍
                </van-button>
                <van-button v-if="team.userId === currentUser?.id" size="mini" plain type="primary"
                            @click="doUpdate(team.id)">更改队伍
                </van-button>
                <van-button size="mini" plain type="primary" v-if="team.userId==currentUser.id ||team.hasJoin"
                            @click="doQuitTeam(team.id)">退出队伍
                </van-button>
                <van-button v-if="team.userId === currentUser?.id" size="mini" plain type="danger"
                            @click="doDeleteTeam(team)">解散队伍
                </van-button>
            </template>

        </van-card>
        <!--密码输入框-->
        <van-dialog v-model:show="passwordDialogshow" title="加入队伍" show-cancel-button
                    @confirm="doJoinTeam()" @cancel="dialogCanael()">
            <van-field v-model="password" label="密码" placeholder="请输入队伍密码"/>
        </van-dialog>

    </div>
</template>

<script setup lang="ts">
    import {TeamType} from "../model/team";
    import {teamStatusEnum} from "../constants/team";
    import myAxios from "../plugins/myAxios";
    import {showConfirmDialog, showFailToast, showSuccessToast} from "vant";
    import {onMounted, ref} from 'vue';
    import {getCurrentUser} from "../services/user";
    import {useRouter} from "vue-router";

    const router = new useRouter();
    const passwordDialogshow = ref(false);
    const password = ref("");
    const joinTeamId = ref();

    interface TeamCardListProps {
        teamList: TeamType[];
    }

    const props = withDefaults(defineProps<TeamCardListProps>(), {
        //@ts-ignore
        teamList: [] as TeamType[],
    });
    const currentUser = ref({});
    onMounted(async () => {
        currentUser.value = await getCurrentUser();
    })

    //点击密码输入框的取消按钮触发的事件
    const dialogCanael =()=>{
        password.value="";
        joinTeamId.value="";
    }

    //点击加入队伍按钮时,触发的事件(加入队伍前的判断);
    //判断队伍是否是加密的
    const preDoJoinTeam=(team)=> {
        joinTeamId.value=team.id;
        if (team.status==2){
            //加密的队伍,需要展示密码输入框
            passwordDialogshow.value=true;
        } else if (team.status==0) {
            //公开的队伍,直接加入
            doJoinTeam();
        }

    }

    //队伍列表加入队伍
    const doJoinTeam = async () => {
        const res = await myAxios.post("/userteam/add", {
            teamId: joinTeamId.value,
            password:password.value
        });
        //清空输入框
        dialogCanael();
        if (res?.code === 200) {
            showSuccessToast("加入成功");
            location.reload();
        } else {
            showFailToast("加入失败" + (res.description ? `， ${res.description} ` : ''));
        }
    }

    const doUpdate = (id: number) => {
        router.push({
            path: "team/update",
            query: {
                id,
            }
        })
    }

    //退出队伍
    const doQuitTeam = async (teamId: number) => {
        const res = await myAxios.delete("/userteam/delete", {
            params: {
                teamId
            }

        });
        if (res?.code === 200) {
            showSuccessToast("退出队伍成功")
            location.reload();
        } else {
            showFailToast("退出队伍失败" + (res.description ? `， ${res.description} ` : ''));
        }
    }

    //解散队伍
    const doDeleteTeam =  (team: TeamType) => {
        showConfirmDialog({
            title: '解散队伍',
            message:
                `您确认解散 "${team.name}" 队伍吗?`,
        }).then(async() => {
            // on confirm
            const res = await myAxios.delete("/team/delete", {
                params: {
                    teamId: team.id
                }
            });
            if (res?.code === 200) {
                showSuccessToast("解散队伍成功");
                location.reload();
            } else {
                showFailToast("解散队伍失败" + (res.description ? `， ${res.description} ` : ''));
            }
        })
            .catch(() => {
                // on cancel
            });
    }


</script>

<style scoped>
    #teamCardList :deep(.van-image__img) {
        height: 128px;
        object-fit: unset;
    }
</style>
