'use strict';


/**
 * byte 단위 변환
 * @param {*} nByte 
 */
function fnFileSizeUnit(nByte){
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (nByte == 0) return '0 Byte';
	var i = parseInt(Math.floor(Math.log(nByte) / Math.log(1024)));
	return Math.round(nByte / Math.pow(1024, i), 2) + ' ' + sizes[i];
}


/**
 * 서버 시간을 기준으로 날짜를 취득한다.
 */
function fnGetToDay(format){
	if( $("#common_server_time").length == 0 ){
		console.log("주의 서버시간을 찾을수 없습니다.");
		if(isNull(format)){
			return moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
		} else {
			return moment(new Date()).format(format);
		}
	} else {
		if(isNull(format)){
			return $("#common_server_time").val();
		} else {
			return moment($("#common_server_time").val()).format(format);
		}
	}
}

/**
 * 콤마 추가
 * @param {*} n // 숫자
 * @param {*} x  // 소숫점 자리
 */
function fnAddComma (n, nval) {
	if( isNull(n) ){ 
		if(typeof nval == "undefined"){
			return "-";	
		}
		return nval;
	}
	if(isNumber(n)){
 		var regexp = /\B(?=(\d{3})+(?!\d))/g;
  		return n.toString().replace(regexp, ',');
	} else {
		if(typeof nval == "undefined"){
			return nvl(n, "-");	
		} else {
			return nvl(n, nval);
		}
		
	}
};


/**
 * 
 * @param {*} property 
 */
function JsonArraySort(property, isDesc) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
	}
    return function (a,b) {

		var result;
		if(isNull(isDesc)){
			result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		} else {
			result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
		}
        return result * sortOrder;
    }
}




(function(){
	
	// 대한 민국 날짜  설정
	moment.locale('ko');

	var _error_msg = {
		'AUTH-001' : "허용하지 않는 접근입니다.",
		'AUTH-5000': "예기치 못한 오류발생",
		'AUTH-4001': "파라미터 값을 확인하세요",
		'AUTH-4002': "인증코드가 없습니다",
		'AUTH-4003': "인증코드가 유효하지 않습니다",
		'AUTH-4004': "인증코드가 전송되지 못했습니다",
		'AUTH-4005': "{}가/이 유효하지 않습니다. ",
		'AUTH-4301': "새로운 암호가 서로 틀립니다.",
		'AUTH-4302': "기존 암호가 틀립니다",
		'AUTH-4303': "해당 사용자가 존재하지 않습니다",
		'AUTH-4304': "아이디나 비밀번호를 다시 확인해주세요.",
		'AUTH-4305': "관리자가 아닙니다 또는 일반 사용자가 아닙니다",
		'AUTH-4306': "5회 이상 로그인에 실패하여 계정이 잠김처리 되었습니다.\n 담당 관리자에게 문의해주세요.",
		'AUTH-4307': "사용이 정지된 계정입니다.\n 시스템 관리자에게 문의해주시기 바랍니다.",
		'AUTH-4308': "사용기간이 만료된 계정입니다.\n 시스템 관리자에게 문의해주시기 바랍니다.",
		'AUTH-4309': "등록된 IP와 일치하지 않습니다. 등록된 접속 IP에서만 접속 가능합니다.",
		'AUTH-4310': "아이디나 비밀번호를 다시 확인해주세요.\n 5회 이상 실패 시 계정이 잠김 처리 되오니 주의해주세요",
		'AUTH-4901': "입력 값 중복",
		'COMM-4000': "{}} 잘못된 데이터 입력",
		'COMM-4001': "{} 데이터 값이 없습니다.",
		'COMM-4002': "{} 데이터값이 잘못 입력 되었습니다.",
		'COMM-4003': "{} 입력한 사용자가 없습니다.",
		'COMM-4004': "{} 데이터값이 잘못 입력 되었습니다.",
		'COMM-4005': "{} 값 누락",
		'COMM-4006': " 중복된 {}이/가 존재합니다.",
		'COMM-4300': "인증되지 않았습니다.",
		'COMM-4400': "리소스를 찾을 수 없습니다.",
		'COMM-4901': "판매몰 정보는 중복해서 입력할수 없습니다. ",
		'COMM-5000': "서버 내부 오류가 발생하였습니다.",
		'COMM-5001': "데이터베이스 내부 오류가 발생하였습니다.",
	};

	function getCommonErrorMsg(json){
		var msg = "";
		try{
			if( nonNull(json.comment) ){
				msg = json.comment;
			} else {
				msg = _error_msg[json.code];
				msg = nvl(msg, json.reason);
			}
			
			return msg;
		}catch(e){
			return msg;
		}
	}

	// 비동기 설정
	$.ajaxSetup({
		error: function(jqXHR){
			
			var responseText = jqXHR.responseText;
			if( nonNull(responseText) ){
				if( isJsonString(responseText)){
					var json = JSON.parse(responseText);
					var msg = getCommonErrorMsg(json);
					showAlert(msg);
				}
			} else {
				console.log(responseText);
			}
		}
	});


	setTimeout(function(){
		
		if( isNull(sessionStorage.getItem("term")) ){
			// 약관 팝업
			$.get("/pub/common/terms", null, function(res){
				sessionStorage.setItem("term", JSON.stringify(res));
				$.each(res, function(){
					var target = $("li#"+this.terms_typ_cd);
					if(target.length > 0){
						target.data("term", this);
						target.on("click", function(){
							showTerm(target);
						});
					}	
				});
			});	
		} else {
			var jsonRes = sessionStorage.getItem("term");
			var res = JSON.parse(jsonRes); 
			$.each(res, function(){
				var target = $("li#"+this.terms_typ_cd);
				if(target.length > 0){
					target.data("term", this);
					target.on("click", function(){
						showTerm(target);
					});
				}	
			});

		}
		
		var target = $("li#EMALE");
		var termData = {
				terms_title: "이메일무단수집 거부",
				terms_cont: "영리목적 셀러봇캐시에서는 본 웹사이트에 게시된 이메일 주소가 전자우편 수집<br> 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며,<br> 이를 위반시 정보통신망법에 의해 형사처벌됨을 유념하시기 바랍니다."
		};
		target.data("term", termData);
		target.on("click", function(){
			showTerm(target);
		});
		
	}, 300);
	
})();


/***************************************************************************
 * 시작 : tui - datepicker
 **************************************************************************/
// 임시 당월 해제
function createRangeMonthPicker(id1, opt1, id2, opt2){
	
	var startDate1 = new Date(2014, 12 ,1);
	var startDate2 = new Date(2015, 11 ,1);
	
	var today = new Date();
	
	var result = {
			"startpicker": null,
			"endpicker": null,
	}
	
	id1 = nvl(id1, "#datepicker-sales_find_stt_dt");
	id2 = nvl(id2, "#datepicker-sales_find_end_dt");
	
	var setOpt1 = {
        date: moment(today).subtract(12, 'month').toDate(),
        language: 'ko',
        type: 'month',
        input: {
            element: '#sales_find_stt_dt',
            format: 'yyyy-MM'
        },
        selectableRanges: [
            [startDate1, moment(today).subtract(12, 'month').toDate()]
        ]
	}; 
	
	if(nonNull(opt1)){
		if(nonNull(opt1.input) && nonNull(opt1.input.element)){
			setOpt1.input.element = opt1.input.element;
		}
		
		if(nonNull(opt1.selectableRanges)){
			setOpt1.selectableRanges = opt1.selectableRanges;
		}
	}
	
	var setOpt2 = {
        date: moment(today).subtract(1, 'month').toDate(),
        language: 'ko',
        type: 'month',
        input: {
            element: '#sales_find_end_dt',
            format: 'yyyy-MM'
        },
        selectableRanges: [
            [startDate2, moment(today).subtract(1, 'month').toDate()]
        ]
	}; 
	
	if(nonNull(opt2)){
		if(nonNull(opt2.input) && nonNull(opt2.input.element)){
			setOpt2.input.element = opt2.input.element;
		}
		
		if(nonNull(opt2.selectableRanges)){
			setOpt2.selectableRanges = opt2.selectableRanges;
		}
	}
	
	// 날짜
	result.startpicker = new tui.DatePicker(id1, setOpt1);
	result.endpicker = new tui.DatePicker(id2, setOpt2);
	
	return result;
	
}

var fnIsRegData = function(currRegCnt, maxRegCnt) {
	if(maxRegCnt == null || maxRegCnt == "")
		return true;

	var isRegAcct = false;
	var currentRegCount = (typeof(currRegCnt) == "number") ? currRegCnt : parseInt(currRegCnt);
	var maxRegCount = (typeof(maxRegCnt) == "number") ? maxRegCnt : parseInt(maxRegCnt);
	
	if(maxRegCount <= 0) // 0 or -1
		isRegAcct = true;
	else if(maxRegCount > currentRegCount)
		isRegAcct = true;
	
	return isRegAcct;
};

var getTextLength = function(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        if (escape(str.charAt(i)).length == 6) {
            len++;
        }
        len++;
    }
    return len;
};


$(document).ready(function(){
	
	if( $('.sellerbot-banner').length > 0 ) {

		var sellerbotBannerItems = 1,
			sellerbotBannerMargin = 0,
			sellerbotBannerResponsiveItems = 1;

		$('.sellerbot-banner').each(function(){
			if( $(this).hasClass('market') ) {
				sellerbotBannerItems = 2;
				sellerbotBannerMargin = 10;
				sellerbotBannerResponsiveItems = 2;
			}

			$(this).owlCarousel({
				items: sellerbotBannerItems,
				loop:true,
				margin:sellerbotBannerMargin,
				nav:true,
				autoplay:true,
				autoplayTimeout:5000,
				autoplayHoverPause:true,
				responsive:{
					0:{ items: 1 },
					900:{ items: sellerbotBannerResponsiveItems }
				}
			});
		});

		var sellerbotVerticalBanner = $('.sellerbot-banner.vertical');
		if( sellerbotVerticalBanner.length > 0 ) {
			var sellerbotBannerTotal = sellerbotVerticalBanner.find('.owl-dots button').length;
			console.log( sellerbotBannerTotal );
			sellerbotVerticalBanner.find('.owl-nav').after('<div class="owl-nums"><span class="current">1</span>/<span class="total">0</span></div>');
			sellerbotVerticalBanner.find('.owl-nums .total').text(sellerbotBannerTotal);
			sellerbotVerticalBanner.on('changed.owl.carousel', function(event) {
				var sellerbotBannerPageNum = event.page.index + 1;
				sellerbotVerticalBanner.find('.owl-nums .current').text(sellerbotBannerPageNum);
			});
		}
	}

	if( $('.main_bnr').length > 0 ) {
		// scroll 인식
		var floatPosition = parseInt($(".main_bnr").css('top'));
		$(window).scroll(function() {
		
			// 현재 스크롤 위치
			var currentTop = $(window).scrollTop();
			var bannerTop = currentTop + floatPosition + "px";

			//이동 애니메이션
			$(".main_bnr").stop().animate({
				"top" : bannerTop
			}, 10);

		}).scroll();
	}

});