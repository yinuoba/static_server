require([], function(){
  // 鼠标放上去，出现二级导航
  Tool.fixedHover({
      selector: $("#showLifeNav>li[hassub]"),
      enterTimeout: 100,
      leaveTimeout: 300,
      enterFun: function() {
          var $this = $(this);
          var $subNav = $this.find('#subNav');
          $subNav.show();
      },
      leaveFun: function() {
          var $this = $(this);
          var $subNav = $this.find('#subNav');
          $subNav.hide();
      }
  });
});