var m_domain_ssl  = "https://" + location.hostname + (location.port == "" ? "" : ":" + location.port);
var m_domain_http = "https://" + location.hostname + (location.port == "" ? "" : ":" + location.port);

var m_strTargetUrl      = "";
var m_jsonRewardSummary = null;
var m_nInboxNoCnt       = null;
var m_formulaCode       = "W";


$(document).ready(function () {
	$("input:password").attr("autocomplete", "off");
	
	$.commonLib.init();
	$.loginLib.init();
	
	$('#tablet_gnb01').hide();
	$('#sub_gnb_wrap').hide();
	$('#rCup1').hide();
	$('#rCup2').hide();
	$('#rCup3').hide();
});


$.commonLib = {
	 init : function () {
		var $loadingDim  = $('<div class="loading_dimm" style="display:none; z-index:20000;"></div>');
		var $loadingLogo = $('<div class="loading_img" style="display:none; z-index:20001;"></div>');
		
		if ($(".loading_img").length == 0) {
			$("body").prepend($loadingLogo);
		}
		
		if ($(".loading_dimm").length == 0) {
			$("body").prepend($loadingDim);
		}
		 
		$('a[required="loading"]').on("click", $.commonLib.showLoadingImg);
	}

	,isLoading : false
	
	,showLoadingImg : function () {
		$.commonLib.isLoading = true;
		
		$('.loading_img').jsMovie({
			 sequence    : 'loading##.png'
			,from        : 1
			,to          : 25
			,folder      : '//image.istarbucks.co.kr/common/img/common/loading/'
			,height      : 76
			,width       : 70
			,playOnLoad  : true
			,performStop : true
			,repeat      : true
		});
		
		$(".loading_dimm").fadeIn();
		$(".loading_img").fadeIn();
	}
	,hideLoadingImg : function () {
		if ($.commonLib.isLoading) {
			$.commonLib.isLoading = false;
			$(".loading_img").fadeOut();
			$(".loading_dimm").fadeOut();
		}
	}
	,toggleLoadingImg : function () {
		if ($.commonLib.isLoading) {
			$.commonLib.hideLoadingImg();
		} else {
			$.commonLib.showLoadingImg();
		}
	}
};


$.loginLib = {
	 init : function () {
		this.checkFormulaCode();
		this.setGnbSignInOut();
		this.setEvents();
	}

	,setEvents : function () {
		$('.util_nav ul li.util_nav01').unbind("click");
		
		/*$('.util_nav .sign_in a').on("click", this.showLayerLogin);*/
		$('.util_nav .sign_in a').on("click", function () {
			location.href = m_domain_ssl + "/login/login.do";
		});
		
		$('.util_nav .sign_out a').on("click", this.logout);

		/*
		$('.login_layer header .login_layer_close').on("click", function(){
			$('.login_layer_dimm, .login_layer').fadeOut();
			m_strTargetUrl = "";
		});
		*/
		
		// ????????? ?????? ????????? ?????? ??????
		$('a[required="login"]').each(function () {
			var $a   = $(this);
			var href = $a.attr("href");
			
			$a.attr("href", "javascript:void(0);");
			$a.attr("data-href", href);
		});
		
		/*
		$("#txt_user_pwd, #captcha").on("keyup", function (_e) {
			if (_e.keyCode == 13) {
				$.loginLib.login();
			}
		});
		*/
		
		$('a[required="login"]').on("click", function () {
			var strHref = $(this).data("href");
			
			__ajaxCall("/interface/checkLogin.do", {}, true, "json", "post"
				,function (_response) {
					if (_response.result_code == "SUCCESS") {
						location.href = strHref;
					} else {
						/*
						$.loginLib.showLayerLogin();
						m_strTargetUrl = strHref;
						*/
						if(strHref.indexOf("javascript:void") > -1 || strHref.indexOf("javascript%3Avoid") > -1) {
							location.href = "/login/login.do";
						} else {
							location.href = "/login/login.do?redirect_url=" + encodeURIComponent(strHref);
						}
					}
				}
				,function (_error) {
				}
			);
		});		
		
		/*
		$(".login_info_input_wrap .btn_login").on("click", this.login);
		
		// captcha ????????????
		$(".btn_new_captcha").on("click", function () {
			$("p.captcha_img > img").attr("src", "/mem/captcha.do");
		});
		*/
	}
	
	,showLayerLogin : function () {
		/*
		$.loginLib.getCookieSaveId();
		$.loginLib.setCaptcha();
		
		// ?????????????????? GNB??? ?????? ?????? ??????, ????????? ??? ?????? ?????? GNB??? ?????? ?????????.
		if ($('#wrap').css("position") == "relative") {
			$('#wrap').css({
				'position':'initial'
			});
			$('#wrap').animate({
				'left':'0'
			});
			$('.mob_gnb_dimm').hide();
			$('.mob_gnb_wrap').animate({
				'right':'-100%'
			});
		}
		
		var ww = $(window).scrollTop() + 500;
		$(".login_layer").css('top', ww + "px");
		$('.login_layer_dimm, .login_layer').fadeIn();
			
		if ($("#txt_user_id").val() == "") {
			$("#txt_user_id").focus();	
		} else {
			$("#txt_user_pwd").focus();
		}
		*/
		if(location.href.indexOf("javascript:void") > -1 || location.href.indexOf("javascript%3Avoid") > -1) {
			location.href = "/login/login.do";
		} else {
			location.href = "/login/login.do?redirect_url=" + encodeURIComponent(location.href);
		}
	}
	
	,setGnbSignInOut : function () {
		__ajaxCall("/interface/checkLogin.do", {}, true, "json", "post"
			,function (_response) {
				if (_response.result_code == "SUCCESS") {
					$(".top_msr_wrap").show();
					$(".top_msr_nologin").hide();
					$(".sign_out").show();
					$(".sign_in").hide();
					$(".footer_util_btn .last").hide();	//[150826 ??????] ????????? Join Us ?????? ??????
					
					// MSR ?????? ??????
//					$.loginLib.getMsrRewardSummary();
//					$.loginLib.showInboxNoCnt();
				} else {
					$(".top_msr_wrap").hide();
					$(".top_msr_nologin").show();
				}
			}
			,function (_error) {
			}
		);
	}
	
	/*
	,setCaptcha : function () {
		__ajaxCall("/interface/getLoginHistoryCnt.do", {}, true, "json", "post"
			,function (_response) {
				if (_response.result_code == "SUCCESS") {
					var nLoginHistoryCnt = Number(_response.data);

					if (nLoginHistoryCnt >= 5) {
						$("p.captcha_img > img").attr("src", "/mem/captcha.do");
						
						$("p.reg_chg_pw_warn, p.captcha_guide, fieldset.captcha_field").show();
					}
				}
			}
			,function (_error) {
			}
		);
	}
	
	,getCookieSaveId : function (_fnSuccess) {
		__ajaxCall("/interface/getCookieSaveId.do", {}, true, "json", "post"
			,function (_response) {
				if (_response.result_code == "SUCCESS") {
					$("#txt_user_id").val(_response.data);
					$("#idRemb").prop("checked", true);
				}
			}
			,function (_error) {
			}
		);
	}
	
	,login : function () {
		var user_id  = $("#txt_user_id").val();
		var user_pwd = $("#txt_user_pwd").val();
		
		if (user_id == "")  { alert("???????????? ???????????????.");   $("#txt_user_id").focus();  return; }
		if (user_pwd == "") { alert("??????????????? ???????????????."); $("#txt_user_pwd").focus(); return; }
		
		$("#frmLogin").submit();
	}
	*/
	
	,logout : function () {
		__ajaxCall("/interface/logoutMember.do", {}, true, "json", "post"
			,function (_response) {
				if (_response.alert_msg != "") {
					alert(_response.alert_msg);
				}
				
				if (_response.result_code == "SUCCESS") {
					location.replace("/");
				}
			}
			,function (_error) {
			}
		);
	}
	
	,getMsrRewardSummary : function () {
		//if (m_jsonRewardSummary == null) {
			__ajaxCall("/interface/getMsrRewardSummary.do", {}, true, "json", "post"
				,function (_response) {
					if (_response.result_code == "SUCCESS") {
						m_jsonRewardSummary = jQuery.parseJSON(_response.data);
						
						var $divTopMSR    = $("#top_MSR");
						var $divCenterMSR = $(".line_msr");
						
						// ??????
						$divTopMSR.find(".user_greet_txt strong").text(m_jsonRewardSummary.userName);
						
						if (m_jsonRewardSummary.msrMemberYn == "N"
								|| m_jsonRewardSummary.cardInfo.cardThumnbnailImgUrl == ""
								|| m_jsonRewardSummary.cardInfo.balance == "") {
							$(".user_level").hide();
							$(".msr_lead").show();
							$(".msr_card_info , .msr_card_zone").hide();
							$(".sb_card_regi").show();
						} else {
							$(".user_level").show();
							$(".msr_lead").hide();
							$(".msr_card_info, .msr_card_zone").show();
							$(".sb_card_regi").hide();
							
							// [150915 ??????] ????????? ?????? ?????????
							if (myWindow <= 640) {
								$(".mycard_area1 , .mycard_one").show();
							}
							
							// ???????????? ?????????
							$divTopMSR.find(".msr_card_area > img").attr("src", m_jsonRewardSummary.cardInfo.cardThumnbnailImgUrl);
							$divTopMSR.find(".mycard_area1 > img").attr("src", m_jsonRewardSummary.cardInfo.cardImgUrl);
							$divCenterMSR.find(".msr_card_area > img").attr("src", m_jsonRewardSummary.cardInfo.cardThumnbnailImgUrl);
							$divCenterMSR.find(".mycard_area1 > img").attr("src", m_jsonRewardSummary.cardInfo.cardImgUrl);
							
							// ?????? ?????? ??????
							var cardNumber = m_jsonRewardSummary.cardInfo.cardNumber;
							$(".mycard_area2 .num").text("**** - **** - **** - " + cardNumber.substr(12, 4));
							
							// ????????? ??????
							$(".mycard_area2 .barcord").css("background-image", "url(/my/barcode.do?c=" + m_jsonRewardSummary.cardInfo.cardBarcodeNumber + ")");
							
							// ???????????? ??????
							$divTopMSR.find(".balance").text( $.number(m_jsonRewardSummary.cardInfo.balance) );
							$divCenterMSR.find(".balance").text( $.number(m_jsonRewardSummary.cardInfo.balance) );							
							
							
							var nTotalStar           = 0;		// ?????? ????????? ??? ???
							var nNextGradeStar       = 0;
							var strStatNotice_top    = "";
							var strStatNotice_center = "";
							
							switch(m_jsonRewardSummary.userGrade) {
								case "00":
									nTotalStar           = m_jsonRewardSummary.starInfo.validStar;
									nNextGradeStar       = m_jsonRewardSummary.starInfo.nextGradeStar;
									strStatNotice_top    = '<strong class="t_fff en">Welcome Level</strong><br>' + nNextGradeStar + '?????? ????????? ??? ?????????<br><span class="green">Green Level</span>??????<br>????????? ?????????!';
									strStatNotice_center = '<span class="user_greet_txt"><strong></strong> ??????</span> <span>?????? <strong class="t_fff en">Welcome Level</strong>????????????.</span><br />' + '<span class="userNextStarTxt"><strong class="t_03934b en">Green Level</strong>??? ???????????? ' + nNextGradeStar + '?????? ?????? ???????????????.</span>';//20200120 ???????????? ????????? ?????? ?????? ?????? ?????? ??????
					
															
									break;

								case "10":
								case "11":
									nTotalStar           = m_jsonRewardSummary.starInfo.validStar;
									nNextGradeStar       = m_jsonRewardSummary.starInfo.nextGradeStar;
									strStatNotice_top    = '<strong class="t_03934b en">Green Level</strong><br>' + nNextGradeStar + '?????? ????????? ??? ?????????<br><span class="t_ac8432">Gold Level</span>??????<br>????????? ?????????!';
									strStatNotice_center = '<span class="user_greet_txt"><strong></strong> ??????</span> <span>?????? <strong class="t_03934b en">Green Level</strong>????????????.</span><br />' + '<span class="userNextStarTxt"><strong class="t_ac8432 en">Gold Level</strong>??? ???????????? ' + nNextGradeStar + '?????? ?????? ???????????????.</span>';//20200120 ???????????? ????????? ?????? ?????? ?????? ?????? ??????
									break;
									
								case "20":
								case "21":
									nTotalStar           = m_jsonRewardSummary.starInfo.validCouponStar;
									nNextGradeStar       = m_jsonRewardSummary.starPolicy.goldGoldStar - m_jsonRewardSummary.starInfo.validStar;
									
									strStatNotice_top = '<span class="user_greet_txt"><strong></strong> ??????</span> <span>?????? <strong class="t_ac8432 en">Gold Level</strong>????????????.</span><br />' + '<span class="userNextStarTxt">' + nNextGradeStar + '?????? ????????? ??? ????????? <strong class="t_ac8432 en">Gold Level</strong>???<br />1??? ??? ????????? ??? ????????????.</span>';//20200120 ???????????? ????????? ?????? ?????? ?????? ?????? ??????
									if (nNextGradeStar < 0) {
										var nRemainStar = 12 - nTotalStar;
										if (nRemainStar < 0) {
											nRemainStar = 0;
										}
										strStatNotice_top = '<span class="user_greet_txt"><strong></strong> ??????</span> <span>?????? <strong class="t_ac8432 en">Gold Level</strong>????????????.</span><br />' + '<span class="userNextStarTxt">???????????? ?????? ???????????? ' + nRemainStar + '?????? ?????? ???????????????.</span>';//20200120 ???????????? ????????? ?????? ?????? ?????? ?????? ??????
									}
									strStatNotice_center = strStatNotice_top;
									break;
							}
							
							// ????????? ??? ??????
							$divTopMSR.find(".level_star_bg").text(nTotalStar);
							$divCenterMSR.find(".level_star_bg").text(nTotalStar);
							
							// ??????
							$divTopMSR.find(".user_level_txt").html(strStatNotice_top);
							$divCenterMSR.find(".user_level_txt").html(strStatNotice_center);
							
							// e-??????
							$(".validCoupontCnt").text(m_jsonRewardSummary.validCoupontCnt);
						}
						
						//?????? 
						$divCenterMSR.find(".user_greet_txt strong").text(m_jsonRewardSummary.userName);
						
					} else {
						var arr = _response.error_msg.split("|");
						if (arr.length == 2) {
							alert(arr[1]);	
						} else {
							var href = location.href.toLowerCase();
							if (href.indexOf("/error/") == -1) {
								if (arr[0] == "307") {
									alert("MSR ?????? ??????");
									location.href = "/error/unusual_contact.do";
								} else {
									alert(arr[0]);
								}
							}
						}
					}
				}
				,function (_error) {
				}
			);
		//}
	}
	
	,showInboxNoCnt : function () {
		//__ajaxCall("/interface/getInboxNoCnt.do", {}, true, "json", "post"
		//__ajaxCall("/app/coffee/getInboxNoCnt.do", {}, true, "json", "post"
		//	,function(_response) {	
		//		if (_response.result_code == "SUCCESS") {
		//			m_nInboxNoCnt = _response.data;
		//			
		//			if(m_nInboxNoCnt > 0) {
		//				$(".inbox_no").removeClass("inbox_no");
		//			}
		//		}
		//	}
		//	,function (_error) {
		//	}
		//);
		
		m_nInboxNoCnt = 0;
	}
	
	,checkFormulaCode : function () {
		var userAgent = navigator.userAgent.toLowerCase();
		if (userAgent.indexOf("android") > -1
				|| userAgent.indexOf("blackberry") > -1
				|| userAgent.indexOf("iemobile") > -1
				|| userAgent.indexOf("ipad") > -1
				|| userAgent.indexOf("iphone") > -1
				|| userAgent.indexOf("ipod") > -1
				|| userAgent.indexOf("opera mini") > -1
				|| userAgent.indexOf("opera mobi") > -1
				) {
			m_formulaCode = "M";
		}
	}
};