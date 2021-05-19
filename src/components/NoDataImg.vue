<template>
  <div class="content-wrapper">
    <img src="@/assets/images/no-data.png" :alt="tip" />
    <div>{{ tip }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({
    type: String,
    default: "暂无数据",
  })
  tip!: string;
}
</script>

<style scoped>
.content-wrapper {
  text-align: center;
}
</style>