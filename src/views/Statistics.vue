<template>
  <div>
    <Layout>
      <Tabs
        class-prefix="type"
        :data-source="statTypeList"
        :value.sync="type"
      />
      <template v-if="type === '*'">
        <OverviewChart />
      </template>
      <template v-else-if="type === '-'">
        <TypeStatistic type="-"></TypeStatistic>
      </template>
      <template v-else>
        <TypeStatistic type="+"></TypeStatistic>
      </template>
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import Component from "vue-class-component";
import Tabs from "../components/Tabs.vue";
import OverviewChart from "@/components/statistic/OverviewChart.vue";
import statTypeList from "../constants/statTypeList";
import Chart from "@/components/Chart.vue";
import _ from "lodash";
import TypeStatistic from "../components/statistic/TypeStatistic.vue";

@Component({
  components: { Tabs, Chart, OverviewChart, TypeStatistic },
})
export default class Statistics extends Vue {
  tagString(tag: Tag[]) {
    return tag.length === 0 ? "无" : tag.map((t) => t.name).join(" | ");
  }

  type = "*";
  statTypeList = statTypeList;

  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
}
</script>

<style lang="scss" scoped>
/* .noResult {
  padding: 16px;
  text-align: center;
}
::v-deep .type-tabs-item {
  background: #c4c4c4;
  &.selected {
    background: white;

    &::after {
      display: none;
    }
  }
}
::v-deep .interval-tabs-item {
  height: 48px;
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
.record {
  @extend %item;

  background: white;
} */
</style>