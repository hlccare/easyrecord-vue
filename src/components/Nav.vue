<template>
  <nav>
    <router-link to="/detail" class="item" active-class="selected">
      <Icon name="label" />
      明细
    </router-link>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money" />
      记账
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistic" />
      统计
    </router-link>
  </nav>
</template>

<script lang='ts'>
export default {};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav {
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  background: white;
  > .item {
    padding: 4px 0;
    width: 33.33333%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon {
      height: 24px;
      width: 24px;
    }
  }
  > .item.selected {
    color: white;
    background: #9ccac0;
  }
}
</style>