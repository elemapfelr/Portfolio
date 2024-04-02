// 뒤로가기
var historyBack = function() {
    history.go(-1);
};

// 본인인증
var authPhoneNumber = function() {
    var popOption = "width=370, height=360, resizable=no, scrollbars=no, status=no;";    //팝업창 옵션(optoin)
    window.open("/authPopup/phone_popup1", "", popOption);
};

function checkCertInfo(certName, certPhone) {
    // var orgName = $("#ceo_nm").val();
    var orgPhone = $("#ceo_no").val();
    if (orgPhone == certPhone) {
        // PC
        if ($(".m_sevice_mb").css("display") == "none") {
            $("#check_user_btn").css("display", "none");
            $("#checked_user").css("display", "inline-block");
            $("#disagree_text").css("display", "none");
        }
        else { // Mobile
            $("#check_user_btn_mb").css("display", "none");
            $("#checked_user_mb").css("display", "inline-block");
            $("#disagree_text_mb").css("display", "none");
        }
     
        $("#cert").val("Y");
    }
    else {
        showAlert("인증정보가 회원정보와 일치하지 않습니다.");
    }
}

// 해지신청 버튼 이벤트
var pressedBtnCancel = function() {
    // PC
    if ($(".m_sevice_mb").css("display") == "none") {
        if ($("#reason option:selected").val() == "1") {
            $("#disagree_text").css("display", "block");
            return;
        }
        
        if($("#cert").val() != "Y") {
            $("#disagree_text").css("display", "block");
            $("#disagree_text").text("본인 인증을 해주세요.");
            return;
        }
    }
    else { // Mobile
        if ($("#reason_mb option:selected").val() == "1") {
            $("#disagree_text_mb").css("display", "block");
            return;
        }
        
        if($("#cert").val() != "Y") {
            $("#disagree_text_mb").css("display", "block");
            $("#disagree_text_mb").text("본인 인증을 해주세요.");
            return;
        }
    }

    // Confirm 모달 노출
    $("#close_account_alert_div").css("display","flex");
    $("html,body").css("overflowY","hidden");
};

// 해지 신청 동의
var pressedBtnAgree = function() {
    // 해지 사유 코드
    var canc_reas_cd = null;
    var canc_dti_reas = null;

    // PC
    if ($(".m_sevice_mb").css("display") == "none") {
        canc_reas_cd = $("#reason option:selected").val();
        canc_dti_reas = $("#reason_detail").val();
    }
    else { // Mobile
        canc_reas_cd = $("#reason_mb option:selected").val();
        canc_dti_reas = $("#reason_detail_mb").val();
    }

    var params = {
        "goods_req_seq_no": $("#goods_req_seq_no").val(),
        "canc_reas_cd": canc_reas_cd,
        "canc_dti_reas": canc_dti_reas
    };

    $.post("/sub/my/paidCancel", $.param(params), function (res) {
        showAlert("이용권 해지가 완료되었습니다.", function () {
            location.replace("/sub/my/paidInfo");
        });
    })
    .fail(function (response) {
        showAlert("요청이 실패하였습니다.");
    });
};