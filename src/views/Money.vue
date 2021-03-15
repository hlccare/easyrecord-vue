<template>
  <div>
    <Layout class-prefix="layout">
      {{ recordList }}
      <NumberPad :value.sync="record.amount" @submit="saveRecord" />
      <Types :value.sync="record.type" />
      <div class="notes">
        <FormItem
          fieldName="备注"
          placeholder="请输入备注"
          @update:value="onUpdateNotes"
        />
      </div>
      <Tags :dataSource.sync="tags" @update:value="OnUpdateTags" />
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Tags from "@/components/Money/Tags.vue";
import FormItem from "@/components/Money/FormItem.vue";
import { Component } from "vue-property-decorator";

// const model = require("@/model.js").model; //在TS中引入JS
// const {model} = require("@/model.js");

@Component({
  components: { NumberPad, Types, Tags, FormItem },
})
export default class Money extends Vue {
  name = "Money";
  tags = window.tagList;
  recordList = window.recordList;
  record: RecordItem = { tags: [], notes: "", type: "-", amount: 0 };

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
    window.createRecord(this.record);
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>