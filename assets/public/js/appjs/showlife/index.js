/**
 * 首页应用js
 * @return {[type]} [description]
 */
require([], function() {
  // 首页轮播图
  var playScroll = new PlayScroll({
    bannerEnterFun: function(_this) {
      $('.arrowGroup').show();
    },
    bannerLeaveFun: function(_this) {
      $('.arrowGroup').hide();
    },
    dotEnterFun: this.bannerEnterFun,
    dotLeaveFun: this.bannerLeaveFun
  });

  // 成功案例左箭头e
  $('.prevCase').hover(function() {
    $(this).addClass('prevHover');
  }, function() {
    $(this).removeClass('prevHover');
  });

  // 成功案例右箭头
  $('.nextCase').hover(function() {
    $(this).addClass('nextHover');
  }, function() {
    $(this).removeClass('nextHover');
  });

  // 在线客服
  var $pannelMain = $('#pannelMain');
  $('#pannelLeft').on('click', function() {
    var $this = $(this);
    $pannelMain.animate({
      width: 'toggle'
    }, 400);
  });

  // 滚动案例
  var imgTab = new slideImgTab({
    tabList: $('ul#slideImgWrap>li'),
    upPic: $('#btn_prev'),
    downPic: $('#btn_next'),
    upNormalClass: "prevCase",
    upHoverClass: "prevHover",
    downNormalClass: "nextCase",
    downHoverClass: "nextHover",
    showNum: 4,
    moveNum: 1
  });

  // 服务介绍 鼠标效果
  $('ul#serviceBlocks>li').hover(function() {
    var $this = $(this);
    $this.addClass('hover');
  }, function() {
    var $this = $(this);
    $this.addClass('hover');
  });
});