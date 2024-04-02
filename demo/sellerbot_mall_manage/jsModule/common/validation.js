'use strict';


/**
 * null 공백  undefined 체
 * @param {*} val 
 */
function isNull(val){
	var type = typeof val;
	
	if( type == "undefined" || type == "null" || val == null  ){
		return true;
	}

	if( type == "string" && (val.trim() == "" || val == "null" ) ){
		return true;
	}

	return false;
}

/**
 * not null 확
 * @param {*} val 
 */
function nonNull(val){
	return !isNull(val);
}


/**
 * val값이 없는 경우 nullVal로 대체한다.
 * @param {*} val 
 * @param {*} nullVal 
 */
function nvl(val, nullVal){
	return isNull(val) ? nullVal : val;
}

/**
 * 숫자형 체크
 * @param {*} val 
 */
function isNumber(val){
	if(typeof val == "number" || /^[0-9]*$/.test(val) ){
		return true;
	}
	return false;
}

/**
 * 이메일 형식 체크 
 * @param {*} val
 * return 이메일 형식 true, 틀린 경우 false 
 */
function isEmail(val){
	if( /^([\w\.\_\-])*[0-9a-zA-Z]+([\w\.\_\-]?[0-9a-zA-Z])*([\w\.\_\-])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(val) ){
		return true;
	}
	return false;
} 

/**
 * 휴대 전화 형식
 */
function isMobile(val){

	if( isNull(val) ){
		return false;
	}

	if( val.indexOf("-") > -1 ){
		// 휴대전화 형식이 010-1111-2222 인 경우
		return /^(?:(010-?\d{4})|(01[1|6|7|8|9]-?\d{3,4}))-?\d{4}$/.test(val);
	} else {
		// 휴대전화 형식이 01011112222 인 경우
		return /^(?:(010-?\d{4})|(01[1|6|7|8|9]?\d{3,4}))?\d{4}$/.test(val);
	}

}

/**
 * 휴대 전화 형식
 */
function isMobileDetail(val){

	if( isNull(val) ){
		return false;
	}
	return /^\d{7,8}$/.test(val);
}





/**
 * 사업자 입력 번호 형식
 * @param {*} bisNo 
 */
function isBizNo(bizID) {

	bizID = bizID + ""; // 숫자인 경우 강제로 문자열 형식으로 변환한다.
    // bizID는 숫자만 10자리로 해서 문자열로 넘긴다. 
    var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1); 
    var tmpBizID, i, chkSum=0, c2, remander; 
    bizID = bizID.replace(/-/gi,''); 

    for (i=0; i<=7; i++) chkSum += checkID[i] * bizID.charAt(i); 
    c2 = "0" + (checkID[8] * bizID.charAt(8)); 
    c2 = c2.substring(c2.length - 2, c2.length); 
    chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1)); 
    remander = (10 - (chkSum % 10)) % 10 ; 

    if (Math.floor(bizID.charAt(9)) == remander) return true ; // OK! 
    return false;
}

//기본형
function isAcctNo(val){
	// 은행별 계좌번호 형식을 알수 없기때문에 숫자와 하이픈만 허용한다.
	if(typeof val == "string" && /^([0-9]|-)*$/.test(val) ){
		return true;
	}
	return false;
	
}

//기본형
function isAcctNo_numberNLetter(val){
	// 계좌번호가 숫자와 영문 혼합인 경우
	// e.g. 대구은행
	if(typeof val == "string" && /^([0-9]|-|[A-Z]|[a-z])*$/.test(val) ){
		return true;
	}
	return false;
	
}

/**
 * 주민번호 앞자리 또는 사업자 번호 10자리
 * @param val
 * @returns
 */
function isCtzBizno(val){
	
	if(isNumber(val)){
		var temp = String(val);
		if(temp.length == 6){
			// 날짜 형식 인지 확인
            var mm = Number(temp.substr(2, 2));        // 월
            var dd = Number(temp.substr(4, 2));        // 일
            
            if ( mm > 0 && mm < 13 &&
                    dd > 0 && dd < 32) {
            	return true;
            }
            
            return false;
		}else if(temp.length == 10){
			return isBizNo(temp);
		}
		return false;	
	}
	return false;
}


/**
 * 허용 이미지  확장자 처
 * @param {*} ext 파일확장자 
 * return 허용하는 이미지 true, 허용하지 않는 이미지 false
 */
function isAllowImage(ext){

	if(isNull(ext)){
		// console.log("파일 확장자가 없습니다.");
		return false;
	} else {
		ext = ext.toUpperCase(); 
	}

	// 허용하는 파일 확장자
	var fileExtensions = [
		"JPG", "GIF", "BMP", "TIF", "PNG", "PDF"
	]; 

	var isExtChk = false;

	fileExtensions.forEach(function(AllowExt){
		// console.log(AllowExt + " == "+ ext);
		if( AllowExt == ext ){
			isExtChk = true;
			return false;
		}
	});

	if(!isExtChk){
		// console.log("허용하지 않는 이미지 확장자입니다.");
		return false;
	}

	return isExtChk;
}

/**
 * json string 형식
 */
function isJsonString(str){
	try{
		JSON.parse(str);
	}catch(e){
		// console.log("not Json String : "+ str);
		return false;
	}
	return true;

}

/**
 * 비밀번호 형식 확인
 * @param {*} val 
 */
function isPassword(val){
	if(isNull(val)){ return false; }
	var regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}/;
	return regex.test(val);
}


// 공통 기본 에러 체크
function isVali(){
	var result = true;
	var jqThis, id, val, type, jqErrorEle, focusId;
	var isRequired = false;
	$(".error").hide();
	
	function showError(){

		if(isNull(focusId)) focusId = id;
		jqErrorEle = $("#"+id+"_error");
		if( jqErrorEle.length == 0 ){
			jqErrorEle = jqThis.siblings(".error");
		}
		jqErrorEle.show();
		result = false;
	};

	$("[required],[data-valitype]").each(function(){
		jqThis = $(this);
		id = nvl(jqThis.attr("id"), "");
		val = jqThis.val();
		type = jqThis.data("valitype");
		isRequired = jqThis.is(":required");

		if( isNull(val) && isRequired ){
			showError();
			return true;
		}
		
		if( nonNull(type) && nonNull(val)  ){

			if(type == "number" && !isNumber(val) ){
				showError();
			} else if(type == "email" && !isEmail(val) ){
				showError();
			} else if(type == "bizNo" && !isBizNo(val) ){
				showError();
			} else if(type == "password" && !isPassword(val) ){
				showError();
			} else if(type == "acctNo" && !isAcctNo(val) ){
				showError();
			} else if(type == "acctNo_numberNLetter" && !isAcctNo_numberNLetter(val) ) {
				// 2020-01-08
				// 대구은행은 계좌번호에 숫자와 영어 모두 입력 가능
				showError();
			} 
			else if(type == "ctzBizno" && !isCtzBizno(val) ){
				showError();
			} else if(type == "mobile" ){
				var targetId = jqThis.attr("for");
				if( isNull(targetId) && !isMobile(val) ){
					showError();
				} else {
					val = $("#"+targetId).val() + val;
					if( !isMobile(val) ){ showError(); } 
				}
				
			} else if(type == "equalsTo" ){
				var targetId = jqThis.attr("for");
				if( $("#"+targetId).val() != val ){
					showError();
				} 
			}
		}
	});
	$("#"+focusId).focus();		
	return result;
}







