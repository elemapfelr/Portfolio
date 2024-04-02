"use strict";
var girdData = null;
var traContGrid = null;
var pagination = null;
var paginationForDep = null;
var paginationForOrd = null;
var selectedDepData = null;
var selectedOrdData = null;

var initReconcile = function() {
    /**
     * 드롭다운 셀렉트 버튼 목록 생성
     */
    // 일별
    for (var i = 0; i < 31; i++) {
        $('.dropdown_selector .per_day .dropdown_list').append('<span class="item" data-value="' + (i + 1) + '">' + (i + 1) + '일</span>');
    } 
    
    // 월별
    for (var _i = 0; _i < 12; _i++) {
        $('.dropdown_selector .per_month .dropdown_list').append('<span class="item" data-value="' + (_i + 1) + '">' + (_i + 1) + '월</span>');
    } 
    
    var curDateYY = parseInt(moment(new Date()).format("YY"));

    // 분기별
    for (var _i2 = 0; _i2 <= curDateYY; _i2++) {
        var year = void 0;
        _i2 < 10 ? year = '0' + _i2 : year = _i2;

        for (var j = 0; j < 4; j++) {
            $('.dropdown_selector .per_quarter .dropdown_list').append('<span class="item" data-value="20' + year + '-' + (j + 1) + '/4">20' + year + '년 ' + (j + 1) + '/4</span>');
        }
    } 
    
    // 연별
    for (var _i3 = 0; _i3 <= curDateYY; _i3++) {
        var _year = void 0;

        _i3 < 10 ? _year = '0' + _i3 : _year = _i3;
        $('.dropdown_selector .per_year .dropdown_list').append('<span class="item" data-value="20' + _year + '">20' + _year + '년</span>');
    }

    $("#sta_dt").val(moment(new Date()).subtract(1, "month").add(1, "d").format("YYYY/MM/DD"));
    $("#end_dt").val(moment(new Date()).format("YYYY/MM/DD"));
    $(".account_sum_date_dp").datepicker();

    // 대사서비스 목록
    pagination = new tui.Pagination('grid-pagination-container', {
        visiblePages: 10,
        itemsPerPage: 10,
        page: 1,
        centerAlign: false,
        firstItemClassName: 'tui-first-child',
        lastItemClassName: 'tui-last-child',
        usageStatistics: true
    });

    pagination.on('beforeMove', function (eventData) {
        search(eventData.page);
    });

    // 수동확인 모달의 거래내역 목록
    paginationForDep = new tui.Pagination('dep-pagination-container', {
        visiblePages: 5,
        itemsPerPage: 5,
        page: 1,
        centerAlign: false,
        firstItemClassName: 'tui-first-child',
        lastItemClassName: 'tui-last-child',
        usageStatistics: true
    });

    paginationForDep.on('beforeMove', function (eventData) {
        searchForDepHist(eventData.page);
    });

    // 수동확인 모달의 주문내역 목록
    paginationForOrd = new tui.Pagination('ord-pagination-container', {
        visiblePages: 5,
        itemsPerPage: 5,
        page: 1,
        centerAlign: false,
        firstItemClassName: 'tui-first-child',
        lastItemClassName: 'tui-last-child',
        usageStatistics: true
    });

    paginationForOrd.on('beforeMove', function (eventData) {
        searchForOrdHist(eventData.page);
    });
};

// 조회기간 이벤트
var onChangeSel = function(obj) {
    var currentItemLabel = $(obj).text(),
        currentItemValue = $(obj).data('value');
    $(obj).parents('.dropdown_list').find('.item').removeClass('is_selected');
    $(obj).addClass('is_selected').parents('.dropdown').find('.button .label').text(currentItemLabel).attr('data-value', currentItemValue);

    // 조회기간 dropbox
    if($(obj).parent().parent().hasClass('per_day')) {
        onChangeDailySel(obj);
    }
    else if($(obj).parent().parent().hasClass('per_month')) {
        onChangeMonthlySel(obj);
    }
    else if($(obj).parent().parent().hasClass('per_quarter')) {
        onChangeQuarterlySel(obj);
    }
    else if($(obj).parent().parent().hasClass('per_year')) {
        onChangeYearlySel(obj);
    }
    else {
        var seqNo = $(obj).data('seqno');
        switch (currentItemValue) {
            case "change": // 대사변경
                var ordSeqNo = $(obj).data('ordseqno');
                showChgRecoStsModal(seqNo, ordSeqNo);
                break;
            case "manual": // 수동확인
                showMatchingModal(seqNo);
                break;
            // 2021-08-09
            // case "except": // 대사제외
            //     exclRecoSts(seqNo);
            //     break;
            default:
                break;
        }
    }
};

// 일별
var onChangeDailySel = function(obj) {
    var period = $(obj).data('value');
    $("#sta_dt").val(moment(new Date()).subtract(period, "day").add(1, "d").format("YYYY/MM/DD"));
    $("#end_dt").val(moment(new Date()).format("YYYY/MM/DD"));
};

// 월별
var onChangeMonthlySel = function(obj) {
    var month = $(obj).data('value');
    var monthStr = $(obj).data('value') < 10 ? "0" + $(obj).data('value') : "" + $(obj).data('value');
    var year = moment(new Date()).format("YYYY");
    var monthDate = moment(year + monthStr, "YYYYMM");
    var startDate = monthDate.startOf('month').format("YYYY/MM/DD");
    var endDate = monthDate.endOf('month').format("YYYY/MM/DD");
    
    $("#sta_dt").val(startDate);
    $("#end_dt").val(endDate);
};

// 분기별
var onChangeQuarterlySel = function(obj) {
    var quarterArray = $(obj).data('value').split("-");
    var year = quarterArray[0];
    var quarterStr = quarterArray[1].split("/")[0];
    var quarter = parseInt(quarterStr);

    var startMonth = (3*(quarter-1)) + 1;
    var startMonthStr = startMonth < 10 ? "0" + startMonth : "" + startMonth;
    var startDate = moment(year + startMonthStr, "YYYYMM").startOf('month').format("YYYY/MM/DD");
    $("#sta_dt").val(startDate);

    var endMonth = (3*quarter);
    var endMonthStr = endMonth < 10 ? "0" + endMonth : "" + endMonth;
    var endDate = moment(year + endMonthStr, "YYYYMM").endOf('month').format("YYYY/MM/DD");
    $("#end_dt").val(endDate);
};

// 연도별
var onChangeYearlySel = function(obj) {
    var year = $(obj).data('value');
    var yearDate = moment(year, "YYYY");
    var startDate = yearDate.startOf('year').format("YYYY/MM/DD");
    var endDate = yearDate.endOf('year').format("YYYY/MM/DD");

    $("#end_dt").val(endDate);
    $("#sta_dt").val(startDate);
};

var initMatchingModal = function() {
    if(selectedDepData != null)
        selectedDepData = null;

    if(selectedOrdData != null)
        selectedOrdData = null;

    $("#selectedDepTbody").html("");
    $("#selectedOrdTbody").html("");
};

// 수동입금 확인 - 모달 노출
var showMatchingModal = function(seqNo) {
    initMatchingModal();
    searchForDepHist(1, seqNo);
    searchForOrdHist(1);
    $('.menual_deposit_check').css('display', 'flex');
};

// 수동입금 확인 - 경고창 표시
var showAlertWithMatchingModal = function(alertTxt) {
    $('.menual_deposit_check').css('display', 'none');
    showAlert(alertTxt, function () {
        $('.menual_deposit_check').css('display', 'flex');
    });
};

var resetDepSearchInput = function() {
    $("#depSearchInput").val("");
};

// 수동입금 확인 - 거래내역 검색
var btnPressedDep = function() {
    if($("#depSearchSel").val() == "") {
        showAlertWithMatchingModal("검색하실 항목을 선택해주세요.");
        return;
    }

    if($("#depSearchInput").val() == "") {
        showAlertWithMatchingModal("검색어를 입력해주세요.");
        return;
    }
    
    searchForDepHist(1, null);
};

// 수동입금 확인 - 거래내역 조회
var searchForDepHist = function(page, seqNo) {
    var param = null;
    if(seqNo != null) {
        param = {
            "acct_tra_cont_seq_no": seqNo
        };
    }
    else {
        var acctSeqNo = $('#bankSelect').val();
        param = {
            "cust_acct_seq_no": acctSeqNo,
            "startDT": moment($("#sta_dt").val(), "YYYY/MM/DD").format("YYYYMMDD"),
            "endDT": moment($("#end_dt").val(), "YYYY/MM/DD").format("YYYYMMDD"),
            "keyword": $("#depSearchInput").val(),
            "column": $("#depSearchSel").val(),
            "pageNumber": (page-1) * paginationForDep._options.itemsPerPage,
            "pageSize": paginationForDep._options.itemsPerPage
        };
    }

    $.ajax({
        url: '/sub/account/depoHist',
        data: param,
        type: 'post',
        async: false,
        success: function (res) {
            var htmlStr = '';
            if(res == null || res.depos == null || res.depos.length == 0) {
                htmlStr += '<tr>';
                htmlStr += '    <td colspan="6">조회된 결과가 없습니다.</td>';
                htmlStr += '</tr>';
            } else {
                for(var i=0; i<res.depos.length; i++) {
                    htmlStr += '<tr>';
                    htmlStr += '    <td class="date">' + res.depos[i].traDt + '</td>';
                    htmlStr += '    <td class="bank">' + res.depos[i].bankNm + '</td>';
                    htmlStr += '    <td class="account">' + res.depos[i].acctNo + '</td>';
                    htmlStr += '    <td class="name">' + res.depos[i].depositor + '</td>';
                    htmlStr += '    <td class="amount">' + fnAddComma(res.depos[i].depoAmt) + '원</td>';
                    htmlStr += '    <td class="select">';

                    var acctTraContSeqNo = 'dep_' + res.depos[i].acctTraContSeqNo;
                    var isSelected = false;
                    if(selectedDepData != null && selectedDepData.length > 0) {
                        $.each(selectedDepData, function(idx, item) { 
                            if(item.seqno == acctTraContSeqNo) {
                                isSelected = true;
                                return false;
                            }
                        });
                    }

                    if(isSelected)
                        // 2021-08-09 뱅크봇 프로모션 기획 UI 변경
                        // htmlStr += '        <button class="row_select_btn" style="display:none" id="' + acctTraContSeqNo + '" onclick="selectDepRow(this);"><img src="/assets/images/icon/icon_right.png" alt=""></button>';
                        htmlStr += '        <input type="radio" name="depR" style="display:none" id="' + acctTraContSeqNo + '" onclick="selectDepRow(this);" />';
                    else 
                        // 2021-08-09 뱅크봇 프로모션 기획 UI 변경
                        // htmlStr += '        <button class="row_select_btn" id="' + acctTraContSeqNo + '" onclick="selectDepRow(this);"><img src="/assets/images/icon/icon_right.png" alt=""></button>';
                        htmlStr += '        <input type="radio" name="depR" id="' + acctTraContSeqNo + '" onclick="selectDepRow(this);" />';

                    htmlStr += '    </td>';
                    htmlStr += '</tr>';
                }
            }

            // 조회 시 pagination 초기화
            if (res.pageNumber == 0) {
                paginationForDep.setTotalItems(res.totalCount);
                paginationForDep._currentPage = 0;
                paginationForDep.reset();
            }

            $("#depHistTbody").html(htmlStr);
        }
    });
};

var resetOrdSearchInput = function() {
    $("#ordSearchInput").val("");
};

// 수동입금 확인 - 주문내역 검색
var btnPressedOrd = function() {
    if($("#ordSearchSel").val() != "" && $("#ordSearchInput").val() == "") {
        showAlertWithMatchingModal("검색어를 입력해주세요.");
        return;
    }
    
    searchForOrdHist(1);
};

// 수동입금 확인 - 주문내역 조회
var searchForOrdHist = function(page) {
    var param = {
        // "startDT": moment($("#sta_dt").val(), "YYYY/MM/DD").format("YYYYMMDD"),
        // "endDT": moment($("#end_dt").val(), "YYYY/MM/DD").format("YYYYMMDD"),
        "keyword": $("#ordSearchInput").val(),
        "column": $("#ordSearchSel").val(),
        "pageNumber": (page-1) * paginationForOrd._options.itemsPerPage,
        "pageSize": paginationForOrd._options.itemsPerPage
    };

    $.ajax({
        url: '/sub/account/ordHist',
        data: param,
        type: 'post',
        async: false,
        success: function (res) {
            var htmlStr = '';
            if(res == null || res.orders == null || res.orders.length == 0) {
                htmlStr += '<tr>';
                htmlStr += '    <td colspan="6">선택하신 검색 항목의 주문건이 없습니다.</td>';
                htmlStr += '</tr>';
            }
            else {
                for(var i=0; i<res.orders.length; i++) {
                    htmlStr += '<tr>';
                    htmlStr += '    <td class="orderNumber">' + res.orders[i].order_id + '</td>';
                    htmlStr += '    <td class="bank">' + res.orders[i].bank_code_name + '</td>';
                    htmlStr += '    <td class="account">' + res.orders[i].bank_account_no + '</td>';
                    htmlStr += '    <td class="name">' + res.orders[i].billing_name + '</td>';
                    htmlStr += '    <td class="amount">' + fnAddComma(res.orders[i].order_price_amount) + '원</td>';
                    htmlStr += '    <td class="select">';

                    var ordSeqNo = 'ord_' + res.orders[i].ord_seq_no;
                    var isSelected = false;
                    if(selectedOrdData != null && selectedOrdData.length > 0) {
                        $.each(selectedOrdData, function(idx, item) { 
                            if(item.ordNum == ordSeqNo) {
                                isSelected = true;
                                return false;
                            }
                        });
                    }

                    if(isSelected)
                        // 2021-08-09 뱅크봇 프로모션 기획 UI 변경
                        // htmlStr += '        <button class="row_select_btn" style="display:none" id="' + ordSeqNo + '" onclick="selectOrdRow(this);"><img src="/assets/images/icon/icon_right.png" alt=""></button>';
                        htmlStr += '        <input type="radio" name="orderR" style="display:none" id="' + ordSeqNo + '" onclick="selectOrdRow(this);" />';
                    else 
                        // 2021-08-09 뱅크봇 프로모션 기획 UI 변경
                        // htmlStr += '        <button class="row_select_btn" id="' + ordSeqNo + '" onclick="selectOrdRow(this);"><img src="/assets/images/icon/icon_right.png" alt=""></button>';
                        htmlStr += '        <input type="radio" name="orderR" id="' + ordSeqNo + '" onclick="selectOrdRow(this);" />';

                    htmlStr += '    </td>';
                    htmlStr += '</tr>';
                }
            }

            // 조회 시 pagination 초기화
            if (res.pageNumber == 0) {
                paginationForOrd.setTotalItems(res.totalCount);
                paginationForOrd._currentPage = 0;
                paginationForOrd.reset();
            }

            $("#ordHistTbody").html(htmlStr);
        }
    });
};

// 수동입금 확인 - 거래내역 선택
var selectDepRow = function(obj) {
    // 2021-08-09 뱅크봇 프로모션 기획 UI 변경
    // if(selectedDepData == null)
        selectedDepData = new Array();

    if(selectedDepData.length < 3) {
        var parent = $(obj).parents('.select_mov_table_container'),
        row = $(obj).parents('tr'),
        currentDate = row.find('.date').text(),
        currentBank = row.find('.bank').text(),
        currentAccount = row.find('.account').text(),
        currentName = row.find('.name').text(),
        currentAmount = row.find('.amount').text();

        selectedDepData.unshift({
            "seqno": obj.id,
            "date": currentDate,
            "bank": currentBank,
            "account": currentAccount,
            "name": currentName,
            "amount": currentAmount,
        });

        // 2021-08-09 뱅크봇 프로모션 기획 UI 변경
        // updateSelectedDepTable();
        // $(obj).css("display", "none");
    }
    else {
        showAlertWithMatchingModal("3건까지만 선택 가능합니다.");
    }
};

// 수동입금 확인 - 거래내역 선택 해제
var unSelectDepRow = function(obj) {
    var seqno = $(obj).data("seqno");
    $.each(selectedDepData, function(idx, item) { 
        if(item.seqno == seqno) {
            selectedDepData.splice(idx, 1);
            return false;
        }
    });

    $("#" + seqno).css("display", "inline-block");
    $(obj).parents('tr').remove();
};

// 수동입금 확인 - 선택된 거래내역 테이블 갱신
var updateSelectedDepTable = function() {
    var htmlStr = "";
    for(var i=0; i<selectedDepData.length; i++) {
        htmlStr += '<tr>';
        htmlStr += '    <td class="delete">';
        htmlStr += '        <button class="row_delete_btn" data-seqno="' + selectedDepData[i].seqno + '" onclick="unSelectDepRow(this);">';
        htmlStr += '            <img src="/assets/images/icon/x_black.png" alt="">';
        htmlStr += '        </button>';
        htmlStr += '    </td>';
        htmlStr += '    <td class="date">' + selectedDepData[i].date + '</td>';
        htmlStr += '    <td class="bank">' + selectedDepData[i].bank + '</td>';
        htmlStr += '    <td class="account">' + selectedDepData[i].account + '</td>';
        htmlStr += '    <td class="name">' + selectedDepData[i].name + '</td>';
        htmlStr += '    <td class="amount">' + selectedDepData[i].amount + '</td>';
        htmlStr += '</tr>';
    }

    $("#selectedDepTbody").html(htmlStr);
};

// 수동입금 확인 - 주문내역 선택
var selectOrdRow = function(obj) {
    // 2021-08-09 뱅크봇 프로모션 기획 UI 변경
    // if(selectedOrdData == null)
        selectedOrdData = new Array();

    if(selectedOrdData.length < 3) {
        var parent = $(obj).parents('.select_mov_table_container'),
        row = $(obj).parents('tr'),
        currentOrdNum = row.find('.orderNumber').text(),
        currentBank = row.find('.bank').text(),
        currentAccount = row.find('.account').text(),
        currentName = row.find('.name').text(),
        currentAmount = row.find('.amount').text();

        selectedOrdData.unshift({
            "ordNum": obj.id,
            "orderNumber": currentOrdNum,
            "bank": currentBank,
            "account": currentAccount,
            "name": currentName,
            "amount": currentAmount,
        });

        // 2021-08-09 뱅크봇 프로모션 기획 UI 변경
        // updateSelectedOrdTable();
        // $(obj).css("display", "none");
    }
    else {
        showAlertWithMatchingModal("3건까지만 선택 가능합니다.");
    }
};

// 수동입금 확인 - 주문내역 선택 해제
var unSelectOrdRow = function(obj) {
    var ordnum = $(obj).data("ordnum");
    $.each(selectedOrdData, function(idx, item) { 
        if(item.ordNum == ordnum) {
            selectedOrdData.splice(idx, 1);
            return false;
        }
    });

    $("#" + ordnum).css("display", "inline-block");
    $(obj).parents('tr').remove();
};

// 수동입금 확인 - 선택된 주문내역 테이블 갱신
var updateSelectedOrdTable = function() {
    var htmlStr = "";
    for(var i=0; i<selectedOrdData.length; i++) {
        htmlStr += '<tr>';
        htmlStr += '    <td class="delete">';
        htmlStr += '        <button class="row_delete_btn" data-ordnum="' + selectedOrdData[i].ordNum + '" onclick="unSelectOrdRow(this);">';
        htmlStr += '            <img src="/assets/images/icon/x_black.png" alt="">';
        htmlStr += '        </button>';
        htmlStr += '    </td>';
        htmlStr += '    <td class="orderNumber">' + selectedOrdData[i].orderNumber + '</td>';
        htmlStr += '    <td class="bank">' + selectedOrdData[i].bank + '</td>';
        htmlStr += '    <td class="account">' + selectedOrdData[i].account + '</td>';
        htmlStr += '    <td class="name">' + selectedOrdData[i].name + '</td>';
        htmlStr += '    <td class="amount">' + selectedOrdData[i].amount + '</td>';
        htmlStr += '</tr>';
    }

    $("#selectedOrdTbody").html(htmlStr);
};

// 수동입금 확인
var matchingDepNOrd = function() {
    if(selectedDepData == null || selectedDepData.length == 0) {
        showAlertWithMatchingModal("수동입금 확인할 거래내역을 선택해주세요.");
        return;
    }

    if(selectedOrdData == null || selectedOrdData.length == 0) {
        showAlertWithMatchingModal("수동입금 확인할 주문내역을 선택해주세요.");
        return;
    }


    var depList = new Array();
    $.each(selectedDepData, function(idx, item) { 
        var seqNo = item.seqno.split("_")[1];
        depList.push(seqNo);
    });

    var ordList = new Array();
    $.each(selectedOrdData, function(idx, item) { 
        var ordNum = item.ordNum.split("_")[1];
        ordList.push(ordNum);
    });

    showConfirm("<strong style='color:blue'>수동입금 처리 안내</strong><br><br><br>" +
                "입금계좌번호 " + selectedDepData[0].account + "<br>" +
                "입금자 " + selectedDepData[0].name + "<br>" +
                "입금금액 " + selectedDepData[0].amount + "<br><br>" +
                "주문번호 " + selectedOrdData[0].orderNumber + "<br>" +
                "주문계좌번호 " + selectedOrdData[0].account + "<br>" +
                "주문자 " + selectedOrdData[0].name + "<br>" +
                "주문금액 " + selectedOrdData[0].amount + "<br><br>" +
                "<strong>수동입금 처리된 입금건은 수정 변경이 안됩니다.<br> 해당 거래건을 수동입금 처리를 하시겠습니까?</strong>"
    , function () {
        var param = {
            "depListStr": JSON.stringify(depList),
            "ordListStr": JSON.stringify(ordList),
        };
    
        $.ajax({
            url: '/sub/account/matchDepNOrd',
            data: param,
            type: 'post',
            async: false,
            success: function (res) {
                $('.menual_deposit_check').css('display', 'none');
                showAlert(res + "건 매칭되었습니다.", function () {
                    refresh();
                });
            },
            error: function (error) {
                showAlertWithMatchingModal("요청을 실패 하였습니다.");
            }
        });
    });

    
};

// 대사변경 모달
var showChgRecoStsModal = function(seqNo, ordSeqNo) {
    var param = {
        "acct_tra_cont_seq_no": seqNo,
        "ord_seq_no": ordSeqNo
    };

    $.get("/sub/account/recoInfo", $.param(param), function (res) {
        $("#acct_tra_cont_seq_no").val(seqNo);
        console.log('res.ord_id = ' + res.ord_id);

        var depHist = res.bank_nm + "(" + res.acct_no + ")" + " / " + res.acct_tra_cont + " / " + fnAddComma(res.depo_prc) + "원";
        var ordHist = "주문번호(" + res.ord_id + ")" + " / " + res.buyer_nm + " / " + fnAddComma(res.ord_amt) + "원";

        $("#depHistInput").val(depHist);
        $("#ordHistInput").val(ordHist);
        $('.popup_container.auto_reconcile').css('display', 'flex');
    });
};

// 대사변경
var chgRecoSts = function() {
    // var isSelected = $("input:checkbox[id='agreeCb']").is(":checked");
    // if(!isSelected) {
    //     $('.popup_container.auto_reconcile').css('display', 'none');
    //     showAlert("입금 현황 변경 체크박스를 체크해주세요.", function () {
    //         $('.popup_container.auto_reconcile').css('display', 'flex');
    //     });
    //     return;
    // }

    $('.popup_container.auto_reconcile').css('display', 'none');
    $("input:checkbox[id='agreeCb']").prop("checked", false);
    $("#depHistInput").val("");
    $("#ordHistInput").val("");

    var param = {
        "acct_tra_cont_seq_no": $("#acct_tra_cont_seq_no").val()
    };

    $.ajax({
        url: '/sub/account/chgRecoSts',
        data: param,
        type: 'post',
        async: false,
        success: function (response) {
            showAlert("요청이 완료되었습니다.", function () {
                refresh();
            });
        },
        error: function (error) {
            showAlert("요청을 실패 하였습니다.");
        }
    });
};

// 대사제외
var exclRecoSts = function() {
    if(selectedDepData == null || selectedDepData.length == 0) {
        showAlertWithMatchingModal("거래내역을 선택해주세요.");
        return;
    }
    
    var seqNo = "";
    var depAmount = "";
    var depDate = "";
    var depName = "";
    $.each(selectedDepData, function(idx, item) { 
        seqNo = item.seqno.split("_")[1];
        depAmount = item.amount;
        depDate = item.date;
        depName = item.name;
    });
    
    showConfirm("<strong style='color:blue'>대사제외 처리 안내</strong><br><br><br>" +
                "입금일자 " + depDate + "<br>" +
                "입금자 " + depName + "<br>" +
                "입금금액 " + depAmount + "<br><br>" +
                "<strong>대사제외 처리된 입금건은 수정 변경이 안됩니다.<br> 해당 거래건을 대사제외 처리를 하시겠습니까?</strong>"
    , function () {
        var param = {
            "acct_tra_cont_seq_no": seqNo
        };
    
        $.ajax({
            url: '/sub/account/exclRecoSts',
            data: param,
            type: 'post',
            async: false,
            success: function (response) {
                refresh();
            },
            error: function (error) {
                alert("요청을 실패 하였습니다.");
            }
        });
    });
};

var refresh = function() {
    var url = "/sub/account/reconcile?cust_acct_seq_no=" + $('#bankSelect').val() + "&startDT=" + $("#sta_dt").val() + "&endDT=" + $("#end_dt").val();

    if($("#acctTraContInput").val() != "")
        url += "&acctTraCont=" + $("#acctTraContInput").val();

    // 상태 변경 후 목록에 안보이기 때문에 검색조건의 대사 상태는 미반영
    location.href = url;
};

/**
 * 커스텀 GIRD DOM
 */
var CustomStatusRenderer = /*#__PURE__*/ function () {
    function CustomStatusRenderer(props) {
        _classCallCheck(this, CustomStatusRenderer);

        var el = $("<div class=\"reconcile\"></div>"); // Toast Grid Dropdown 컨트롤

        el.click(function () {
            if (!$(this).hasClass('is_open')) {
                // 팝업 위치 설정
                // tui-grid-body-container는 실제 row에 따라서 높이가 달라지기 때문에 parent의 높이에서 20을 제외해야 row10개의 높이가 나옴
                var ch = $('.tui-grid-body-container').parent().outerHeight()-20,
                pt = $(this).position().top,
                dh = $(this).find('.dropdown_list').outerHeight();

                // dropdown list는 실제 pt보다 아래의 위치에서 시작하기 때문에 이를 계산시 반영
                if (ch - (pt+20) < dh)
                    $(this).find('.dropdown_list').css('top', -dh + 1); // 팝업 컨트롤
                
                $('[data-column-name="reco_sts_cd"]').css('overflow', 'hidden').find('.reconcile').removeClass('is_open');
                $(this).addClass('is_open').parent().css('overflow', 'visible');
                $(this).find('.dropdown_list').show();
            } else {
                $(this).removeClass('is_open').parent().css('overflow', 'hidden');
                $(this).find('.dropdown_list').hide();
            }
        });
        this.el = el[0];
        this.render(props);
    }

    _createClass(CustomStatusRenderer, [{
        key: "getElement",
        value: function getElement() {
            return this.el;
        }
    }, {
        key: "render",
        value: function render(props) {
            $(this.el).empty();
            var row = girdData[props.rowKey];

            if (props.value == 'IDEP') {
                $(this.el).append(
                    "<div class=\"\">\
                        <span class=\"\">자동확인</span>\
                    </div>"
                    /*  2021-08-09 뱅크봇 프로모션 기획 UI 변경
                        <button class=\"button line\" onclick=\"listFunctionRefresh(this);\">\
                            <span class=\"label\">자동확인</span>\
                            <img src=\"/assets/images/icon/icon_bottom.png\" alt=\"\">\
                        </button>\
                        <div class=\"dropdown_list\">\
                            <span class=\"item\" data-value=\"change\" data-seqno=\"" + row.acct_tra_cont_seq_no + "\" data-ordseqno=\"" + row.ord_seq_no + "\">대사변경</span>\
                        </div>\
                     */
                    );
            } else if (props.value == 'UDEP') {
                $(this.el).append(
                    "<div class=\"dropdown grid_dropdown reconcile_select\">\
                        <button class=\"button line\" onclick=\"listFunctionRefresh(this);\">\
                            <span class=\"label\">미확인</span>\
                            <img src=\"/assets/images/icon/icon_bottom.png\" alt=\"\">\
                        </button>\
                        <div class=\"dropdown_list\">\
                            <span class=\"item\" data-value=\"manual\" data-seqno=\"" + row.acct_tra_cont_seq_no + "\">미확인</span>\
                        </div>\
                    </div>"
                    /*  2021-08-09 뱅크봇 프로모션 기획 UI 변경
                        <button class=\"button line\" onclick=\"listFunctionRefresh(this);\">\
                            <span class=\"label\">미확인</span>\
                            <img src=\"/assets/images/icon/icon_bottom.png\" alt=\"\">\
                        </button>\
                        <div class=\"dropdown_list\">\
                            <span class=\"item\" data-value=\"manual\" data-seqno=\"" + row.acct_tra_cont_seq_no + "\">수동확인</span>\
                            <span class=\"item\" data-value=\"except\" data-seqno=\"" + row.acct_tra_cont_seq_no + "\">대사제외</span>\
                        </div>\
                    */
                    );
            } else if (props.value == 'MDEP') {
                $(this.el).append(
                    "<div class=\"\">\
                        <span class=\"\">대사제외</span>\
                    </div>"
                    /*  2021-08-09 뱅크봇 프로모션 기획 UI 변경
                        <button class=\"button line\" onclick=\"listFunctionRefresh(this);\">\
                            <span class=\"label\">대사제외</span>\
                            <img src=\"/assets/images/icon/icon_bottom.png\" alt=\"\">\
                        </button>\
                        <div class=\"dropdown_list\">\
                            <span class=\"item\" data-value=\"except\" data-seqno=\"" + row.acct_tra_cont_seq_no + "\">대사제외</span>\
                        </div>\
                    */
                    );
            } else {
                $(this.el).text(row.reco_sts_cd_nm);
            }
        }
    }]);

    return CustomStatusRenderer;
}();

var listFunctionRefresh = function(obj) {
    $(obj).siblings().find(".is_selected").removeClass("is_selected");
};

var search = function (page) {
    var acctSeqNo = $('#bankSelect').val();
    if(acctSeqNo == "") {
        showAlert("계좌번호를 선택하세요.");
        return;        
    }

    $("#page").val(page);

    var reco_sts_cd_list = [];
    $("input:checkbox[name=reco_sts_cd_cb]:checked").each(function() {
        reco_sts_cd_list.push($(this).data("sts-cd"));
    });

    var reco_sts_cd = JSON.stringify(reco_sts_cd_list).replace("[", "").replace("]", "");
    var param = {
        "cust_acct_seq_no": acctSeqNo,
        "acct_tra_cont": $("#acctTraContInput").val(),
        "reco_sts_cd": reco_sts_cd,
        "startDT": moment($("#sta_dt").val(), "YYYY/MM/DD").format("YYYYMMDD"),
        "endDT": moment($("#end_dt").val(), "YYYY/MM/DD").format("YYYYMMDD"),
        "page": page - 1,
        "size": pagination._options.itemsPerPage
    };

    $.get("/sub/account/recoList", $.param(param), function (res) {
        if(res.dataList == null || res.dataList.length == 0) {
            $(".grid_body").css("display", "none");
            $(".list_register_account_noData").css("display", "block");
        }
        else {
            $(".grid_body").css("display", "block");
            $(".list_register_account_noData").css("display", "none");
            updateGridBody(res);
        }
    });
};

var updateGridBody = function(res) {
    // open된 droplist close 처리
    $('[data-column-name="reco_sts_cd"]').css('overflow', 'hidden').find('.reconcile').removeClass('is_open');

    girdData = res.dataList;

    if(traContGrid == null) {
        traContGrid = new tui.Grid({
            el: document.getElementById('grid'),
            data: girdData,
            bodyHeight: 420,
            showDummyRows: true,
            scrollX: true,
            scrollY: false,
            columns: traContGridColumns,
            columnOptions: {
                frozenCount: 2,
                frozenBorderWidth: 1
            }
        });
    }
    else {
        traContGrid.resetData(girdData);
        traContGrid.resetOriginData();
    }

    // 조회 시 pagination 초기화
    if (res.page == 0) {
        pagination.setTotalItems(res.totalCount);
        pagination._currentPage = 0;
        pagination.reset();
    }
};

var traContGridColumns = [{
    header: '거래일시',
    name: 'tra_dt',
    align: 'center',
    width: 130
}, {
    header: '은행',
    name: 'bank_nm',
    align: 'center',
    width: 100
}, {
    header: '계좌번호',
    name: 'acct_no',
    align: 'center',
    width: 130
}, {
    header: '입금자명',
    name: 'acct_tra_cont',
    align: 'center',
    width: 120
}, {
    header: '입금금액',
    name: 'depo_prc',
    align: 'center',
    width: 100,
    renderer: {
        type: CustomPriceRenderer
    }
}, {
    header: '대사현황',
    name: 'reco_sts_cd_nm',
    align: 'center',
    width: 100
}, {
    header: '주문번호',
    name: 'ord_id',
    align: 'center',
    width: 140
}, {
    header: '주문자명',
    name: 'buyer_nm',
    align: 'center',
    width: 80
}, {
    header: '기능',
    name: 'reco_sts_cd',
    align: 'center',
    renderer: {
        type: CustomStatusRenderer
    },
    width: 102
}];