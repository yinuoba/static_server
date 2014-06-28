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

* 根目录执行"node app"启动服务


## 项目说明

* 把html文件放到views中，把css、JavaScript、image等静态资源放到public文件夹中。

* 如果在views文件夹中添加了Weixin文件夹，Weixin中添加了home.html，则访问路径为http://localhost:8080/Weixin/home，注意端口号在conf/config.js中配置。

* http://localhost:8080/默认访问views中的index.html，可查看静态页面目录列表。

* 页面包含的文件，如页头页尾，放在views/partials/文件夹中。

* 添加一个静态页面，则在conf/title.js文件中加上当前页面的url及title，方便给页面设置title，及生成预览目录，如："Weixin/home": "鑫合汇-首页"

* 如有两个显示屏，可以一屏放浏览器，一屏放编辑器，编辑器编辑文件，浏览器实时预览更改后的效果。

* 本地开发时，logs和node_modules设为ignore文件夹，不提交到版本库。


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