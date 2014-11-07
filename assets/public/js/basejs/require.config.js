//配置require
require.config({
  baseUrl: '../public/js',
  urlArgs: '0.0.1',
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
  }
});

require(['artTemplate', 'text'], function (artTemplate) {
  window['artTemplate'] = artTemplate;
  artTemplate.config({
    openTag: '<%',
    closeTag: '%>'
  });
});