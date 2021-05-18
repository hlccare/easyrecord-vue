<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="{ selected: tag.id === seletedTagId }"
        @click="select(tag.id)"
      >
        <Icon :name="tag.iconName" />
        <p>{{ tag.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { mixins } from "vue-class-component";
import { Component, Prop } from "vue-property-decorator";
import TagHelper from "@/mixins/TagHelper";
import Icon from "@/components/Icon.vue";

@Component({
  components: { Icon },
})
export default class Tags extends mixins(TagHelper) {
  @Prop({
    type: Number,
    required: true,
  })
  value!: number;
  @Prop({
    type: String,
    required: true,
  })
  type!: "-" | "+";
  seletedTagId: number = this.value;
  get tagList() {
    return this.type === "-"
      ? this.$store.state.expenseTagsList
      : this.$store.state.incomeTagsList;
  }
  created() {
    this.$store.commit("fetchTags");
  }

  select(tagId: number) {
    if (this.seletedTagId !== tagId) {
      this.seletedTagId = tagId;
      this.$emit("update:value", this.seletedTagId);
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: #ffffff;
  flex-grow: 1;
  position: relative;
  .current {
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 4px;
    position: absolute;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }

    > li {
      border-radius: 10%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 25%;
      height: 25%;
      color: grey;

      @media screen and (max-width: 900px) {
        height: 50%;
      }
      &.selected {
        background: #dfdddd;
        color: black;
        font-weight: 530;
      }

      .icon {
        height: 45%;
        width: 45%;
        margin-bottom: 4px;
      }
    }
  }
}
</style>
