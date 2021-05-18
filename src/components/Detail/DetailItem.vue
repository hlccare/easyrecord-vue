<template>
  <div class="detail-item">
    <div class="iconWrapper">
      <Icon name="bonus" />
    </div>
    <div class="content-wrapper">
      <div class="upper">
        <div class="tag oneLine">
          <span>123</span>
        </div>
        <div class="amount">￥100</div>
      </div>
      <div class="lower">
        <div class="note oneLine">123</div>
        <div class="deleteIconWrapper">
          <Icon name="delete" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class DetailItem extends Vue {}
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