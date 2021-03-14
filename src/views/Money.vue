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
import { recordListModel } from "@/models/recordListModel";
import { tagListModel } from "@/models/tagListModel";


// const model = require("@/model.js").model; //在TS中引入JS
// const {model} = require("@/model.js");

const recordList = recordListModel.fetch()
const tagList = tagListModel.fetch()

@Component({
  components: { NumberPad, Types, Tags, Notes },
})
export default class Money extends Vue {
  name = "Money";
  tags = tagList;
  recordList = recordList;
  record: RecordItem = { tags: [], notes: "", type: "-", amount: 0 };

  @Watch("recordList")
  onRecordListChange() {
    recordListModel.save(this.recordList);
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
    const record2: RecordItem = recordListModel.clone(this.record);
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