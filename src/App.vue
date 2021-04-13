<template>
  <router-view v-slot="{ Component }">
    <keep-alive :exclude="['login','register','change','forget']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style lang="less">
</style>
