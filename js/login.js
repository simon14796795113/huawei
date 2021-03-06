$(function(){
	var qr_time=null;
	function qrTimeout(){
		clearTimeout(qr_time);
		qr_time=setTimeout(function(){
			$(".qr-timeout").show();
		},40000)//40秒后二维码失效
	}
	//时间处理程序
	$(".qrimg").mouseenter(function(){
		$(this).animate({left:'20px'});
		$(".qr-help").animate({opacity:'1'})
	});
	$(".qr-img-det").mouseleave(function(){
		$(".qrimg").animate({left:'109px'});
		$(".qr-help").animate({opacity:'0'})
	});
	$(".account").click(function(){
		$(".qr-login").removeClass('mode-sel')
		$(this).addClass('mode-sel')
		$('.useacount').show();
		$('.useqr').hide();
	})
	$(".qr-login").click(function(){
		qrTimeout();
		$(".account").removeClass('mode-sel')
		$(this).addClass('mode-sel')
		$('.useqr').show();
		$('.useacount').hide();
	})	
	$(".close").click(function(){
		$(".login-window").hide();
	});
	$(".login-btn").click(function(){
		$(".login-window").show();
	});
	$(".header-ad-close").click(function(){
		$(".header-ad").slideUp();
	})
	$('.selected').click(function(){
		if(!$(this).attr('issel')){
			$(this).attr('issel',true)
			$(this).css('background-image','url(images/tick-on.png)')
		}else{
			$(this).attr('issel','')
			$(this).css('background-image','url(images/tick-off.png)')
		}
	})
	$('.search-text').focus(function(){
		$(".tips").hide();
	})
	$('.search-text').blur(function(){
		$(".tips").show();
	})
	$(".msg-phone").click(function(){
		$(".usual-way").hide();
		$(".phone-verify").show();
	})
	$(".back").click(function(){
		$(".usual-way").show();
		$(".phone-verify").hide();
	})
	//处理登录二维码
	
	$(".refush,.qr-login").click(function(){
		$(".qr-timeout").hide();
		$(".qr-det img").attr({'src':'https://hwid1.vmall.com/DimensionalCode/getqrWeb?appID=com.huawei.hwidweb&loginChannel=7000700&reqClientType=700&confirmFlag=1&version=13200&_t='+Date.now()})
		qrTimeout();
	})
	function _get(ele,all){
		if(!all){
			return document.querySelector(ele);
		}else{
			return document.querySelectorAll(ele);
		}
	}

	var regAuth=(function(){
		var $submit=_get('.indexlogin');
		var $username=_get('.user');
		var $password=_get('.pwd');

		return {
			init:function(){
				this.check={
					password:function(val){
						var reg=/^\w{6,18}$/;
						return reg.test(val)?1:0;
					},
					phone:function(val){
						var reg=/^1[23456789]\d{9}$/;
						return reg.test(val)?1:0;
					},
					repassword:function(val){
						var ele=document.querySelector('.repassword');
						return ele.value==val?1:0;
					},
					username:function(val){
						var reg=/^\w{4,50}$/;
						return reg.test(val)?1:0;
					},
					email:function(val){
						var reg=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
						return reg.test(val)?1:0;
					},
					isNull:function(val){
						return val==''?1:0;
					}
				};
				this.event();
			},
			event:function(){
				var _this=this;
				$submit.onclick=function(){
					for(var i=0;i<_get('.error',true).length;i++){
						_get('.error',true)[i].style.display="none";
					}
						$username.style.borderColor='#ccc';
						$password.style.borderColor='#ccc';
					var valu=$username.value.trim();
					var valp=$password.value.trim();
					console.log(1);
					if(_this.check.isNull(valu)==1){
						_get('.u-null').style.display="block";
						$username.style.borderColor='rgba(255,51,32,0.5)';
					}else if(_this.check.username(valu)!==1){
						_get('.account-error').style.display="block";
						$username.style.borderColor='rgba(255,51,32,0.5)';

					}else if(_this.check.isNull(valp)==1){
						_get('.p-null').style.display="block";
						$password.style.borderColor='rgba(255,51,32,0.5)';

					}
				}
			}
		}
	}())
	regAuth.init();
})