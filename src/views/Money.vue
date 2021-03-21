<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad :value.sync="record.amount" @submit="saveRecord" />
      <Tabs
        class-prefix="type"
        :data-source="recordTypeList"
        :value.sync="record.type"
      />
      <div class="createdAt">
        <FormItem
          type="date"
          fieldName="日期"
          placeholder="请输入日期"
          :value.sync="record.createdAt"
        />
      </div>
      <div class="notes">
        <FormItem
          fieldName="备注"
          placeholder="请输入备注"
          :value.sync="record.notes"
        />
      </div>
      
      <Tags @update:value="record.tags = $event" />
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Tags from "@/components/Money/Tags.vue";
import FormItem from "@/components/Money/FormItem.vue";
import { Component } from "vue-property-decorator";
import Tabs from "../components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from 'dayjs'

// const model = require("@/model.js").model; //在TS中引入JS
// const {model} = require("@/model.js");

@Component({
  components: { NumberPad, Tags, FormItem, Tabs },
})
export default class Money extends Vue {
  name = "Money";
  record: RecordItem = { tags: [], notes: "", type: "-", amount: 0,createdAt:dayjs(new Date().toISOString()).format('YYYY-MM-DD') };
  recordTypeList = recordTypeList;

  get recordList() {
    return this.$store.state.recordList;
  }

  created() {
    this.$store.commit("fetchRecords");
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
    if (!this.record.tags || this.record.tags.length === 0) {
      window.alert("请选择标签~");
      return;
    }
    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert("已保存");
      this.record.notes = "";
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>