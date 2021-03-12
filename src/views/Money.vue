<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad />
      <Types xxx="hi" />
      <Notes />
      <Tags />
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