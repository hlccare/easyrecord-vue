<template>
  <div class="detail-item">
    <div class="iconWrapper">
      <Icon :name="iconName" />
    </div>
    <div class="content-wrapper">
      <div class="upper">
        <div class="tag oneLine">
          <span>{{ tagName }}</span>
        </div>
        <div class="amount">￥{{ record.amount }}</div>
      </div>
      <div class="lower">
        <div class="note oneLine" :title="record.notes">{{ record.notes }}</div>
        <div class="deleteIconWrapper">
          <Icon name="delete" @click="showDialog" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { openDialog } from "@/lib/openDialog";
import { Component, Prop, Vue } from "vue-property-decorator";
import Dialog from "../Dialog.vue";
@Component({
  components: {
    Dialog,
  },
})
export default class DetailItem extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  record!: RecordItem;
  dialog!: Vue;

  get tagName() {
    return this.$store.getters.getTagNameById(this.record.tagId);
  }
  get iconName() {
    return this.$store.getters.getIconNameById(this.record.tagId);
  }

  showDialog() {
    openDialog({
      title: "提示",
      content: "是否要删除此项记录？",
      okHandler: () => {
        console.log("ok");
        this.deleteRecord(this.record.id);
      },
      cancelHandler: () => {
        console.log("cancel");
      },
      closeOnClickOverlay: true,
    });
  }

  deleteRecord(id: number) {
    this.$store.commit("deleteRecord", id);
  }
}
</script>

<style lang='scss' scoped>
.detail-item {
  display: flex;
  background: white;
  font-size: 18px;
  line-height: 20px;
  padding: 10px 16px;
  align-items: stretch;
  > .iconWrapper {
    margin-right: 8px;
    padding: 3px;
    .icon {
      width: 2.5em;
      height: 2.5em;
    }
  }
  .content-wrapper {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;
    .upper {
      line-height: 1.2em;
      font-size: 1.2em;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
    }
    .lower {
      display: flex;
      flex-wrap: nowrap;
      > .note {
        margin-right: 4px;
        max-width: calc(100% - 4px - 1em);
        font-size: 0.8em;
        font-weight: 400;
      }
      > .deleteIconWrapper {
        margin-left: auto;
        > .icon {
          font-size: 1em;
        }
      }
    }
  }
}
</style>