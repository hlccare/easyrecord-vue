<template>
  <div>
    <div @click="onClickOverlay" class="dialog-overlay"></div>
    <div class="dialog-wrapper">
      <div class="dialog">
        <header>
          <slot name="title" />
          <span @click="close" class="dialog-close"></span>
        </header>
        <main>
          <slot name="content" />
        </main>
        <footer>
          <Button @click="ok">确定</Button>
          <Button @click="cancel" v-if="type === 'confirm'">取消</Button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Button from "@/components/Button.vue";

@Component({
  components: {
    Button,
  },
})
export default class Dialog extends Vue {
  @Prop({
    type: String,
    default: "confirm",
    validator(value) {
      return ["confirm", "alert"].indexOf(value) > -1;
    },
  })
  type!: "confirm" | "alert";
  @Prop({ type: Boolean, default: false }) visible!: boolean;
  @Prop({ type: Boolean, default: true }) closeOnClickOverlay!: boolean;
  @Prop() okHandler?: () => boolean;
  @Prop() cancelHandler?: () => any;
  close() {
    this.$emit("update:visible", false);
  }
  onClickOverlay() {
    if (this.closeOnClickOverlay) this.close();
  }
  ok() {
    if (this.okHandler && this.okHandler() !== false) {
      this.close();
    }
  }
  cancel() {
    this.cancelHandler && this.cancelHandler();
    this.close();
  }
}
</script>

<style lang='scss' scoped>
$radius: 4px;
$border-color: #d9d9d9;

.dialog {
  background: white;
  border-radius: $radius;
  box-shadow: 0 0 3px fade-out($color: black, $amount: 0.5);
  min-width: 15em;
  max-width: 90%;

  ::v-deep button + button {
    margin-left: 4px;
  }

  &-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: fade-out($color: black, $amount: 0.5);
    z-index: 10;
  }

  &-wrapper {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
  }

  > header {
    padding: 12px 16px;
    border-bottom: 1px solid $border-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
  }
  > main {
    padding: 12px 16px;
  }
  > footer {
    border-top: 1px solid $border-color;
    padding: 12px 16px;
    text-align: right;
  }
  &-close {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    cursor: pointer;
    &::before,
    &::after {
      content: "";
      position: absolute;
      height: 1px;
      background: black;
      width: 100%;
      top: 50%;
      left: 50%;
    }
    &::before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
    &::after {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
}
</style>