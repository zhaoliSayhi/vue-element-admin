# vue-admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


```
.
├── README.md
├── config                  # prod/dev build config 文件
├── index.html              # 最基础的网页
├── package.json
├── src                     # 源码
│   ├── App.vue             # App Root Component
│   ├── api                 # 接入后端服务的基础 API
│   ├── assets              # 静态文件
│   ├── components          # 组件
│   ├── event-bus           # Event Bus 事件总线，特殊情况下使用，一般尽量用 vuex
│   ├── main.js             # 入口文件
│   ├── router              # 路由
│   ├── service             # 服务
│   ├── store               # 状态管理
│   ├── util                # 通用 utility，directive, mixin 还有绑定到 Vue.prototype 的函数
│   └── view                # 各个页面
├── static                  # DevServer 静态文件
```
