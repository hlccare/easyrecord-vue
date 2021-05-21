<template>
  <div>
    <label class="formItem">
      <span class="name">{{ fieldName }}</span>
      <template v-if="type === 'date'">
        <input
          :type="type || 'text'"
          :value="getFormattedDate(value)"
          :max="today"
          @input="onValueChanged($event.target.value)"
          :placeholder="placeholder"
        />
      </template>
      <template v-else>
        <input
          :type="type || 'text'"
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
  @Prop() type?: string;
  today = this.getFormattedDate(new Date());
  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }
  getFormattedDate(isoString: Date) {
    return dayjs(isoString).format("YYYY-MM-DD");
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  display: block;
  display: flex;
  align-items: center;
  padding: 2px 16px;
  background: #f5f5f5;
  .name {
    margin-right: 16px;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
  }
}
</style>