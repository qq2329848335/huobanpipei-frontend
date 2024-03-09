<template>
    <form action="/">
        <van-search
                v-model="searchText"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel"
        />
    </form>
    <!--分隔线-->
    <van-divider content-position="left">已选标签</van-divider>
    <div v-if="activeIds.length==0">请选择标签</div>
    <!--可关闭标签-->
    <van-row gutter="6" style="padding: 0 16px">
        <van-col v-for="tag in activeIds">
            <van-tag :show="true" closeable size="medium" type="primary" @close="doClose(tag)">
                {{tag}}
            </van-tag>
        </van-col>
    </van-row>
    <!--分隔线-->
    <van-divider content-position="left">选择标签</van-divider>


    <van-tree-select
            v-model:active-id="activeIds"
            v-model:main-active-index="activeIndex"
            :items="tagList"
    />

    <div style="padding: 16px">
        <!--添加搜索按钮-->
        <van-button block type="primary" @click="doSearch">搜索</van-button>
    </div>

</template>

<script setup>
    import {ref} from 'vue';
    import {useRouter} from "vue-router";


    const searchText = ref('');
    const router = new useRouter();


    //TreeSelect分类选择
    const activeIds = ref([]);//activeIds:右侧选中的id列表
    const activeIndex = ref(0);//左侧选中项的索引
    //分类显示所需的数据
    const originTagList = [
        {
            text: '性别',
            children: [
                {text: '男', id: '男'},
                {text: '女', id: '女'},
            ],
        },
        {
            text: '年级',
            children: [
                {text: '大一', id: '大一'},
                {text: '大二', id: '大二'},
                {text: '大三', id: '大三'},
                {text: '大四', id: '大四'},
                {text: '研一', id: '研一'},
                {text: '研二', id: '研二'},
                {text: '研三', id: '研三'},
            ],
        },
        {text: '福建'},
        {text: '福建', disabled: true},
    ];

    //标签列表
    let tagList = ref(originTagList);

    /**
     *  搜索过滤(根据搜索框的内容,只显示匹配的选项)
     * @param val
     */
    const onSearch = (val) => {
        const searchTextValue = searchText.value.toLowerCase(); // 将搜索文本转换为小写，以便进行不区分大小写的比较
        tagList.value = originTagList.map(parentTag => {
            const tempParentTag = {...parentTag};
            if (tempParentTag.children) {
                const filteredChildren = tempParentTag.children.filter(item => item.text.toLowerCase().includes(searchTextValue));
                tempParentTag.children = filteredChildren;
            }
            return tempParentTag;
        });
    };

    //取消  清空
    const onCancel = () => {
        searchText.value = '';
        tagList.value = originTagList;
    };

    //关闭标签
    const doClose = (tag) => {
        activeIds.value = activeIds.value.filter(item => {
            return item !== tag;//filter()函数返回true时保留
        })
    };

    //搜索
    const doSearch = () => {
        router.push({
            path: "/user/list",
            query: {
                tags: activeIds.value
            }
        })
    }
</script>

<style scoped>

</style>
