;(function(){
	/**
	 * 轮播图
	 * @author zeng.xianghu@foxmail.com、https://github.com/yinuoba
	 * @param {[String|Object]} [options.bannerGroup = $('.bannerGroup')] [banner列表]
	 * @param {[String|Object]} [options.dotGroup = $('.dotGroup')] [点列表]
	 * @param {[String|Object]} [options.arrowGroup = $('.arrowGroup')] [箭头列表]
	 * @param {[String]} [options.hoverClass = '.current'] [当前hover状态banner的class]
	 * @param {[String]} [options.hoverDotClass = '.current'] [当前hover状态dot的class]
	 * @param {[Number]} [options.speed = 1000] [轮播的速度]
	 * @param {[Boolean]} [options.auto] [是否自动播放, 默认为是]
	 * @param {[Function]} [options.bannerEnterFun] [鼠标放到banner上后的额外回调函数]
	 * @param {[Function]} [options.bannerLeaveFun] [鼠标放到banner上后的额外回调函数]
	 * @param {[Function]} [options.dotEnterFun] [鼠标放到dot上后的额外回调函数]
	 * @param {[Function]} [options.dotLeaveFun] [鼠标放到dot上后的额外回调函数]
	 */
	function PlayScroll(options){
		var _this = this;
		_this.$bannerGroup = options.bannerGroup ? $(options.bannerGroup) : $('.bannerGroup');
		_this.$dotGroup = options.dotGroup ? $(options.dotGroup) : $('.dotGroup');
		_this.$arrowGroup = options.arrowGroup ? $(options.arrowGroup) : $('.arrowGroup');
		_this.hoverClass = options.hoverClass || 'current';
		_this.hoverDotClass = options.hoverDotClass || 'current';
		_this.speed = options.speed || 5000;
		_this.auto = !!!options.auto;

		_this.bannerEnterFun = options.bannerEnterFun || function(){};
		_this.bannerLeaveFun = options.bannerLeaveFun || function(){};

		_this.dotEnterFun = options.dotEnterFun || function(){};
		_this.dotLeaveFun = options.dotLeaveFun || function(){};

		_this.length = _this.$bannerGroup.length;
		_this.init();
	}

	PlayScroll.prototype = {
		constructor: PlayScroll,
		init: function(){
			var _this = this;

			_this.getChildren();
			_this.bannerEvent();
			_this.dotEvent();
			_this.arrowEvent();

			_this.timer = setInterval(_this.next.bind(_this), _this.speed);
		},
		/**
		 * 根据banner、dot、arrow的父元素去子节点数组，并赋给当前变量
		 * @return {[type]} [description]
		 */
		getChildren: function(){
			var _this = this;
			if(_this.$bannerGroup.length){
				_this.$bannerGroup = $(_this.$bannerGroup.children());
			} else {
				_this.console("请传入banner的父节点");
			}
			if(_this.$dotGroup.length){
				_this.$dotGroup = $(_this.$dotGroup.children());
			} else {
				_this.console("请传入dot的父节点");
			}
			if(_this.$arrowGroup.length){
				_this.$arrowGroup = $(_this.$arrowGroup.children());
			} else {
				_this.console("请传入arrow的父节点");
			}
		},
		/**
		 * 给banner添加事件
		 * @return {[type]} [description]
		 */
		bannerEvent: function(){
			var _this = this;
			var $bannerGroup = _this.$bannerGroup;
			var $bannerParent = $bannerGroup.parent().parent();
			if($bannerGroup.length){
				// 鼠标放到banner上 暂停
				$bannerParent.on('mouseover', function(){
					_this.pause();
					_this.bannerEnterFun(_this);
				});
				$bannerParent.on('mouseout', function(){
					_this.keepOn();
					_this.bannerLeaveFun(_this);
				});
			}
		},
		/**
		 * 给那几个点添加事件
		 * @return {[type]} [description]
		 */
		dotEvent: function(){
			var _this = this;
			var $dotGroup = _this.$dotGroup;
			// 鼠标放到那几个点上
			if($dotGroup.length){
				$dotGroup.on('mouseover', function(){
					var $this = $(this);
					var index = $dotGroup.index($this);
					_this.go(index);
				});
			}
		},
		/**
		 * 给箭头添加事件
		 * @return {[type]} [description]
		 */
		arrowEvent: function(){
			var _this = this;
			var $arrowGroup = _this.$arrowGroup;
			// 方向箭头
			if($arrowGroup.length){
				$arrowGroup.on('click', function(){
					var $this = $(this);
					// 方向
					var arrow = $this.attr('arrow');
					if(arrow == 'prev'){	// 上一张
						_this.prev();
					} else {	// 下一张
						_this.next();
					}
				});
			}
		},
		/**
		 * 下一张
		 * @return {Function} [description]
		 */
		next: function(){
			var _this = this;
			var index = _this.curBannerIndex();
			var nextIndex = _this.getNextIndex(index);

			var $current = _this.$bannerGroup.eq(index);
			var $next = _this.$bannerGroup.eq(nextIndex);

			// 让上一个隐藏， 下一个出来
			_this.doPlay($current, $next, 'next');
		},
		/**
		 * 上一张
		 * @return {[type]} [description]
		 */
		prev: function(){
			var _this = this;
			var index = _this.curBannerIndex();
			var prevIndex = _this.getPrevIndex(index);

			var $current = _this.$bannerGroup.eq(index);
			var $prev = _this.$bannerGroup.eq(prevIndex);

			// 让上一个隐藏， 下一个出来
			_this.doPlay($current, $prev, 'prev');
		},
		/**
		 * 到指定的要素上
		 * @return {[type]} [description]
		 */
		go: function(goIndex){
			var _this = this;
			var $dotGroup = _this.$dotGroup;
			var $bannerGroup = _this.$bannerGroup;
			var currentIndex = _this.curBannerIndex();
			var $current = $bannerGroup.eq(currentIndex);
			if(currentIndex == goIndex){
				return false;
			}

			$current.fadeOut(400).removeClass(_this.hoverClass);
			$bannerGroup.eq(goIndex).fadeIn(400).addClass(_this.hoverClass);

			$dotGroup.eq(goIndex).addClass(_this.hoverDotClass).siblings().removeClass(_this.hoverDotClass);
		},
		/**
		 * 处理要素的隐藏和显示
		 * @param  {[type]} $cur  [description]
		 * @param  {[type]} $next [description]
		 * @param  {[type]} arrow [description]
		 * @return {[type]}       [description]
		 */
		doPlay: function($cur, $next, arrow){
			var _this = this;
			var currentIndex = _this.curDotIndex();

			$cur.fadeOut(400).removeClass(_this.hoverClass);
			$next.fadeIn(400).addClass(_this.hoverClass);

			_this.toggleDot(arrow, currentIndex);
		},
		/**
		 * 切换那个点
		 * @param  {[type]} arrow [description]
		 * @return {[type]}       [description]
		 */
		toggleDot: function(arrow, currentIndex){
			var _this = this;
			var $dotGroup = _this.$dotGroup;
			var nextIndex;
			if(arrow == 'next'){
				nextIndex = _this.getNextIndex(currentIndex);
			} else if(arrow == 'prev'){
				nextIndex = _this.getPrevIndex(currentIndex);
			}
			$dotGroup.eq(nextIndex).addClass(_this.hoverDotClass).siblings().removeClass(_this.hoverDotClass);
		},
		/**
		 * 暂停
		 * @return {[type]} [description]
		 */
		pause: function(){
			var _this = this;
			clearInterval(this.timer);
            this.auto = false;
		},
		/**
		 * 继续
		 * @return {[type]} [description]
		 */
		keepOn: function(){
			var _this = this;
			clearInterval(_this.timer);
            _this.auto = true;
            _this.timer = setInterval(_this.next.bind(_this), _this.speed);
		},
		/**
		 * 上一个要素的index
		 * @return {[type]} [description]
		 */
		getPrevIndex: function(currentIndex){
			var _this = this;
			var prevIndex;

			if(currentIndex > 0){
				prevIndex = currentIndex - 1
			} else {
				prevIndex = _this.$bannerGroup.length - 1;
			}

			return prevIndex;
		},
		/**
		 * 下一个要素的index
		 * @return {[type]} [description]
		 */
		getNextIndex: function(currentIndex){
			var _this = this;
			var nextIndex;
			if(currentIndex < _this.$bannerGroup.length - 1){
				nextIndex = currentIndex + 1
			} else {
				nextIndex = 0;
			}
			return nextIndex;
		},
		/**
		 * 当前正在播放第几个banner
		 * @return {[type]} [description]
		 */
		curBannerIndex: function(){
			var _this = this;
			var current = 0;
			var currentSelector = '.' + _this.hoverClass;
			var $hover = _this.$bannerGroup.filter(currentSelector);

			if($hover.length){	// 没有找到高亮的，则默认第一个
				current = _this.$bannerGroup.index($(currentSelector));
			}

			return current;
		},
		/**
		 * 当前正在播放第几个dot
		 * @return {[type]} [description]
		 */
		curDotIndex: function(){
			var _this = this;
			var current = 0;
			var currentSelector = '.' + _this.hoverDotClass;
			var $hover = _this.$dotGroup.filter(currentSelector);

			if($hover.length){	// 没有找到高亮的，则默认第一个
				current = _this.$bannerGroup.index($(currentSelector));
			}

			return current;
		},
		console: function(msg){	// 输出错误信息到错误控制台
			var _this = this;
			if(window.console && _this.debug){
				console.error(msg);
			}
		}
	}

	window['PlayScroll'] = $.PlayScroll = PlayScroll;
}());