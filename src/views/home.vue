<template>
  <el-container class="home-container">
    <el-aside style="width: 217px;">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#ffffff"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#303133"
        router="true"
        style="width: 200px;"
      >
        <el-sub-menu v-for="firstMenu,idx of menuList" :key="firstMenu.authId" :index="idx">
          <template #title>
            <span>{{firstMenu.authName}}</span>
          </template>
          <el-menu-item 
            v-for="secondMenu of firstMenu.chileAuth" 
            :key="secondMenu.authId" 
            :index="secondMenu.authUrl"
            >
            {{secondMenu.authName}}
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container class="main-container">
      <el-header>
        <div class="header_left">
          <span>仓库管理系统</span>
        </div>
        <div class="header_right">
          <span>当前用户：{{`${currUser.userCode}【${currUser.userName}】`}}</span>
          <a href="#" @click.prevent="logout">退出</a>
        </div>
      </el-header>
      <el-main>
        <div class="breadcrumb">
          <el-icon><fold /></el-icon>
          <el-breadcrumb style="display: inline-block;margin-left: 10px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <template v-if="$route.meta && $route.meta.nav">
              <el-breadcrumb-item v-for="path in $route.meta.nav " :key="path">{{path}}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
        </div>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { tip, get, del, removeLocalToken, ddo } from "@/common";
import { Location, Fold } from '@element-plus/icons-vue'

const router = useRouter(); // 获取路由器

// 当前路径
/* const paths = ref([]);
const selectMenu = (first, second) => {
  paths.value = [first, second];
} */

// 获取当前登录用户
const currUser = ref({});
const getCurrentUser = () => {
  get("/l-user").then(result => {
    currUser.value = result.data;
  });
}
getCurrentUser();

// 退出
const logout = () => {
  del("/logout").then(result =>{
    // 删除本地token
    removeLocalToken();
    // 替换路由
    router.replace("/login");
    tip.success("您已退出系统！");
  });
}

// 获取所有权限
const menuList = ref([]);
const getMenuList = () => {
  get("/user/auth-list").then(result => {
    menuList.value = result.data;
  });
}
getMenuList();

</script>

<style scoped>
.home-container{
  height: 100%;
  display: flex;
}
.main-container{
  display: flex;
  flex-direction: column;
}
.el-header{
  line-height: 60px;

  display: flex;
  justify-content: space-between;
}
.el-header .header_left{
  font-size: 22px;
  font-family: 微软雅黑;
}
.header_left img{
  margin-top: -5px;
  vertical-align: middle;
}
.el-header .header_right{
  padding-right: 20px;
}
.header_right a{
  margin-left: 10px;
}

.el-menu{
  height: 100%;
}
.el-main {
  border-top: 1px solid #CCC;
  border-bottom: 1px solid #CCC;
}
.breadcrumb{
  margin-bottom: 20px;
}
.el-footer {
  text-align: center;
  font-size: 12px;
  height: 40px;
  line-height: 40px;
}
</style>