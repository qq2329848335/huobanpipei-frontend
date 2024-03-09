<template>
    <van-card v-for="user in userList"
              :desc="user.profile"
              :title="`${user.username} （${user.id}）`"
              :thumb="user.avatarUrl"
              :tag="user.gender"
    >
        <template #tags>
            <van-tag plain v-for="tag in user.tags" type="primary" style="margin-right: 8px;margin-top: 8px">
                {{tag}}
            </van-tag>
        </template>
        <template #footer>
            <van-button size="mini">联系我</van-button>
        </template>
    </van-card>
    <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空"/>
</template>

<script setup lang="ts">
    import {UserType} from "../model/user";

    interface UserCardListProps {
        userList:UserType[];
    }

    const props = withDefaults(defineProps<UserCardListProps>(),{
        userList:[] as UserType[]
    });
</script>

<style scoped>

</style>
