# A admin program whitch use Vue3 + Element Plus + Pinia + Vue-Router.

## Vue开发需要注意的点
1.  在 ``3.2.34`` 或以上的版本中，使用 ```<script setup> ```的单文件组件会自动根据文件名生成对应的 name 选项，无需再手动声明。``3。2.34`` 以下版本可以通过vite插件 ``vite-plugin-vue-setup-extend`` 解决。 由于此项目是的vue文件都是``index.vue``, 固还是安装插件