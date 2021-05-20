<template>
  <div class="overview-chart-wrapper">
    <Chart :options="options" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import dayjs from "dayjs";
import _ from "lodash";
import { EChartOption } from "echarts";
import Chart from "../Chart.vue";

@Component({
  components: { Chart },
})
export default class OverviewChart extends Vue {
  keyValueList: {
    key: string;
    valuesIncome: any;
    valuesExpense: any;
  }[] = [];
  getDayTotalListByType = this.$store.getters.getDayTotalListByType;

  mounted() {
    this.keyValueList = this.getKeyValueList();
  }
  getKeyValueList() {
    const today = new Date();
    const array = [];
    for (let i = 0; i <= parseInt(dayjs(today).format("DD")) - 1; i++) {
      const dateString = dayjs(today).subtract(i, "day").format("MM/DD");
      const foundIncome = _.find(this.getDayTotalListByType("+"), {
        title: dateString,
      });
      const foundExpense = _.find(this.getDayTotalListByType("-"), {
        title: dateString,
      });
      array.push({
        key: dateString,
        valuesIncome: foundIncome ? foundIncome.total : 0,
        valuesExpense: foundExpense ? foundExpense.total : 0,
      });
    }
    array.sort((a, b) => {
      if (a.key > b.key) {
        return 1;
      } else if (a.key < b.key) {
        return -1;
      } else {
        return 0;
      }
    });
    return array;
  }
  get options() {
    const keys = this.keyValueList.map((r) => r.key);
    const valuesIncome = this.keyValueList.map((r) => r.valuesIncome);
    const valuesExpense = this.keyValueList.map((r) => r.valuesExpense);
    console.log("values");
    console.log(valuesExpense);
    console.log(valuesIncome);
    const option: EChartOption = {
      tooltip: {
        trigger: "axis",
        // lineStyle: 'line'
      },
      legend: {
        data: ["支出", "收入"],
        bottom: 0,
        itemWidth: 50,
        itemHeight: 2,
      },
      grid: {
        top: "3%",
        left: "3%",
        right: "4%",
        bottom: "12%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: keys,
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "支出",
          type: "line",
          stack: "总量",
          smooth: true,
          lineStyle: {
            width: 3,
            color: "#9bcac0",
          },
          areaStyle: { color: "#9bcac0" },
          itemStyle: {
            color: "#9bcac0",
            borderWidth: 2,
          },
          symbol: "circle",
          symbolSize: 8,
          data: valuesExpense,
        },
        {
          name: "收入",
          type: "line",
          stack: "总量",
          smooth: true,
          lineStyle: {
            width: 3,
            color: "#ffa1a0",
          },
          areaStyle: { color: "#ffa1a0" },
          itemStyle: {
            color: "#ffa1a0",
            borderWidth: 2,
          },
          symbol: "circle",
          symbolSize: 8,
          data: valuesIncome,
        },
      ],
    };
    return option;
  }
}
</script>

<style lang='scss' scoped>
.overview-chart-wrapper {
  margin-top: 3em;
  padding: 4px;
}
</style>