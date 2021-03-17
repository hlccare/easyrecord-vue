<template>
  <div>
    <Layout class-prefix="layout">
      {{ recordList }}
      <NumberPad :value.sync="record.amount" @submit="saveRecord" />
      <Tabs
        class-prefix="type"
        :data-source="recordTypeList"
        :value.sync="record.type"
      />
      <div class="notes">
        <FormItem
          fieldName="备注"
          placeholder="请输入备注"
          @update:value="onUpdateNotes"
        />
      </div>
      <Tags />
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

// const model = require("@/model.js").model; //在TS中引入JS
// const {model} = require("@/model.js");

@Component({
  components: { NumberPad, Tags, FormItem, Tabs },
})
export default class Money extends Vue {
  name = "Money";
  record: RecordItem = { tags: [], notes: "", type: "-", amount: 0 };
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
    this.$store.commit("createRecord", this.record);
  }
}
</script>
<style lang="scss" scoped>
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>