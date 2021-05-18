<template>
  <div>
    <Layout class-prefix="layout">
      <Tabs
        class-prefix="type"
        :data-source="recordTypeList"
        :value.sync="record.type"
      />
      <Tags :value.sync="record.tag" />

      <FormItem
        type="date"
        fieldName="日期"
        placeholder="请输入日期"
        :value.sync="record.createdAt"
      />
      <FormItem
        fieldName="备注"
        placeholder="请输入备注"
        :value.sync="record.notes"
      />

      <NumberPad :value.sync="record.amount" @submit="saveRecord" />
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
import { expenseTagsList, incomeTagsList } from "@/constants/tagsList";
import dayjs from "dayjs";

// const model = require("@/model.js").model; //在TS中引入JS
// const {model} = require("@/model.js");

@Component({
  components: { NumberPad, Tags, FormItem, Tabs },
})
export default class Money extends Vue {
  name = "Money";
  record: RecordItem = {
    tag: "",
    notes: "",
    type: "-",
    amount: 0,
    createdAt: dayjs(new Date().toISOString()).format("YYYY-MM-DD"),
  };
  recordTypeList = recordTypeList;

  get recordList() {
    return this.$store.state.recordList;
  }

  fetch() {
    this.$store.state.tagList = [];
    if (this.record.type === "-") {
      expenseTagsList.forEach((item) => {
        this.$store.commit("createTag", item);
      });
    } else {
      incomeTagsList.forEach((item) => {
        this.$store.commit("createTag", item);
      });
    }
    this.$store.commit("fetchRecords");
  }

  created() {
    this.fetch();
  }
  updated() {
    this.fetch();
  }

  // onUpdateNotes(value: string) {
  //   console.log(value);
  //   this.record.notes = value;
  // }
  // onUpdateType(value: string) {
  //   console.log(value);
  //   this.record.type = value;
  // }
  // onUpdateAmount(value: string) {
  //   console.log(value);
  //   this.record.amount = parseFloat(value);
  // }
  saveRecord() {
    if (!this.record.tag) {
      window.alert("请选择标签，请重新输入~");
      return;
    }
    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert("已保存");
      this.record.notes = "";
      this.record.tag = "";
      console.log(this.record);
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column;
}
</style>