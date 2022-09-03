<template>
  <div class="tags">
    <el-tag
      :effect="$route.path === item.path ? 'dark' : 'plain'"
      size="small"
      v-for="item in tabs"
      :key="item.path"
      :closable="item.path !== '/home'"
      @click="clickMenu(item)"
      @close="closeMenu(item)"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tabs: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    closeMenu(item) {
      const result = this.tabs.findIndex((tab) => item.name === tab.name);
      this.$store.commit("removeMenu", item);
      if (this.$route.path === item.path) {
        if (result === this.tabs.length) {
          // 删掉的是最后一个，路由跳到前一个
          this.clickMenu(this.tabs[this.tabs.length - 1]);
        } else {
          this.clickMenu(this.tabs[result]);
        }
      }
    },
    clickMenu(item) {
      this.$router.push({
        name: item.name,
      });
    },
  },
};
</script>

<style>
.tags {
  padding: 10px 20px 0 20px;
}
.tags .el-tag {
  margin-right: 10px;
  cursor: pointer;
}
</style>