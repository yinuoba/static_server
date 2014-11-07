/*! nodeframe - v0.0.1 
* http://weibo.com/yinuoba
* Copyright (c) 2014 Hoogle; Licensed  */
require.config({baseUrl:"../js",urlArgs:"0.0.1",paths:{jQuery:"basejs/jquery",text:"plugin/text",artTemplate:"basejs/template"},shim:{jQuery:{exports:"$"},artTemplate:{exports:"artTemplate"}}}),require(["artTemplate","text"],function(a){window.artTemplate=a,a.config({openTag:"<%",closeTag:"%>"})});