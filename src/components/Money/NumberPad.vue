<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button class="backspace" @click="remove">
        <Icon name="backspace"></Icon>
      </button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清零</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button class="ok" @click="ok">OK</button>
      <button class="zero" @click="inputContent">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class NumberPad extends Vue {
  @Prop(Number) readonly value!: number;

  output = this.value.toString();
  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement; //强制指定类型
    const input = button.textContent as string; //再次强制，避免处理为null的情况
    // const input = button.textContent!; //！表明不会为空
    if (this.output.length === 16) {
      return;
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf(".") >= 0 && input === ".") {
      return;
    }
    if (
      this.output.indexOf(".") >= 0 &&
      this.output.split(".")[1].length >= 2
    ) {
      return;
    }

    this.output += input;
  }
  remove() {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
  }
  clear() {
    this.output = "0";
  }
  ok() {
    const number = parseFloat(this.output);
    this.$emit("update:value", number);
    this.$emit("submit", number);
    this.output = "0";
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  font-size: 1.5em;
  .output {
    @extend %innerShadow;
    color: #129e6f;
    background: white;
    font-size: 36px;
    line-height: 60px;
    font-family: Consolas, monospace;
    padding: 0px 16px;
    text-align: right;
  }
  .buttons {
    @extend %clearFix;
    > button {
      $height-normal: 64px;
      $height-small: 48px;
      width: 25%;
      height: $height-normal;
      float: left;
      background: white;
      border: 1px solid #d1cece;
      border-bottom: none;
      border-left: none;
      @media (max-height: 700px) {
        height: $height-small;
      }
      &.backspace {
        color: #f85f4b;
      }
      &.ok {
        height: $height-normal * 2;
        float: right;
        @media (max-height: 700px) {
          height: $height-small * 2;
        }
      }
      &.zero {
        width: 25 * 2%;
      }
      &:nth-child(4),
      &:nth-child(8),
      &:nth-child(12) {
        border-right: none;
      }
    }
  }
}
</style>