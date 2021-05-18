<template>
  <div>
    {{ recordList }}

    <Layout class-prefix="layout">
      <Tabs
        class-prefix="type"
        :data-source="recordTypeList"
        :value.sync="record.type"
      />
      <detail-header />
      <detail-item></detail-item>
    </Layout>
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { Component, Vue } from "vue-property-decorator";
import Tabs from "../components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import DetailItem from "../components/Detail/DetailItem.vue";
import DetailHeader from "../components/Detail/DetailHeader.vue";

@Component({
  components: {
    Tabs,
    DetailItem,
    DetailHeader,
  },
})
export default class Detail extends Vue {
  name = "Detail";
  record: RecordItem = {
    id: 0,
    tagId: -1,
    notes: "",
    type: "-",
    amount: 0,
    createdAt: dayjs(new Date().toISOString()).format("YYYY-MM-DD"),
  };
  recordTypeList = recordTypeList;

  get recordList() {
    return this.$store.state.recordList;
  }
}
</script>

<style scoped>
</style>