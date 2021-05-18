<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="{ selected: tag.name === seletedTag }"
        @click="select(tag.name)"
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
  @Prop() value!: string;
  selectedTags: string[] = [];
  seletedTag: string = this.value;
  get tagList() {
    return this.$store.state.tagList;
  }
  created() {
    this.$store.commit("fetchTags");
  }

  select(tag: string) {
    if (this.seletedTag !== tag) {
      this.seletedTag = tag;
      this.$emit("update:value", this.seletedTag);
    }
  }

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit("update:value", this.selectedTags);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: #ffffff;
  flex-grow: 1;
  display: flex;
  padding: 4px;
  .current {
    width: 100%;
    display: flex;
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
