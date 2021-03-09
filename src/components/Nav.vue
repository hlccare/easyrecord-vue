import Nav from '@/components/Nav.vue';
<template>
  <div class="nav">
    <router-link to="/money">
      <Icon name="money" />
    </router-link>
    <router-link to="/labels">
      <Icon name="label" />
    </router-link>
    <router-link to="/statistics">
      <Icon name="statistic" />
    </router-link>
  </div>
</template>

<script lang='ts'>
export default {};
</script>

<style lang="scss" scoped>
.nav {
  border: 1px solid red;
}
</style>