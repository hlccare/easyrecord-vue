<template>
  <div>
    <Layout class-prefix="layout">
      <template>
        <Tabs
          class-prefix="type"
          :data-source="recordTypeList"
          :value.sync="type"
          slot="header"
        />
        <div v-if="detailList.length === 0">
          <no-data-img />
        </div>
        <template
          v-for="([date, { records, sum }], index1) in detailList"
          v-else
        >
          <detail-header :key="index1" :date="date" :amount="sum" />
          <detail-item
            v-for="(item, index2) in records"
            :record="item"
            :key="`${index1}-${index2}`"
          />
        </template>
      </template>
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
import NoDataImg from "@/components/NoDataImg.vue";

@Component({
  components: {
    Tabs,
    DetailItem,
    DetailHeader,
    NoDataImg,
  },
})
export default class Detail extends Vue {
  name = "Detail";
  recordTypeList = recordTypeList;

  type: "+" | "-" = "-";
  get detailList() {
    const hash: { [key: string]: { records: RecordItem[]; sum: number } } = {};
    const selectedRecords = this.recordList.filter((r) => r.type === this.type);
    selectedRecords.forEach((r) => {
      const key = dayjs(r.createdAt).format("YYYY-MM-DD");
      if (!(key in hash)) {
        hash[key] = { records: [], sum: 0 };
      }
      hash[key].records.push(r);
      hash[key].sum += r.amount;
    });
    const array = Object.entries(hash).sort((a, b) => {
      if (a[0] === b[0]) {
        return 0;
      } else if (a[0] > b[0]) {
        return -1;
      } else {
        return 1;
      }
    });
    return array;
  }

  created() {
    this.$store.commit("fetchRecords");
    if (this.$route.params.type) {
      if (this.$route.params.type === "+" || this.$route.params.type === "-")
        this.type = this.$route.params.type;
    }
  }

  get recordList(): RecordItem[] {
    return this.$store.getters.getRecordListByType(this.type);
  }
}
</script>

<style lang='scss' scoped>
</style>