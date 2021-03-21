<template>
  <div>
    <label class="formItem">
      <span class="name">{{ fieldName }}</span>
      <template v-if="type==='datetime-local'">
        <input
        :type="type||'text'"
        :value="x(value)"
        @input="onValueChanged($event.target.value)"
        :placeholder="placeholder"
      />
      </template>
      <template v-else>
        <input
        :type="type||'text'"
        :value="value"
        @input="onValueChanged($event.target.value)"
        :placeholder="placeholder"
      />
      </template>

      
    </label>
  </div>
</template>

<script lang='ts'>
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";
import dayjs from "dayjs";
@Component
export default class FormItem extends Vue {
  name = "FormItem";
  @Prop({ default: "" }) readonly value!: string;
  @Prop({ required: true }) fieldName!: string;
  @Prop() placeholder?: string;
  @Prop() type?: string
  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }
  x(isoString: string){
    return dayjs(isoString).format('YYYY-MM-DDTHH:mm')
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  display: block;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>