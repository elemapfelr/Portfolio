//---------------------------------------------------------------------------------------------
// 이용요금 안내 -> 이용권 안내 화면
//---------------------------------------------------------------------------------------------
var discList = [
    // 정산예정금 통합관리
    [{ title: "정산예정금 한 눈에 보기", disc: "정산예정금을 오픈마켓과 비오픈마켓으로 나누어 배송상태별, 정산일자별로 요약해서 볼 수 있어요!" },
    { title: "정산예정금 상세보기", disc: "정산내역을 판매몰에서 보는 것처럼 상세히 보여주고, 누구도 알려주지 않았던 ‘알 수 없는 공제금액’도 보여드려요." },
    { title: "정산예정금 달력", disc: "언제 얼마나 정산 받을지 항상 궁금했나요? 이제 셀러봇 정산예정금 달력에서 바로 확인하세요~" },
    { title: "판매몰별 관리팁", disc: "아직도 받지 못한 유보금, 나도 모르게 줄줄 새고 있는 광고비, 누락된 정산금 등 똘똘한 셀러봇이 잡아서 알려줘요!" }],
    // 정산예정금 알림톡
    [{ title: "매일 받는 알림톡 리포트", disc: "바쁜 와중에 언제 정산예정금을 다 세고 있나요? 셀러봇이 카톡으로 주는 정산예정금 리포트를 매일 받아봐요." }],
    // 정산계좌 통합관리
    [{ title: "판매몰별 입금내역", disc: "어떤 판매몰에서 얼마나 들어왔는지 한 눈에 알려주니깐, 제가 바로 정산금 비서죠!" },
    { title: "정산계좌 입출금 상세내역", disc: "모든 은행의 계좌 입출금 내역도 한 곳에서 한 번에!" }],
    // 매출 통계
    [{ title: "매출 현황 요약 보고", disc: "언제, 어디에서 매출이 얼마나 있었는지, 어떤 판매몰에서 수수료를 많이 떼어갔는지 알고 있나요?" },
    { title: "3년간 매출 통계 & 분석", disc: "분석 최근 3년까지의 데이터도 분석해주니깐 스마트한 셀링 파트너라고 말하고 다녀도 되겠죠?" },
    { title: "매출 분석 그래프", disc: "숫자가 많아서 보기 힘들다구요? ㅠ 그래프로도 한 눈에 확인해요." }],
    // 과거 정산금 통계
    [{ title: "정산금 현황 요약 보고", disc: "당신이 언제, 얼마나를 받았는지, 공제금액/유보금액은 얼마인지 알려주는 세계 최초의 로봇입니다. (아마두?)" },
    { title: "3년간 정산금 통계 & 분석", disc: "최근 3년동안 얼마나 정산받았고, 유보금/공제금액이 발생했는지 볼 수 있죠." },
    { title: "매출 vs 정산금 비교 그래프", disc: "매출과 정산금을 비교해서 누가 이겼는지 알려줘요." },
    { title: "정산금 vs 입금 비교 그래프", disc: "판매몰에서 정산금을 제대로 입금해줬는지 검사해볼까요?" }],
    // 반품 통계
    [{ title: "반품 현황 요약 보고", disc: "어디에서 반품이 제일 많았는지, 판매자님만 몰래 알려드릴께요~" },
    { title: "3년간 반품 통계 & 분석", disc: "지난 3년간 반품 통계를 보여주고 분석까지!" },
    { title: "반품 분석 그래프", disc: "이 많은 데이터를 그래프로 휙휙 그려서 한 눈에 확인." }],
    // 동종업계 매출추이
    [{ title: "나의 매출랭킹", disc: "우리 회사가 얼마나 잘하게요~? 매출랭킹으로 오세요~" },
    { title: "3년간 반품 통계 & 분석매출랭킹 변동추이", disc: "영원한 1등은 없다… 매출 랭킹 변화를 그래프로 보면서 더 열심히 해봐요." },
    { title: "분야별 랭킹 top10", disc: "각 분야의 TOP 10은 매출액이 얼마나 될까요?" }],
    // 점프 서비스
    [{ title: "점프서비스", disc: "판매몰부터 관공서까지~~ 로그인 절차 없이 순간이동 하는 사이보그 셀러봇~" }],
    // 금융 서비스
    [{ title: "금융 상품 추천 LIST", disc: "내게 맞는 금융상품을 추천 받고, 이제는 금융사도 당당하게 직접 선택하자구요~" }],
];

/**
 * 이용권 비교 화면의 내용 갱신
 * @param {*} obj 
 */
var updateSubMenu = function (obj) {
    var index = 0;
    if (obj != null)
        index = obj.value;

    var discInfo = discList[index];

    // 서브 메뉴 갱신
    var htmlText = '';
    var activeClass = 'class="secound_click_active"';
    for (var i = 0; i < discInfo.length; i++) {
        htmlText += '<li ' + (i == 0 ? activeClass : '') + ' value="' + i + '" onclick="selectSubMenu(this);">';
        htmlText += discInfo[i].title;
        htmlText += '</li>';
    }

    htmlText += '<li id="discTextArea" value="' + discInfo.length + '">' + discInfo[0].disc + '</li>';
    $("#subMenu").html(htmlText);

    // 하단 이미지들 설정
    var htmlText = '';
    var path = '/assets/images/ticket_img';
    var type = '';

    // 정확하지 않음...수정 필요
    if($("#DeviceType").val() == 'PC') // PC
        type = '/PC/';
    else // Mobile
        type = '/Mobile/';

    for (var i = 0; i < discInfo.length; i++) {
        htmlText += '<div class="swiper-slide">';
        htmlText += '   <img class="botttom_slide1" src="' + path + type + index + '_' + i + '.png" alt="">';
        htmlText += '</div>';
    }

    $("#discImgArea").html(htmlText);

    // 좌/우 버튼에 다음 서브 메뉴명 설정
    var nextIdx = (discList[index].length == 1) ? 0 : 1;
    var prevIdx = (discList[index].length == 1) ? 0 : discList[index].length-1;
    
    $(".swiper-container_bottom .swiper-button-next").html("<span class='nav_text'>" + discList[index][nextIdx].title + "</span>");
    $(".swiper-container_bottom .swiper-button-prev").html("<span class='nav_text'>" + discList[index][prevIdx].title + "</span>");

    // 슬라이드 갱신
    mySwiper22.slideTo(0);
    mySwiper22.update();
};

/**
 * 이용권 비교 화면의 서브 메뉴 이벤트
 * @param {*} obj 
 */
var selectSubMenu = function(obj) {
    var index = 0;
    if($("#DeviceType").val() == 'PC') // PC
        index = $("#bottom_slider_menu").find(".click_menu").val();
    else
        index = $("#menuSelect").val();

    var discInfo = discList[index];
    mySwiper22.slideTo(obj.value, 500);
};

/**
 * 무료 프로모션 상품 이벤트
 * @param {*} ticket 
 */
var pressedBtnPromotion = function(ticket) {
    if (ticket == 'bankbot') {
        var modalId = showConfirm("뱅크봇 프로모션을 신청하시겠습니까?", function () {
            
            $.ajax({
                url: '/sub/payment/promotion',
                data: { 
                    goodsTyp: "FREE", 
                    sttDt: "",
                    endDt: "" ,
                    promotionCd: "BANKFREE"
                },
                type: 'post',
                async: false,
                success: function (response) {
                    removeModal(modalId);
                    showAlert("뱅크봇 프로모션 신청이 되였습니다.", function () {
                        location.href = "/sub/payment/product";
                    });
                },
                error: function (error) {
                    removeModal(modalId);
                    showAlert("뱅크봇 프로모션 신청 실패 하였습니다.");
                }
            });
        });
    }
}

/**
 * 이용권 화면의 다음 버튼 클릭 이벤트(PC)
 */
var pressedBtnNextForPayment = function() {
    var type = null;
    var seq = null;
    var isSelectedBNKB = false;
    var selectedTicket = document.querySelector("#select_ticket").innerHTML;

    if ($('#addn_cancle_product_yn').val() == 'Y') {
        // 일반 회원인 경우
        if (selectedTicket.indexOf("로니봇") != -1) {
            type = "RNB";
            seq = $("#rnbGoodOptSeqNo").val();
        } else if (selectedTicket.indexOf("파이봇") != -1) {
            type = "PYB";
            seq = $("#pybGoodOptSeqNo").val();
        }

        if (type == null) {
            showAlert("이용권을 선택해주세요.");
            return;
        } else {
            var modalId = showConfirm('현재 프로모션 혜택으로 무료 이용 중이에요.<br/>결제신청 페이지로 이동하시겠어요?<br/>(무료 이벤트이용권은 다시 받을 수 없어요)', function () {
                removeModal(modalId);
    
                // 결제하기 페이지 이동
                if (type != null)
                    movePaymentView(type, seq, isSelectedBNKB);
            });
        }

    } else {
        // Cafe24 회원인 경우
        if($("#cafe24_usr_yn").val() == 'Y') {
            // 이용권 미선택 시 문구 노출
            if(selectedTicket.indexOf("프리봇") != -1 && selectedTicket.indexOf("뱅크봇") == -1) {
                showAlert('프리봇은 이미 사용 중 입니다.');
                return;
            }

            var isFreeUser = $("#basic_goods_req_seq_no").val() == "" && $("#addn_goods_req_seq_no").val() == "";
            var inSelectedOnlyBNK = selectedTicket.indexOf("프리봇") == -1 && selectedTicket.indexOf("로니봇") == -1 && selectedTicket.indexOf("파이봇") == -1 && selectedTicket.indexOf("뱅크봇") != -1;
            if(isFreeUser && inSelectedOnlyBNK) {
                showAlert('프리봇, 로니봇, 파이봇 선택(택1)은 필수 입니다.');
                return;
            }

            if($("#basic_goods_req_seq_no").val() == "") {
                if (selectedTicket.indexOf("로니봇") != -1) {
                    type = "RNB";
                    seq = $("#rnbGoodOptSeqNo").val();
                } else if (selectedTicket.indexOf("파이봇") != -1) {
                    type = "PYB";
                    seq = $("#pybGoodOptSeqNo").val();
                }
            }

            if($("#addn_goods_req_seq_no").val() == "") {
                if(selectedTicket.indexOf("뱅크봇") != -1) {
                    isSelectedBNKB = true;

                    if($("#basic_goods_req_seq_no").val() > 0)
                        type = $("#goodsTypCd").val();
                    else if(selectedTicket.indexOf("프리봇") != -1)
                        type = "FRB";
                }
            }
        } else { // 일반 회원인 경우
            if (selectedTicket.indexOf("로니봇") != -1) {
                type = "RNB";
                seq = $("#rnbGoodOptSeqNo").val();
            } else if (selectedTicket.indexOf("파이봇") != -1) {
                type = "PYB";
                seq = $("#pybGoodOptSeqNo").val();
            }
        }

        // 결제하기 페이지 이동
        if (type != null)
            movePaymentView(type, seq, isSelectedBNKB);
        else
            showAlert("이용권을 선택해주세요.");
    }
};

/**
 * 이용권 화면의 구매하기 버튼 클릭 이벤트(Mobile)
 */
var pressedBtnBuyForPayment = function() {
    var type = null;
    var seq = null;
    var isSelectedBNKB = false;

    // Cafe24 회원인 경우
    if($("#cafe24_usr_yn").val() == 'Y') {
        if ($("#btnRNB").attr('disabled') != 'disabled') {
            type = "RNB";
            seq = $("#rnbGoodOptSeqNo").val();
        } else if ($("#btnPYB").attr('disabled') != 'disabled') {
            type = "PYB";
            seq = $("#pybGoodOptSeqNo").val();
        }
    
        if($("#btnBNKB").attr('disabled') != 'disabled') {
            isSelectedBNKB = true;
    
            if($("#basic_goods_req_seq_no").val() > 0)
                type = $("#goodsTypCd").val();
            else if($("#btnRNB").attr('disabled') == 'disabled' && $("#btnPYB").attr('disabled') == 'disabled')
                type = "FRB";
        }
    }
    else { // 일반 회원인 경우
        if ($("#btnRNB").attr('disabled') != 'disabled') {
            type = "RNB";
            seq = $("#rnbGoodOptSeqNo").val();
        } else if ($("#btnPYB").attr('disabled') != 'disabled') {
            type = "PYB";
            seq = $("#pybGoodOptSeqNo").val();
        }
        if($("#forced").val() == "Y" && $("#goodsTypCd").val() != type) {
            showAlert('서비스 정책으로 인해 해당 상품을 선택할 수 없습니다.');
            return;
        }
    }
    
    // 결제하기 페이지 이동
    if (type != null) {
        //console.log('type=' + type + ",seq=" + seq + ",isSelectedBNKB=" + isSelectedBNKB);
        movePaymentView(type, seq, isSelectedBNKB);
    } else {
        alert("상품 유형이 선택되지 않았습니다.");
    }
};

/**
 * 결제하기 화면으로 이동
 * @param {*} type 
 * @param {*} seq 
 */
var movePaymentView = function (type, seq, isSelectedBNKB) {
    $("#goPaymentFrm [name=type]").val(type);
    $("#goPaymentFrm [name=seq]").val(seq);
    $("#goPaymentFrm [name=isSelectedBNKB]").val(isSelectedBNKB);
    $("#goPaymentFrm").submit();
};

//---------------------------------------------------------------------------------------------
// 이용요금 안내 -> 결제하기 화면
//---------------------------------------------------------------------------------------------

var initPayment = function() {
    // if($("#successYN").val() == "N") {
    //     showAlert("결제 요청이 실패하였습니다.<br>다시 시도해주세요.<br>(" + $("#errMsg").val() + ")");
    // }

    if ($("#basic_goods_req_seq_no").val() > 0 && $("#addn_goods_req_seq_no").val() > 0) {
        $("#selectBox_bankbot").val($("#addn_goods_opt_seq_no").val());
    }
    else {
        if ($("#isSelectedBNKB").val() == 'false') {
            $("#selectBox_bankbot option:eq(0)").attr('selected', 'selected');
        }
        else {
            $("#selectBox_bankbot option:eq(1)").attr('selected', 'selected');
        }
    }

    updateSelectedGoodsInfo();
};

/**
 * 이용권 변경하기 버튼 이벤트
 */
var pressedBtnChangeTicket = function() {
    if($("#cafe24_usr_yn").val() == "Y") {
        if($("#forced").val() === "Y") {
            if($("#basic_goods_req_seq_no").val() > 0 && $("#addn_goods_req_seq_no").val() > 0) {
                return;
            }
            else if($("#basic_goods_req_seq_no").val() > 0) {
                showAlert('서비스 정책으로 인해 상품을 변경할 수 없습니다.');
                return;
            }
            else if($("#addn_goods_req_seq_no").val() > 0) {
                return;
            }
        }
    }
    else {
        if ($("#forced").val() === "Y") {
            showAlert('서비스 정책으로 인해 상품을 변경할 수 없습니다.');
            return;
        }
    }

    setGoodsInfoArea();
};

/**
 * 이용권 변경
 */
var setGoodsInfoArea = function() {
    if($("#cafe24_usr_yn").val() == "Y") {
        if($("#forced").val() == "Y") {
            // 프리봇 <-> 로니봇
            if($("#forcedType").val() == "RNB") {
                $("#frbArea").css("display", "none");
                $("#rnbArea").css("display", "none");
    
                switch ($("#goodsTypCd").val()) {
                    case "RNB":
                        $("#goodsTypCd").val("FRB");
                        $("#frbArea").css("display", "block");
                        break;
                    case "FRB":
                        $("#goodsTypCd").val("RNB");
                        $("#rnbArea").css("display", "block");
                        break;
                    default:
                        break;
                }
            }
            // 프리봇 <-> 파이봇
            else {
                $("#frbArea").css("display", "none");
                $("#pybArea").css("display", "none");

                switch ($("#goodsTypCd").val()) {
                    case "FRB":
                        $("#goodsTypCd").val("PYB");
                        $("#pybArea").css("display", "block");
                        break;
                    case "PYB":
                        $("#goodsTypCd").val("FRB");
                        $("#frbArea").css("display", "block");
                        break;
                    default:
                        break;
                }
            }
        }
        else {
            if($("#addn_goods_req_seq_no").val() > 0) {
                $("#rnbArea").css("display", "none");
                $("#pybArea").css("display", "none");
        
                switch ($("#goodsTypCd").val()) {
                    case "RNB":
                        $("#goodsTypCd").val("PYB");
                        $("#pybArea").css("display", "block");
                        break;
                    case "PYB":
                        $("#goodsTypCd").val("RNB");
                        $("#rnbArea").css("display", "block");
                        break;
                    default:
                        break;
                }
            }
            else {
                $("#frbArea").css("display", "none");
                $("#rnbArea").css("display", "none");
                $("#pybArea").css("display", "none");

                switch ($("#goodsTypCd").val()) {
                    case "RNB":
                        $("#goodsTypCd").val("PYB");
                        $("#pybArea").css("display", "block");
                        break;
                    case "PYB":
                        $("#goodsTypCd").val("FRB");
                        $("#frbArea").css("display", "block");
                        break;
                    default:
                        $("#goodsTypCd").val("RNB");
                        $("#rnbArea").css("display", "block");
                        break;
                }
            }
        }
    }
    else {
        $("#rnbArea").css("display", "none");
        $("#pybArea").css("display", "none");

        switch ($("#goodsTypCd").val()) {
            case "RNB":
                $("#goodsTypCd").val("PYB");
                $("#pybArea").css("display", "block");
                break;
            case "PYB":
                $("#goodsTypCd").val("RNB");
                $("#rnbArea").css("display", "block");
                break;
            default:
                break;
        }
    }

    updateSelectedGoodsInfo();
};

/**
 * 뱅크봇 상품 변경
 */
var changeBankbotGoods = function() {
    updateSelectedGoodsInfo();
}

var updateSelectedGoodsInfo = function() {
    let total = 0;
    let typeCd = $("#goodsTypCd").val();
    let goodsName = "";
    let goodsList = [];
    let price = 0;
    let optNo = 0;
    let basicGoodsReqSeqNo = $("#basic_goods_req_seq_no").val();

    if ($("#cafe24_usr_yn").val() == "Y") {
        if (basicGoodsReqSeqNo == "" || basicGoodsReqSeqNo > 0 && $("#addn_goods_req_seq_no").val() > 0) {
            switch (typeCd) {
                case "RNB":
                    goodsName = $("#rnbGoodsNm").val();
                    if (basicGoodsReqSeqNo == "") {
                        price = Number($("#rnbFnaPrc").val());
                        optNo = $("#rnbGoodsOptSeqNo").val();
                    }
                    break;
                case "PYB":
                    goodsName = $("#pybGoodsNm").val();
                    if (basicGoodsReqSeqNo == "") {
                        price = Number($("#pybFnaPrc").val());
                        optNo = $("#pybGoodsOptSeqNo").val();
                    }
                    break;
                default: break;
            }
            if (price > 0) {
                goodsList.push({
                    p: price * 1.1,
                    n: encodeURI(goodsName),
                    t: typeCd,
                    o: optNo
                });
                total += price;
            }
        }

        price = Number($("#selectBox_bankbot").find("option:selected").data("prc"));
        if (/*typeof(price) == 'number' && */price > 0) {
            let period = $("#selectBox_bankbot").find("option:selected").data("period");
            let nm = (period == 12) ? "뱅크봇 1년" : "뱅크봇 " + period + "개월";
            goodsList.push({
                p: price * 1.1,
                o: $("#selectBox_bankbot").find("option:selected").data("seq"),
                n: encodeURI(nm),
                d: period
            });
            total += price;
            if (goodsName == "")
                goodsName = nm;
            else
                goodsName += "+" + nm;
        }
    }
    else {
        switch (typeCd) {
            case "RNB":
                price = Number(parseInt($("#rnbFnaPrc").val()));
                optNo = $("#rnbGoodsOptSeqNo").val();
                goodsName = $("#rnbGoodsNm").val();                    
                break;
            case "PYB":
                price = Number(parseInt($("#pybFnaPrc").val()));
                optNo = $("#pybGoodsOptSeqNo").val();
                goodsName = $("#pybGoodsNm").val();
                break;
            default: break;
        }

        if (price > 0) {
            goodsList.push({
                p: price * 1.1,
                n: encodeURI(goodsName),
                t: typeCd,
                o: optNo
            });
            total += price;
        }            
    }

    console.log('total >> ' + total);
    $("#totalPrice").val(total);
    $("#total_price").html(fnAddComma(total) + '원');
    // 결제용 Data 설정
    $('#SendPayForm_id [name="goodname"]').val("셀로봇이용권(" + goodsName + ")");
    $('#SendPayForm_id [name="price"]').val(total + (total * 0.1));
    $('#goodsList').val(JSON.stringify(goodsList));
};

var getUsingGoodsNames = function() {
    var goodsNames = "";
    if($("#basic_goods_req_seq_no").val() > 0) {
        if($("#goodsTypCd").val() == "RNB")
            goodsNames = "로니봇";
        else if($("#goodsTypCd").val() == "PYB")
            goodsNames = "파이봇";
    }

    if($("#addn_goods_req_seq_no").val() > 0) {
        if(goodsNames == "")
            goodsNames = "뱅크봇"
        else 
            goodsNames += "+뱅크봇"
    }

    return "이미 " + goodsNames + "을 이용 중입니다.";
};

var paymentForInicis = function() {
    if ($("#agree1").is(":checked") == false) {
        $("#disagree_text").css("display", "block");
        return;
    }

    if($("#payed_title").css("display") != "none") {
        return;
    }

    if($("#totalPrice").val() == 0) {
        showAlert("결제하실 상품을 선택해주세요.");
        return;
    }

    if($("#cafe24_usr_yn").val() == "Y") {
        if($("#basic_goods_req_seq_no").val() > 0 && $("#addn_goods_req_seq_no").val() > 0) {
            showAlert(getUsingGoodsNames());
            return;
        }

        var addnGoodsPrc = $("#selectBox_bankbot").find("option:selected").data("prc");
        if($("#isRegAcct").val() == "N" && ($("#goodsTypCd").val() == "RNB" && addnGoodsPrc == undefined)) {
            showAlert('등록된 계좌 수로 인해 해당 상품을 선택할 수 없습니다.<br>뱅크봇을 추가로 선택하시거나 파이봇으로 변경해주세요.');
            return;
        }
    } else {
        //console.log('aaa = ' + $("#basic_goods_req_seq_no").val());
        if($("#basic_goods_req_seq_no").val() > 0) {
            showAlert(getUsingGoodsNames());
            return;
        }
    }

    var price = $('#SendPayForm_id [name="price"]').val();
    var mid = $("#SendPayForm_id [name=mid]").val();
    $.ajax({
        url: '/sub/payment/getSignature',
        data: { mid: mid, price: price },
        async: false,
        type: 'POST',
        dataType: 'json',
        success: function (r) {
            if (r.signature) {
                if ($("#DeviceType").val() == 'PC') {
                    $("#SendPayForm_id [name=oid]").val(r.oid);
                    $("#SendPayForm_id [name=timestamp]").val(r.timestamp);
                    $("#SendPayForm_id [name=signature]").val(r.signature);
    
                    var data = new Object();
                    data.goodsList = JSON.parse($("#goodsList").val());
                    data.freeTrialYn = $("#freeTrialYn").val();
                    data.eventNo = $('#eventNo').val();
                    data.mode = 'register';
                    $("#SendPayForm_id [name=merchantData]").val(JSON.stringify(data));
                    INIStdPay.pay('SendPayForm_id');
                } else {
                    $("#SendPayForm_id [name=orderid]").val(r.oid);
                    $("#SendPayForm_id [name=timestamp]").val(r.timestamp);
                    $("#SendPayForm_id [name=hashdata]").val(r.hash);

                    var data = new Object();
                    data.goodsList = JSON.parse($("#goodsList").val());
                    data.freeTrialYn = $("#freeTrialYn").val();
                    data.eventNo = $('#eventNo').val();
                    data.mode = 'register';
                    data.buyerName = $('#SendPayForm_id [name="buyername"]').val();
                    data.buyerTel = $('#SendPayForm_id [name="buyertel"]').val();
                    data.buyerEmail = $('#SendPayForm_id [name="buyeremail"]').val();
                    
                    $("#SendPayForm_id [name=p_noti]").val(JSON.stringify(data));
                    $("#SendPayForm_id").submit();
               }
            }
        },
        error: function (response, status, error) {
            showAlert("서버 에러.");
        }
    });
};