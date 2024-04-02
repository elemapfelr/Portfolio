"use strict";
var girdData = null;

/**
 * 커스텀 GIRD DOM
 */
var CustomIconRenderer = /*#__PURE__*/ function () {
    function CustomIconRenderer(props) {
        _classCallCheck(this, CustomIconRenderer);

        var el = $("<i class=\"icon\"></i>");
        this.el = el[0];
        this.render(props);
    }

    _createClass(CustomIconRenderer, [{
        key: "getElement",
        value: function getElement() {
            return this.el;
        }
    }, {
        key: "render",
        value: function render(props) {
            var row = girdData[props.rowKey];
            var status = "";

            switch (row.cust_acct_sts_cd) {
                case "NOR":
                    status = "check_2";
                    break;
                case "ERR":
                    if(row.usr_err_yn == "Y")
                        status = "warning";
                    else
                        status = "comment";
                    break;
                case "INQ":
                    status = "check";
                    break;
                default:
                    break;
            }
            
            $(this.el).addClass(status);
        }
    }]);

    return CustomIconRenderer;
}();

var CustomMallRenderer = /*#__PURE__*/ function () {
    function CustomMallRenderer(props) {
        _classCallCheck(this, CustomMallRenderer);

        var el = $("<div class=\"mallList_container\"></div>");
        el.mouseover(function () {
            $(this).addClass('on').find('.all_mallList').show();
            $(this).parent().css('overflow', 'visible');
            $('.tui-grid-rside-area').css('overflow', 'visible');
            $('.tui-grid-body-area').css('overflow', 'visible');
        });
        el.mouseout(function(){
            $(this).removeClass('on').find('.all_mallList').hide();
            // $(this).parent().css('overflow', 'hidden');
            // $('.tui-grid-rside-area').css('overflow', 'hidden');
            // $('.tui-grid-body-area').css('overflow', 'auto');
        });
        this.el = el[0];
        this.render(props);
    }

    _createClass(CustomMallRenderer, [{
        key: "getElement",
        value: function getElement() {
            return this.el;
        }
    }, {
        key: "render",
        value: function render(props) {
            var mallList = props.value,
                mallCount = props.value.length - 1;

            if(props.value.length == 0)
                return;
            else if(props.value.length == 1) {
                $(this.el).append('<span class="label">' + mallList[0].mall_nm + '</span>');
            }
            else {
                $(this.el).append('<span class="label">' + mallList[0].mall_nm + ' 외 <strong>' +
                    mallCount + '</strong>개</span>');
                $(this.el).append(
                    '<div class="all_mallList" style="display: none; overflow-y: auto; max-height: 350px;"></div>');

                for (var i = 0; i < mallList.length; i++) {
                    $(this.el).find('.all_mallList').append(
                        '<span>\
                            <img src="/imagefile/' + mallList[i].stor_path + mallList[i].stor_file_nm + '">\
                        </span>');
                }
            }
        }
    }]);

    return CustomMallRenderer;
}();

var CustomFunctionRenderer = /*#__PURE__*/ function () {
    function CustomFunctionRenderer(props) {
        _classCallCheck(this, CustomFunctionRenderer);

        var el = $("<div></div>");
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
                    
                $('[data-column-name="cust_acct_sts_cd"]').css('overflow', 'hidden').find('> div').removeClass('is_open');
                $(this).addClass('is_open').parent().css('overflow', 'visible');
                $(this).find('.dropdown_list').show();
                $('.tui-grid-rside-area').css('overflow', 'visible');
                $('.tui-grid-body-area').css('overflow', 'visible');
            } else {
                $(this).removeClass('is_open').parent().css('overflow', 'hidden');
                $(this).find('.dropdown_list').hide();
                $('.tui-grid-rside-area').css('overflow', 'hidden');
                $('.tui-grid-body-area').css('overflow', 'auto');
            }
        });
        this.el = el[0];
        this.render(props);
    }

    _createClass(CustomFunctionRenderer, [{
        key: "getElement",
        value: function getElement() {
            return this.el;
        }
    }, {
        key: "render",
        value: function render(props) {
            var row = girdData[props.rowKey];
            
            // if (props.value == 'dropdown') {
            // if (props.value != 'INQ') {
                $(this.el).append(
                    "<div class=\"dropdown grid_dropdown reconcile_select\">\
                        <button class=\"button line\" onclick=\"listFunctionRefresh(this);\">\
                            <span class=\"label\">선택</span>\
                            <img src=\"/assets/images/icon/icon_bottom.png\" alt=\"\">\
                        </button>\
                        <div class=\"dropdown_list\">\
                            <span class=\"item\" data-value=\"manual\" data-seqno=\"" + row.cust_acct_seq_no + "\">거래내역상세</span>\
                            <span class=\"item\" data-value=\"modify\" data-seqno=\"" + row.cust_acct_seq_no + "\">계좌수정</span>\
                            <span class=\"item\" data-value=\"request\" data-acctno=\"" + row.acct_no + "\">신규조회요청</span>\
                        </div>\
                    </div>"
                    );
            /*}  else {
            	$(this.el).append("<button class=\"button\">조회 중</button>");
            } */
        }
    }]);

    return CustomFunctionRenderer;
}();

var listFunctionRefresh = function(obj) {
    $(obj).siblings().find(".is_selected").removeClass("is_selected");
};

function fnSearch() {
    var param = { "keywd_typ_cd": "K001" };

    if (nonNull($("#sta_dt").val())) {
        param.sta_dt = moment($("#sta_dt").val(), "YYYY/MM/DD").format("YYYYMMDD");
    }
    if (nonNull($("#end_dt").val())) {
        param.end_dt = moment($("#end_dt").val(), "YYYY/MM/DD").format("YYYYMMDD");
    }

    $.get("/sub/account/stat", $.param(param), function (res) {
        if (res.length == 0) {
            $(".account_sum_text_wrap").hide();
            $(".account_sum_bank_info").hide();
            $(".list_register_account_noData").show();
        } else {
            $(".account_sum_text_wrap").show();
            $(".account_sum_bank_info").show();
            $(".list_register_account_noData").hide();

            var tagList = $(".account_sum_bank_info_list");
            tagList.empty();
            var html = [];
            var total = 0;

            // 디자인 임시 작업 처리
            $.each(res, function () {
                html.push("<li class=\"text-left\">");
                html.push("	<div class=\"account_sum_bank_info_bank \">");
                html.push("	  <img src=\"/assets/images/bank/" + this.bank_cd + ".png\" alt=\"\">");
                html.push("	  <p class=\"bank_name\">" + this.bank_nm + "</p>");
                html.push("	</div>");
                html.push("	<h1 class=\"account_sum_bank_account text-center\" >" + this.acct_no + "</h1>");
                html.push("	<div class=\"account_sum_mall_wrap text-center\">");
                html.push("	  " + this.std_keywd + "");
                html.push("	</div>");
                html.push("	<div class=\"account_sum_bank_info_pr_wrap float-right\" >");
                html.push("	  <h1 class=\"account_sum_bank_info_pr\">" + fnAddComma(this.depo_prc_sum) + "원</h1>");
                html.push("	</div>");
                html.push("</li>");

                total += this.depo_prc_sum;
            });

            $(".account_sum_start_date").text(moment($("#sta_dt").val(), "YYYY/MM/DD").format("YYYY년 MM월 DD일"));
            $(".account_sum_end_date").text(moment($("#end_dt").val(), "YYYY/MM/DD").format("YYYY년 MM월 DD일"));
            $(".account_sum_pr").text(fnAddComma(total) + "원");

            tagList.append(html.join(""));
        }
    });
}

/**
 * 데이타
 */

// var gridData = [{
// 	status: 'warning',
// 	bank: '우리은행',
// 	account: '169-648002-00-000',
// 	amount: '1,000,000',
// 	date: '2020.06.15',
// 	mall: 'G마켓, 옥션, 11번가',
// 	function: 'dropdown'
// }, {
// 	status: 'comment',
// 	bank: '국민은행',
// 	account: '169-648002-00-000',
// 	amount: '1,000,000',
// 	date: '2020.06.15',
// 	mall: 'G마켓, 옥션, 11번가',
// 	function: 'dropdown'
// }, {
// 	status: 'warning',
// 	bank: '신한은행',
// 	account: '169-648002-00-000',
// 	amount: '1,000,000',
// 	date: '2020.06.15',
// 	mall: 'G마켓, 옥션, 11번가',
// 	function: 'dropdown'
// }];