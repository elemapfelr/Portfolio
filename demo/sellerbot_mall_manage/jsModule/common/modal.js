'use strict';



// 모달 화면 표시
function showAlert(htmlMsg, callback){

	// alert 중복 호출시 먼저 호출한 모달은 삭제한다.
	if( $(".alert").length > 0 ){
		removeModal($(".alert").attr("id"));
	}
	
	var id = uuid();
	var html = $(templateAlert(id, htmlMsg));

	// 닫기 처리
	html.find(".close_pop").on("click", function(){
		if(typeof callback == "function"){ callback(); }
		removeModal(id);
	});
	html.find(".close_btn").on("click", function(){
		removeModal(id);
		//모달 확인 후 콜백 수행해야 할 경우
		if(typeof callback == "function"){ callback();}
	});
	html.show();
	$("div.container").append(html);

	setTimeout(function(){
		html.find(".close_btn").focus();	
	}, 100);

	return id;

}

// 모달 Confirm 함수
function showConfirm(htmlMsg, callback, option){

	var id = uuid();
	var opt = {
		btnOK: "확인",
		btnCancel: "취소"
	}
	if(nonNull(option)){
		opt.btnOK = nvl(option.btnOK, "확인");
		opt.btnCancel = nvl(option.btnCancel, "취소"); 
	}

	var html = $(templateConfirm(id, htmlMsg, opt));

	// 닫기 처리
	html.find(".close_pop").on("click", function(){
		removeModal(id);
	});
	html.find(".close_btn").on("click", function(){
		removeModal(id);
	});
	// 확인 버튼
	//
	if(typeof callback == "function"){
		html.find(".ok_btn").on("click", function(){
			callback();
		});
	}

	html.show();
	$("div.container").append(html);

	setTimeout(function(){
		html.find(".close_btn").focus();	
	}, 100);

	return id;
}


/**
 * 이용약관
 * @param {*} jqObj 
 */
function showTerm(jqObj){

	var id = uuid();
	var termData = jqObj.data("term");
	var html = $(templateTerm(id, termData));

	// 닫기 처리
	html.find(".join_step_popup_close").on("click", function(){
		removeModal(id);
	});
	html.find(".add_pooup_close").on("click", function(){
		removeModal(id);
	});

	html.show();
	$("div.container").append(html);

}


// 모달 삭제
function removeModal(id){
	$("#"+id).remove();	
}

// uuid 생성
function uuid() {
	function s4() {
		return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


/////////////////////////////////////////////////////////////////
// 모달 탬플릿 작성 영역
/////////////////////////////////////////////////////////////////
/**
 * 탬플릿 alert
 * @param {*} id 
 * @param {*} msg 
 */
function templateAlert(id, msg){

	var html = [];

	html.push("<div class=\"popup popup_certify alert\" id="+ id +">");
	html.push("	<div class=\"pop\">");
	html.push("		<span class=\"close_pop\"><img src=\"/assets/images/member/close_gray.png\" alt=\"닫기\"></span>");
	html.push("		<div class=\"pop_body\">");
	html.push("			<p class=\"desc_pop\">"+ msg +"</p>");
	html.push("		</div>");
	html.push("		<div class=\"pop_footer\">");
	html.push("			<button type=\"button\" class=\"close_btn\">확인</button>");
	html.push("		</div>");
	html.push("	</div>");
	html.push("</div>");

	return html.join("");
}

/**
 * 탬플릿 Confirm
 * @param {*} id 
 * @param {*} msg 
 */
function templateConfirm(id, msg, opt){

	var html = [];

	html.push("<div class=\"popup popup_certify confirm\" id="+ id +">");
	html.push("	<div class=\"pop\">");
	html.push("		<span class=\"close_pop\"><img src=\"/assets/images/member/close_gray.png\" alt=\"닫기\"></span>");
	html.push("		<div class=\"pop_body\">");
	html.push("			<p class=\"desc_pop\">"+ msg +"</p>");
	html.push("		</div>");
	html.push("		<div class=\"pop_footer pop_footer2\">");
	html.push("			<button type=\"button\" class=\"close_btn pop_btn2 btn_gray\">"+opt.btnCancel+"</button>");
	html.push("			<button type=\"button\" class=\"ok_btn pop_btn2\">"+opt.btnOK+"</button>");
	html.push("		</div>");
	html.push("	</div>");
	html.push("</div>");

	return html.join("");
}


/**
 * 이용 약관 모달
 * @param {*} id 
 * @param {*} termData 
 */
function templateTerm(id, termData){

	var html = [];

	html.push("<div id="+id+" class=\"new_popup_wrap\" style=\"display: flex; z-index:99999\">");
	html.push("	<div class=\"display_none_back\" style=\"display: block;\"></div>");
	html.push("	<div id=\"termpopup7\" class=\"pop_up_1 pop_up_all\" style=\"display: block;\">");
	html.push("		<div class=\"popup_top_title\">");
	html.push("			<h1>");
	html.push("				&nbsp;");
	// html.push("				"+termData.terms_title);
	html.push("			</h1>");
	html.push("			<div class=\"add_pooup_close\">");
	html.push("			  <div></div>");
	html.push("			  <div></div>");
	html.push("			</div>");
	html.push("		</div>");
	html.push("		<h1 class=\"popup_title_2\">");
	html.push("					"+termData.terms_title);
	html.push("		</h1>");
	html.push("		<div class=\"pop_up_text_wrap\">");
	html.push("			"+termData.terms_cont);
	html.push("		</div>");
	html.push("		<button type=\"button\" class=\"btn_confirm_terms join_step_popup_close\">약관확인</button>");
	html.push("	</div>");
	html.push("</div>");

	return html.join("");
}


/**
 * 공통 로딩 모달
 * @returns
 */
function showLoadingModal(){
	$('body').loadingModal({text: 'Showing Loading...'});
}
function hideLoadingModal(){
	$('body').loadingModal('destroy');
}
