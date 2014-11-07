/*! nodeframe - v0.0.1 
* http://weibo.com/yinuoba
* Copyright (c) 2014 Hoogle; Licensed  */
require([],function(){Tool.fixedHover({selector:$("#showLifeNav>li"),enterTimeout:100,leaveTimeout:300,enterFun:function(){var a=$(this),b=a.find("#subNav");b.show()},leaveFun:function(){var a=$(this),b=a.find("#subNav");b.hide()}})});