<template>
  <div>
    <label class="notes">
      <span class="name">{{fieldName}}</span>
      <input type="text" v-model="value" :placeholder="placeholder" />
    </label>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Watch } from "vue-property-decorator";
import Vue from "vue";
@Component
export default class Notes extends Vue {
  name="Notes";
  value = "";
  @Prop({required:true}) fieldName!: string
  @Prop() placeholder?: string
  @Watch("value")
  onValueChanged(value: string, oldValue: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  background: #f5f5f5;
  display: block;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>