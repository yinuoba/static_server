/**
 * 封装一些通用方法
 * @param  {[type]} window     [description]
 * @param  {[type]} document   [description]
 * @param  {[type]} undefined
 * @return {[type]}            [description]
 */
var Tool = (function(window, document, undefined) {
    var Tool = {};
    /**
     * 取出页面中最大的zindex
     * @return {[type]} [description]
     */
    Tool.getHighestZIndex = function() {
        var index_highest = 1;
        $("*").each(function() {
            var index_current = parseInt($(this).css("zIndex"), 10);
            if (index_current > index_highest && index_current < 999) {
                index_highest = index_current;
            }
        });
        return index_highest;
    };
    /**
     * @description 获取url上的参数，并将其封装在对象里面
     * @param {String} [url = window.location.href] 默认是当前窗口url
     * @return {Object} 参数对象
     * @example Tool.getParams(url)
     */
    Tool.getParams = function(url) {
        var url = url || window.location.href;
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
    Tool.mix = function() {
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
    Tool.subStr = function(str, len) {
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
     * 在一个容器中显示转圈圈
     * @param  {[type]} $container [description]
     * @return {[type]}            [description]
     */
    Tool.showLoading = function($container) {
        $container.empty().addClass('loading');
    }
    /**
     * 隐藏容器中的圈圈
     * @param  {[type]} $container [description]
     * @return {[type]}            [description]
     */
    Tool.hideLoading = function($container) {
        $container.removeClass('loading');
    }
    /**
     * ajax提交，在$.ajax的基础上封装一下，加上防重复提交等
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    Tool.ajax = function(options) {
        var url = options['url'];
        var type = options['type'] || 'post';
        var data = options['data'] || {};
        var dataType = options['dataType'] || 'json';
        var $submitBtn = options['submitBtn'];
        var beforeSend = options['beforeSend'] || function() {
            if ($submitBtn.length) {
                Tool.disableButton($submitBtn);
            }
        };
        var complete = options['complete'] || function() {
            if ($submitBtn.length) {
                Tool.enableButton($this);
            }
        };
        var success = options['success'] || function() {};
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
    Tool.disableButton = function(obj) {
        $(obj).attr("disabled", "disabled");
        $(obj).addClass("btn-disabled");
    }
    /**
     * 激活Element
     * @param  {[type]} obj Element
     * @return {[type]}     [description]
     */
    Tool.enableButton = function(obj) {
        $(obj).removeAttr("disabled");
        $(obj).removeClass("btn-disabled");
    }
    /**
     * 禁用form
     * @param  {[type]} $form [description]
     * @return {[type]}       [description]
     */
    Tool.disabledForm = function($form) {
        var $inputs = $('input,textarea,select', $form).not('input[type="hidden"]');
        $inputs.addClass('input_disable');
        $inputs.each(function() {
            var $this = $(this);
            var inputVal = $this.val();
            if ($this.is('textarea')) {
                $this.prop('readonly', true);
            } else {
                $this.prop('disabled', true);
            }
            $this.attr('title', inputVal);
            $this.css({
                "background-color": "#F0F0F0",
                "color": "#6D6D6D"
            });
        });
    }
    /**
     * 启用form
     * @param  {[type]} $form [description]
     * @return {[type]}       [description]
     */
    Tool.enabledForm = function($form) {
        var $inputs = $('input,textarea,select', $form).not('input[type="hidden"]');
        $inputs.removeClass('input_disable');
        $inputs.each(function() {
            var $this = $(this);
            var inputVal = $this.val();
            if ($this.is('textarea')) {
                $this.removeAttr('readonly');
            } else {
                $this.removeAttr('disabled');
            }
            $this.attr('title', inputVal);
            $this.css({
                "background-color": "#F0F0F0",
                "color": "#6D6D6D"
            });
        });
    }
    /**
     * 截断文字，并在鼠标放上去的时候显示全部
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    Tool.textLength = function(obj) {
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
                if (txt.length > textlength && (Tool.subStr(txt, textlength) != txt)) {
                    txt = Tool.subStr(txt, textlength) + "...";
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
     * 让节点居中
     * @param {[type]} $obj 需要在窗口中间的节点
     */
    Tool.setCenter = function($obj) {
        $obj = $($obj).show();
        var top = $(window).scrollTop() + $(window).height() / 2;
        var width = $obj.width();
        var height = $obj.height();
        var zIndex = Tool.getHighestZIndex();
        $obj.css({
            "position": "absolute",
            "left": '50%',
            "top": top + 'px',
            'marginLeft': '-' + width / 2 + 'px',
            'marginTop': '-' + height / 2 + 'px',
            'zIndex': zIndex
        });
    }
    /**
     * 将阿拉伯数字的金额转换成大写的金额
     * @param  {Number} n 阿拉伯数字的金额
     * @return {String}   大写的金额
     */
    Tool.upperDigit = function(n) {
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
        for (var i = 0; i < unit[0].length && n > 0; i++) {
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
    Tool.dcmAdd = function(arg1, arg2) {
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
        return (Tool.accMul(arg1, m) + Tool.accMul(arg2, m)) / m;
    }
    /**
     * 浮点数相减
     * @param  {[type]} arg1 [description]
     * @param  {[type]} arg2 [description]
     * @return {[type]}      [description]
     */
    Tool.dcmSub = function(arg1, arg2) {
        return Tool.dcmAdd(arg1, -arg2);
    }
    /**
     * 乘法函数，用来得到精确的乘法结果，javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
     * @param  {[type]} arg1 [description]
     * @param  {[type]} arg2 [description]
     * @return {[type]}      arg1乘以arg2的精确结果
     */
    Tool.accMul = function(arg1, arg2) {
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
    Tool.accDiv = function(arg1, arg2) {
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
            return (r1 / r2) * pow(10, t2 - t1);
        }
    }
    /**
     * 浮点数取余数,跟据实际中的案例很容易丧失精度，通常做法是同时扩大10000倍，但考虑
     * 跟前有关因此还是采用先转整数再计算
     * @param  {[type]} arg1 [description]
     * @param  {[type]} arg2 [description]
     * @return {[type]}      [description]
     */
    Tool.dcmYu = function(arg1, arg2) {
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
        return (Tool.accMul(arg1, m) % Tool.accMul(arg2, m)) / m;
    }
    /**
     * 将小数转换为百分数
     * @param  {[type]} datevalue [description]
     * @return {[type]}           [description]
     */
    Tool.toPercentFormat = function(datevalue) {
        var aa = Tool.accMul(datevalue, 100);
        return "" + aa + "%";
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
   * Tool.fixedHover({
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
    Tool.fixedHover = function(options) {
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
            $(settings.selector).on('mouseenter', function() {
                var $this = $(this);
                settings.enterBeforeFun.call($this, settings);
                // 清掉mouseleave时的定时器
                window.clearTimeout(leaveTimer);
                enterTimer = window.setTimeout(function() {
                    // 以当前节点为this对象
                    settings.enterFun.call($this, settings)
                }, settings.enterTimeout);
            });
            $(settings.selector).on('mouseleave', function() {
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
     * 时间处理入口
     * @type {Object}
     */
    Tool.eventBroker = {
        //执行事件
        eventExec: function(ev, origin, eventGroup) {
            var e = Tool.eventBroker.eventAnalysis(origin);
            var args = [ev].concat(e.args);
            if (typeof eventGroup[e.groupName] === 'function') {
                eventGroup[e.groupName].apply(this, args);
                return;
            }
            eventGroup[e.groupName][e.eventFn].apply(this, args);
        },
        throwEvent: function(ev, eventGroup) {
            var $this = $(this);
            //事件类型
            var eventMap = {
                click: 'event-click',
                focusin: 'event-focus',
                focusout: 'event-blur',
                change: 'event-change',
                mouseover: 'event-mouseover',
                mouseout: 'event-mouseout'
            };
            if (!eventGroup) return false;
            var _fn = $this.attr(eventMap[ev.type]);
            var _args = $this.attr('data-args');
            Tool.eventBroker.eventExec.call(this, ev, {
                event: _fn,
                args: _args
            }, eventGroup);
        },
        //事件代理解析, 支持以命名空间形式定义的事件名称
        eventAnalysis: function(origin) {
            var _events = origin.event.split('.');
            var _eventFn = _events[1]; //获取事件处理句柄
            var _eventGroup = _events[0]; //获取事件分组类型
            var _args = origin.args; //事件参数
            _args = (_args && _args.split(',')) || []; //获取事件参数
            return {
                groupName: _eventGroup,
                eventFn: _eventFn,
                args: _args
            };
        },
        /**
         * 初始化：分发页面事件
         * @param eventGroup 业务逻辑对象
         */
        eventInit: function(eventGroup) {
            var _self = this;
            $(document).on('click', '[event-click]', eventHandle).on('focus', '[event-focus]', eventHandle).on('blur', '[event-blur]', eventHandle).on('change', '[event-change]', eventHandle).on('mouseover', '[event-mouseover]', eventHandle).on('mouseout', '[event-mouseout]', eventHandle);

            function eventHandle(e) {
                _self.throwEvent.call(this, e, eventGroup);
                e.stopPropagation && e.stopPropagation();
                e.cancelBubble && (e.cancelBubble = true);
            }
        }
    };
    return Tool;
})(window, document, undefined);

// RequireJS && SeaJS
if (typeof define === 'function') {
    define(function() {
        return Tool;
    });

// NodeJS
} else if (typeof exports !== 'undefined') {
    module.exports = Tool;
} else {
    this.Tool = Tool;
}