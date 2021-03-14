<template>
<Layout>

  编辑标签
</Layout>
</template>

<script>
import { Component } from 'vue-property-decorator';
import Vue from 'vue'
import { tagListModel } from '@/models/tagListModel';

@Component
export default class EditLabel extends Vue{
created(){
    const id = this.$route.params.id
    tagListModel.fetch()
    const tags = tagListModel.data
    const tag = tags.filter(t => t.id===id)[0] //返回的是数组，所以[0]
    if(tag){
        console.log(tag)
    }else{
        this.$router.replace('/404')
    }
}
}
</script>

<style>

</style>