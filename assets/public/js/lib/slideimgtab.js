;(function() {
    /**
     * @description slideimagetab 可滑动图片tab，并且tab的内容显示在同一个div容器中
     * @param {Object} options 参数对象
     *
     * @param {String} options.tabList tab项的选择器，用户找出tab节点数组。
     *
     * @param {String} options.upPic 点击即往上滑动的节点的id选择器
     * @param {String} options.downPic 点击即往下滑动的节点的id选择器
     *
     * @param {String} options.upNormalClass upPic节点正常情况下的class样式
     * @param {String} options.upHoverClass upPic节点高亮情况下的class样式
     * @param {String} options.downNormalClass upPic节点正常情况下的class样式
     * @param {String} options.downHoverClass upPic节点高亮情况下的class样式
     *
     * @param {Number} [options.showNum=4] 展现出来的图片数量，默认为4
     * @param {Number} [options.moveNum=1] 一次性滑动的数量，默认为1
     */
    var slideImgTab = function(options) {
        var _this = this;
        _this.$tabList = $(options.tabList);
        _this.size = _this.$tabList.length;
        _this.$upPic = $(options.upPic);
        _this.$downPic = $(options.downPic);
        _this.upNormalClass = options.upNormalClass || '';
        _this.upHoverClass = options.upHoverClass || '';
        _this.downNormalClass = options.downNormalClass || '';
        _this.downHoverClass = options.downHoverClass || '';
        _this.showNum = options.showNum || 4;
        _this.moveNum = options.moveNum > _this.showNum ? _this.showNum : options.moveNum || 1;
        _this.init();
    };
    slideImgTab.prototype = {
        constructor: slideImgTab,
        init: function() {
            var _this = this;
            // 初始化tab，该现实的显示，该隐藏的隐藏
            _this.loadTab();
        },
        loadTab: function() { // 初次载入tab
            var _this = this;
            //默认第一次加载隐藏左边箭头
            _this.$upPic.addClass(_this.upNormalClass);
            // 顺序遍历tab，跟tab添加点击事件，并根据tab的数量设置相关节点的状态
            _this.$tabList.each(function(i) {
                var $obj = $(this);
                //超出showNum部分隐藏 
                if (i + 1 > _this.showNum) {
                    _this.$downPic.addClass(_this.downHoverClass);
                    //超过i张就隐藏
                    $obj.hide();
                } else {
                    //显示个数的范围内张内就显示
                    $obj.show();
                }
            });
            if (_this.size <= _this.showNum) { //当少于4张图是则不显示下箭头
                // _this.$downPic.addClass(_this.downNormalClass);
                _this.$upPic.hide();
                _this.$downPic.hide();
            }
            if (_this.size > _this.showNum) { // 图片数量超过showNum
                _this.$upPic.click(function(e) { // 点击向左箭头
                    var $this = $(this);
                    if ($this.hasClass(_this.upHoverClass)) {
                        _this.clickFun('up');
                    }
                    return false;
                });
                _this.$downPic.click(function(e) { // 点击向右箭头
                    var $this = $(this);
                    if ($this.hasClass(_this.downHoverClass)) {
                        _this.clickFun('down');
                    }
                    return false;
                });
            }
        },
        clickFun: function(directions) { // 滚动到上一张或下一张
            var _this = this;
            var $showPics = _this.$tabList.filter(':visible');
            var showPics = _this.toArray($showPics);
            // 如果是点击向下
            if (directions === 'down') {
                // 算出showPics的最后一项是位于tabList的什么位置
                var indexList = _this.$tabList.index(showPics[_this.showNum - 1]);
                // 如果indexList后剩余的项数少于moveNum，则隐藏showPics的第前moveNum项，显示tabList数组后moveNum项            
                if (indexList + 1 < _this.size) {
                    // 如果indexList+1项是最后一项，则将向下箭头置为normal状态
                    if (indexList + _this.moveNum >= _this.size - 1) {
                        _this.$downPic.addClass(_this.downNormalClass);
                        _this.$downPic.removeClass(_this.downHoverClass);
                    }
                    // 找出需隐藏掉的tab数组
                    var $hideDownArr = $(showPics.splice(0, _this.moveNum));
                    // 找出需显示的tab数组
                    var $showDownArr = _this.$tabList.slice(indexList + 1, indexList + 1 + _this.moveNum);
                    // 隐藏当前显示的前moveNum项，显示indexList后的moveNum项
                    $hideDownArr.hide();
                    $showDownArr.show();
                    // 让向上的箭头高亮
                    _this.$upPic.addClass(_this.upHoverClass);
                }
            }
            // 如果是点击向上
            if (directions === 'up') {
                // showPics中的第一项在tabList中的位置
                var indexList = _this.$tabList.index(showPics[0]);
                // 如果showPics中的第一项不是tabList中的第一项
                // 则显示indexList的前moveNum项,隐藏indexList的后moveNum项
                if (indexList > 0) {
                    var $showUpArr = indexList + 1 <= _this.moveNum ? _this.$tabList.slice(0, _this.moveNum + 1) : _this.$tabList.slice(indexList - _this.moveNum, indexList + 1);
                    var $hideUpArr = $(showPics.splice(_this.showNum - _this.moveNum, _this.moveNum));
                    $showUpArr.show();
                    $hideUpArr.hide();
                    // 让向上的箭头高亮
                    _this.$downPic.addClass(_this.downHoverClass);
                    // 假如再往前一项是tabList中的第一项，则向上滑动变灰
                    if (indexList - _this.moveNum <= 0) {
                        _this.$upPic.addClass(_this.upNormalClass);
                        _this.$upPic.removeClass(_this.upHoverClass);
                    }
                }
            }
            // 将showPics销毁
            showPics = null;
        },
        toArray: function($obj) {
            var arr = [];
            $obj.each(function() {
                arr.push(this);
            });
            return arr;
        }
    }
    window['slideImgTab'] = $.slideImgTab = slideImgTab;
}());