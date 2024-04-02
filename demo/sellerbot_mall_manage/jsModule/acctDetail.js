"use strict";
var girdData = null;
var traContGrid = null;
var pagination = null;

var initDetail = function() {
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
        
        if ($(obj).data('value') == 'edit') {
            $(obj).parents('.memo').removeClass('is_open').find('.dropdown').hide();
            $(obj).parents('.memo').append(
                "<input type=\"text\" class=\"self_edit\" maxlength=\"10\" onchange=\"inputMemo(" + seqNo + ", this);\"/>\
                <button class=\"edit_cancel\">\
                    <img src=\"/assets/images/icon/x_black.png\" alt=\"\">\
                </button>"
                );
            $(".self_edit").focus();
        }
        else {
            updateMemo(seqNo, $(obj).text());
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

var inputMemo = function (seqNo, obj) {
    updateMemo(seqNo, $(obj).val());
};

var updateMemo = function (seqNo, memo) {
    var param = {
        "acct_tra_cont_seq_no": seqNo,
        "memo": memo
    };

    $.ajax({
        url: '/sub/account/tra/regMemo',
        data: param,
        type: 'post',
        async: false,
        success: function (response) {
            showAlert("요청이 완료되었습니다.", function () {
                location.href = "/sub/account/detail?cust_acct_seq_no=" + $('#bankSelect').val();
            });
        },
        error: function (error) {
            showAlert("요청을 실패 하였습니다.");
        }
    });
};

/**
 * 커스텀 GIRD DOM
 */
var CustomMemoRenderer = /*#__PURE__*/ function () {
    function CustomMemoRenderer(props) {
        _classCallCheck(this, CustomMemoRenderer);

        var el = $("<div class=\"memo\"></div>"); // Toast Grid Dropdown 컨트롤

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

                $('[data-column-name="memo"]').css('overflow', 'hidden').find('.memo')
                    .removeClass('is_open');
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

    _createClass(CustomMemoRenderer, [{
        key: "getElement",
        value: function getElement() {
            return this.el;
        }
    }, {
        key: "render",
        value: function render(props) {
            $(this.el).empty();

            if (props.value == '') {
                var row = girdData[props.rowKey];
                $(this.el).append(
                    "<div class=\"dropdown grid_dropdown memo_select\">\
                        <button class=\"button line\">\
                            <span class=\"label\">선택</span>\
                            <img src=\"/assets/images/icon/icon_bottom.png\" alt=\"\">\
                        </button>\
                        <div class=\"dropdown_list\">\
                            <span class=\"item\" data-value=\"purchase\" data-seqno=\"" + row.acct_tra_cont_seq_no + "\">매입</span>\
                            <span class=\"item\" data-value=\"sales\" data-seqno=\"" + row.acct_tra_cont_seq_no + "\">매출</span>\
                            <span class=\"item\" data-value=\"etc\" data-seqno=\"" + row.acct_tra_cont_seq_no + "\">기타</span>\
                            <span class=\"item\" data-value=\"edit\" data-seqno=\"" + row.acct_tra_cont_seq_no + "\">직접입력</span>\
                        </div>\
                    </div>"
                    );
            } else {
                var text = props.value;
                var len = getTextLength(text);
                if(len >= 14) {
                    text = text.substr(0, 7) + "...";
                }

                $(this.el).attr("title", props.value);
                $(this.el).text(text);
            }
        }
    }]);

    return CustomMemoRenderer;
}();

var search = function (page) {
    var acctSeqNo = $('#bankSelect').val();
    if(acctSeqNo == "") {
        showAlert("계좌번호를 선택하세요.");
        return;        
    }

    $("#page").val(page);

    var param = {
        "cust_acct_seq_no": acctSeqNo,
        "sta_dt": moment($("#sta_dt").val(), "YYYY/MM/DD").format("YYYYMMDD"),
        "end_dt": moment($("#end_dt").val(), "YYYY/MM/DD").format("YYYYMMDD"),
        "page": page - 1,
        "size": 10//pagination._options.itemsPerPage
    };

    $.get("/sub/account/detailInfo", $.param(param), function (res) {
        if(res.tra_list == null || res.tra_list.length == 0) {
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
    $('[data-column-name="memo"]').css('overflow', 'hidden').find('.memo').removeClass('is_open');

    var bankSelTextArray = $("#bankSelect").find("option:selected").text().split(" ");
    var htmlStr = "";
    htmlStr += "<table>";
    htmlStr += "    <tbody>";
    htmlStr += "        <tr>";
    htmlStr += "            <th>은행</th>";
    htmlStr += "            <td>" + bankSelTextArray[0] + "</td>";
    htmlStr += "            <th>계좌번호</th>";
    htmlStr += "            <td>" + bankSelTextArray[1] + "</td>";
    htmlStr += "        </tr>";
    htmlStr += "        <tr>";
    htmlStr += "            <th>잔액</th>";
    htmlStr += "            <td>" + fnAddComma(res.last_tra_remai) + " 원</td>";
    htmlStr += "            <th>조회기간</th>";
    htmlStr += "            <td>" + moment($("#sta_dt").val(), "YYYY/MM/DD").format("YYYY.MM.DD") + " ~ " + moment($("#end_dt").val(), "YYYY/MM/DD").format("YYYY.MM.DD") +"</td>";
    htmlStr += "        </tr>";
    htmlStr += "    </tbody>";
    htmlStr += "</table>";
    $(".grid_info_table").html(htmlStr);

    girdData = res.tra_list;

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
        pagination.setTotalItems(res.total_count);
        pagination._currentPage = 0;
        pagination.reset();
    }
};

var traContGridColumns = [{
    header: '거래일시',
    name: 'tra_dt',
    align: 'center',
    width: 140
}, {
    header: '적요',
    name: 'summ',
    align: 'center',
    width: 100
}, {
    header: '기재내용',
    name: 'acct_tra_cont',
    align: 'center',
    width: 250
}, {
    header: '찾으신 금액',
    name: 'wdr_prc',
    align: 'right',
    width: 120,
    renderer: {
        type: CustomPriceRenderer
    }
}, {
    header: '맡기신 금액',
    name: 'depo_prc',
    align: 'right',
    width: 120,
    renderer: {
        type: CustomPriceRenderer
    }
}, {
    header: '거래 후 잔액',
    name: 'tra_remai',
    align: 'right',
    width: 120,
    renderer: {
        type: CustomPriceRenderer
    }
}, {
    header: '취급점',
    name: 'tra_branch_nm',
    align: 'center',
    width: 150
}//, {
    // header: '메모',
    // name: 'memo',
    // align: 'center',
    // width: 102,
    // // whiteSpace: 'normal',
    // // editor: 'text',
    // renderer: {
    //     type: CustomMemoRenderer
    // }
// }
];

/**
 * 데이타
 */
// var gridData = [{
//     date: '2020.06.15 03:15',
//     apply: '우리카드',
//     write: '우리카드결제-009',
//     withdraw: '1,000,000',
//     save: '1,000,000',
//     balance: '1,000,000',
//     store: 'G마켓',
//     memo: '매입'
// }, {
//     date: '2020.06.15 03:15',
//     apply: '인터넷',
//     write: '홍길동',
//     withdraw: '1,000,000',
//     save: '1,000,000',
//     balance: '1,000,000',
//     store: 'G마켓',
//     memo: '매입'
// }, {
//     date: '2020.06.15 03:15',
//     apply: '우리카드',
//     write: '김길동',
//     withdraw: '1,000,000',
//     save: '1,000,000',
//     balance: '1,000,000',
//     store: 'G마켓',
//     memo: 'select'
// }, {
//     date: '2020.06.15 03:15',
//     apply: '우리카드',
//     write: '김길동',
//     withdraw: '1,000,000',
//     save: '1,000,000',
//     balance: '1,000,000',
//     store: 'G마켓',
//     memo: 'select'
// }, {
//     date: '2020.06.15 03:15',
//     apply: '우리카드',
//     write: '김길동',
//     withdraw: '1,000,000',
//     save: '1,000,000',
//     balance: '1,000,000',
//     store: 'G마켓',
//     memo: 'select'
// }, {
//     date: '2020.06.15 03:15',
//     apply: '우리카드',
//     write: '김길동',
//     withdraw: '1,000,000',
//     save: '1,000,000',
//     balance: '1,000,000',
//     store: 'G마켓',
//     memo: 'select'
// }, {
//     date: '2020.06.15 03:15',
//     apply: '우리카드',
//     write: '김길동',
//     withdraw: '1,000,000',
//     save: '1,000,000',
//     balance: '1,000,000',
//     store: 'G마켓',
//     memo: 'select'
// }, {
//     date: '2020.06.15 03:15',
//     apply: '우리카드',
//     write: '김길동',
//     withdraw: '1,000,000',
//     save: '1,000,000',
//     balance: '1,000,000',
//     store: 'G마켓',
//     memo: 'select'
// }, {
//     date: '2020.06.15 03:15',
//     apply: '우리카드',
//     write: '김길동',
//     withdraw: '1,000,000',
//     save: '1,000,000',
//     balance: '1,000,000',
//     store: 'G마켓',
//     memo: 'select'
// }, {
//     date: '2020.06.15 03:15',
//     apply: '우리카드',
//     write: '김길동',
//     withdraw: '1,000,000',
//     save: '1,000,000',
//     balance: '1,000,000',
//     store: 'G마켓',
//     memo: 'select'
// }, {
//     date: '2020.06.15 03:15',
//     apply: '우리카드',
//     write: '김길동',
//     withdraw: '1,000,000',
//     save: '1,000,000',
//     balance: '1,000,000',
//     store: 'G마켓',
//     memo: 'select'
// }];