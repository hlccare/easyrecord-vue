<template>
  <ul class="tabs" :class="{ [classPrefix + '-tabs']: classPrefix }">
    <li
      v-for="item in dataSource"
      :key="item.value"
      class="tabs-item"
      :class="liClass(item)"
      :style="{ height: height }"
      @click="select(item)"
    >
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

type DataSourceItem = { text: string; value: string };

@Component
export default class Tabs extends Vue {
  name = "Tabs";
  @Prop({ required: true, type: Array })
  dataSource!: { text: string; value: string }[];
  @Prop(String)
  readonly value!: string;
  @Prop(String)
  classPrefix?: string;
  @Prop({ type: String, default: "44px" })
  height!: string;
  liClass = (item: DataSourceItem) => {
    return {
      [this.classPrefix + "-tabs-item"]: this.classPrefix,
      selected: item.value === this.value,
    };
  };

  select(item: DataSourceItem) {
    this.$emit("update:value", item.value);
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  background: white;
  display: flex;
  text-align: center;
  font-size: 20px;
  &-item {
    width: 50%;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 3px;
      background: #17a817;
    }
  }
}
</style>