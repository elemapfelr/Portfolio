'use strict';

var __ment_max_call_count = 10;
// left 메뉴 focus 위치 지정
function fnLeftMenuFocusSet(){
	__ment_max_call_count--;
	if(__ment_max_call_count == 0){ return false; }
	var path =  location.pathname;
	var sideDiv = $(".side_menu_section");
	var sessKeyLeftMeun = "LeftMeun";

	if( path.indexOf("/pub/member_only1/") > -1 && $(".side_menu_area").length > 0  ){
		$(".side_menu_area").hide();
		return false;
	}
	
	// 예외처리 해당 메뉴가 없는경우
	if(path == "/sub/sales/analysis"){
		path = "/sub/sales/sales";
	} else if(path == "/sub/past/compare"){
		path = "/sub/past/past";
	} else if(path == "/sub/return/compare"){
		path = "/sub/return/return";
	}else if(path.indexOf("/sub/peersale/") > -1 ){
		path = "/sub/peersale/state";
	}
	
	
	var li = sideDiv.find("a[href='"+path+"']").parent();
	
	if( sideDiv.length == 0 ){
		setTimeout(fnLeftMenuFocusSet, 300);
	} else {
		
		if(li.hasClass("depth_one")){
			li.children().first().css("color","#86c5ff");
		} else {
			$.each(li, function(){
				if( !$(this).hasClass("focus") ){
					li.addClass("focus");
					li.closest("ul.sub_gnb_side").show();
				}
			});	
		}
		
		if(sessionStorage.getItem(sessKeyLeftMeun) == null){
			sessionStorage.setItem(sessKeyLeftMeun, "active");
		}
		
		// 메뉴 보이게
		$(".side_menu_area").addClass(sessionStorage.getItem(sessKeyLeftMeun));
		
		
		fnMobileMenu();
		
		
		$(".side_menu_area .icon").off("click");
		$(".side_menu_area .icon").click(function() {
		    $(this).parents(".side_menu_area").addClass("active");
		    sessionStorage.setItem(sessKeyLeftMeun, "active");
		});
		
		$(".title_menu img").off("click");
		$(".title_menu img").click(function() {
		      $(".side_menu_area").removeClass("active");
		      sessionStorage.setItem(sessKeyLeftMeun, "");
		});
	}
}

function fnMobileMenu(){
	var path =  location.pathname;
	var sideDiv = $(".m_sideMenu_contents");
	var li = sideDiv.find("a[href='"+path+"']").parent();
	if( sideDiv.length > 0 ){
		$.each(li, function(){
			if( !$(this).hasClass("focus") ){
				li.addClass("focus");		
			}
		});
		
		

		// 마이페이지 스크롤 위치 이동
		if (matchMedia("screen and (max-width: 1000px)").matches) {
			var getLength = $(".gnb_top li").length;
			var sizeFix = getLength * 143 + "px";
			var numSizeFixValue = getLength * 143;
			$(".menu_top").css("width", sizeFix);

			var tepleng = $(".gnb_top li").length;
			for (var i = 0; i <= tepleng; i++) {
				if (i > 2) {
					if ($(".gnb_top li").eq(i).hasClass("focus")) {
						$(".menu_top").scrollLeft(
								numSizeFixValue / tepleng * i - 2);
					}
				}
			}
		}

		
		
	}
	
}

// 
function fnMenuIgone(){
	showAlert("준비중입니다");
}

function fnServiceIntroPageMove(url){
	window.open(url, '_blank', 'width=800, height=600');
}

setTimeout(fnLeftMenuFocusSet, 300);





