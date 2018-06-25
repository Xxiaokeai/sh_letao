/**
 * Created by HuangZhi on 2018/6/25.
 */
//表单验证
$(function(){
  //进行表单验证
  $('#form').bootstrapValidator({
    //验证时试用的图标
    feedbackIcons:{
      valid:"glyphicon glyphicon-ok", //验证成功
      invalid:"glyphicon glyphicon-remove",//验证失败
      validating:"glyphicon glyphicon-refresh"
    },
    //校验指定的字段

    fields:{
      //校验用户名 应该对应name表单的name的属性
      username:{
        //配置校验规则

        validators:{

          //如果用户名是空就设置
          notEmpty:{
            message:'用户名不能为空'
          },

          //长度校验
          stringLength:{
            min:2,
            max:6,
          },

          callback:{
            message:"用户名不存在"
          }
        }
      },

      //密码校验
      password:{
        //配置规制
        validators:{

          notEmpty:{
           message:"密码不能为空"
          },
          //长度校验
          stringLength:{
            min:6,
            max:12,
            message:"密码必须要在6到12位之间"
          },
          //定制一个专门回应回调的校验规则
          callback:{
            message:"你的密码错了"
          }
        },
      }
    }
  })
  //提交数据使用submit按钮来进行提交  但是会自动触发duccess.form.bv事件然后就会提交表单 所以我们需要禁止默认
  // 而是使用ajax进行表单的提交
  $('#form').on('success.form.bv',function( e ){
    //先阻止默认的提交
    e.preventDefault();
    //console.log('阻止事件的跳转')
    // 使用ajax提交
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      //使用表单序列化来提交数据
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          //登陆成功就跳转到首页
          location.href='index.html';
        }


        //登录失败
        if(info.error===1000){
          //如果用户名捕存在就 就设置
          //可以获取validator里面的属性
         // updataStatus  下载的状态
        $('#form').data('bootstrapValidator').updateStatus("username","INVALID","callback")
        }

        //密码错误
        if(info.error===1001){
          $('#form').data('bootstrapValidator').updateStatus("password","INVALID","callback")
        }

      },


    })

  })

  //重置表单
  //点击表单 属性选择器
  $('[type="reset"]').click(function(){
    //validator.resetForm() 可以重置表单  不传true就只会重置状态  如果传true就会连里面的内容都会种植掉
    $('#form').data('bootstrapValidator').resetForm();
  })
})