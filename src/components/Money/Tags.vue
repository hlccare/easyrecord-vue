<template>
  <div class="tags">
    <!-- <div class="new">
      <button @click="createTag">新增标签</button>
    </div> -->
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
  flex-grow: 1;
  display: flex;
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

      &.selected {
        background: grey;
      }

      .icon {
        height: 40%;
        width: 40%;
        margin-bottom: 4px;
      }
    }
  }
}
// .tags {
//   background: white;
//   font-size: 14px;
//   padding: 16px;
//   flex-grow: 1;
//   display: flex;
//   flex-direction: column-reverse;
//   > .current {
//     display: flex;
//     flex-wrap: wrap;
//     > li {
//       $bg: #d9d9d9;
//       background: $bg;
//       $h: 24px;
//       height: $h;
//       line-height: $h;
//       border-radius: ($h/2);
//       padding: 0 16px;
//       margin-right: 12px;
//       margin-top: 4px;
//       &.selected {
//         background: darken($bg, 30%);
//         color: white;
//       }
//     }
//   }
// }
</style>
