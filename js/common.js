$(function (){
//重置密码页js
	//手机号输入框验证
	function validMobile($obj){
		var telreg=/^1[3|4|5|7|8]\d{9}$/,
			inputVal=$obj.val(),
			$error=$obj.siblings('.fp_error');

		if(inputVal==''){ 
			$error.find('p').html('手机号不能为空');
			$error.show();

			//keyup
			// $obj.on('keyup',function(){
			// 	if($(this).val()!=""){
			// 		$error.find('p').html('');
			// 		$error.hide();
			// 	}
			// 	$(this).off('keyup');
			// });
			return false;
		}
		if(telreg.test(inputVal)){
			$error.find('p').html('');
			$error.hide();
			return true;
		}else{
			$error.find('p').html('请输入正确的手机号')
			$error.show();
			return false;
		}
	}

	//验证码验证
	function validCode($obj){
		var inputVal=$obj.val(),
			$error=$obj.siblings('.fp_error');

		if(inputVal==''){ 
			$error.find('p').html('验证码不能为空');
			$error.show();			
			return false;
		}else{
			$error.find('p').html('');
			$error.hide();
			return true;
		}
	}

	//密码输入框验证
	function validPWD($obj){
		var pwdreg=/^.{6,20}$/,
			inputVal=$obj.val(),
			$error=$obj.siblings('.fp_error');
		if(inputVal==''){ 
			$error.find('p').html('密码不能为空');
			$error.show();
			return false;
		}
		if(pwdreg.test(inputVal)){
			$error.find('p').html('');
			$error.hide();
			return true;
		}else{
			$error.find('p').html('密码长度为6-20个有效字符');
			$error.show();
			return false;
		}
	}

	//获取验证码
	$('#getCode').off('click').on('click',function(){
		if($(this).hasClass('active')) return;
		if(!validMobile($(".fp_tel input"))) return;
		//倒计时
		$(".fp_tel input").attr('readonly','readonly');
		$(this).addClass('active');
		$(this).html('重新获取(60秒)');
		var count=60;
		var _this=$(this);
		clearInterval(timer);
		var timer=setInterval(function (){
			count--;
			_this.html('重新获取('+count+'秒)');
			if(count==0){
				clearInterval(timer);
				_this.html('重新获取');
				_this.removeClass('active');
				$('.fp_tel input').removeAttr('readonly');
			}
		},1000);

		//发送验证码（后台用）
		$.ajax({
			type:'post',
			url:'http://aaaa.com/index.php',
			data:{mobile:'13999999999','time':(new Date()).getTime()},
			dataType:'json',
			success:function(){

			},
			error:function(){

			}

		});
	});
	// ie浏览器初始化
	$('.fp_input').each(function (){
		$(this).children('input').val('');
		$(this).children('input').blur();
	});
	
	// 验证码输入框清除按钮显示隐藏
	$('.fp_input input').off('keyup').on('keyup',function (){
		if($(this).val()!=''){
			$(this).parent('.fp_input').find('i').show();
			$(this).parent('.fp_input').find('i').off('click').on('click',function (){
				$(this).parent('.fp_input').find('input').val('');
				$(this).hide();
			});
		}else{
			$(this).parent('.fp_input').find('i').hide();
		}
	});

	// 输入框提示语
	$('.fp_input font').off('click').on('click',function (){
		$(this).parent('.fp_input').children('input').focus();
	});
	
	// 输入框颜色改变
	$('.fp_input input').off('focus').on('focus',function (){
		$(this).parent().addClass('active');
		$(this).parent('.fp_input').children('font').hide();
	});
	$('.fp_input input').off('blur').on('blur',function (){
		$(this).parent().removeClass('active');
		if($(this).val()==''){
			$(this).parent('.fp_input').children('font').show();
		}else{
			$(this).parent('.fp_input').children('font').hide();
		}
	});

	// 下一步按钮
	$('.fp_next').off('click').on('click',function (){
		var f1=validMobile($(".fp_tel input"));
		var f2=validCode($(".authCode input"));
		//手机号和验证码
		if(f1 && f2){
			//测试
			$('#fp_yzmbox').hide();
			$('#fp_pwdbox').show();
			//后台接口
			$.ajax({
				type:'post',
				url:'http://aaaa.com/index.php',
				data:{code:'1212121','time':(new Date()).getTime()},
				dataType:'json',
				success:function(data){
					if(data.status==1){//验证通过
						$('#fp_yzmbox').hide();
						$('#fp_pwdbox').show();
					}else if(data.status==2){//验证码不正确

					}
				},
				error:function(){

				}

			});
		}
	})


	// 提交
	$('.fp_submit').off('click').on('click',function (){
		if($(this).hasClass('active')) return;
		var f1=validPWD($('.fp_pwd1 input'));
		var f2=validPWD($('.fp_pwd2 input'));
		if(f1 && f2){
			if($('.fp_pwd1 input').val()===$('.fp_pwd2 input').val()){
				$('.fp_submit').addClass('active');
				$('.fp_submit').text('等待中...');
				$('.fp_pwd1 input,.fp_pwd2 input').attr('readonly','readonly');
				//ceshi
				$('.fp_loading').show();
				
				//后台ajax
				$.ajax({
					type:'post',
					url:'http://aaaa.com/index.php',
					data:{'time':(new Date()).getTime()},
					dataType:'json',
					success:function(){
						// 提交成功提示  
						$('.fp_success').show();
						$('#loading').hide();
					},
					error:function(){

					}

				});

			}else{
				$('.fp_pwd2 .fp_error p').html('密码不一致');
				$('.fp_pwd2 .fp_error').show();
			}
		}
		
	})




	// 登录部分
	$('.login_auto_btn').off('click').on('click',function (){
		$(this).toggleClass('active');
	});

	// 账号登录
	// 账号登录切换至动态码登录
	$('.login_user a').off('click').on('click',function (){
		$('.login_telbox').hide();
		$('.login_zhbox').show();
	});

	// 账号登录确认按钮
	$('.login_confirm').off('click').on('click',function (){
		var f1=validMobile($('.login_name input'));
		var f2=validPWD($('.login_mima input'));
		if(f1 && f2){
			//输入账号和密码后判断是否正确，如果不正确
			// 账号不正确 
			//$('.login_name .fp_error p').html('帐号不正确');
			//$('.login_name .fp_error').show();
			// 密码错误
			//$('.login_mima .fp_error p').html('密码错误');
			//$('.login_mima .fp_error').show();
			// 账号和密码正确
			//$('.login_name .fp_error').hide();
			//$('.login_mima .fp_error').hide();
			$.ajax({
				type:'post',
				url:'http://aaaa.com/index.php',
				data:{'time':(new Date()).getTime()},
				dataType:'json',
				success:function(){

				},
				error:function(){

				}

			});

		}
	});


	// 动态码登录
	// 动态码切换至账号
	$('.login_dtm a').off('click').on('click',function (){
		$('.login_telbox').show();
		$('.login_zhbox').hide();
	})
	// 动态码确认按钮
	$('.login_ok').off('click').on('click',function (){
		var f1=validMobile($('.fp_tel input'));
		var f2=validCode($('.fp_yzm input'));
		if(f1 && f2){
			$.ajax({
				type:'post',
				url:'http://aaaa.com/index.php',
				data:{'time':(new Date()).getTime()},
				dataType:'json',
				success:function(){

				},
				error:function(){

				}

			});
			// 如果手机号和验证码正确
			$('.fp_tel .fp_error p').html('请输入正确的手机号');

		}
	});


	// 注册页面
	// 16816用户协议
	$('.login_auto span').off('click').on('click',function (){
		$('.pop_agree').show();
	});
	// 注册页面的确定按钮
	$('#reg_true').off('click').on('click',function (){
		var f1=validMobile($('.fp_tel input'));
		var f2=validCode($('.fp_yzm input'));
		var f3=validPWD($('.login_mima input'));
		if(f1 && f2 && f3){
			$('.fp_loading').show();
			$.ajax({
				type:'post',
				url:'http://aaaa.com/index.php',
				data:{'time':(new Date()).getTime()},
				dataType:'json',
				success:function(){
					// 注册成功提示
					$('.fp_loading').show();
				},
				error:function(){

				}

			});
			// 


		}
	});

	// 关闭弹出协议
	$('.reg_close').off('click').on('click',function (){
		$('.pop_agree').hide();
	});
	// 弹出层同意按钮
	$('.pop_btn').off('click').on('click',function (){
		$('.login_auto_btn').addClass('active');
		$('.pop_agree').hide();
	});
});
