<template>
  <div class="content-wrapper">
    <div class="amount-wrapper">
      <div class="mark">{{ type === "-" ? "支出" : "收入" }}总计</div>
      <div class="amount">￥{{ totalAmount }}</div>
      <router-link :to="`/detail/${type}`">
        <Button>查看明细</Button>
      </router-link>
    </div>
    <Chart :options="options" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Chart from "../Chart.vue";
import Button from "@/components/Button.vue";
type OptionData = {
  value: number;
  name: string;
}[];

@Component({
  components: { Chart, Button },
})
export default class TypeStatistic extends Vue {
  @Prop({
    type: String,
    required: true,
  })
  type!: "+" | "-";
  shareList: Result = [];
  totalAmount = 0;

  @Watch("type")
  updateDate(newType: "+" | "-", oldType: "+" | "-") {
    if (newType !== oldType) {
      this.shareList = this.getShareList(newType) as Result;
      this.totalAmount = this.$store.getters.getTotalByType(this.type);
    }
  }

  getShareList(type: "+" | "-") {
    return this.$store.getters.getShareListByType(type);
  }

  beforeMount() {
    this.shareList = this.getShareList(this.type) as Result;
    this.totalAmount = this.$store.getters.getTotalByType(this.type);
  }

  get optionData() {
    const optionData: OptionData = [];
    if (this.shareList.length > 0) {
      this.shareList.forEach((r) => {
        optionData.push({
          value: r.amount,
          name: this.$store.getters.getTagNameById(r.id),
        });
      });
    }
    return optionData;
  }

  get options() {
    return {
      tooltip: {
        trigger: "item",
        formatter: "{b} : {d}%",
      },
      series: [
        {
          type: "pie",
          radius: ["25%", "50%"],
          center: ["50%", "60%"],
          data: this.optionData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  }
}
</script>

<style lang='scss' scoped>
.amount-wrapper {
  margin-top: 3em;
  text-align: center;
  > .mark {
    font-size: 1.25em;
  }
  > .amount {
    font-size: 1.5em;
    margin-top: 0.5em;
  }
}
</style>