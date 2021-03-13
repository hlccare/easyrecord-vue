<template>
  <div>
    <ul class="types">
      <li :class="value === '-' && 'selected'" @click="selectType('-')">
        支出
      </li>
      <li :class="value === '+' && 'selected'" @click="selectType('+')">
        收入
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

// 1 自动提示更智能
// 2 不能随意调用方法
// 编译时会报错，无法变成JS，严谨
@Component
export default class Types extends Vue {
  @Prop(String) readonly value!: string; //忽略无初始值问题
  type = "-"; //'-'表示指出，‘+’表示收入

  selectType(type: string) {
    if (type !== "-" && type !== "+") {
      //type只能是'+'或'-'
      throw new Error("type is unknown");
    }
    this.$emit("update:value", type);
  }
}
</script>

<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  > li {
    width: 50%;
    height: 64px;
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
      height: 4px;
      background: #333;
    }
  }
}
</style>