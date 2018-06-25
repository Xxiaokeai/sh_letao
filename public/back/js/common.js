/**
 * Created by HuangZhi on 2018/6/25.
 */

//判断用户是否有登录过 如果没有登录就拦截到登录页面
 if(location.href.indexOf('login.html')===-1){
   //试用ajax获取用户的数据
   $.ajax({
     type:"get",
     url:"/employee/checkRootLogin",
     dataType:"json",
     success:function(info){
       if(info.error===400){
         //用户没有登录
         location.href="login.html"
       }
       if(info.success){
          console.log('已经登录过了')
       }
     }
   })
 }





//右边菜单显示隐藏
$(function(){

  $('.lt_topbar .icon_menu').click(function() {
    $('.it_asdie').toggleClass('hidemenu');
    $('.it_main').toggleClass('hidemenu');
    $('.lt_topbar').toggleClass('hidemenu');

  });


  //ul 菜单
   $('.it_asdie .category').click(function() {
    $('.it_asdie .child').stop().slideToggle();
  });

  //模态框
  $('.lt_topbar .icon_logout').click(function() {
    // 显示模态框
    $('#logoutModal').modal("show");
  });

  //当点击莫泰框时退出登录
  $('#logoutBtn').click(function(){
    $.ajax({
      type:'get',
      url:"/employee/employeeLogout",
      dataType:"json",
      success:function(info){

         if(info.success){
           //登录成功
           location.href="login.html"
         }
      }
    })
  })

})