<template>
  <div>
    <Layout class-prefix="layout">
      {{ record }}
      <NumberPad :value.sync="record.amount" />
      <Types :value.sync="record.type" />
      <Notes @update:value="onUpdateNotes" />
      <Tags :dataSource.sync="tags" @update:value="OnUpdateTags" />
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import { Component } from "vue-property-decorator";

type Record = {
  //ts类型声明，只关心类型
  tags: string[]; //?:则表示可以不初始化
  notes: string;
  type: string;
  amount: number;
};

@Component({
  components: { NumberPad, Types, Tags, Notes },
})
export default class Money extends Vue {
  name = "Money";
  tags = ["衣", "食", "住", "行"];
  record: Record = { tags: [], notes: "", type: "-", amount: 0 };
  OnUpdateTags(value: string[]) {
    console.log(value);
    this.record.tags = value;
  }
  onUpdateNotes(value: string) {
    console.log(value);
    this.record.notes = value;
  }
  onUpdateType(value: string) {
    console.log(value);
    this.record.type = value;
  }
  onUpdateAmount(value: string) {
    console.log(value);
    this.record.amount = parseFloat(value);
  }
}
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