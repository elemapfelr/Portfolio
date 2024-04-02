// 이용권 변경 모달 Show
let eventNo = $('#eventNo').val();
let pressedBtnShowModalForTicket = eventNo == 0 ? function() {
    // 에러 문구 초기화
    $("#errorForTicket").css("display", "none");

    // TODO : 추후 이용권이 추가되는 경우 수정 필요
    var goods_seq_no = parseInt($("#basic_goods_seq_no").val());
    var htmlStr = '';
    htmlStr += '<div class="popup_2_contents">';
    htmlStr += '    <div id="ticket_types">';
    htmlStr += '        <div class="ticket_type_header"><h1>현재 이용권</h1></div>';
    htmlStr += '        <div class="ticket_type_body">';

    if (goods_seq_no == 1) { // 로니봇
        htmlStr += '        <div class="ticket_type_box ronibot">';
        htmlStr += '            <h2><span id="roni">로니봇</span></h2>';
        htmlStr += '            <h3>매월 <strong>' + fnAddComma($("#rnbFnaPrc").val()) + ' 원</strong></h3>';
        htmlStr += '        </div>';
    } else if (goods_seq_no == 2) {
        htmlStr += '        <div class="ticket_type_box paibot">';
        htmlStr += '            <h2><span id="pai">파이봇</span></h2>';
        htmlStr += '            <h3>매월 <strong>' + fnAddComma($("#pybFnaPrc").val()) + ' 원</strong></h3>';
        htmlStr += '        </div>';
    } else {
        htmlStr += '        <div class="ticket_type_box freebot">';
        htmlStr += '            <h2><span id="free">프리봇</span></h2>';
        htmlStr += '        </div>';
    }

    htmlStr += '        </div>';
    htmlStr += '    </div>';
    htmlStr += '</div>';

    htmlStr += '<div class="popup_2_contents">';
    htmlStr += '    <div id="ticket_types">';
    htmlStr += '        <div class="ticket_type_header"><h1>변경할 이용권</h1></div>';
    htmlStr += '        <div class="ticket_type_body">';

    if (goods_seq_no == 1) { // 로니봇 -> 파이봇
        htmlStr += '        <div class="ticket_type_box ronibot" id="newTicketRNB" style="display: none;">';
        htmlStr += '            <h2><span id="roni">로니봇</span></h2>';
        htmlStr += '            <h3>매월 <strong>' + fnAddComma($("#rnbFnaPrc").val()) + ' 원</strong></h3>';
        htmlStr += '            <div class="btn_line">';
        htmlStr += '                <div class="current_selected_ticket">';
        htmlStr += '                    <span class="ronibot active"></span><span class="paibot"></span>';
        htmlStr += '                </div>';
        htmlStr += '                <button type="button" id="change_ticket" onclick="pressedBtnChangeTicket();">변경하기</button>';
        htmlStr += '            </div>';
        htmlStr += '        </div>';
        htmlStr += '        <div class="ticket_type_box paibot" id="newTicketPYB">';
        htmlStr += '            <h2><span id="pai">파이봇</span></h2>';
        htmlStr += '            <h3>매월 <strong>' + fnAddComma($("#pybFnaPrc").val()) + ' 원</strong></h3>';
        htmlStr += '            <div class="btn_line">';
        htmlStr += '                <div class="current_selected_ticket">';
        htmlStr += '                    <span class="ronibot"></span><span class="paibot active"></span>';
        htmlStr += '                </div>';
        htmlStr += '                <button type="button" id="change_ticket" onclick="pressedBtnChangeTicket();">변경하기</button>';
        htmlStr += '            </div>';
        htmlStr += '        </div>';

        $("#new_basic_goods_seq_no").val($("#pybGoodsSeqNo").val());
        $("#new_basic_goods_opt_seq_no").val($("#pybGoodsOptSeqNo").val());
    } else if (goods_seq_no == 2) { // 파이봇 -> 로니봇
        htmlStr += '        <div class="ticket_type_box ronibot" id="newTicketRNB">';
        htmlStr += '            <h2><span id="roni">로니봇</span></h2>';
        htmlStr += '            <h3>매월 <strong>' + fnAddComma($("#rnbFnaPrc").val()) + ' 원</strong></h3>';
        htmlStr += '            <div class="btn_line">';
        htmlStr += '                <div class="current_selected_ticket">';
        htmlStr += '                    <span class="ronibot active"></span><span class="paibot"></span>';
        htmlStr += '                </div>';
        htmlStr += '                <button type="button" id="change_ticket" onclick="pressedBtnChangeTicket();">변경하기</button>';
        htmlStr += '            </div>';
        htmlStr += '        </div>';
        htmlStr += '        <div class="ticket_type_box paibot" id="newTicketPYB" style="display: none;">';
        htmlStr += '            <h2><span id="pai">파이봇</span></h2>';
        htmlStr += '            <h3>매월 <strong>' + fnAddComma($("#pybFnaPrc").val()) + ' 원</strong></h3>';
        htmlStr += '            <div class="btn_line">';
        htmlStr += '                <div class="current_selected_ticket">';
        htmlStr += '                    <span class="ronibot"></span><span class="paibot active"></span>';
        htmlStr += '                </div>';
        htmlStr += '                <button type="button" id="change_ticket" onclick="pressedBtnChangeTicket();">변경하기</button>';
        htmlStr += '            </div>';
        htmlStr += '        </div>';

        $("#new_basic_goods_seq_no").val($("#rnbGoodsSeqNo").val());
        $("#new_basic_goods_opt_seq_no").val($("#rnbGoodsOptSeqNo").val());
    } else { // 프리봇 -> 로니봇 -> 파이봇
        htmlStr += '        <div class="ticket_type_box" id="newTicketFRB" style="display: none;">';
        htmlStr += '            <h2><span id="free">프리봇</span></h2>';
        htmlStr += '            <div class="btn_line">';
        htmlStr += '                <div class="current_selected_ticket">';
        htmlStr += '                    <span class="freebot active"></span><span class="ronibot"></span><span class="paibot"></span>';
        htmlStr += '                </div>';
        htmlStr += '                <button type="button" id="change_ticket" onclick="pressedBtnChangeTicket();">변경하기</button>';
        htmlStr += '            </div>';
        htmlStr += '        </div>';
        htmlStr += '        <div class="ticket_type_box ronibot" id="newTicketRNB">';
        htmlStr += '            <h2><span id="roni">로니봇</span></h2>';
        htmlStr += '            <h3>매월 <strong>' + fnAddComma($("#rnbFnaPrc").val()) + ' 원</strong></h3>';
        htmlStr += '            <div class="btn_line">';
        htmlStr += '                <div class="current_selected_ticket">';
        htmlStr += '                    <span class="freebot"></span><span class="ronibot active"></span><span class="paibot"></span>';
        htmlStr += '                </div>';
        htmlStr += '                <button type="button" id="change_ticket" onclick="pressedBtnChangeTicket();">변경하기</button>';
        htmlStr += '            </div>';
        htmlStr += '        </div>';
        htmlStr += '        <div class="ticket_type_box paibot" id="newTicketPYB" style="display: none;">';
        htmlStr += '            <h2><span id="pai">파이봇</span></h2>';
        htmlStr += '            <h3>매월 <strong>' + fnAddComma($("#pybFnaPrc").val()) + ' 원</strong></h3>';
        htmlStr += '            <div class="btn_line">';
        htmlStr += '                <div class="current_selected_ticket">';
        htmlStr += '                    <span class="freebot"></span><span class="ronibot"></span><span class="paibot active"></span>';
        htmlStr += '                </div>';
        htmlStr += '                <button type="button" id="change_ticket" onclick="pressedBtnChangeTicket();">변경하기</button>';
        htmlStr += '            </div>';
        htmlStr += '        </div>';

        $("#new_basic_goods_seq_no").val($("#rnbGoodsSeqNo").val());
        $("#new_basic_goods_opt_seq_no").val($("#rnbGoodsOptSeqNo").val());
    }

    htmlStr += '        </div>';
    htmlStr += '    </div>';
    htmlStr += '</div>';

    var promotionFlag = false;
    if ($('#addn_goods_nm').val() == '파이봇') { // addn_goods_nm 무료 프로모션 상품명
        promotionFlag = true;
    }

    if (promotionFlag) {
        var modalId = showConfirm('현재 프로모션 혜택으로 무료 이용 중이에요.<br/>결제신청 페이지로 이동하시겠어요?<br/>(무료 이벤트이용권은 다시 받을 수 없어요)', function () {
            removeModal(modalId);

            $("#changeTicketDetailArea").html(htmlStr);
            $("#ChangeTicketModal").css("display", "flex");
        });
    } else {
        $("#changeTicketDetailArea").html(htmlStr);
        $("#ChangeTicketModal").css("display", "flex");
    }

    // 모달 Show
} : eventNo == 52 ? function() {
    if ($('#basic_can_deny_yn').val() === 'Y') {
        // showAlert('이벤트 이용권을 변경하실 수 없습니다. 고객센터<br/>(1666-8216)로 평일 10~19시에 문의해주세요');
        // return;

        showConfirm("'이벤트 이용권을 변경하실 수 없습니다. 셀러봇캐시 챗봇으로 문의 하시겠습니까?", function () {
            window.open('https://9p9j3.channel.io/lounge');
        });
        return;
    }

    $('#curTicketPYB').css('display', 'none');
    $('#newTicketPYB').css('display', 'none');
    $('#errorForTicket').css('display', 'none');
    $('#selectBox_ronibot option:eq(0)').attr('selected', 'selected');
    $('#ChangeTicketModal').css('display', 'flex');
} : {};

// 이용권 변경
let pressedBtnChangeTicket = function() {
    var new_basic_goods_seq_no = parseInt($("#new_basic_goods_seq_no").val());

    // 로니봇, 파이봇
    if ($("#newTicketFRB").css("display") == undefined) {
        switch (new_basic_goods_seq_no) {
            case 1: // 로니봇 -> 파이봇
                $("#newTicketRNB").css("display", "none");
                $("#newTicketPYB").css("display", "block");
                $("#new_basic_goods_seq_no").val($("#pybGoodsSeqNo").val());
                $("#new_basic_goods_opt_seq_no").val($("#pybGoodsOptSeqNo").val());
                break;
            default: // 파이봇 -> 로니봇
                $("#newTicketRNB").css("display", "block");
                $("#newTicketPYB").css("display", "none");
                $("#new_basic_goods_seq_no").val($("#rnbGoodsSeqNo").val());
                $("#new_basic_goods_opt_seq_no").val($("#rnbGoodsOptSeqNo").val());
                break;
        }
    }
    else { // 프리봇, 로니봇, 파이봇
        switch (new_basic_goods_seq_no) {
            case 1: // 로니봇 -> 파이봇
                $("#newTicketFRB").css("display", "none");
                $("#newTicketRNB").css("display", "none");
                $("#newTicketPYB").css("display", "block");
                $("#new_basic_goods_seq_no").val($("#pybGoodsSeqNo").val());
                $("#new_basic_goods_opt_seq_no").val($("#pybGoodsOptSeqNo").val());
                break;
            case 2: // 파이봇 -> 프리봇
                $("#newTicketFRB").css("display", "block");
                $("#newTicketRNB").css("display", "none");
                $("#newTicketPYB").css("display", "none");
                $("#new_basic_goods_seq_no").val('');
                $("#new_basic_goods_opt_seq_no").val('');
                break;

            default: // 프리봇 -> 로니봇
                $("#newTicketFRB").css("display", "none");
                $("#newTicketRNB").css("display", "block");
                $("#newTicketPYB").css("display", "none");
                $("#new_basic_goods_seq_no").val($("#rnbGoodsSeqNo").val());
                $("#new_basic_goods_opt_seq_no").val($("#rnbGoodsOptSeqNo").val());
                break;
        }
    }
};

// 이용권 변경
let agreeChangeTicket = eventNo == 0 ? function() { 
    // TODO : 추후 이용권이 추가되는 경우 수정 필요
    if ($("#basic_goods_seq_no").val() == $("#new_basic_goods_seq_no").val()) {
        showAlert("변경할 이용권이 현재 이용권과 동일합니다.");
        return;
    }

    if ($("#new_basic_goods_seq_no").val() == '') { // 프리봇 선택 시 해지 처리
        // pressedBtnCancel($("#basic_goods_opt_seq_no").val());
        pressedBtnCancel($("#basic_goods_req_seq_no").val());
    }
    else if ($("#basic_goods_seq_no").val() == '') { // 프리봇에서 이용권 변경 시 결제 처리
        if ($("#new_basic_goods_seq_no").val() == $("#rnbGoodsSeqNo").val()) // 프리봇 -> 로니봇
            location.href = "/sub/payment/payment?type=RNB";
        else if ($("#new_basic_goods_seq_no").val() == $("#pybGoodsSeqNo").val()) // 프리봇 -> 로니봇
            location.href = "/sub/payment/payment?type=PYB";
    }
    else { // 이용권 변경 처리
        if ($("#new_basic_goods_seq_no").val() == $("#rnbGoodsSeqNo").val()) { // 파이봇 -> 로니봇
            // 파이봇 -> 로니봇 변경 시 등록된 몰이나 계좌 수량 오버 시 이용권 변경 불가
            var isChange = true;
            if ($("#isRegMall").val() == 'N')
                isChange = false;

            if (!($("#addn_goods_req_seq_no").val() != null && $("#addn_goods_req_seq_no").val() != '') && $("#isRegAcct").val() == 'N')
                isChange = false;

            if (!isChange) {
                $("#errorForTicket").css("display", "block");
                return;
            }
        }

        // 모달 창 Close
        $("#ChangeTicketModal").css("display", "none");

        var params = {
            "goods_req_seq_no": $("#basic_goods_req_seq_no").val(),
            "new_goods_opt_seq_no": $("#new_basic_goods_opt_seq_no").val(),
            "new_goods_seq_no": $("#new_basic_goods_seq_no").val()
        };

        $.post("/sub/my/changeTicket", $.param(params), function() {
            showAlert("이용권 변경이 완료되었습니다.", function() {
                location.reload();
            });
        })
        .fail(function() {
            showAlert("요청이 실패하였습니다.");
        });
    }
} : eventNo == 52 ? function() {
   
    let oldOptSeqNo = $("#basic_goods_opt_seq_no").val();
    let newOptSeqNo = 0, newSeqNo = 0;

    if ($("#newTicketRNB").css('display') == 'block') {
        newOptSeqNo = $('#selectBox_ronibot option:selected').data('seq');
        newSeqNo = $("#rnbGoodsSeqNo").val();
    } else if ($("#newTicketPYB").css('display') == 'block') {
        newOptSeqNo = $('#selectBox_paibot option:selected').data('seq');
        newSeqNo = $("#pybGoodsSeqNo").val();
    } else {
        return;
    }

    if (oldOptSeqNo == newOptSeqNo) {
        showAlert("변경할 이용권이 현재 이용권과 동일합니다.");
        return;
    }

    if (newSeqNo == $("#rnbGoodsSeqNo").val()) {
        // 파이봇 -> 로니봇 변경 시 등록된 몰이나 계좌 수량 오버 시 이용권 변경 불가
        if ($("#isRegMall").val() == 'N') {
            $("#errorForTicket").css("display", "block");
            return;
        }
    }

    $("#ChangeTicketModal").css("display", "none");

    $.post("/sub/my/changeTicket/refund", 
    $.param({
        "goods_req_seq_no": $("#basic_goods_req_seq_no").val(),
        "new_goods_seq_no": newSeqNo,
        "new_goods_opt_seq_no": newOptSeqNo
    }))
    .done(function() { 
        showAlert("이용권 변경이 완료되었습니다.", function() {
            location.reload();
        });
    })
    .fail(function() {
        showAlert("요청이 실패하였습니다.");
    });

} : {};

// 결제수단 변경 모달 Show
let pressedBtnShowModalForCard = function() {
    // var params = [];
    var goodsList = [];
    var price = 0;
    var goodName = '';
    if ($("#basic_goods_req_seq_no").val() != null && $("#basic_goods_req_seq_no").val() != '') {
        var basicGoodsInfo = {
            'r': $("#basic_goods_req_seq_no").val(),
            's': $("#basic_goods_seq_no").val(),
            'o': $("#basic_goods_opt_seq_no").val(),
            'n': encodeURI($("#basic_goods_nm").val()),
            'p': $("#basic_fna_pay_prc").val()
        };
        goodsList.push(basicGoodsInfo);

        price += parseInt($("#basic_fna_pay_prc").val());
        goodName = $("#basic_goods_nm").val();
    }

    if ($("#addn_goods_req_seq_no").val() != null && $("#addn_goods_req_seq_no").val() != '') {
        var addnGoodsInfo = {
            'r': $("#addn_goods_req_seq_no").val(),
            's': $("#addn_goods_seq_no").val(),
            'o': $("#addn_goods_opt_seq_no").val(),
            'n': encodeURI($("#addn_goods_nm").val()),
            'p': $("#addn_fna_pay_prc").val()
        };
        goodsList.push(addnGoodsInfo);

        price += parseInt($("#addn_fna_pay_prc").val());
        if (goodName == '')
            goodName = $("#addn_goods_nm").val();
        else if ($("#addn_goods_nm").val() != null && $("#addn_goods_nm").val() != '') {
            var period = parseInt($("#addn_period").val());
            if (period == 12)
                goodName += '+' + $("#addn_goods_nm").val() + ' 1년';
            else
                goodName += '+' + $("#addn_goods_nm").val() + ' ' + period + '개월';
        }
    }

    $.ajax({
        url: '/sub/payment/getSignature',
        data: { mid: $("#SendPayForm_id [name=mid]").val(), price: price },
        async: false,
        type: 'POST',
        dataType: 'json',
        success: function (r) {
            if (r.signature) {
                $("#SendPayForm_id [name=price]").val(price);
                $('#SendPayForm_id [name=goodname]').val(goodName);

                if ($("#DeviceType").val() == 'PC') {
                    $("#SendPayForm_id [name=oid]").val(r.oid);
                    $("#SendPayForm_id [name=timestamp]").val(r.timestamp);
                    $("#SendPayForm_id [name=signature]").val(r.signature);

                    var data = new Object();
                    data.mode = 'change';
                    data.goodsList = goodsList;

                    $("#SendPayForm_id [name=merchantData]").val(JSON.stringify(data));
                    INIStdPay.pay('SendPayForm_id');
                } else {
                    $("#SendPayForm_id [name=orderid]").val(r.oid);
                    $("#SendPayForm_id [name=timestamp]").val(r.timestamp);
                    $("#SendPayForm_id [name=hashdata]").val(r.hash);

                    var data = new Object();
                    data.mode = 'change';
                    data.goodsList = goodsList;
                    data.buyerName = $('#SendPayForm_id [name="buyername"]').val();
                    data.buyerTel = $('#SendPayForm_id [name="buyertel"]').val();
                    data.buyerEmail = $('#SendPayForm_id [name="buyeremail"]').val();

                    $("#SendPayForm_id [name=p_noti]").val(JSON.stringify(data));
                    $("#SendPayForm_id").submit();
                }
            } else {
            }
        },
        error: function (response, status, error) {
            showAlert("서버 에러.");
        }
    });
};

// 이용권 해지
let pressedBtnCancel = eventNo == 0 ? function(seqNo) {

    if ($('#addn_goods_req_seq_no').val() == seqNo && $('#addn_cancle_product_yn').val() == 'Y') {
        // showAlert('무료 이용기간 종료 후 자동 해지될 예정이에요.<br/>지금 바로 해지를 원하시는 경우에는<br/>셀러봇캐시 챗봇 또는 고객센터 1666-8216으로 <br/>문의하여 주시기 바랍니다');
        // return;

        showConfirm("'무료 이용기간 종료 후 자동 해지될 예정이에요.<br/> 지금 바로 해지를 원하시는 경우<br/> 셀러봇캐시 챗봇으로 문의 하시겠습니까?", function () {
            window.open('https://9p9j3.channel.io/lounge');
        });
        return;
    } else {
        var url = "/sub/my/paidCancel";
        if (seqNo != null) {
            url += "?goodsReqSeqNo=" + seqNo;
        }
        location.href = url;
    }


} : eventNo == 52 ? function(seqNo) {

    if ($('#basic_can_deny_yn').val() === 'Y') {
        // showAlert('이벤트 이용권 해지를 원하실 경우, 고객센터<br/>(1666-8216) 로 평일 10~18시에 문의해주세요');
        // return;

        showConfirm("'이벤트 이용권 해지를 원하실 경우,  셀러봇캐시 챗봇으로 문의 하시겠습니까?", function () {
            window.open('https://9p9j3.channel.io/lounge');
        });
        return;
    }
    location.href = "/sub/my/paidCancel?goodsReqSeqNo=" + seqNo;

} : {};

// 결제수단 변경
let pressedBtnChangeCard = function() {
    // 카드번호 확인
    if ($("#cardNum1").val() == "" || $("#cardNum2").val() == "" ||
        $("#cardNum3").val() == "" || $("#cardNum4").val() == "") {
        showAlert("카드번호를 입력해주세요.");
        return;
    }

    for (var i = 1; i < 5; i++) {
        var cardNum = $("#cardNum" + i).val();
        var length = cardNum.length;

        if ((i != 4 && length < 4) || (i == 4 && length < 3)) {
            showAlert("카드번호를 다시 입력해주세요.");
            $("#cardNum" + i).val("");
            $("#cardNum" + i).focus();
            return;
        }
    }

    // 유효기간 확인
    if ($("#expMnth").val() == "" || $("#expYear").val() == "") {
        showAlert("유효기간을 입력해주세요.");
        return;
    }

    if (($("#expMnth").val().length < 2)) {
        showAlert("유효기간을 다시 입력해주세요.");
        $("#expMnth").val("");
        $("#expMnth").focus();
        return;
    }

    if (($("#expYear").val().length < 2)) {
        showAlert("유효기간을 다시 입력해주세요.");
        $("#expYear").val("");
        $("#expYear").focus();
        return;
    }

    // 비밀번호 확인
    if ($("#pwLst2Digit").val() == "") {
        showAlert("비밀번호 뒤 2자리를 입력해주세요.");
        return;
    }

    if (($("#pwLst2Digit").val().length < 2)) {
        showAlert("비밀번호를 다시 입력해주세요.");
        $("#pwLst2Digit").val("");
        $("#pwLst2Digit").focus();
        return;
    }

    // 약관 동의 확인
    if (!$("#agree_chk").is(":checked")) {
        $("#errorForCard").css("display", "block");
        return;
    }

    // 모달 창 Close
    $("#ChangeCardModal").css("display", "none");

    var params = {
        "card_num": $("#cardNum1").val() + $("#cardNum2").val() + $("#cardNum3").val() + $("#cardNum4").val(),
        "exp_dt_mnth": $("#expMnth").val(),
        "exp_dt_year": $("#expYear").val(),
        "pw_last_two_digit": $("#pwLst2Digit").val()
    };

    $.post("/sub/my/changeCard", $.param(params), function (res) {
        showAlert("결제수단 변경이 완료되었습니다.", function () {
            location.reload();
        });
    })
    .fail(function (response) {
        showAlert("요청이 실패하였습니다.");
    });
};

// 포인트 사용예약
let pressedBtnReservPoi = function(poi_sum) {
    if (poi_sum <= 0) {
        showAlert("예약 가능한 포인트가 없습니다.");
        return;
    }

    var param = {
        "reserv_poi": poi_sum
    };

    $.post("/sub/my/reservPoi", $.param(param), function (res) {
        showAlert("포인트 사용 예약되었습니다.", function () {
            location.reload();
        });
    })
    .fail(function (response) {
        showAlert("요청이 실패하였습니다.");
    });
};

// 포인트 예약취소
let pressedBtnReservCancel = function(seqNo) {
    var param = {
        "use_reserv_seq_no": seqNo
    };

    $.post("/sub/my/cancelReservPoi", $.param(param), function (res) {
        showAlert("포인트 사용 예약이 취소되었습니다.", function () {
            location.reload();
        });
    })
    .fail(function (response) {
        showAlert("요청이 실패하였습니다.");
    });
};
