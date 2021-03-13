<template>
  <div>
    <Layout class-prefix="layout">
      {{ recordList }}
      <NumberPad :value.sync="record.amount" @submit="saveRecord" />
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
import { Component, Watch } from "vue-property-decorator";

type Record = {
  //ts类型声明，只关心类型
  tags: string[]; //?:则表示可以不存在
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date; //除了写类型外，还可以写类（构造函数），类是对object的分类
};

@Component({
  components: { NumberPad, Types, Tags, Notes },
})
export default class Money extends Vue {
  name = "Money";
  tags = ["衣", "食", "住", "行"];
  recordList: Record[] = JSON.parse(
    window.localStorage.getItem("recordList") || "[]"
  );
  record: Record = { tags: [], notes: "", type: "-", amount: 0 };
  @Watch("recordList")
  onRecordListChange() {
    window.localStorage.setItem("recordList", JSON.stringify(this.recordList));
  }
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
  saveRecord() {
    const record2: Record = JSON.parse(JSON.stringify(this.record));
    record2.createdAt = new Date();
    this.recordList.push(record2);
    console.log(this.recordList);
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