<template>
  <h3 class="detail-header">
    <span>{{ dateFormatted }}</span>
    <span>￥{{ amount }}</span>
  </h3>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import dayjs from "dayjs";

@Component
export default class DetailHeader extends Vue {
  @Prop({
    type: String,
    required: true,
  })
  date!: string;
  @Prop({
    type: Number,
    default: 0,
  })
  amount!: number;
  beautify = (string: string) => {
    const day = dayjs(string);
    const now = dayjs();
    if (dayjs(string).isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("MM月D日");
    } else {
      return day.format("YYYY年MM月DD日");
    }
  };
  get dateFormatted() {
    return this.beautify(this.date);
  }
}
</script>

<style lang='scss' scoped>
.detail-header {
  font-size: 18px;
  line-height: 20px;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e2e1e1;
}
</style>