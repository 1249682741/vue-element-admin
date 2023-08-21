# 开发须知
#### 建议使用pnpm 进行包管理

## 菜单配置
1. 菜单管理中 ***菜单路由*** 是配置router中的 ***path***与***name***
2. 菜单管理中 ***菜单资源*** 就配置router中的 ***component*** , 需要指定当前路由所对应的前端文件。
   * 一级路由配置 ``` layout/index.vue ```
   * 其他菜单，如菜单管理 ``` views/sys/menu/index.vue ```