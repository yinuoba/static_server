/*! extrabux - v0.0.1 
* http://www.extrabux.com/
* Copyright (c) 2014 Hoogle; Licensed  */
require(["text!template/planes/list.html"],function(a){var b=($("#selectDate"),$("#planesListContainer"));$("ul#selectDate>li").click(function(){var c=$(this),d=c.attr("date");$.ajax({type:"get",data:{date:d},dataType:"json",url:"/extraData",success:function(c){var d=artTemplate.compile(a),e=d({list:c});b.html(e)}})}).eq(0).trigger("click")});