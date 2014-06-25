基于Nodejs的静态文件服务器
======

## 项目介绍

　　整这个项目主要是为了做到静态项目的工程化，让静态html、css及一些页面效果跟主项目分离开来，避免主项目最终有很多不需要合并到线上的静态文件及静态文件难以管理的问题，跟JavaScript及前后端交互开发人员能更好的协作，同时做到以下几点：
> * 做到访问静态页面的时候url能跟主项目保持基本一致
> * 文件结构基本一致（实现文件的include）
> * 并可以直接预览静态文件访问列表
> * 把sass、compass等整入项目
> * 把livereload整入项目，实现文件在编辑器更改后能在浏览器实时预览

## 项目部署

* [安装Nodejs环境][1]

* 根目录执行"npm install"

* 安装[ruby环境][2]

* 安装sass及compass(根目录先执行gem install sass, 然后gem install compass)

* 根目录创建logs文件夹

* 根目录执行"node app"启动服务

* http://localhost:8080/ 查看静态页面目录列表（端口号可在config中配置）

## 目录结构

    ├─common
    ├─conf ─ 配置文件
    ├─controllers
    ├─logs ─ 服务器日志文件
    ├─public ─ 静态资源文件
    │  ├─css ─ sass生成后的css 或直接写的css
    │  ├─images ─ 背景图片文件夹
    │  ├─img ─ 页面直接调的一次性图片
    │  ├─js
    │  │  ├─base ─ 基础js文件
    │  │  ├─lib ─ js组件
    │  │  └─view ─ 相应页面的业务js
    │  └─sass
    │      ├─page
    ├─routers 路由
    └─views 模版文件夹 所有的html文件放到这个目录 可分文件夹存放
    │    ├─partials 独立模块 如头尾
    │    ├─other ─ 其他html文件
    ├─app.js
    ├─package.json
    ├─config.rb ─ sass、compass配置文件


  [1]: http://nodejs.org/download/
  [2]: http://pan.baidu.com/s/1eQoZCAI