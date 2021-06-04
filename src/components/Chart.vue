<template>
  <div class="wrapper" ref="wrapper">chart</div>
</template>
<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import Vue from "vue";
import { EChartOption, ECharts } from "echarts";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
@Component
export default class Chart extends Vue {
  @Prop() options?: EChartOption;
  chart?: ECharts;
  mounted() {
    if (this.options === undefined) {
      return console.error("options为空");
    }
    this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    this.chart.setOption(this.options);
  }
  @Watch("options")
  onOptionsChange(newValue: EChartOption) {
    this.chart!.setOption(newValue);
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  min-height: 300px;
}
</style>