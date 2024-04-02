var createTipListNoData = function(index) {
    $("#care_tip").html("");
    $("#care_tip").css("display", "none");
};

// 팁 목록 생성
var createTipList = function(mall_cd, index) {
    var pageSize = 3;
    var params = {
        "mall_cd": mall_cd,
        "page": 0,
        "size": pageSize,
    };
    
    $.get("/sub/settAcc/calendar/tip", $.param(params), function (res) {
        if(res.tip_cnt_list == null || res.tip_cnt_list.length == 0) {
            createTipListNoData();
        }
        else {
            var htmlText = "";

            // 몰별 탭 설정
            htmlText += '<div class="store_tab" style="height: auto;">';
            htmlText += '   <ul class="fl_wrap">';
            
            for(var i = 0; i < res.tip_cnt_list.length; i++) {
                // 입력된 index에 해당하는 몰만 탭 활성화
                var clsNm = (index == i) ? 'on' : 'off';
                htmlText += '<li class="' + clsNm + '" onclick="javascript:createTipList(\'' + res.tip_cnt_list[i].mall_cd +  '\',' + i + ', 0);">';
                htmlText += '<img src="/imagefile/' + res.tip_cnt_list[i].stor_path + res.tip_cnt_list[i].stor_file_nm + '" class="몰 로고"></li>';
            }
            
            htmlText += '   </ul>';
            htmlText += '</div>';

            // 안내문구 설정
            mall_cd = res.tip_cnt_list[index].mall_cd;
            var tip_count = res.tip_cnt_list[index].tip_count;

            switch (mall_cd) {
                // 알 수 없는 공제
                case "001":
                case "002":
                case "003":
                case "008":
                    htmlText += '<p class="w100 pd10 mt20"><b>알 수 없는 공제금액</b>이 <span class="txt_red">' + tip_count + '건</span> 존재합니다!</p>';
                    break;
                // 정산예정금 관리팁
                case "031":
                    htmlText += '<p class="w100 pd10 mt20"><b>판매종료일</b>을 조정하시고 못 받은 <span class="txt_red">유보금</span>을 받아내세요!</p>';
                    break;
                // 위메프2.0 광고비
                case "053":
                    htmlText += '<p class="w100 pd10 mt20"><b>광고비</b>가 <span class="txt_red">' + tip_count + '건</span> 존재합니다!</p>';
                    break;
                default:
                    break;
            }

            // 몰별 TIP 리스트 설정
            var isPaging = tip_count > pageSize ? true : false;
            if(res.tip_info != null && tip_count > 0) {
                htmlText += '<section id="tip_list" class="care_tip_list fl_wrap">';
                htmlText += getHtmlForTipList(mall_cd, res.tip_info);
                htmlText += '</section>';
            }
            
            // 페이징 설정
            if(isPaging) {
                htmlText += '<div id="gridWrapper" class="status_grid_wrapper">';
                htmlText += '   <div id="grid-pagination-container" class="tui-pagination"></div>';
                htmlText += '</div>';
            }

            $("#care_tip").html(htmlText);

            // 페이징 설정
            if(isPaging) {
                var pagination = new tui.Pagination('grid-pagination-container', {
                    visiblePages: pageSize,
                    itemsPerPage: pageSize,
                    page: 1,
                    centerAlign: false,
                    firstItemClassName: 'tui-first-child',
                    lastItemClassName: 'tui-last-child',
                    usageStatistics: true
                });

                pagination.on('beforeMove', function (eventData) {
                    updateTipList(mall_cd, eventData.page, pageSize);
                });

                pagination.setTotalItems(tip_count);
                pagination._currentPage = 0;
                pagination.reset();
            }
        }
    });
};

// 팁 목록 갱신
var updateTipList = function(mall_cd, page, size) {
    var params = {
        "mall_cd": mall_cd,
        "page": page-1,
        "size": size
    };

    $.get("/sub/settAcc/calendar/tip", $.param(params), function (res) {
        var htmlText = getHtmlForTipList(mall_cd, res.tip_info);
        $("#tip_list").html(htmlText);
    });
};

// 몰별 TIP 리스트 설정
var getHtmlForTipList = function(mall_cd, list) {
    if($("#deviceType").val() == "PC")
        return getHtmlForTipListForPC(mall_cd, list);
    else 
        return getHtmlForTipListForMobile(mall_cd, list);
};

var getHtmlForTipListForPC = function(mall_cd, list) {
    var htmlText = "";
    htmlText += '   <ul>';
    htmlText += '       <li class="fl_wrap">';
    htmlText += '           <dl class="th_line">';

    // 타이틀 설정
    switch (mall_cd) {
        // 알 수 없는 공제
        case "001":
        case "002":
        case "003":
        case "008":
            htmlText += '               <dt style="width: 35%;">아이디</dt>';
            htmlText += '               <dt style="width: 15%;">배송상태</dt>';
            htmlText += '               <dt style="width: 25%;">알 수 없는 공제금액</dt>';
            break;
        // 정산예정금 관리팁
        case "031":
            htmlText += '               <dt>판매종료일</dt>';
            htmlText += '               <dt>딜 번호</dt>';
            htmlText += '               <dt>딜 명</dt>';
            break;
        // 위메프2.0 광고비
        case "053":
            htmlText += '               <dt style="width: 15%;">아이디</dt>';
            htmlText += '               <dt style="width: 15%;">광고 건수</dt>';
            htmlText += '               <dt style="width: 15%;">광고 총금액</dt>';
            htmlText += '               <dt style="width: 15%;">상계 금액</dt>';
            htmlText += '               <dt style="width: 15%;">광고 잔액</dt>';
            break;
        default:
            break;
    }

    htmlText += '               <dt></dt>';
    htmlText += '           </dl>';
    htmlText += '       </li>';

    var maxLen = (list.length < 3 ) ? list.length : 3;

    for (var i = 0; i < maxLen; i++) {
        htmlText += '       <li class="fl_wrap">';
        htmlText += '           <dl>';
    
        switch (mall_cd) {
            // 알 수 없는 공제
            case "001":
            case "002":
            case "003":
            case "008":
                htmlText += '               <dd class="text_center" style="width: 35%;">' + list[i].mall_cert_1st_id + '</dd>';
                if(list[i].com_dlv_sts == 'RDY')
                    htmlText += '               <dd class="text_center" style="width: 15%;">발송대상</dd>';
                else if(list[i].com_dlv_sts == 'DOI')
                    htmlText += '               <dd class="text_center" style="width: 15%;">배송 중</dd>';
                else if(list[i].com_dlv_sts == 'DON')
                    htmlText += '               <dd class="text_center" style="width: 15%;">배송완료</dd>';
                else
                    htmlText += '               <dd class="text_center" style="width: 15%;">구매확정</dd>';
                htmlText += '               <dd class="text_right" style="width: 25%;">' + fnAddComma(list[i].pred_dedu) + ' 원</dd>';
                break;
            // 정산예정금 관리팁
            case "031":
                htmlText += '               <dd class="text_center">D-<b class="txt_red">' + list[i].d_day + '</b>일</dd>';
                htmlText += '               <dd class="text_center">' + list[i].deal_no + '</dd>';
                htmlText += '               <dd>' + list[i].deal_nm + '</dd>';
                break;
            // 위메프2.0 광고비
            case "053":
                htmlText += '               <dd class="text_center" style="width: 15%;">' + list[i].mall_cert_1st_id + '</dd>';    
                htmlText += '               <dd class="text_center" style="width: 15%;">' + fnAddComma(list[i].ad_num) + ' 건</dd>';
                htmlText += '               <dd class="text_center" style="width: 15%;">' + fnAddComma(list[i].ad_tot_prc) + ' 원</dd>';
                htmlText += '               <dd class="text_center" style="width: 15%;">' + fnAddComma(list[i].ad_offset) + ' 원</dd>';
                htmlText += '               <dd class="text_center" style="width: 15%;">' + fnAddComma(list[i].ad_remai) + ' 원</dd>';
                break;
            default:
                break;
        }

        htmlText += '               <dd class="text_right pr30"><a href="javascript:jumpToMall(' + list[i].cust_mall_seq_no + ');">';

        if(i == 0)
            htmlText += '당장 확인하러 가기 <img src="/assets/images/main/icon_arrow.png" class="inline_block ml10"></a></dd>';
        else if(i == 1)
            htmlText += '따지러 가기 <img src="/assets/images/main/icon_arrow.png" class="inline_block ml10"></a></dd>';
        else
            htmlText += '조정하러 가기 <img src="/assets/images/main/icon_arrow.png" class="inline_block ml10"></a></dd>';

        htmlText += '           </dl>';
        htmlText += '       </li>';
    }

    htmlText += '   </ul>';
    return htmlText;
};

var getHtmlForTipListForMobile = function(mall_cd, list) {
    var htmlText = "";
    htmlText += '   <ul>';

    // 타이틀 설정
    switch (mall_cd) {
        // 알 수 없는 공제
        case "001":
        case "002":
        case "003":
        case "008":
            break;
        // 정산예정금 관리팁
        case "031":
            htmlText += '       <li class="fl_wrap">';
            htmlText += '           <dl class="th_line">';
            htmlText += '               <dt>판매종료일</dt>';
            htmlText += '               <dt>딜 번호</dt>';
            htmlText += '               <dt>딜 명</dt>';
            htmlText += '               <dt></dt>';
            htmlText += '           </dl>';
            htmlText += '       </li>';
            break;
        // 위메프2.0 광고비
        case "053":
            break;
        default:
            break;
    }

    var maxLen = (list.length < 3 ) ? list.length : 3;

    for (var i = 0; i < maxLen; i++) {
        htmlText += '       <li class="fl_wrap">';
    
        switch (mall_cd) {
            // 알 수 없는 공제
            case "001":
            case "002":
            case "003":
            case "008":
                htmlText += '           <dl class="th_line">';
                htmlText += '               <dt style="width: 40%; padding-left: 10px;">아이디</dt>';
                htmlText += '               <dt style="width: 60%; text-align: right !important; padding-right: 10px;">' + list[i].mall_cert_1st_id + '</dt>';
                htmlText += '           </dl>';
                htmlText += '           <dl class="th_line">';
                htmlText += '               <dt style="width: 40%; padding-left: 10px; ">배송상태</dt>';

                var com_dlv_sts_nm = "";
                if(list[i].com_dlv_sts == 'RDY')
                    com_dlv_sts_nm = '발송대상';
                else if(list[i].com_dlv_sts == 'DOI')
                    com_dlv_sts_nm = '배송 중';
                else if(list[i].com_dlv_sts == 'DON')
                    com_dlv_sts_nm = '배송완료';
                else
                    com_dlv_sts_nm = '구매확정';

                htmlText += '               <dt style="width: 60%; text-align: right !important; padding-right: 10px;">' + com_dlv_sts_nm + '</dt>';
                htmlText += '           </dl>';
                htmlText += '           <dl class="th_line">';
                htmlText += '               <dt style="width: 40%; padding-left: 10px;">알 수 없는 공제금액</dt>';
                htmlText += '               <dt style="width: 60%; text-align: right !important; padding-right: 10px;">' + fnAddComma(list[i].pred_dedu) + ' 원</dt>';
                htmlText += '           </dl>';
                htmlText += '               <dd class="text_right pr30"><a href="javascript:jumpToMallNotLogin(\'' + mall_cd + '\');">';
                
                if(i == 0)
                    htmlText += '당장 확인하러 가기 <img src="/assets/images/main/icon_arrow.png" class="inline_block ml10"></a></dd>';
                else if(i == 1)
                    htmlText += '따지러 가기 <img src="/assets/images/main/icon_arrow.png" class="inline_block ml10"></a></dd>';
                else
                    htmlText += '조정하러 가기 <img src="/assets/images/main/icon_arrow.png" class="inline_block ml10"></a></dd>';
                break;
            // 정산예정금 관리팁
            case "031":
                htmlText += '           <dl>';
                htmlText += '               <dd class="text_center">D-<b class="txt_red">' + list[i].d_day + '</b>일</dd>';
                htmlText += '               <dd class="text_center">' + list[i].deal_no + '</dd>';
                htmlText += '               <dd>' + list[i].deal_nm + '</dd>';
                htmlText += '               <dd class="text_right pr30"><a href="javascript:jumpToMallNotLogin(\'' + mall_cd + '\');">';

                if(i == 0)
                    htmlText += '당장 확인하러 가기 <img src="/assets/images/main/icon_arrow.png" class="inline_block ml10"></a></dd>';
                else if(i == 1)
                    htmlText += '따지러 가기 <img src="/assets/images/main/icon_arrow.png" class="inline_block ml10"></a></dd>';
                else
                    htmlText += '조정하러 가기 <img src="/assets/images/main/icon_arrow.png" class="inline_block ml10"></a></dd>';

                htmlText += '           </dl>';
                break;
            // 위메프2.0 광고비
            case "053":
                htmlText += '           <dl class="th_line">';
                htmlText += '               <dt style="width: 40%; padding-left: 10px;">아이디</dt>';
                htmlText += '               <dt style="width: 60%; text-align: right !important; padding-right: 10px;">' + list[i].mall_cert_1st_id + '</dt>';
                htmlText += '           </dl>';    
                htmlText += '           <dl class="th_line">';
                htmlText += '               <dt style="width: 40%; padding-left: 10px;">광고 건수</dt>';
                htmlText += '               <dt style="width: 60%; text-align: right !important; padding-right: 10px;">' + fnAddComma(list[i].ad_num) + ' 건</dt>';
                htmlText += '           </dl>';    
                htmlText += '           <dl class="th_line">';
                htmlText += '               <dt style="width: 40%; padding-left: 10px;">광고 총금액</dt>';
                htmlText += '               <dt style="width: 60%; text-align: right !important; padding-right: 10px;">' + fnAddComma(list[i].ad_tot_prc) + ' 원</dt>';
                htmlText += '           </dl>';    
                htmlText += '           <dl class="th_line">';
                htmlText += '               <dt style="width: 40%; padding-left: 10px;">상계 금액</dt>';
                htmlText += '               <dt style="width: 60%; text-align: right !important; padding-right: 10px;">' + fnAddComma(list[i].ad_offset) + ' 원</dt>';
                htmlText += '           </dl>';    
                htmlText += '           <dl class="th_line">';
                htmlText += '               <dt style="width: 40%; padding-left: 10px;">광고 잔액</dt>';
                htmlText += '               <dt style="width: 60%; text-align: right !important; padding-right: 10px;">' + fnAddComma(list[i].ad_remai) + ' 원</dt>';
                htmlText += '           </dl>';   
                htmlText += '               <dd class="text_right pr30" style="width: 100%; background: #efefef; padding-right: 10px !important;"><a style="color: #598ae2;" href="javascript:jumpToMallNotLogin(\'' + mall_cd + '\');">';
                
                if(i == 0)
                    htmlText += '당장 확인하러 가기 <img src="/assets/images/main/icon_arrow.png" class="inline_block ml10"></a></dd>';
                else if(i == 1)
                    htmlText += '따지러 가기 <img src="/assets/images/main/icon_arrow.png" class="inline_block ml10"></a></dd>';
                else
                    htmlText += '조정하러 가기 <img src="/assets/images/main/icon_arrow.png" class="inline_block ml10"></a></dd>'; 
                break;
            default:
                break;
        }

        htmlText += '       </li>';
    }

    htmlText += '   </ul>';
    return htmlText;
};

// 자동로그인
var jumpToMall = function(seq) {
    var param = {
        "cust_mall_seq_no": seq
    };

    $.post("/sub/jump/mallInfo", $.param(param), function (res) {
        if(res == null) {
            alert("점프 가능한 데이터가 없습니다.");
            return;
        }
        else if(res.mall_cert_1st_id == null || res.mall_cert_1st_id == "") {
            alert("점프 가능한 ID가 없습니다.");
            return;
        }
        else if(res.mall_cert_1st_passwd == null || res.mall_cert_1st_passwd == "") {
            alert("점프 가능한 패스워드가 없습니다.");
            return;
        }
        
        var authParam = {
            "id": res.mall_cert_1st_id,
            "pw": res.mall_cert_1st_passwd,
        };

        if (res.passwd_step >= 1)
            authParam["param"] = res.mall_cert_2nd_passwd;

        if (res.cert_step >= 1)
            authParam["cert"] = res.sub_mall_cert_1st;

        if (res.cert_step >= 2)
            authParam["cert2"] = res.sub_mall_cert_2nd;

        var authList = new Array();
        authList.push(authParam);

        var mallParam = {
            "mall_cd": res.mall_cd,
            "auth": authList
        };
        
        var cmdParam = {
            "cmd": "AUTO_LOGIN",
            "args": mallParam
        };

        send(JSON.stringify(cmdParam));
    })
    .fail(function (response) {
        alert("데이터 조회에 실패하였습니다.\n다시 시도해 주시기 바랍니다.");
    });
};

var jumpToMallNotLogin = function(mall_cd) {
    var _win = window.open();

    var param = {
        "mall_cd": mall_cd
    };

    $.post("/sub/jump/basicMallInfo", $.param(param))
    .then(function(res) {
        if(res == null) {
            alert("점프 가능한 데이터가 없습니다.");
            return;
        }
        else if(res.mall_url == null || res.mall_url == "") {
            alert("점프 가능한 URL이 없습니다.");
            return;
        }

        _win.location = res.mall_url;
    })
    .fail(function (response) {
        alert("데이터 조회에 실패하였습니다.\n다시 시도해 주시기 바랍니다.");
    });
};

//-------------------------------------------------------------------------------

// white-space 옵션 때문에 grid 설정 완료 후 header 처리
var highlightForGridHeader = function(mall_cd, id, data, option) {
    if(data == null || data.length == 0)
        return;

    switch (mall_cd) {
        // 알 수 없는 공제금액
        case "001":
        case "002":
        case "003":
        case "008":
            highlightForPredDeduHeader(id, option.data);
            break;
        // 최종 지급 예정액
        case "030":
            highlightForFnaPayPlnFeeHeader(id, data);
            break;
        // 유보금
        case "031":
            highlightForMall031Header(id, data);
            break;
        // 위메프2.0
        case "053":
            highlightForMall053Header(id);
            break;
        default:
            break;
    }
};

// 특정 header에 (셀러봇예측DATA) 추가 및 하이라이트 표시
var highlightForHeader = function(id, headerNm) {
    var header = $('#' + id).find('th:contains("' + headerNm + '")');
    if(header == null)
        return;

    var newHtml = header.html() + "<br><mark>" + "(셀러봇예측DATA)" + "</mark>";
    header.html(newHtml);
    header.css('white-space', 'pre-line');
}

// 알 수 없는 공제 관련 하이라이트 표시
var highlightForPredDeduHeader = function(id, data) {
    highlightForHeader(id, '알 수 없는 공제');

    // 알 수 없는 공제 합계가 0이 아닌 경우 하이라이트 표시
    if(typeof(data[0].PRED_DEDU) == 'string' && data[0].PRED_DEDU.indexOf("<mark>") > -1)
        highlightForHeader(id, '정산예정금합계');
};

// 최종 지급 예정액 관련 하이라이트 표시
var highlightForFnaPayPlnFeeHeader = function(id, data) {
    highlightForHeader(id, '최종 지급 예정액');

    // 같은 행의 정산예정금합계와 최종 지급 예정액이 다른 경우 하이라이트 표시
    var isDiff = false;
    for(var i = 0; i < data.length; i++) {
        if(typeof(data[i].COM_SETT_ACC_PLN_PRC) == 'string' && data[i].COM_SETT_ACC_PLN_PRC.indexOf("<mark>") > -1)
            isDiff = true;
    }

    if(isDiff)
        highlightForHeader(id, '정산예정금합계');
};

// 티몬 유보금 관련 하이라이트 표시
var highlightForMall031Header = function(id, data) {
    var today = moment(Date.now()).format("YYYY-MM-DD");
    var isHighlight = false;

    for(var i = 0; i < data.length; i++) {
        if(data[i].COM_SETT_ACC_PLN_DT.indexOf("<mark>") > -1)
            isHighlight = true;
    }

    if(isHighlight) {
        highlightForHeader(id, '정산예정일자');
        highlightForHeader(id, '정산예정금합계');
    }
};

// 위메프2.0 관련 하이라이트 표시
var highlightForMall053Header = function(id) {
    highlightForHeader(id, '정산예정금합계');
};

// 화면을 벗어난 영역의 항목은 존재하지 않기 때문에 data를 수정해서 처리
var highlightForGridData = function(mall_cd, data, total, columns) {
    if(data == null || data.length == 0)
        return;

    switch (mall_cd) {
        // 알 수 없는 공제금액
        case "001":
        case "002":
        case "003":
        case "008":
            highlightForPredDeduData(data, total);
            break;
        // 최종 지급 예정액
        case "030":
            highlightForFnaPayPlnFeeData(data);
            break;
        // 유보금
        case "031":
            highlightForMall031Data(data, columns);
            break;
        // 위메프2.0
        case "053":
            highlightForMall053Data(data, total);
            break;
        default:
            break;
    }
};

// 정산예정금합계 데이터 하이라이트 표시
var highlightForSettAccPlnPrcData = function(data) {
    if(data.COM_SETT_ACC_PLN_PRC != null)
        data.COM_SETT_ACC_PLN_PRC = "<mark>" + fnAddComma(data.COM_SETT_ACC_PLN_PRC) + "</mark>";
};

// 알 수 없는 공제 데이터 하이라이트 표시
var highlightForPredDeduDicData = function(data) {
    // 알 수 없는 공제금액이 0이 아닌 경우 하이라이트 표시
    if(data.PRED_DEDU != null && data.PRED_DEDU != 0)
        data.PRED_DEDU = "<mark>" + fnAddComma(data.PRED_DEDU) + "</mark>";
    
    highlightForSettAccPlnPrcData(data);
};

// 알 수 없는 공제 관련 하이라이트 표시
var highlightForPredDeduData = function(data, total) {
    if(total.PRED_DEDU == null || total.PRED_DEDU == 0)
        return;

    for(var i = 0; i < data.length; i++) {
        highlightForPredDeduDicData(data[i]);
    }

    highlightForPredDeduDicData(total);
};

// 최종 지급 예정액 관련 하이라이트 표시
var highlightForFnaPayPlnFeeData = function(data) {
    for(var i = 0; i < data.length; i++) {
        if(data[i].COM_SETT_ACC_PLN_PRC != data[i].FNA_PAY_PLN_FEE) {
            // 최종 지급 예정액
            if(data[i].FNA_PAY_PLN_FEE != null)
                data[i].FNA_PAY_PLN_FEE = "<div class='tuiGridCustomColor'>" + fnAddComma(data[i].FNA_PAY_PLN_FEE) + "</div>";

            // 정산예정금합계
            highlightForSettAccPlnPrcData(data[i]);
        }
    }
};

// 티몬 유보금 관련 하이라이트 표시
var highlightForMall031Data = function(data, columns) {
    var today = moment(Date.now()).format("YYYY-MM-DD");

    for(var i = 0; i < data.length; i++) {
        var settAccPlnDt = moment(data[i].COM_SETT_ACC_PLN_DT).format("YYYY-MM-DD");
        var durationDays = moment.duration(moment(settAccPlnDt).diff(today)).asDays();
        
        // 정산일자가 90일 이후의 row 하이라이트
        if(durationDays > 90) {
            for(var j = 0; j < columns.length; j++) {
                if(data[i][columns[j].name] == undefined) {
                }
                else if(typeof(data[i][columns[j].name]) == 'number')
                    data[i][columns[j].name] = "<mark>" + fnAddComma(data[i][columns[j].name]) + "</mark>";
                else
                    data[i][columns[j].name] = "<mark>" + data[i][columns[j].name] + "</mark>";
            }
        }
    }
};

// 위메프2.0 관련 하이라이트 표시
var highlightForMall053Data = function(data, total) {
    for(var i = 0; i < data.length; i++)
        highlightForSettAccPlnPrcData(data[i]);

    highlightForSettAccPlnPrcData(total);
};