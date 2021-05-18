<template>
  <h3 class="detail-header">
    <span>1月1日</span>
    <span>￥100</span>
  </h3>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class DetailHeader extends Vue {}
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