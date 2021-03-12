<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad />
      <Types />
      <Notes />
      <Tags :dataSource.sync="tags"/>
    </Layout>
  </div>
</template>

<script>
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
export default {
  name: "Money",
  components: { NumberPad, Types, Tags, Notes },
  data(){
    return{
      tags:['衣','食','住','行']
    }
  }
};
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
</style>