import Cookie from 'js-cookie';
export default {
  state: {
    isCollapse: false,
    tabsList: [
      {
        path: '/home',
        name: 'Home',
        label: '首页',
        icon: 'home',
        url: 'home/Home.vue',
      },
    ],
    currentMenu: null,
    menu: [],
  },
  mutations: {
    // 是否收起菜单栏
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    selectMenu(state, val) {
      if (val.name !== 'Home') {
        state.currentMenu = val;
        const result = state.tabsList.findIndex(
          (item) => item.name === val.name
        );
        if (result === -1) {
          state.tabsList.push(val);
        }
      } else {
        state.currentMenu = null;
      }
    },
    removeMenu(state, val) {
      const result = state.tabsList.findIndex((item) => item.name === val.name);
      state.tabsList.splice(result, 1);
    },
    clearTabs(state) {
      state.tabsList.splice(1, state.tabsList.length - 1);
    },
    // 将从后端获取的菜单信息存储到cookie上
    setMenu(state, val) {
      state.menu = [];
      Cookie.set('gmenu', JSON.stringify(val));
    },
    clearMenu(state) {
      state.menu = [];
      Cookie.remove('gmenu');
    },
    // 将后端获取到的路由信息添加到router上
    addMenu(state, router) {
      if (!Cookie.get('gmenu')) {
        return;
      }
      const menu = JSON.parse(Cookie.get('gmenu'));
      state.menu = menu;
      const menuArray = [];
      menu.forEach((item) => {
        if (item.children) {
          // 有子路由
          item.children = item.children.map((item) => {
            item.component = () => import(`../views/${item.url}`);
            return item;
          });
          menuArray.push(...item.children);
        } else {
          item.component = () => import(`../views/${item.url}`);
          menuArray.push(item);
        }
      });
      // console.log(menuArray);
      // 动态添加路由
      menuArray.forEach((item) => {
        router.addRoute('Main', item);
      });
      // console.log(router);
    },
  },
};
