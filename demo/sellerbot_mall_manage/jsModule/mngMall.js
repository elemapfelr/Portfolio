/**
	 * 2021-04-16 판매몰별 도움말 & 영상 설정(DB 칼럼 추가)
	 */
 var setHelpInfo = function (clickM) { 
    var mall_cd = clickM.children(".mall_cd").val();
    var help_use_yn = clickM.children(".help_use_yn").val();
    var help_open_yn = clickM.children(".help_open_yn").val();
    var help_info = clickM.children(".help_info").val();


    if (help_use_yn == "Y" && help_info != "") {
        $("#helpInfoText").html(help_info);
        $(".popup_gui_btn").css("display", "block");

        /**
         * 2021-04-16 필수 절차가 있는 몰은 항상 도움말 노출 [CASH-512]
         */
        if(help_open_yn == 'Y')
            $(".popup_gui_container").css("display", "block");
        else
            $(".popup_gui_container").css("display", "none");
        }
        else {
            $(".popup_gui_container").css("display", "none");
            $(".popup_gui_btn").css("display", "none");
        }
     }

var setVideoInfo = function (clickM) {
    var video_use_yn = clickM.children(".video_use_yn").val();
    var video_url = clickM.children(".video_url").val();

    if(video_use_yn == 'Y' && video_url != "") { // show
        var src = "https://www.youtube.com/embed/" + video_url.replace("https://youtu.be/", "") + "?enablejsapi=1&version=3&playerapiid=ytplayer";
        $("#iframeVideoPopup").attr("src", src);
        $(".edit_video_btn2").css("display", "flex");
    }
    else {
        $(".edit_video_btn2").css("display", "none");
    }
}

$(document).ready(function () {
    
    // 입력완료
    $(".frm_account_btn").click(function () {
        var mall_cd = $("input[name='mall_cd']").val();
        var mall_nm = $("input[name='mall_nm']").val();
        var cert_step = $("input[name='cert_step']").val();
        var mall_cert_1st_id = $("input[name='mall_cert_1st_id']").val();
        var mall_cert_1st_passwd = $("input[name='mall_cert_1st_passwd']").val();
        var sub_mall_cert_1st = $("input[name='sub_mall_cert_1st']").val();
        var sub_mall_cert_2nd = $("input[name='sub_mall_cert_2nd']").val();
        var passwd_step = $("input[name='passwd_step']").val();
        var mall_cert_typ_cd = $("#i_mall_cert_typ_cd").val();
        var mall_cert_2nd_passwd = $("input[name='mall_cert_2nd_passwd']").val();
        var sub_mall_auth_1st_esse_yn = $("input[name='sub_mall_auth_1st_esse_yn']").val();
        var sub_mall_auth_2nd_esse_yn = $("input[name='sub_mall_auth_2nd_esse_yn']").val();
        // 카테고리 추가
        var goods_cate_seq_no = $("select[name='goods_cate_seq_no']").val();

        // OTP 인증 추가
        var otp_auth_use_yn = $("input[name='otp_auth_use_yn']").val();
        var otp_auth_esse_yn = $("input[name='otp_auth_esse_yn']").val();
        var mall_auth_otp_key = $("input[name='mall_auth_otp_key']").val();

        var checkCnt = 0;

        // 20210420
        // 인터파크 OM 및 MD 관련 중복 체크 여부
        // 업체 번호 , 공급계약번호 정보가 없다면 쇼핑몰 아이디 중복 체크
        // 업체 번호 , 공급계약번호 정보가 있다면 중복 체크는 SMP에서 
        // => (기존 등록 및 수정 로직이 같이 있게 개발이 되여 있어서 이렇게 처리 할수 밖에 없었음.)
        var checkFlag = false;
        if (mall_cd == "005" || mall_cd == "006") {
            if (sub_mall_cert_1st == "" && sub_mall_cert_2nd == "") {
                checkFlag = true;
            } else {
                // 20210420 요청 
                // 업체 번호 및 공급계약번호 정보 중 하나의 정보만 입력되여 있다면 2개의 정보 다 입력 하도록.
                if (sub_mall_cert_1st == "") {
                    $("#sub_mall_cert_1st_error").text("*" + $("#t_sub_mall_cert_1st_nm").text() + "를 입력해 주세요");
                    $("#sub_mall_cert_1st_error").show();
                    return false;
                } else {
                    $("#sub_mall_cert_1st_error").hide();
                }

                if (sub_mall_cert_2nd == "") {
                    $("#t_sub_mall_cert_2nd_nm_error").text("*" + $("#t_sub_mall_cert_2nd_nm").text() + "를 입력해 주세요");
                    $("#t_sub_mall_cert_2nd_nm_error").show();
                    return false;
                } else {
                    $("#t_sub_mall_cert_2nd_nm_error").hide();
                }
            }
        } else {
            checkFlag = true;
        }

        var submitType = $("#submitType").val();

        if (checkFlag) {
            var cv = this;
            $("li[data-mall_cd='" + mall_cd + "']").each(function() {
                if(mall_cd == "046" || mall_cd == "047"){
                    if($(this).find(".mk_id").text() == mall_cert_1st_id) {
                        if($(this).find(".mk_sub_id").text() == sub_mall_cert_1st) {
                            checkCnt ++;
                        }
                    }
                }else if(mall_cd == "008"){
                    if($(this).find(".mk_id").text() == mall_cert_1st_id) {
                        if($(this).find(".mk_sub_id").text() == sub_mall_cert_1st && $(this).find(".sub_mall_cert_2nd").text() == sub_mall_cert_2nd) {
                            checkCnt ++;
                        }
                        if($(this).find(".sub_mall_cert_2nd").text() == sub_mall_cert_2nd) {
                            checkCnt ++;
                        }
                    }
                }
                else{
                    if($(this).find(".mk_id").text() == mall_cert_1st_id) {
                        checkCnt ++;
                    }
                }
            });
        }

        if (checkCnt > 0 && submitType == "insert") {
            showAlert("동일한 정보의 몰 정보가 존재합니다.");
            return;
        }

        $(".input_box .error").hide();
        var isVali = true;
        if (mall_cert_1st_id == "") {
            $("#mall_cert_1st_id_error").show();
            isVali = false;
        }


        if (mall_cert_1st_passwd == "") {
            $("#mall_cert_1st_passwd_error").show();
            isVali = false;
        }

        if (sub_mall_auth_1st_esse_yn == "Y" && sub_mall_cert_1st == "") {
            showAlert($("#t_sub_mall_cert_1st_nm").html() + "를 입력해 주세요");
            $("#mall_cert_2nd_passwd_error").text("*" + $("#t_sub_mall_cert_1st_nm").text() + "를 입력해 주세요");
            $("#mall_cert_2nd_passwd_error").show();
            isVali = false;
        }
        if (sub_mall_auth_2nd_esse_yn == "Y" && sub_mall_cert_2nd == "") {
            showAlert($("#t_sub_mall_cert_2nd_nm").html() + "를 입력해 주세요");
            $("#t_sub_mall_cert_2nd_nm_error").text("*" + $("#t_sub_mall_cert_2nd_nm").text() + "를 입력해 주세요");
            $("#t_sub_mall_cert_2nd_nm_error").show();

            isVali = false;
        }

        if (otp_auth_esse_yn == "Y" && otp_auth_use_yn == "Y" && mall_auth_otp_key == "") {
            showAlert($("#t_mall_auth_otp_key").html() + "를 입력해 주세요");
            $("#mall_auth_otp_key_error").text("*" + $("#t_mall_auth_otp_key").text() + "를 입력해 주세요");
            $("#mall_auth_otp_key_error").show();
            isVali = false;
        } else {
            $("#mall_auth_otp_key_error").hide();
        }

        if (passwd_step == 1) {
            if (mall_cert_2nd_passwd == "") {
                $("#mall_cert_2nd_passwd_error").text("*" + $("#t_mall_cert_2nd_passwd_nm").text() + "를 입력해 주세요");
                $("#mall_cert_2nd_passwd_error").show();
                isVali = false;
            }
        }

        if (isNull(goods_cate_seq_no)) {
            $("#goods_cate_seq_no_error").text("*카테고리를 선택해 주세요");
            $("#goods_cate_seq_no_error").show();
            isVali = false;
        }

        if (!isVali) { return false; }

        var params = {
            mall_cd: mall_cd,
            cert_step: cert_step,
            mall_cert_1st_id: mall_cert_1st_id.split(' ').join(''),
            mall_cert_1st_passwd: mall_cert_1st_passwd.split(' ').join(''),
            sub_mall_cert_1st: sub_mall_cert_1st.split(' ').join(''),
            sub_mall_cert_2nd: sub_mall_cert_2nd.split(' ').join(''),
            passwd_step: passwd_step,
            mall_cert_typ_cd: mall_cert_typ_cd,
            mall_cert_2nd_passwd: mall_cert_2nd_passwd.split(' ').join(''),
            "goods_cate_seq_no": goods_cate_seq_no,
            mall_auth_otp_key: mall_auth_otp_key
        };

        var url = "";
        var message = "";
        var errorMessage = "";
        if (submitType == "insert") {
            url = '/sub/member/create_mall';
            message = "저장 되었습니다.";
            errorMessage = "저장 실패하였습니다.";
        } else {
            params.cust_mall_seq_no = $("#cust_mall_seq_no").val();

            url = '/sub/member/update_mall';
            message = "수정 되었습니다.";
            errorMessage = "수정 실패하였습니다.";
        }

        var paramArray = new Array();
        paramArray.push(params);

        $.ajax({
            url: url
            , type: 'post'
            , async: true
            , dataType: 'json'
            , contentType: 'application/json'
            , data: JSON.stringify(paramArray)
            , success: function (response) {
                if (response.result == "OK") {
                    showAlert(message, function () {
                        location.href = $(location).attr('pathname');
                    });
                } else {
                    showAlert(errorMessage);
                }
            }
            , error: function (res) {
                if (res.responseText == "ERROR") {
                    showAlert("처리 중 에러가 발생하였습니다.<br>관리자에게 문의 하세요.");
                } else {
                    showAlert(res.responseText);
                }
            }
        });

    });

    //file custom
    var QrFileTarget = $('.input_otp .hidden_file');

    QrFileTarget.on('change', function () {

        var filename = $("input[name=qr_code_file]")[0].files[0].name.split(".");
        var fileExtension = filename[filename.length - 1];
        var fileSize = $("input[name=qr_code_file]")[0].files[0].size;
        var target = $(this).siblings('.textbox_otp_file');
        if (fileSize < 10485760 && isAllowImage(fileExtension)) {
            $("#qr_code_file_err").hide();
        } else {
            $("#qr_code_file_err").show();
            $(this).val("");
            target.val("");
            return false;
        }

        var formData = new FormData();

        if ($("input[name=qr_code_file]").val()) {
            var filename = $("input[name=qr_code_file]")[0].files[0].name.split(".");
            var fileExtension = filename[filename.length - 1]
            var fileSize = $("input[name=qr_code_file]")[0].files[0].size;
            if (fileSize < 10485760 && isAllowImage(fileExtension)) {
                $("#qr_code_file_err").hide();
            } else {
                $("#qr_code_file_err").show();
                return false;
            }
            formData.append("qrcode_image_file", $("input[name=qr_code_file]")[0].files[0]);
        }

        $.ajax({
            url: '/qrcode/image/key/extraction',
            data: formData,
            processData: false,
            contentType: false,
            async: false,
            type: 'POST',
            success: function (data) {
                target.val(data);
            },
            error: function (request, status, error) {
                $(".input_otp .hidden_file").val("");
                showAlert("형식에 맞지 않은 QR코드입니다.");
            }
        });
    });
});

var fn_updateData = function(cust_mall_seq_no, mall_cd, scb_loan_cnt) {

    $("#submitType").val("edit");
    $.ajax({
        url: '/sub/member/getMallInfo',
        data: { cust_mall_seq_no: cust_mall_seq_no },
        type: 'POST',
        dataType: 'json',
        success: function (data) {

            $(".input_box .error").hide();
            $("input[name='mall_cert_1st_id']").prop("disabled", true);
            
            $(".popup_account.type1").addClass("active");
            clickM = $("#mallList" + data.mall_cd);
            var imgLogo = "/imagefile/" + data.stor_path + data.stor_file_nm;
            var mallImg = clickM.find("img");
            img_mall_name = clickM.attr("name");

            var sub_mall_cert_1st_nm = clickM.children(".sub_mall_cert_1st_nm").val();
            var sub_mall_cert_2nd_nm = clickM.children(".sub_mall_cert_2nd_nm").val();
            var mall_cert_2nd_passwd_nm = clickM.children(".mall_cert_2nd_passwd_nm").val();
            var sub_mall_cert_step = clickM.children(".sub_mall_cert_step").val();
            var mall_cd = clickM.children(".mall_cd").val();
            var passwd_step = clickM.children(".passwd_step").val();
            var sub_mall_auth_1st_esse_yn = clickM.children(".sub_mall_auth_1st_esse_yn").val();
            var sub_mall_auth_2nd_esse_yn = clickM.children(".sub_mall_auth_2nd_esse_yn").val();
            var mall_nm = clickM.children(".mall_nm").val();

            var otp_auth_use_yn = clickM.children(".otp_auth_use_yn").val();
			var otp_auth_esse_yn = clickM.children(".otp_auth_esse_yn").val();
			var otp_auth_typ_cd = clickM.children(".otp_auth_typ_cd").val();
			var otp_auth_typ_cd_nm = clickM.children(".otp_auth_typ_cd_nm").val();

            $("input[name='cust_mall_seq_no']").val(cust_mall_seq_no);
            $("input[name='mall_nm']").val(data.mall_nm);
            $("input[name='mall_cd']").val(data.mall_cd);
            $("input[name='cert_step']").val(data.cert_step);
            $("input[name='mall_cert_1st_id']").val(data.mall_cert_1st_id);
            $("input[name='mall_cert_1st_passwd']").val("");
            $("input[name='sub_mall_cert_1st']").val(data.sub_mall_cert_1st);
            $("input[name='sub_mall_cert_2nd']").val(data.sub_mall_cert_2nd);
            $("input[name='passwd_step']").val(data.passwd_step);
            $("#i_mall_cert_typ_cd").html('<option value="A00"></option>');
            $("input[name='mall_cert_2nd_passwd']").val("");
            $("input[name='sub_mall_auth_1st_esse_yn']").val(sub_mall_auth_1st_esse_yn);
            $("input[name='sub_mall_auth_2nd_esse_yn']").val(sub_mall_auth_2nd_esse_yn);

            $("[name='goods_cate_seq_no']").val(data.goods_cate_seq_no);

            $("input[name='mall_auth_otp_key']").val(data.mall_auth_otp_key);
            $("input[name='otp_auth_use_yn']").val(otp_auth_use_yn);
			$("input[name='otp_auth_esse_yn']").val(otp_auth_esse_yn);
			$("input[name='otp_auth_typ_cd']").val(otp_auth_typ_cd);
			$("input[name='otp_auth_typ_cd_nm']").val(otp_auth_typ_cd_nm);

            // 에러 메세지 추가
            if (data.cust_mall_sts_cd == "ERR") {
                $(".mall_error_msg").show();
                $(".mall_error_msg").text("* " + data.scra_err_cd_desc);
            } else {
                $(".mall_error_msg").hide();
            }


            if (data.fst_scra_yn == 'Y') {
                $("input[name='mall_cert_1st_id']").attr("readonly", true);
            } else {
                $("input[name='mall_cert_1st_id']").attr("readonly", false);
            }

            if (clickM.children(".sub_mall_cert_1st_nm").val() == "" || sub_mall_cert_1st_nm == null) {
                $("#div_sub_mall_cert_1st_nm").hide();
            } else {
                $("#t_sub_mall_cert_1st_nm").html(sub_mall_cert_1st_nm);
                $("#div_sub_mall_cert_1st_nm").show();
            }

            if (clickM.children(".sub_mall_cert_2nd_nm").val() == "" || sub_mall_cert_2nd_nm == null) {
                $("#div_sub_mall_cert_2nd_nm").hide();
            } else {
                $("#t_sub_mall_cert_2nd_nm").html(sub_mall_cert_2nd_nm);
                $("#div_sub_mall_cert_2nd_nm").show();
            }

            if (clickM.children(".mall_cert_2nd_passwd_nm").val() == "" || mall_cert_2nd_passwd_nm == null) {
                $("#div_mall_cert_2nd_passwd_nm").hide();
            } else {
                $("#t_mall_cert_2nd_passwd_nm").html(mall_cert_2nd_passwd_nm);
                $("#div_mall_cert_2nd_passwd_nm").show();
            }

            if (clickM.children(".mall_cert_typ").length == 0) {
                $("#div_mall_cert_typ_cd").hide();
            } else {
                var html = "";
                clickM.children(".mall_cert_typ").each(function (i, v) {
                    html += "<option value='" + $(this).val() + "'>" + $(this).data("type_nm") + "</option>";
                });
                $("#i_mall_cert_typ_cd").html(html);
                $("#i_mall_cert_typ_cd").val(data.mall_cert_typ_cd);
                $("#i_mall_cert_typ_cd").prop("disabled", false);
                $("#div_mall_cert_typ_cd").show();
            }
            $(".popup_account.type1 .logo_area_account img").attr('src', imgLogo);

            if (clickM.children(".otp_auth_use_yn").val() == "Y" || otp_auth_use_yn == "Y") {
				if (otp_auth_typ_cd == "OTP001") {
					$(".input_otp.file > input[name=mall_auth_otp_key]").attr("disabled", true);
					$(".input_otp.file > input[name=mall_auth_otp_key]").attr("class", "textbox_otp_file");
					$(".input_otp.file > label[for=fileUpload]").show();
				} else if (otp_auth_typ_cd == "OTP002") {
					$(".input_otp.file > input[name=mall_auth_otp_key]").attr("disabled", false);
					$(".input_otp.file > input[name=mall_auth_otp_key]").attr("class", "textbox_mb");
					$(".input_otp.file > label[for=fileUpload]").hide();
				}

				$("#div_mall_auth_otp_key").show();
			} else {
				$("#div_mall_auth_otp_key").hide();
			}

            if (clickM.children(".mall_cd").val() == "008" || mall_cd == "008") {

				document.getElementById("mall_btn").style.display = "inline-block";
				document.getElementById("i_sub_mall_cert_1st_nm").style.width = "70%";
				
			} else {
				document.getElementById("mall_btn").style.display = "none";
				document.getElementById("i_sub_mall_cert_1st_nm").style.width = "100%";
			}

            /**
             * 2020-06-24 판매몰별 도움말 & 영상 설정
             */
            setHelpInfo(clickM);
            setVideoInfo(clickM);
        }
    });
}

// 삭제 버튼 클릭 이벤트
var fn_remove = function(cust_mall_seq_no, mall_cd, scb_loan_cnt) {
    
    // 2021.05.12 SC제일은행 대출 신청된 판매몰 삭제 막기 추가
    if (scb_loan_cnt > 0) {
        showAlert("SC제일은행 대출을 이용 중인 고객님은 <br>대출을 사용하시는 기간 동안 쇼핑몰의 삭제가 불가능합니다.");
        return false;
    }

    // 2021.03.11 대출 신청된 판매몰 삭제 막기 추가
    var checkCnt = 0;
    var svcDescp = '';
    $("input:checkbox[name=loan_chk]:checked").each(function() {
        if (cust_mall_seq_no == $(this).data("cust-mall-seq-no")) {
            checkCnt++;
            svcDescp = $(this).data("loan-svc-descp");
            return false;
        }
    });

    if (checkCnt > 0) {
        showAlert(svcDescp + " 대출을 이용 중인 고객님은 <br>대출을 사용하시는 기간 동안 쇼핑몰의 삭제가 불가능합니다.");
        return false;
    }

    $("#cust_mall_seq_no").val(cust_mall_seq_no);
    var modalId = showConfirm("계정을 삭제하시겠습니까?", function () {
        var param = { cust_mall_seq_no: $("#cust_mall_seq_no").val() };
        $.ajax({
            url: '/sub/member/delete_mall',
            data: param,
            type: 'POST',
            success: function (data) {
                if ("OK" == data) {
                    location.href = $(location).attr('pathname');
                } else {
                    showAlert("에러 발생하였습니다.");
                }
            }, error: function (res) {
                removeModal(modalId);
                if (res.responseText == "can_not_delete") {
                    showAlert("대출 중인 판매몰은 삭제 불가능합니다.");
                } else {
                    showAlert("에러 발생하였습니다.");
                }
            }
        });
    });
}

var type1Close = function() {
    $(".popup_account.type1").removeClass("active");
}