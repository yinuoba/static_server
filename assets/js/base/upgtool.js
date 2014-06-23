/**
 * 封装一些通用方法
 * @param  {[type]} window     [description]
 * @param  {[type]} document   [description]
 * @param  {[type]} undefined
 * @return {[type]}            [description]
 */
var upgTool = (function(window, document, undefined) {
  var upgTool = {};

  /**
   * 取出页面中最大的zindex
   * @return {[type]} [description]
   */
  upgTool.getHighestZIndex = function() {
    var indexHighest = 1;
    $("*").each(function() {
      var indexCurrent = parseInt($(this).css("zIndex"), 10);
      if (indexCurrent > indexHighest && indexCurrent < 999) {
        indexHighest = indexCurrent;
      }
    });
    return indexHighest;
  };

  /**
   * 移除错误提示
   * @param  {[type]} tipsyid [description]
   * @return {[type]}         [description]
   */
  upgTool.removeErrorMsg = function(tipsyid) {
    try {
      if (tipsyid) {
        if (typeof tipsyid === "object") {
          if (typeof tipsyid.tipsy == 'function') {
            var t = tipsyid.tipsy("tip");
            t.hide();
          }
        } else {
          $("[tipsyid='" + tipsyid + "']").remove();
        }
      } else {
        $("[tipsy].tipsy-red").remove();
      }
    } catch (e) {}
  }

  /**
   * @description 获取url上的参数，并将其封装在对象里面
   * @param {String} [url = window.location.href] 默认是当前窗口url
   * @return {Object} 参数对象
   * @example upgTool.getParams(url)
   */
  upgTool.getParams = function(url) {
    url = url || window.location.href;
    var index = url.indexOf('?');
    var params = {};
    if (index !== -1) {
      var paramsStr = url.slice(index + 1); // 获取到问号以后的字符串
      var paramsArr = paramsStr.split('&');
      // 把url上的所有参数塞到json对象中,以键值对的方式保存
      for (var i = 0, length = paramsArr.length, param; i < length; i++) {
        param = paramsArr[i].split('=');
        params[param[0]] = param[1]
      }
    }
    return params;
  }

  /**
   * 将多个对象合并为一个对象，将多个对象的属性连接起来
   * @return {Object} 返回混合后的对象
   */
  upgTool.mix = function() {
    var arg = arguments,
      length = arg.length - 1,
      prop, mixobj = {};
    for (; length >= 0; length--) {
      var nowObj = arg[length];
      for (prop in nowObj) {
        if (nowObj.hasOwnProperty(prop)) {
          mixobj[prop] = nowObj[prop];
        }
      }
    }
    return mixobj;
  }

  /**
   * 截取字符串
   * @param  {[type]} str [description]
   * @param  {[type]} len [description]
   * @return {[type]}     [description]
   */
  upgTool.subStr = function(str, len) {
    if (!str) {
      return '';
    }
    len = len > 0 ? len * 2 : 280;
    var count = 0, //计数：中文2字节，英文1字节
      temp = ''; //临时字符串
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 255) {
        count += 2;
      } else {
        count++;
      }
      //如果增加计数后长度大于限定长度，就直接返回临时字符串
      if (count > len) {
        return temp;
      }
      //将当前内容加到临时字符串
      temp += str.charAt(i);
    }
    return str;
  };

  /**
   * 返回等待图标
   * @param  {[type]} largeIcon 是否是大图片
   * @param  {[type]} className 等待img图片的样式
   * @return {[type]}           [description]
   */
  upgTool.iconWaiting = function(largeIcon, className) {
    var $img = $("<img/>");
    if (largeIcon) {
      $img.attr("src", "/public/image/load/loading.gif");
      $img.width("120");
    } else {
      $img.attr("src", "/public/image/load/icon_waiting.gif");
      $img.width("15").height("15");
    }
    if (className) {
      $img.addClass(className);
    }
    return $img;
  }

  /**
   * 在一个容器中显示转圈圈
   * @param  {[type]} $container [description]
   * @return {[type]}            [description]
   */
  upgTool.showLoading = function($container) {
    $container.empty().addClass('loading');
  }

  /**
   * 隐藏容器中的圈圈
   * @param  {[type]} $container [description]
   * @return {[type]}            [description]
   */
  upgTool.hideLoading = function($container) {
    $container.removeClass('loading');
  }

  /**
   * 设置顶部导航为高亮显示
   * @param {[type]} tab tab属性值
   */
  upgTool.setNavHeader = function(tab) {
    $(".navlist li").removeClass("current");
    $(".navlist li[tab='" + tab + "']").addClass("current");
  }

  /**
   * 刷新分页的form
   * @param  {[type]} $form   分页所在的form
   * @return {[type]}         [description]
   */
  upgTool.refreshForm = function($form) {
    var $pageNav = $(".pageNavContainer[initpagenav='true']", $form);
    if ($pageNav.length) {
      var nowPage = $pageNav.find('.page').attr('nowpage');
      $form.data("nowPage", nowPage);
    }
    $form.submit();
  }

  /**
   * ajax提交，在$.ajax的基础上封装一下，加上防重复提交等
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  upgTool.ajax = function(options) {
    var url = options['url'];
    var type = options['type'] || 'post';
    var data = options['data'] || {};
    var dataType = options['dataType'] || 'json';
    var $submitBtn = options['submitBtn'];
    var beforeSend = options['beforeSend'] || function() {
        if ($submitBtn.length) {
          upgTool.disableButton($submitBtn);
        }
      };
    var complete = options['complete'] || function() {
        if ($submitBtn.length) {
          upgTool.enableButton($submitBtn);
        }
      };
    var success = options['success'] || function(json) {};
    $.ajax({
      type: type,
      dataType: dataType,
      url: url,
      data: data,
      beforeSend: beforeSend,
      success: success.bind(json),
      complete: complete
    });
  };

  /**
   * 禁用Element
   * @param  {[type]} obj Element
   * @return {[type]}     [description]
   */
  upgTool.disableButton = function(obj) {
    $(obj).attr("disabled", "disabled");
    $(obj).addClass("btn-disabled");
  }

  /**
   * 激活Element
   * @param  {[type]} obj Element
   * @return {[type]}     [description]
   */
  upgTool.enableButton = function(obj) {
    $(obj).removeAttr("disabled");
    $(obj).removeClass("btn-disabled");
  }

  /**
   * 关闭弹窗
   * @param  {[type]} obj [description]
   * @return {[type]}     [description]
   */
  upgTool.closeBox = function(obj) {
    var $this = $(obj);
    if ($this.parents('#colorbox').length) {
      $.colorbox.close()
    } else if ($this.parents('#box2').length) {
      $.box2.close()
    } else if ($this.parents('#box3').length) {
      $.box3.close()
    }
  }

  /**
   * 判断某一节点是否在弹窗中
   * @param  {[type]}  obj [description]
   * @return {Boolean}     [description]
   */
  upgTool.isInPopbox = function(obj) {
    var $this = $(obj);
    if ($this.parents('#colorbox').length) {
      return "colorbox"
    } else if ($this.parents('#box2').length) {
      return "box2"
    } else if ($this.parents('#box3').length) {
      return "box3"
    }
    return false;
  }

  /**
   * 截断文字，并在鼠标放上去的时候显示全部
   * @param  {[type]} obj [description]
   * @return {[type]}     [description]
   */
  upgTool.textLength = function(obj) {
    var textObj = $("[textlength]");
    var force = false;
    if (obj) {
      textObj = $("[textlength]", obj);
      if (!textObj.length) {
        textObj = $(obj);
      }
      force = true;
      textObj.removeAttr("original-title");
      textObj.removeAttr("full-text");
    }
    textObj.each(function() {
      var obj = $(this);
      if (!obj.attr("full-text") || force) {
        var textlength = obj.attr("textlength");
        var txt = $.trim(obj.text());
        var tipsy = txt;
        obj.attr("full-text", tipsy);
        if (txt.length > textlength && (upgTool.subStr(txt, textlength) != txt)) {
          txt = upgTool.subStr(txt, textlength) + "...";
          obj.html(txt);
          obj.attr("original-title", tipsy);
          obj.attr("title", tipsy);
          // 重置弹窗
          if (typeof $.colorbox == 'function') {
            $.colorbox.resize();
          }
        }
      }
    });
  }

  /**
   * 根据百分比计算位置
   * @param  {[type]} num [description]
   * @return {[type]}     [description]
   */
  upgTool.percent = function() {
    $("[percent]").each(function() {
      var $this = $(this);
      var num = parseInt($this.attr('percent'), 10);
      var x, y;
      if (!isNaN(num)) {
        x = -47 * num;
        // 设置位置
        $this.css('backgroundPosition', x + "px " + "0px");
      }
      if (num == 100) { // 当进度是100%的时候，文字是白色
        $this.find("a").css("color", "#fff");
      }
    });
  }

  /**
   * 将阿拉伯数字的金额转换成大写的金额
   * @param  {Number} n 阿拉伯数字的金额
   * @return {String}   大写的金额
   */
  upgTool.upperDigit = function(n) {
    var fraction = ['角', '分'];
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);

    var s = '';

    for (var i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);

    for (i = 0; i < unit[0].length && n > 0; i++) {
      var p = '';
      for (var j = 0; j < unit[1].length && n > 0; j++) {
        p = digit[n % 10] + unit[1][j] + p;
        n = Math.floor(n / 10);
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
  }

  /**
   * 浮点数相加
   * @param  {[type]} arg1 [description]
   * @param  {[type]} arg2 [description]
   * @return {[type]}      [description]
   */
  upgTool.dcmAdd = function(arg1, arg2) {
    var r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (upgTool.accMul(arg1, m) + upgTool.accMul(arg2, m)) / m;
  }

  /**
   * 浮点数相减
   * @param  {[type]} arg1 [description]
   * @param  {[type]} arg2 [description]
   * @return {[type]}      [description]
   */
  upgTool.dcmSub = function(arg1, arg2) {
    return upgTool.dcmAdd(arg1, -arg2);
  }

  /**
   * 乘法函数，用来得到精确的乘法结果，javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
   * @param  {[type]} arg1 [description]
   * @param  {[type]} arg2 [description]
   * @return {[type]}      arg1乘以arg2的精确结果
   */
  upgTool.accMul = function(arg1, arg2) {
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length
    } catch (e) {}
    try {
      m += s2.split(".")[1].length
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
  }

  /**
   * 除法函数，用来得到精确的除法结果,javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
   * @param  {[type]} arg1 [description]
   * @param  {[type]} arg2 [description]
   * @return {[type]}      arg1除以arg2的精确结果
   */
  upgTool.accDiv = function(arg1, arg2) {
    var t1 = 0,
      t2 = 0,
      r1, r2;
    try {
      t1 = arg1.toString().split(".")[1].length
    } catch (e) {}
    try {
      t2 = arg2.toString().split(".")[1].length
    } catch (e) {}
    with(Math) {
      r1 = Number(arg1.toString().replace(".", ""))
      r2 = Number(arg2.toString().replace(".", ""))
      return (r1 / r2) * Math.pow(10, t2 - t1);
    }
  }

  /**
   * 浮点数取余数,跟据实际中的案例很容易丧失精度，通常做法是同时扩大10000倍，但考虑
   * 跟前有关因此还是采用先转整数再计算
   * @param  {[type]} arg1 [description]
   * @param  {[type]} arg2 [description]
   * @return {[type]}      [description]
   */
  upgTool.dcmYu = function(arg1, arg2) {
    var r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (upgTool.accMul(arg1, m) % upgTool.accMul(arg2, m)) / m;
  }

  /**
   * 将小数转换为百分数
   * @param  {[type]} datevalue [description]
   * @return {[type]}           [description]
   */
  upgTool.toPercentFormat = function(datevalue) {
    var aa = upgTool.accMul(datevalue, 100);
    return "" + aa + "%";
  }

  /**
   * 根据附件路径判断文件是属于什么类型
   * @param  {String} filepath 附件路径
   * @return {String}          [description]
   */
  upgTool.getDocType = function(filepath) {
    // 各种文件类型的后缀名
    var imgType = 'jpg,gif,png,jpeg';
    var fileType = 'bmp,zip,rar,doc,xls,ppt,docx,xlsx,pptx,pdf,txt,html,htm,wps,et,dps';
    var soundType = 'mp3,wma,flac,aac,mmf,amr,m4a,m4r,ogg,mp2,wav,wv';
    var mediaType = 'ra,wma,mp4,mp3,rm,rmvb,wmv,mov';
    // 把各种文件类型放到对象中
    var typeObj = {
      "img": imgType,
      "file": fileType,
      "sound": soundType,
      "media": mediaType
    }
    // 获取文件的后缀
    var fileSuffix = filepath.slice(filepath.lastIndexOf('.') + 1).toLowerCase();
    var attachType = false;
    for (var type in typeObj) {
      if (typeObj.hasOwnProperty(type) && typeObj[type].indexOf(fileSuffix) !== -1) {
        attachType = type;
        break;
      }
    }
    return attachType;
  }

  /**
   * 修复hover方法，在鼠标不断快速移入移出时的闪动bug
   * @param {String} [options.selector] 需要触发的元素的选择器
   * @param  {Number} [options.enterTimeout = 200] 鼠标移上去经过这一延时后再执行，默认为200
   * @param  {Number} [options.leaveTimeout = 200] 鼠标移开经过这一延时后再执行，默认为200
   * @param {Function} [options.beforeFun = function(){}] 鼠标移动上去，触发enterFun之前的回调，参数为this及setting
   * @param  {Function} [options.enterFun = function(){}] mouseenter的回调函数，参数为this及setting
   * @param  {Function} [options.leaveFun = function(){}] leaveFun的回调函数，参数为this及setting
   * @return null
   * @example
   * upgTool.fixedHover({
      selector: $("#app_other"),
      enterTimeout: 100,
      leaveTimeout: 300,
      enterFun: function(){ 
        var $this = $(this);
        $this.find('a#weixin').addClass('weixinHover');
        $this.find('div.weixinImg').show();
      },
      leaveFun: function(){ 
        var $this = $(this);
        $this.find('a#weixin').removeClass('weixinHover');
        $this.find('div.weixinImg').hide();
      }
    });
   */
  upgTool.fixedHover = function(options) {
    var defaults = {
      enterTimeout: 200,
      leaveTimeout: 200,
      enterBeforeFun: function() {},
      enterFun: function() {},
      leaveBeforeFun: function() {},
      leaveFun: function() {}
    };
    var settings = $.extend(defaults, options || {});
    var enterTimer, leaveTimer;

    if ($.trim(settings.selector)) {
      // 当hover中有定时器时，在某一段时间内适时清掉定时器
      $(settings.selector).live('mouseenter', function() {
        var $this = $(this);
        settings.enterBeforeFun.call($this, settings);
        // 清掉mouseleave时的定时器
        window.clearTimeout(leaveTimer);
        enterTimer = window.setTimeout(function() {
          // 以当前节点为this对象
          settings.enterFun.call($this, settings)
        }, settings.enterTimeout);
      });

      $(settings.selector).live('mouseleave', function() {
        var $this = $(this);
        settings.leaveBeforeFun.call($this, settings);
        // 清掉mouseenter时的定时器
        window.clearTimeout(enterTimer);
        leaveTimer = window.setTimeout(function() {
          // 以当前节点为this对象
          settings.leaveFun.call($this, settings)
        }, settings.leaveTimeout);
      });
    } else {
      try {
        console.error('请传入需触发元素的选择器')
      } catch (e) {
        return false;
      }
    }
  }

  /**
   * Ajax列表数据
   * @param  {[type]} url         预加载数据列表的url
   * @param  {[type]} selector    装载数据列表的容器
   * @param  {[type]} gotop       加载完后是否滚动到顶部，默认是
   * @return {[type]}
   */
  upgTool.URL_FOR_AJAXDATA = window.location.href;
  upgTool.loadAjaxData = function(url, selector, gotop, callback) {
    url = url || upgTool.URL_FOR_AJAXDATA || false;
    selector = selector || '.ajax_datalist';
    gotop = typeof(gotop) == 'undefined' ? true : gotop;
    callback = callback || function() {};

    if (upgTool.isInPopbox($(selector))) { // 默认分页是在弹窗里面，则点击不往上跳
      gotop = false;
    }

    if (!url) {
      return
    }

    $(selector).load(url, {
      ajax: 1,
      rnd: +new Date()
    }, function() {
      upgTool.URL_FOR_AJAXDATA = url;
      if (gotop) {
        $(window).scrollTop(0);
      }
      callback();
    });
  };


  /**
   * 简易模板解析引擎
   * 使用说明：http://i.7leyuan.com/2012/12/18/javascript-template-engine.html
   */
  (function(tpl) {
    function getv(key, data) {
      key = key.split('.');
      var _data = data;
      for (var i = 0; i < key.length; i++) {
        if (typeof _data[key[i]] != 'undefined') {
          _data = _data[key[i]];
        }
      }
      return Object.prototype.toString.call(_data) == '[object Object]' ? false : _data;
    }

    var pip = {
      target: function(str) {
        return str.replace(/<a\s+?href=/g, '<a target="_blank" href=');
      }
    };

    tpl.parse = function(str, data) {
      if (typeof data == 'undefined' || Object.prototype.toString.call(data) != '[object Object]') {
        return str;
      }
      return str.replace(/\{\{(.*?)\}\}/g, function(m, k) {
        var _k = k.split('|');
        k = _k[0];
        var t = _k[1] || null;
        var v = getv(k, data);
        if (t && pip[t]) {
          v = pip[t](v);
        }
        return v ? v : m;
      });
    };
  })(upgTool.tpl = upgTool.tpl || {});

  return upgTool;
})(window, document, undefined);