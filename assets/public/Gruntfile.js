'use strict';

module.exports = function(grunt) {

  // wrap配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), // 加载配置文件
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> \n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    clean: { // 清空dist目录
      dist: ['dist/**/*', "!dist/**/*.svn"]
    },

    cssmin: { // css压缩、合并
      options: {
        banner: '<%= banner %>'
      },
      main: {
        files: {
          'dist/css/main.css': 'css/main.css'
        }
      }
    },

    uglify: { // js混淆
      options: {
        mangle: true,
        banner: '<%= banner %>'
      },
      
      /*压缩所有的js*/
      all:{
        expand:true,
        cwd:'js',
        src:'**/*.js',
        dest:'dist/js'
      },
      base: {
        files: {
            'dist/js/base.min.js': ['dist/js/basejs/jquery.js', 'dist/js/basejs/prototype.js', 'dist/js/basejs/tool.js', 'dist/js/basejs/require.js']
        }
      }
    },

    imagemin: { // 批量无损压缩图片
      images: {
        options: {
          optimizationLevel: 3 //定义 图片优化水平
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,jpeg,gif}'], // 优化 image 目录下所有 png/jpg/jpeg/gif 图片
          dest: 'images/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
        }]
      }
    },

    requirejs: {
      main: {
        options: {
          banner: '<%= banner %>',
          baseUrl: "dist/js",
          paths: {
            //Core Libraries
            'jQuery': 'basejs/jquery',
            'text': 'plugin/text', //require插件，用于加载html
            'artTemplate': 'basejs/template'
          },
          //配置依赖项
          shim: {
            'jQuery': {
              'exports': '$'
            },
            'artTemplate': {
              'exports': 'artTemplate'
            }
          },
          include: [
            'basejs/require.config.js'
          ],
          out:"dist/js/require.config.min.js"
        }
      }
    },

    sprite: {
      options: {
        // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
        // imagepath: 'test/slice/',
        // 映射CSS中背景路径，支持函数和数组，默认为 null
        imagepath_map: null,
        // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
        spritedest: 'publish/images/sprite/',
        // 替换后的背景路径，默认 ../images/
        spritepath: '../images/',
        // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
        padding: 2,
        // 是否使用 image-set 作为2x图片实现，默认不使用
        useimageset: false,
        // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
        newsprite: false,
        // 给雪碧图追加时间戳，默认不追加
        spritestamp: true,
        // 在CSS文件末尾追加时间戳，默认不追加
        cssstamp: true,
        // 默认使用二叉树最优排列算法
        algorithm: 'binary-tree',
        // 默认使用`pngsmith`图像处理引擎
        engine: 'pngsmith'
      },
      autoSprite: {
        files: [{
          // 启用动态扩展
          expand: true,
          // css文件源的文件夹
          cwd: 'css/',
          // 匹配规则
          src: '*.css',
          // 导出css和sprite的路径地址
          dest: 'publish/css/',
          // 导出的css名
          ext: '.sprite.css'
        }]
      },
      // image-set 示例
      imageSetSprite: {
        options: {
          useimageset: false,
          imagepath_map: ['/w/grunt-css-sprite/test/', '../'],
          spritedest: 'test/publish/images/imageset/',
          spritepath: '../../images/imageset/'
        },
        files: [{
          // 启用动态扩展
          expand: true,
          // css文件源的文件夹
          cwd: 'test/css/',
          // 匹配规则
          src: '*.css',
          // 导出css和sprite的路径地址
          dest: 'test/publish/css/imageset/',
          // 导出的css名
          ext: '.imageset.css'
        }]
      }
    },

  });

  // 加载需要的Grunt插件
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify'); // 压缩js
  grunt.loadNpmTasks('grunt-contrib-watch'); // 监听文件变化
  grunt.loadNpmTasks('grunt-css-sprite');
  
  // 制作雪碧图
  grunt.registerTask('sprite', ['sprite']);

  // 发布任务
  grunt.registerTask('default', ['clean', 'cssmin', 'uglify', 'requirejs']);

};